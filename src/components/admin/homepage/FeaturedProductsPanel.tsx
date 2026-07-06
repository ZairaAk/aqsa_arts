"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { setProductFeaturedAction } from "@/lib/actions/products";
import type { ProductWithCategory } from "@/lib/repositories/products";

export function FeaturedProductsPanel({ products }: { products: ProductWithCategory[] }) {
  const router = useRouter();
  const [togglingId, setTogglingId] = useState<string | null>(null);

  async function toggle(product: ProductWithCategory) {
    setTogglingId(product.id);
    const result = await setProductFeaturedAction(product.id, !product.featured);
    setTogglingId(null);

    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-3">
      <div>
        <h2 className="font-display text-lg text-charcoal">Featured Products</h2>
        <p className="mt-1 text-sm text-charcoal/60">
          Choose which products appear in the homepage&apos;s featured collection.
        </p>
      </div>

      <div className="flex flex-col divide-y divide-charcoal/10 rounded-sm border border-charcoal/10 bg-white">
        {products.map((product) => (
          <label
            key={product.id}
            className="flex min-h-[52px] items-center justify-between gap-3 px-4 py-3"
          >
            <div>
              <p className="text-sm text-charcoal">{product.name}</p>
              <p className="text-xs text-charcoal/50">{product.category.name}</p>
            </div>
            <input
              type="checkbox"
              checked={product.featured}
              disabled={togglingId === product.id}
              onChange={() => toggle(product)}
              className="h-5 w-5 rounded-sm border-charcoal/30"
            />
          </label>
        ))}
        {products.length === 0 && (
          <p className="px-4 py-6 text-center text-sm text-charcoal/50">
            No products yet — add some from the Products page first.
          </p>
        )}
      </div>
    </div>
  );
}
