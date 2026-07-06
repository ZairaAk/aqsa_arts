import "server-only";
import { prisma } from "@/lib/db/prisma";
import { seedSiteConfig } from "@/lib/db/seed-data";
import type { SiteConfigInput } from "@/lib/validation/siteConfig";

const SINGLETON_ID = "singleton";

export async function getSiteConfig() {
  const existing = await prisma.siteConfig.findUnique({ where: { id: SINGLETON_ID } });
  if (existing) return existing;

  return prisma.siteConfig.upsert({
    where: { id: SINGLETON_ID },
    create: { id: SINGLETON_ID, ...seedSiteConfig },
    update: {},
  });
}

export function updateSiteConfig(data: SiteConfigInput) {
  return prisma.siteConfig.upsert({
    where: { id: SINGLETON_ID },
    create: { id: SINGLETON_ID, ...data },
    update: data,
  });
}
