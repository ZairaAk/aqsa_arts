import type { Metadata } from "next";
import { getAllProducts } from "@/lib/repositories/products";
import { getSiteConfig } from "@/lib/repositories/siteConfig";
import { ProductCard } from "@/components/products/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig();
  return {
    title: `Collections | ${siteConfig.name}`,
    description: `Browse the handcrafted Aari embroidery and Kashmiri handicraft collection by ${siteConfig.name}.`,
  };
}

export default async function CollectionsPage() {
  const products = await getAllProducts();

  return (
    <section className="px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="The Collection"
          title="Handcrafted Kashmiri Treasures"
          description="Every piece in this collection is the result of hours of patient, hand-guided embroidery, a tradition preserved through generations."
        />

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <FadeIn key={product.id} delay={(i % 6) * 0.06}>
              <ProductCard product={product} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
