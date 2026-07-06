import "server-only";
import { prisma } from "@/lib/db/prisma";
import { seedAboutContent } from "@/lib/db/seed-data";
import type { AboutContentInput } from "@/lib/validation/aboutContent";

const SINGLETON_ID = "singleton";

export async function getAboutContent() {
  const existing = await prisma.aboutContent.findUnique({ where: { id: SINGLETON_ID } });
  if (existing) return existing;

  return prisma.aboutContent.upsert({
    where: { id: SINGLETON_ID },
    create: { id: SINGLETON_ID, ...seedAboutContent },
    update: {},
  });
}

export function updateAboutContent(data: AboutContentInput) {
  return prisma.aboutContent.upsert({
    where: { id: SINGLETON_ID },
    create: { id: SINGLETON_ID, ...data },
    update: data,
  });
}
