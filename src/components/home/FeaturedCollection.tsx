import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";
import type { HomeContent } from "@/generated/prisma/client";
import type { ProductWithCategory } from "@/lib/repositories/products";

export function FeaturedCollection({
  content,
  featured,
}: {
  content: HomeContent;
  featured: ProductWithCategory[];
}) {
  const featuredCollection = {
    eyebrow: content.featuredEyebrow,
    title: content.featuredTitle,
    description: content.featuredDescription,
    ctaLabel: content.featuredCtaLabel,
    ctaHref: content.featuredCtaHref,
  };

  return (
    <section className="bg-cream/50 px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow={featuredCollection.eyebrow}
          title={featuredCollection.title}
          description={featuredCollection.description}
        />

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product, i) => (
            <FadeIn key={product.id} delay={i * 0.08}>
              <ProductCard product={product} />
            </FadeIn>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            href={featuredCollection.ctaHref}
            className="inline-flex items-center gap-2 rounded-full border border-walnut px-8 py-3.5 text-sm uppercase tracking-[0.2em] text-walnut transition-colors duration-300 hover:bg-walnut hover:text-ivory"
          >
            {featuredCollection.ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
