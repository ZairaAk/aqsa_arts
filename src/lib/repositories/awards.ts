import "server-only";
import { prisma } from "@/lib/db/prisma";
import type { AwardInput } from "@/lib/validation/award";

export function getAwards() {
  return prisma.award.findMany({ orderBy: [{ sortOrder: "asc" }, { year: "asc" }] });
}

export async function createAward(data: AwardInput) {
  const count = await prisma.award.count();
  return prisma.award.create({ data: { ...data, sortOrder: count } });
}

export function updateAward(id: string, data: AwardInput) {
  return prisma.award.update({ where: { id }, data });
}

export function deleteAward(id: string) {
  return prisma.award.delete({ where: { id } });
}

export async function moveAward(id: string, direction: "up" | "down") {
  const awards = await getAwards();
  const index = awards.findIndex((a) => a.id === id);
  if (index === -1) return;

  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (swapIndex < 0 || swapIndex >= awards.length) return;

  const current = awards[index];
  const neighbor = awards[swapIndex];

  await prisma.$transaction([
    prisma.award.update({ where: { id: current.id }, data: { sortOrder: neighbor.sortOrder } }),
    prisma.award.update({ where: { id: neighbor.id }, data: { sortOrder: current.sortOrder } }),
  ]);
}
