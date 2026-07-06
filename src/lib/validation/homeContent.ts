import { z } from "zod";

export const craftsmanshipValueSchema = z.object({
  title: z.string().trim().min(1, "Title is required.").max(80),
  description: z.string().trim().min(1, "Description is required.").max(300),
  icon: z.string().trim().min(1, "Icon is required."),
});

export const homeContentSchema = z.object({
  heroEyebrow: z.string().trim().min(1).max(80),
  heroName: z.string().trim().min(1).max(120),
  heroSubtitle: z.string().trim().min(1).max(400),
  heroCtaLabel: z.string().trim().min(1).max(60),
  heroCtaHref: z.string().trim().min(1).max(200),
  heroImage: z.string().url().optional().or(z.literal("")),
  aboutPreviewEyebrow: z.string().trim().min(1).max(80),
  aboutPreviewHeading: z.string().trim().min(1).max(200),
  aboutPreviewBody: z.string().trim().min(1).max(1000),
  aboutPreviewCtaLabel: z.string().trim().min(1).max(60),
  aboutPreviewCtaHref: z.string().trim().min(1).max(200),
  featuredEyebrow: z.string().trim().min(1).max(80),
  featuredTitle: z.string().trim().min(1).max(200),
  featuredDescription: z.string().trim().min(1).max(400),
  featuredCtaLabel: z.string().trim().min(1).max(60),
  featuredCtaHref: z.string().trim().min(1).max(200),
  craftsmanshipEyebrow: z.string().trim().min(1).max(80),
  craftsmanshipTitle: z.string().trim().min(1).max(200),
  craftsmanshipValues: z.array(craftsmanshipValueSchema).length(4),
});

export type HomeContentInput = z.infer<typeof homeContentSchema>;
export type CraftsmanshipValueInput = z.infer<typeof craftsmanshipValueSchema>;
