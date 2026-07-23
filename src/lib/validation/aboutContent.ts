import { z } from "zod";

export const aboutContentSchema = z.object({
  heroEyebrow: z.string().trim().min(1).max(80),
  heroTitle: z.string().trim().min(1).max(200),
  artisanImage: z.string().url().optional().or(z.literal("")),
  journeyEyebrow: z.string().trim().min(1).max(80),
  journeyHeading: z.string().trim().min(1).max(200),
  journeyParagraphs: z.array(z.string().trim().min(1).max(2000)).min(1).max(10),
  craftsmanshipEyebrow: z.string().trim().min(1).max(80),
  craftsmanshipTitle: z.string().trim().min(1).max(200),
  craftsmanshipDescription: z.string().trim().min(1).max(500),
  craftsmanshipParagraphs: z.array(z.string().trim().min(1).max(2000)).min(1).max(10),
});

export type AboutContentInput = z.infer<typeof aboutContentSchema>;
