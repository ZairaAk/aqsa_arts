"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth/session";
import { siteConfigSchema, type SiteConfigInput } from "@/lib/validation/siteConfig";
import * as siteConfigRepo from "@/lib/repositories/siteConfig";
import type { ActionResult } from "@/lib/types";

export async function updateSiteConfigAction(input: SiteConfigInput): Promise<ActionResult> {
  await requireAdminSession();
  const parsed = siteConfigSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid settings." };
  }

  await siteConfigRepo.updateSiteConfig(parsed.data);
  revalidatePath("/", "layout");
  return { ok: true, data: null };
}
