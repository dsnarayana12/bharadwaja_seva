import { requestUploadUrl } from "@workspace/api-client-react";

export async function uploadFile(file: File): Promise<string> {
  const res = await requestUploadUrl({
    name: file.name,
    size: file.size,
    contentType: file.type || "application/octet-stream",
  });
  const put = await fetch(res.uploadURL, {
    method: "PUT",
    headers: { "Content-Type": file.type || "application/octet-stream" },
    body: file,
  });
  if (!put.ok) {
    throw new Error(`Upload failed: ${put.status} ${put.statusText}`);
  }
  return `/api/storage${res.objectPath}`;
}
