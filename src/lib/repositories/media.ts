import "server-only";
import { prisma } from "@/lib/db/prisma";
import type { MediaFeatureInput } from "@/lib/validation/media";

export function getMediaFeatures() {
  return prisma.mediaFeature.findMany({ orderBy: [{ sortOrder: "asc" }, { year: "asc" }] });
}

function toData(data: MediaFeatureInput) {
  return {
    title: data.title,
    outlet: data.outlet,
    year: data.year,
    type: data.type,
    url: data.url || null,
  };
}

export async function createMediaFeature(data: MediaFeatureInput) {
  const count = await prisma.mediaFeature.count();
  return prisma.mediaFeature.create({ data: { ...toData(data), sortOrder: count } });
}

export function updateMediaFeature(id: string, data: MediaFeatureInput) {
  return prisma.mediaFeature.update({ where: { id }, data: toData(data) });
}

export function deleteMediaFeature(id: string) {
  return prisma.mediaFeature.delete({ where: { id } });
}

export async function moveMediaFeature(id: string, direction: "up" | "down") {
  const features = await getMediaFeatures();
  const index = features.findIndex((f) => f.id === id);
  if (index === -1) return;

  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (swapIndex < 0 || swapIndex >= features.length) return;

  const current = features[index];
  const neighbor = features[swapIndex];

  await prisma.$transaction([
    prisma.mediaFeature.update({ where: { id: current.id }, data: { sortOrder: neighbor.sortOrder } }),
    prisma.mediaFeature.update({ where: { id: neighbor.id }, data: { sortOrder: current.sortOrder } }),
  ]);
}
