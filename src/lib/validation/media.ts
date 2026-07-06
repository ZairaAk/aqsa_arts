import { z } from "zod";

export const mediaFeatureSchema = z.object({
  title: z.string().trim().min(2, "Title is required.").max(200),
  outlet: z.string().trim().min(2, "Outlet is required.").max(200),
  year: z.string().trim().min(1, "Year is required.").max(20),
  type: z.enum(["INTERVIEW", "ARTICLE", "VIDEO"]),
  url: z
    .string()
    .trim()
    .url("Enter a valid URL.")
    .max(500)
    .optional()
    .or(z.literal("")),
});

export type MediaFeatureInput = z.infer<typeof mediaFeatureSchema>;
