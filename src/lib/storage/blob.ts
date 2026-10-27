import "server-only";
import { del } from "@vercel/blob";

export async function deleteBlobs(urls: (string | null | undefined)[]) {
  const validUrls = urls.filter((url): url is string => Boolean(url));
  const results = await Promise.allSettled(validUrls.map((url) => del(url)));
  if (results.some((result) => result.status === "rejected")) {
    throw new Error("Failed to delete one or more images from Vercel Blob.");
  }
}
