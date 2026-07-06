"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Field, inputClass, textareaClass, selectClass } from "@/components/admin/shared/Field";
import { ImageUploader } from "@/components/admin/shared/ImageUploader";
import { createProductAction, updateProductAction } from "@/lib/actions/products";
import { slugify } from "@/lib/utils/slug";
import type { ProductWithCategory } from "@/lib/repositories/products";

type Category = { slug: string; name: string };

type ProductFormProps = {
  product?: ProductWithCategory;
  categories: Category[];
  onClose: () => void;
  onSaved: () => void;
};

export function ProductForm({ product, categories, onClose, onSaved }: ProductFormProps) {
  const [name, setName] = useState(product?.name ?? "");
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(product));
  const [categorySlug, setCategorySlug] = useState(product?.categorySlug ?? categories[0]?.slug ?? "");
  const [shortDescription, setShortDescription] = useState(product?.shortDescription ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [material, setMaterial] = useState(product?.material ?? "");
  const [dimensions, setDimensions] = useState(product?.dimensions ?? "");
  const [images, setImages] = useState<string[]>(product?.images ?? []);
  const [featured, setFeatured] = useState(product?.featured ?? false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function handleNameChange(value: string) {
    setName(value);
    if (!slugTouched) {
      setSlug(slugify(value));
    }
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const input = {
      name,
      slug,
      categorySlug,
      shortDescription,
      description,
      material,
      dimensions,
      images,
      featured,
    };

    try {
      const result = product
        ? await updateProductAction(product.id, input)
        : await createProductAction(input);

      if (!result.ok) {
        setError(result.error);
        toast.error(result.error);
        return;
      }

      toast.success(product ? "Product updated." : "Product created.");
      onSaved();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Field label="Name">
        <input
          className={inputClass}
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
          required
        />
      </Field>

      <Field label="Slug" hint="Used in the product URL.">
        <input
          className={inputClass}
          value={slug}
          onChange={(e) => {
            setSlugTouched(true);
            setSlug(e.target.value);
          }}
          required
        />
      </Field>

      <Field label="Category">
        <select
          className={selectClass}
          value={categorySlug}
          onChange={(e) => setCategorySlug(e.target.value)}
          required
        >
          {categories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Short Description" hint="Shown on product cards.">
        <textarea
          className={textareaClass}
          style={{ minHeight: 70 }}
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          required
        />
      </Field>

      <Field label="Description">
        <textarea
          className={textareaClass}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Material">
          <input className={inputClass} value={material} onChange={(e) => setMaterial(e.target.value)} />
        </Field>
        <Field label="Dimensions">
          <input
            className={inputClass}
            value={dimensions}
            onChange={(e) => setDimensions(e.target.value)}
          />
        </Field>
      </div>

      <ImageUploader value={images} onChange={setImages} max={10} label="Product Images" />

      <label className="flex min-h-[44px] items-center gap-2 text-sm text-charcoal">
        <input
          type="checkbox"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
          className="h-4 w-4 rounded-sm border-charcoal/30"
        />
        Featured on homepage
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onClose}
          disabled={submitting}
          className="min-h-[44px] rounded-sm border border-charcoal/20 px-5 py-2.5 text-sm uppercase tracking-wide text-charcoal/70 transition-colors hover:bg-charcoal/5 disabled:opacity-60"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="min-h-[44px] rounded-sm bg-charcoal px-5 py-2.5 text-sm uppercase tracking-wide text-ivory transition-colors hover:bg-gold disabled:opacity-60"
        >
          {submitting ? "Saving..." : product ? "Save Changes" : "Create Product"}
        </button>
      </div>
    </form>
  );
}
