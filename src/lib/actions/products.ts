"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth/session";
import { productSchema, type ProductInput } from "@/lib/validation/product";
import * as productsRepo from "@/lib/repositories/products";
import { deleteBlobs } from "@/lib/storage/blob";
import { Prisma } from "@/generated/prisma/client";
import type { ActionResult } from "@/lib/types";

function revalidateProductPaths(slug: string) {
  revalidatePath("/");
  revalidatePath("/collections");
  revalidatePath(`/collections/${slug}`);
}

function isUniqueConstraintError(err: unknown): boolean {
  return err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002";
}

export async function createProductAction(
  input: ProductInput
): Promise<ActionResult<{ id: string }>> {
  await requireAdminSession();
  const parsed = productSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid product data." };
  }

  try {
    const product = await productsRepo.createProduct(parsed.data);
    revalidateProductPaths(product.slug);
    return { ok: true, data: { id: product.id } };
  } catch (err) {
    if (isUniqueConstraintError(err)) {
      return { ok: false, error: "That slug is already in use. Try a different one." };
    }
    throw err;
  }
}

export async function updateProductAction(
  id: string,
  input: ProductInput
): Promise<ActionResult<{ id: string }>> {
  await requireAdminSession();
  const parsed = productSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid product data." };
  }

  const existing = await productsRepo.getProductById(id);
  if (!existing) {
    return { ok: false, error: "Product not found." };
  }

  try {
    const removedImages = existing.images.filter((url) => !parsed.data.images.includes(url));
    const product = await productsRepo.updateProduct(id, parsed.data);
    await deleteBlobs(removedImages);
    revalidateProductPaths(product.slug);
    if (existing.slug !== product.slug) revalidateProductPaths(existing.slug);
    return { ok: true, data: { id: product.id } };
  } catch (err) {
    if (isUniqueConstraintError(err)) {
      return { ok: false, error: "That slug is already in use. Try a different one." };
    }
    throw err;
  }
}

export async function deleteProductAction(id: string): Promise<ActionResult> {
  await requireAdminSession();
  const existing = await productsRepo.getProductById(id);
  if (!existing) {
    return { ok: false, error: "Product not found." };
  }

  await productsRepo.deleteProduct(id);
  await deleteBlobs(existing.images);
  revalidateProductPaths(existing.slug);
  return { ok: true, data: null };
}

export async function setProductFeaturedAction(
  id: string,
  featured: boolean
): Promise<ActionResult> {
  await requireAdminSession();
  const product = await productsRepo.setProductFeatured(id, featured);
  revalidateProductPaths(product.slug);
  return { ok: true, data: null };
}
