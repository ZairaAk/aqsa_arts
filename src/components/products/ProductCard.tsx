import Link from "next/link";
import { ProductImage } from "@/components/ui/ProductImage";
import type { ProductWithCategory } from "@/lib/repositories/products";

export function ProductCard({ product }: { product: ProductWithCategory }) {
  return (
    <Link
      href={`/collections/${product.slug}`}
      className="group flex flex-col active:opacity-80"
    >
      <ProductImage
        src={product.images[0]}
        alt={product.name}
        className="aspect-[4/5] w-full rounded-sm transition-transform duration-500 sm:rounded-none sm:group-hover:scale-[1.02]"
      />
      <div className="mt-3 flex flex-col gap-1 sm:mt-5">
        <span className="text-[10px] uppercase tracking-[0.2em] text-gold sm:text-xs sm:tracking-[0.25em]">
          {product.category.name}
        </span>
        <h3 className="font-display text-base leading-snug text-charcoal sm:text-xl">
          {product.name}
        </h3>
        {product.shortDescription && (
          <p className="mt-1 line-clamp-2 hidden text-sm text-charcoal/60 sm:block">
            {product.shortDescription}
          </p>
        )}
        <span className="mt-2 hidden items-center gap-2 text-sm text-walnut transition-colors group-hover:text-gold sm:mt-3 sm:inline-flex">
          View Details
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            &rarr;
          </span>
        </span>
      </div>
    </Link>
  );
}
