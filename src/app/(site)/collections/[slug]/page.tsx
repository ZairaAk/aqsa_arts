import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllSlugs,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/repositories/products";
import { getSiteConfig } from "@/lib/repositories/siteConfig";
import { ProductGallery } from "@/components/products/ProductGallery";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { ProductCard } from "@/components/products/ProductCard";
import { FadeIn } from "@/components/ui/FadeIn";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [product, siteConfig] = await Promise.all([getProductBySlug(slug), getSiteConfig()]);
  if (!product) return {};
  return {
    title: `${product.name} | ${siteConfig.name}`,
    description: product.shortDescription,
  };
}

export default async function ProductDetailsPage({ params }: Props) {
  const { slug } = await params;
  const [product, siteConfig] = await Promise.all([getProductBySlug(slug), getSiteConfig()]);
  if (!product) notFound();

  const related = await getRelatedProducts(product);
  const categoryName = product.category.name;

  return (
    <section className="px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-6xl">
        <nav className="mb-10 text-xs uppercase tracking-[0.2em] text-charcoal/50">
          <Link href="/collections" className="hover:text-charcoal">
            Collections
          </Link>
          <span className="mx-2">/</span>
          <span className="text-charcoal/80">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <ProductGallery images={product.images} name={product.name} />

          <div className="flex flex-col gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-gold">
                {categoryName}
              </span>
              <h1 className="mt-3 font-display text-3xl text-charcoal sm:text-4xl">
                {product.name}
              </h1>
            </div>

            <p className="text-base leading-relaxed text-charcoal/70">
              {product.description}
            </p>

            <div className="divider-gold h-px w-full" />

            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {product.material && (
                <div>
                  <dt className="text-xs uppercase tracking-[0.2em] text-charcoal/40">
                    Material
                  </dt>
                  <dd className="mt-1 text-sm text-charcoal/80">{product.material}</dd>
                </div>
              )}
              {product.dimensions && (
                <div>
                  <dt className="text-xs uppercase tracking-[0.2em] text-charcoal/40">
                    Dimensions
                  </dt>
                  <dd className="mt-1 text-sm text-charcoal/80">{product.dimensions}</dd>
                </div>
              )}
            </dl>

            <WhatsAppButton
              whatsappNumber={siteConfig.whatsappNumber}
              productName={product.name}
              className="mt-4 w-fit"
            />
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-28">
            <h2 className="font-display text-2xl text-charcoal sm:text-3xl">
              More from {categoryName}
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <FadeIn key={p.id} delay={i * 0.08}>
                  <ProductCard product={p} />
                </FadeIn>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
