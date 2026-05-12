import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";
import { eq } from "drizzle-orm";
import multer, { MulterError } from "multer";
import { randomUUID, createHash } from "crypto";
import { db, photosTable } from "@workspace/db";
import { requireAdmin } from "../lib/auth";

const router: IRouter = Router();

// 4.5 MB — kept under Vercel's serverless request body limit so the same code
// works both on Replit and on Vercel without surprises.
const MAX_BYTES = 4_718_592;
const MAX_MB_LABEL = "4.5 MB";

const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
]);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_BYTES, files: 5 },
});

function handleMulterError(
  err: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (err instanceof MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      res.status(413).json({
        error: `File too large. Maximum allowed size is ${MAX_MB_LABEL} per image.`,
      });
      return;
    }
    if (err.code === "LIMIT_FILE_COUNT") {
      res.status(400).json({ error: "Too many files in a single upload (max 5)." });
      return;
    }
    res.status(400).json({ error: `Upload error: ${err.message}` });
    return;
  }
  next(err);
}

/**
 * POST /storage/uploads
 *
 * Admin-only. Accepts multipart/form-data with one or more files under field
 * name "files" (or a single file under "file"). Stores raw bytes in Postgres
 * and returns the public URL(s) for each uploaded file.
 *
 * Response: { urls: string[] }
 */
router.post(
  "/storage/uploads",
  requireAdmin,
  (req, res, next) => upload.any()(req, res, (err) => handleMulterError(err, req, res, next)),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const files = (req.files as Express.Multer.File[] | undefined) ?? [];
      if (files.length === 0) {
        res.status(400).json({ error: "No files uploaded" });
        return;
      }

      const urls: string[] = [];
      for (const f of files) {
        const mime = (f.mimetype || "application/octet-stream").toLowerCase();
        if (!ALLOWED_MIME.has(mime)) {
          res.status(400).json({ error: `Unsupported file type: ${mime}` });
          return;
        }
        const id = randomUUID();
        await db.insert(photosTable).values({
          id,
          mimeType: mime,
          byteSize: f.size,
          bytes: f.buffer,
        });
        urls.push(`/api/storage/photos/${id}`);
      }

      res.status(201).json({ urls });
    } catch (error) {
      req.log.error({ err: error }, "Error uploading file");
      res.status(500).json({ error: "Failed to upload file" });
    }
  },
);

/**
 * GET /storage/photos/:id
 *
 * Public. Streams the photo bytes stored in Postgres with proper Content-Type,
 * long-lived cache headers, and ETag support.
 */
router.get("/storage/photos/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const idParam = req.params.id;
    const id = Array.isArray(idParam) ? idParam[0] : idParam;
    if (!id || id.length > 64) {
      res.status(400).json({ error: "Invalid id" });
      return;
    }

    const [row] = await db
      .select()
      .from(photosTable)
      .where(eq(photosTable.id, id))
      .limit(1);

    if (!row) {
      res.status(404).json({ error: "Photo not found" });
      return;
    }

    // Photos are immutable, so a stable hash of identity+size is enough.
    // Avoids hashing the full image buffer on every request.
    const etag = `"${createHash("sha1")
      .update(`${row.id}:${row.byteSize}:${row.createdAt.toISOString()}`)
      .digest("hex")}"`;
    if (req.headers["if-none-match"] === etag) {
      res.status(304).end();
      return;
    }

    res.setHeader("Content-Type", row.mimeType);
    res.setHeader("Content-Length", String(row.byteSize));
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    res.setHeader("ETag", etag);
    res.status(200).end(row.bytes);
  } catch (error) {
    req.log.error({ err: error }, "Error serving photo");
    res.status(500).json({ error: "Failed to serve photo" });
  }
});

/**
 * DELETE /storage/photos/:id
 *
 * Admin-only. Deletes a photo from the DB. Note: this does NOT remove
 * references from gallery_events.photo_urls — admins should clean those up
 * via the event editor.
 */
router.delete(
  "/storage/photos/:id",
  requireAdmin,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const idParam = req.params.id;
      const id = Array.isArray(idParam) ? idParam[0] : idParam;
      if (!id) {
        res.status(400).json({ error: "Invalid id" });
        return;
      }
      const result = await db
        .delete(photosTable)
        .where(eq(photosTable.id, id))
        .returning({ id: photosTable.id });
      if (result.length === 0) {
        res.status(404).json({ error: "Photo not found" });
        return;
      }
      res.sendStatus(204);
    } catch (error) {
      req.log.error({ err: error }, "Error deleting photo");
      res.status(500).json({ error: "Failed to delete photo" });
    }
  },
);

export default router;
