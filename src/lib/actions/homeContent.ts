"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth/session";
import { homeContentSchema, type HomeContentInput } from "@/lib/validation/homeContent";
import * as homeContentRepo from "@/lib/repositories/homeContent";
import { deleteBlobs } from "@/lib/storage/blob";
import type { ActionResult } from "@/lib/types";

export async function updateHomeContentAction(
  input: HomeContentInput
): Promise<ActionResult> {
  await requireAdminSession();
  const parsed = homeContentSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid homepage content." };
  }

  const existing = await homeContentRepo.getHomeContent();
  await homeContentRepo.updateHomeContent(parsed.data);

  const newHeroImage = parsed.data.heroImage || null;
  if (existing.heroImage && existing.heroImage !== newHeroImage) {
    await deleteBlobs([existing.heroImage]);
  }

  revalidatePath("/");
  return { ok: true, data: null };
}
