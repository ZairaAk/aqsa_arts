"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth/session";
import { aboutContentSchema, type AboutContentInput } from "@/lib/validation/aboutContent";
import * as aboutContentRepo from "@/lib/repositories/aboutContent";
import type { ActionResult } from "@/lib/types";

export async function updateAboutContentAction(
  input: AboutContentInput
): Promise<ActionResult> {
  await requireAdminSession();
  const parsed = aboutContentSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid about page content." };
  }

  await aboutContentRepo.updateAboutContent(parsed.data);
  revalidatePath("/about");
  return { ok: true, data: null };
}
