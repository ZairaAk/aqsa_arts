import { z } from "zod";

export const awardSchema = z.object({
  year: z.string().trim().min(1, "Year is required.").max(20),
  title: z.string().trim().min(2, "Title is required.").max(200),
  description: z.string().trim().min(2, "Description is required.").max(1000),
});

export type AwardInput = z.infer<typeof awardSchema>;
