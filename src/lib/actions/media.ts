"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth/session";
import { mediaFeatureSchema, type MediaFeatureInput } from "@/lib/validation/media";
import * as mediaRepo from "@/lib/repositories/media";
import type { ActionResult } from "@/lib/types";

export async function createMediaFeatureAction(
  input: MediaFeatureInput
): Promise<ActionResult<{ id: string }>> {
  await requireAdminSession();
  const parsed = mediaFeatureSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid media feature." };
  }

  const feature = await mediaRepo.createMediaFeature(parsed.data);
  revalidatePath("/about");
  return { ok: true, data: { id: feature.id } };
}

export async function updateMediaFeatureAction(
  id: string,
  input: MediaFeatureInput
): Promise<ActionResult> {
  await requireAdminSession();
  const parsed = mediaFeatureSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid media feature." };
  }

  await mediaRepo.updateMediaFeature(id, parsed.data);
  revalidatePath("/about");
  return { ok: true, data: null };
}

export async function deleteMediaFeatureAction(id: string): Promise<ActionResult> {
  await requireAdminSession();
  await mediaRepo.deleteMediaFeature(id);
  revalidatePath("/about");
  return { ok: true, data: null };
}

export async function moveMediaFeatureAction(
  id: string,
  direction: "up" | "down"
): Promise<ActionResult> {
  await requireAdminSession();
  await mediaRepo.moveMediaFeature(id, direction);
  revalidatePath("/about");
  return { ok: true, data: null };
}
