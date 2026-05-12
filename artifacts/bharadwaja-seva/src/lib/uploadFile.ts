/**
 * Upload one or more image files to the API server. Files are stored as
 * bytes in Postgres and served back via /api/storage/photos/:id.
 */
export async function uploadFile(file: File): Promise<string> {
  const [url] = await uploadFiles([file]);
  return url;
}

export async function uploadFiles(files: File[]): Promise<string[]> {
  if (files.length === 0) return [];
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
