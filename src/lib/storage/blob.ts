import "server-only";
import { del } from "@vercel/blob";

export async function deleteBlobs(urls: (string | null | undefined)[]) {
  const validUrls = urls.filter((url): url is string => Boolean(url));
  await Promise.allSettled(validUrls.map((url) => del(url)));
}
