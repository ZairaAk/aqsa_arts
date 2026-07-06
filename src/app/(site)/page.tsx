import { Hero } from "@/components/home/Hero";
import { AboutPreview } from "@/components/home/AboutPreview";
import { FeaturedCollection } from "@/components/home/FeaturedCollection";
import { CraftsmanshipSection } from "@/components/home/CraftsmanshipSection";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <FeaturedCollection />
      <CraftsmanshipSection />
    </>
  );
}
