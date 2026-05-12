/**
 * Upload one or more image files to the API server. Files are stored as
 * bytes in Postgres and served back via /api/storage/photos/:id.
 *
 * Hard limit: 4.5 MB per image (matches the server limit which is itself
 * sized to fit within Vercel's serverless request-body limit).
 */

export const MAX_UPLOAD_BYTES = 4_718_592;
export const MAX_UPLOAD_LABEL = "4.5 MB";

export async function uploadFile(file: File): Promise<string> {
  const [url] = await uploadFiles([file]);
  return url;
}

export async function uploadFiles(files: File[]): Promise<string[]> {
  if (files.length === 0) return [];

  // Client-side guard so users get instant feedback instead of a 413 round-trip.
  for (const f of files) {
    if (f.size > MAX_UPLOAD_BYTES) {
      throw new Error(
        `"${f.name}" is too large (${(f.size / 1024 / 1024).toFixed(1)} MB). ` +
          `Maximum allowed size is ${MAX_UPLOAD_LABEL} per image.`,
      );
    }
  }

  const fd = new FormData();
  for (const f of files) fd.append("files", f, f.name);

  const res = await fetch("/api/storage/uploads", {
    method: "POST",
    body: fd,
    credentials: "include",
  });

  if (!res.ok) {
    let msg = `Upload failed: ${res.status} ${res.statusText}`;
    try {
      const j = (await res.json()) as { error?: string };
      if (j?.error) msg = j.error;
    } catch {
      /* ignore */
    }
    throw new Error(msg);
  }

  const data = (await res.json()) as { urls: string[] };
  return data.urls;
}
