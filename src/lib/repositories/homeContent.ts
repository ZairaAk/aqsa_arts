import "server-only";
import { prisma } from "@/lib/db/prisma";
import { seedHomeContent } from "@/lib/db/seed-data";
import type { HomeContentInput } from "@/lib/validation/homeContent";

const SINGLETON_ID = "singleton";

export async function getHomeContent() {
  const existing = await prisma.homeContent.findUnique({ where: { id: SINGLETON_ID } });
  if (existing) return existing;

  return prisma.homeContent.upsert({
    where: { id: SINGLETON_ID },
    create: { id: SINGLETON_ID, ...seedHomeContent },
    update: {},
  });
}

export function updateHomeContent(data: HomeContentInput) {
  return prisma.homeContent.upsert({
    where: { id: SINGLETON_ID },
    create: { id: SINGLETON_ID, ...data },
    update: data,
  });
}
