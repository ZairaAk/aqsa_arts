import type { Metadata } from "next";
import { getAllProducts } from "@/lib/repositories/products";
import { getSiteConfig } from "@/lib/repositories/siteConfig";
import { ProductCard } from "@/components/products/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";
import { SITE_URL } from "@/lib/constants/site";

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig();
  const title = `Collections | ${siteConfig.name}`;
  const description = `Browse handcrafted Aari and Crewel embroidery — shawls, suits, kurtis, and home décor — from the Srinagar atelier of ${siteConfig.name}.`;

  return {
    title,
    description,
    alternates: {
      canonical: "/collections",
    },
    openGraph: {
      type: "website",
      url: `${SITE_URL}/collections`,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
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
          description="Every piece is hand-embroidered in the Aari and Crewel traditions Mir Abdul Majeed has practiced for over six decades."
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
