import "server-only";
import { prisma } from "@/lib/db/prisma";
import type { ProductGetPayload } from "@/generated/prisma/models";
import type { ProductInput } from "@/lib/validation/product";

const withCategory = { include: { category: true } };

export type ProductWithCategory = ProductGetPayload<{ include: { category: true } }>;

export function getAllProducts() {
  return prisma.product.findMany({
    ...withCategory,
    orderBy: { createdAt: "desc" },
  });
}

export function getFeaturedProducts() {
  return prisma.product.findMany({
    ...withCategory,
    where: { featured: true },
    orderBy: { createdAt: "desc" },
  });
}

export function getProductsByCategory(categorySlug: string) {
  return prisma.product.findMany({
    ...withCategory,
    where: { categorySlug },
    orderBy: { createdAt: "desc" },
  });
}

export function getProductBySlug(slug: string) {
  return prisma.product.findUnique({ ...withCategory, where: { slug } });
}

export function getProductById(id: string) {
  return prisma.product.findUnique({ ...withCategory, where: { id } });
}

export async function getAllSlugs() {
  const products = await prisma.product.findMany({ select: { slug: true } });
  return products.map((p) => p.slug);
}

export function getRelatedProducts(product: { id: string; categorySlug: string }, limit = 3) {
  return prisma.product.findMany({
    ...withCategory,
    where: { categorySlug: product.categorySlug, id: { not: product.id } },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

export function createProduct(data: ProductInput) {
  return prisma.product.create({
    data: {
      slug: data.slug,
      name: data.name,
      categorySlug: data.categorySlug,
      shortDescription: data.shortDescription,
      description: data.description,
      material: data.material || null,
      dimensions: data.dimensions || null,
      images: data.images,
      featured: data.featured,
    },
  });
}

export function updateProduct(id: string, data: ProductInput) {
  return prisma.product.update({
    where: { id },
    data: {
      slug: data.slug,
      name: data.name,
      categorySlug: data.categorySlug,
      shortDescription: data.shortDescription,
      description: data.description,
      material: data.material || null,
      dimensions: data.dimensions || null,
      images: data.images,
      featured: data.featured,
    },
  });
}

export function deleteProduct(id: string) {
  return prisma.product.delete({ where: { id } });
}

export function setProductFeatured(id: string, featured: boolean) {
  return prisma.product.update({ where: { id }, data: { featured } });
}
