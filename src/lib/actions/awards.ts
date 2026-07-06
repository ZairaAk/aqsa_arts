"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth/session";
import { awardSchema, type AwardInput } from "@/lib/validation/award";
import * as awardsRepo from "@/lib/repositories/awards";
import type { ActionResult } from "@/lib/types";

export async function createAwardAction(input: AwardInput): Promise<ActionResult<{ id: string }>> {
  await requireAdminSession();
  const parsed = awardSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid award." };
  }

  const award = await awardsRepo.createAward(parsed.data);
  revalidatePath("/about");
  return { ok: true, data: { id: award.id } };
}

export async function updateAwardAction(id: string, input: AwardInput): Promise<ActionResult> {
  await requireAdminSession();
  const parsed = awardSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid award." };
  }

  await awardsRepo.updateAward(id, parsed.data);
  revalidatePath("/about");
  return { ok: true, data: null };
}

export async function deleteAwardAction(id: string): Promise<ActionResult> {
  await requireAdminSession();
  await awardsRepo.deleteAward(id);
  revalidatePath("/about");
  return { ok: true, data: null };
}

export async function moveAwardAction(id: string, direction: "up" | "down"): Promise<ActionResult> {
  await requireAdminSession();
  await awardsRepo.moveAward(id, direction);
  revalidatePath("/about");
  return { ok: true, data: null };
}
