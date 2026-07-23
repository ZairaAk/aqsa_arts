import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { AboutPreview } from "@/components/home/AboutPreview";
import { FeaturedCollection } from "@/components/home/FeaturedCollection";
import { CraftsmanshipSection } from "@/components/home/CraftsmanshipSection";
import { getHomeContent } from "@/lib/repositories/homeContent";
import { getFeaturedProducts } from "@/lib/repositories/products";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  const [content, featured] = await Promise.all([getHomeContent(), getFeaturedProducts()]);

  return (
    <>
      <Hero content={content} />
      <AboutPreview content={content} />
      <FeaturedCollection content={content} featured={featured} />
      <CraftsmanshipSection content={content} />
    </>
  );
}
