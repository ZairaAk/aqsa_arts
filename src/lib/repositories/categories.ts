import "server-only";
import { prisma } from "@/lib/db/prisma";

export function getCategories() {
  return prisma.category.findMany({ orderBy: { name: "asc" } });
}

export function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({ where: { slug } });
}

export async function getCategoryName(slug: string) {
  const category = await getCategoryBySlug(slug);
  return category?.name ?? slug;
}
