import { z } from "zod";

export const productSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters.").max(120),
  slug: z
    .string()
    .trim()
    .min(2, "Slug must be at least 2 characters.")
    .max(120)
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers and hyphens."),
  categorySlug: z.string().trim().min(1, "Please select a category."),
  shortDescription: z.string().trim().min(2, "Short description is required.").max(300),
  description: z.string().trim().min(2, "Description is required.").max(4000),
  material: z.string().trim().max(200).optional().or(z.literal("")),
  dimensions: z.string().trim().max(200).optional().or(z.literal("")),
  images: z.array(z.string().url()).max(20, "No more than 20 images per product."),
  featured: z.boolean(),
});

export type ProductInput = z.infer<typeof productSchema>;
