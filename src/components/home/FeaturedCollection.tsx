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
    <section className="bg-cream/50 px-6 py-16 sm:py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow={featuredCollection.eyebrow}
          title={featuredCollection.title}
          description={featuredCollection.description}
        />

        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:mt-16 sm:gap-x-8 sm:gap-y-14 lg:grid-cols-4">
          {featured.map((product, i) => (
            <FadeIn key={product.id} delay={i * 0.08}>
              <ProductCard product={product} />
            </FadeIn>
          ))}
        </div>

        <div className="mt-10 flex justify-center sm:mt-16">
          <Link
            href={featuredCollection.ctaHref}
            className="inline-flex min-h-[48px] w-full max-w-xs items-center justify-center gap-2 rounded-full border border-walnut px-8 py-3.5 text-sm uppercase tracking-[0.2em] text-walnut transition-colors duration-300 hover:bg-walnut hover:text-ivory sm:w-auto"
          >
            {featuredCollection.ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
