import { z } from "zod";

export const siteConfigSchema = z.object({
  name: z.string().trim().min(1).max(120),
  shortName: z.string().trim().min(1).max(120),
  tagline: z.string().trim().min(1).max(200),
  description: z.string().trim().min(1).max(500),
  phone: z.string().trim().min(5, "Enter a valid phone number.").max(20),
  phoneDisplay: z.string().trim().min(5, "Enter a valid phone number.").max(30),
  whatsappNumber: z.string().trim().min(5, "Enter a valid WhatsApp number.").max(20),
  addressLine1: z.string().trim().min(1).max(200),
  addressLine2: z.string().trim().min(1).max(200),
  addressLine3: z.string().trim().min(1).max(200),
  footerDescription: z.string().trim().min(1).max(500),
});

export type SiteConfigInput = z.infer<typeof siteConfigSchema>;
