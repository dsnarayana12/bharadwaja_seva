import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db, galleryEventsTable } from "@workspace/db";
import {
  CreateEventBody,
  UpdateEventBody,
  UpdateEventParams,
  DeleteEventParams,
  UpdateEventResponse as GalleryEventSchema,
  ListEventsResponse,
} from "@workspace/api-zod";
import { requireAdmin } from "../lib/auth";
import { serializeRow, serializeRows } from "../lib/serialize";

const router: IRouter = Router();

router.get("/events", async (_req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(galleryEventsTable)
    .orderBy(desc(galleryEventsTable.eventDate));
  res.json(ListEventsResponse.parse(serializeRows(rows)));
});

router.post("/events", requireAdmin, async (req, res): Promise<void> => {
  const parsed = CreateEventBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [row] = await db
    .insert(galleryEventsTable)
    .values({
      titleEn: parsed.data.titleEn,
      titleTe: parsed.data.titleTe ?? "",
      titleHi: parsed.data.titleHi ?? "",
      descriptionEn: parsed.data.descriptionEn ?? "",
      descriptionTe: parsed.data.descriptionTe ?? "",
      descriptionHi: parsed.data.descriptionHi ?? "",
      eventDate: parsed.data.eventDate,
      category: parsed.data.category,
      photoUrls: parsed.data.photoUrls,
    })
    .returning();
  res.status(201).json(GalleryEventSchema.parse(serializeRow(row)));
});

router.patch("/events/:id", requireAdmin, async (req, res): Promise<void> => {
  const params = UpdateEventParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateEventBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [row] = await db
    .update(galleryEventsTable)
    .set(parsed.data)
    .where(eq(galleryEventsTable.id, params.data.id))
    .returning();
  if (!row) {
    res.status(404).json({ error: "Event not found" });
    return;
  }
  res.json(GalleryEventSchema.parse(serializeRow(row)));
});

router.delete("/events/:id", requireAdmin, async (req, res): Promise<void> => {
  const params = DeleteEventParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [row] = await db
    .delete(galleryEventsTable)
    .where(eq(galleryEventsTable.id, params.data.id))
    .returning();
  if (!row) {
    res.status(404).json({ error: "Event not found" });
    return;
  }
  res.sendStatus(204);
});

export default router;
