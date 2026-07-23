"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth/session";
import { aboutContentSchema, type AboutContentInput } from "@/lib/validation/aboutContent";
import * as aboutContentRepo from "@/lib/repositories/aboutContent";
import { deleteBlobs } from "@/lib/storage/blob";
import type { ActionResult } from "@/lib/types";

export async function updateAboutContentAction(
  input: AboutContentInput
): Promise<ActionResult> {
  await requireAdminSession();
  const parsed = aboutContentSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid about page content." };
  }

  const existing = await aboutContentRepo.getAboutContent();
  await aboutContentRepo.updateAboutContent(parsed.data);

  const newArtisanImage = parsed.data.artisanImage || null;
  if (existing.artisanImage && existing.artisanImage !== newArtisanImage) {
    await deleteBlobs([existing.artisanImage]);
  }

  revalidatePath("/about");
  return { ok: true, data: null };
}
