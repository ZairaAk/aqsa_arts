import Link from "next/link";
import { ProductImage } from "@/components/ui/ProductImage";
import { getCategoryName } from "@/data/categories";
import type { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/collections/${product.slug}`} className="group flex flex-col">
      <ProductImage
        src={product.images[0]}
        alt={product.name}
        className="aspect-[4/5] w-full transition-transform duration-500 group-hover:scale-[1.02]"
      />
      <div className="mt-5 flex flex-col gap-1">
        <span className="text-xs uppercase tracking-[0.25em] text-gold">
          {getCategoryName(product.categorySlug)}
        </span>
        <h3 className="font-display text-xl text-charcoal">{product.name}</h3>
        {product.shortDescription && (
          <p className="mt-1 line-clamp-2 text-sm text-charcoal/60">
            {product.shortDescription}
          </p>
        )}
        <span className="mt-3 inline-flex items-center gap-2 text-sm text-walnut transition-colors group-hover:text-gold">
          View Details
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            &rarr;
          </span>
        </span>
      </div>
    </Link>
  );
}
