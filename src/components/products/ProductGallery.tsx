"use client";

import { useState } from "react";
import { ProductImage } from "@/components/ui/ProductImage";

export function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);
  const hasImages = images.length > 0;

  return (
    <div className="flex flex-col gap-4">
      <ProductImage
        src={hasImages ? images[active] : undefined}
        alt={name}
        className="aspect-[4/5] w-full rounded-sm"
      />
      {hasImages && images.length > 1 && (
        <div className="flex gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              className={`relative h-20 w-20 overflow-hidden rounded-sm border transition-colors ${
                active === i ? "border-gold" : "border-charcoal/10"
              }`}
            >
              <ProductImage src={src} alt={`${name} thumbnail ${i + 1}`} className="h-full w-full" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
