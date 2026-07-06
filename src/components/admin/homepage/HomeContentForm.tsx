"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Field, inputClass, textareaClass } from "@/components/admin/shared/Field";
import { ImageUploader } from "@/components/admin/shared/ImageUploader";
import { IconPicker } from "@/components/admin/shared/IconPicker";
import { updateHomeContentAction } from "@/lib/actions/homeContent";
import type { HomeContent } from "@/generated/prisma/client";
import type { CraftsmanshipValueInput } from "@/lib/validation/homeContent";

export function HomeContentForm({ content }: { content: HomeContent }) {
  const router = useRouter();
  const [heroEyebrow, setHeroEyebrow] = useState(content.heroEyebrow);
  const [heroName, setHeroName] = useState(content.heroName);
  const [heroSubtitle, setHeroSubtitle] = useState(content.heroSubtitle);
  const [heroCtaLabel, setHeroCtaLabel] = useState(content.heroCtaLabel);
  const [heroCtaHref, setHeroCtaHref] = useState(content.heroCtaHref);
  const [heroImage, setHeroImage] = useState<string[]>(content.heroImage ? [content.heroImage] : []);

  const [aboutPreviewEyebrow, setAboutPreviewEyebrow] = useState(content.aboutPreviewEyebrow);
  const [aboutPreviewHeading, setAboutPreviewHeading] = useState(content.aboutPreviewHeading);
  const [aboutPreviewBody, setAboutPreviewBody] = useState(content.aboutPreviewBody);
  const [aboutPreviewCtaLabel, setAboutPreviewCtaLabel] = useState(content.aboutPreviewCtaLabel);
  const [aboutPreviewCtaHref, setAboutPreviewCtaHref] = useState(content.aboutPreviewCtaHref);

  const [featuredEyebrow, setFeaturedEyebrow] = useState(content.featuredEyebrow);
  const [featuredTitle, setFeaturedTitle] = useState(content.featuredTitle);
  const [featuredDescription, setFeaturedDescription] = useState(content.featuredDescription);
  const [featuredCtaLabel, setFeaturedCtaLabel] = useState(content.featuredCtaLabel);
  const [featuredCtaHref, setFeaturedCtaHref] = useState(content.featuredCtaHref);

  const [craftsmanshipEyebrow, setCraftsmanshipEyebrow] = useState(content.craftsmanshipEyebrow);
  const [craftsmanshipTitle, setCraftsmanshipTitle] = useState(content.craftsmanshipTitle);
  const [craftsmanshipValues, setCraftsmanshipValues] = useState<CraftsmanshipValueInput[]>(
    content.craftsmanshipValues as CraftsmanshipValueInput[]
  );

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updateValue(index: number, patch: Partial<CraftsmanshipValueInput>) {
    setCraftsmanshipValues((prev) =>
      prev.map((value, i) => (i === index ? { ...value, ...patch } : value))
    );
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const result = await updateHomeContentAction({
      heroEyebrow,
      heroName,
      heroSubtitle,
      heroCtaLabel,
      heroCtaHref,
      heroImage: heroImage[0] ?? "",
      aboutPreviewEyebrow,
      aboutPreviewHeading,
      aboutPreviewBody,
      aboutPreviewCtaLabel,
      aboutPreviewCtaHref,
      featuredEyebrow,
      featuredTitle,
      featuredDescription,
      featuredCtaLabel,
      featuredCtaHref,
      craftsmanshipEyebrow,
      craftsmanshipTitle,
      craftsmanshipValues,
    });

    setSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      toast.error(result.error);
      return;
    }

    toast.success("Homepage updated.");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
      <fieldset className="flex flex-col gap-4">
        <legend className="font-display text-lg text-charcoal">Hero</legend>
        <Field label="Eyebrow">
          <input className={inputClass} value={heroEyebrow} onChange={(e) => setHeroEyebrow(e.target.value)} />
        </Field>
        <Field label="Title">
          <input className={inputClass} value={heroName} onChange={(e) => setHeroName(e.target.value)} />
        </Field>
        <Field label="Subtitle">
          <textarea
            className={textareaClass}
            style={{ minHeight: 90 }}
            value={heroSubtitle}
            onChange={(e) => setHeroSubtitle(e.target.value)}
          />
        </Field>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Button Label">
            <input
              className={inputClass}
              value={heroCtaLabel}
              onChange={(e) => setHeroCtaLabel(e.target.value)}
            />
          </Field>
          <Field label="Button Link">
            <input
              className={inputClass}
              value={heroCtaHref}
              onChange={(e) => setHeroCtaHref(e.target.value)}
            />
          </Field>
        </div>
        <ImageUploader value={heroImage} onChange={setHeroImage} max={1} label="Hero Background Image" />
      </fieldset>

      <fieldset className="flex flex-col gap-4 border-t border-charcoal/10 pt-8">
        <legend className="font-display text-lg text-charcoal">About Preview</legend>
        <Field label="Eyebrow">
          <input
            className={inputClass}
            value={aboutPreviewEyebrow}
            onChange={(e) => setAboutPreviewEyebrow(e.target.value)}
          />
        </Field>
        <Field label="Heading">
          <input
            className={inputClass}
            value={aboutPreviewHeading}
            onChange={(e) => setAboutPreviewHeading(e.target.value)}
          />
        </Field>
        <Field label="Body">
          <textarea
            className={textareaClass}
            value={aboutPreviewBody}
            onChange={(e) => setAboutPreviewBody(e.target.value)}
          />
        </Field>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Button Label">
            <input
              className={inputClass}
              value={aboutPreviewCtaLabel}
              onChange={(e) => setAboutPreviewCtaLabel(e.target.value)}
            />
          </Field>
          <Field label="Button Link">
            <input
              className={inputClass}
              value={aboutPreviewCtaHref}
              onChange={(e) => setAboutPreviewCtaHref(e.target.value)}
            />
          </Field>
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-4 border-t border-charcoal/10 pt-8">
        <legend className="font-display text-lg text-charcoal">Featured Collection</legend>
        <Field label="Eyebrow">
          <input
            className={inputClass}
            value={featuredEyebrow}
            onChange={(e) => setFeaturedEyebrow(e.target.value)}
          />
        </Field>
        <Field label="Title">
          <input
            className={inputClass}
            value={featuredTitle}
            onChange={(e) => setFeaturedTitle(e.target.value)}
          />
        </Field>
        <Field label="Description">
          <textarea
            className={textareaClass}
            style={{ minHeight: 70 }}
            value={featuredDescription}
            onChange={(e) => setFeaturedDescription(e.target.value)}
          />
        </Field>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Button Label">
            <input
              className={inputClass}
              value={featuredCtaLabel}
              onChange={(e) => setFeaturedCtaLabel(e.target.value)}
            />
          </Field>
          <Field label="Button Link">
            <input
              className={inputClass}
              value={featuredCtaHref}
              onChange={(e) => setFeaturedCtaHref(e.target.value)}
            />
          </Field>
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-4 border-t border-charcoal/10 pt-8">
        <legend className="font-display text-lg text-charcoal">Craftsmanship Section</legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Eyebrow">
            <input
              className={inputClass}
              value={craftsmanshipEyebrow}
              onChange={(e) => setCraftsmanshipEyebrow(e.target.value)}
            />
          </Field>
          <Field label="Title">
            <input
              className={inputClass}
              value={craftsmanshipTitle}
              onChange={(e) => setCraftsmanshipTitle(e.target.value)}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {craftsmanshipValues.map((value, index) => (
            <div key={index} className="flex flex-col gap-3 rounded-sm border border-charcoal/10 p-4">
              <p className="text-xs uppercase tracking-wide text-charcoal/50">Value {index + 1}</p>
              <IconPicker value={value.icon} onChange={(path) => updateValue(index, { icon: path })} />
              <Field label="Title">
                <input
                  className={inputClass}
                  value={value.title}
                  onChange={(e) => updateValue(index, { title: e.target.value })}
                />
              </Field>
              <Field label="Description">
                <textarea
                  className={textareaClass}
                  style={{ minHeight: 70 }}
                  value={value.description}
                  onChange={(e) => updateValue(index, { description: e.target.value })}
                />
              </Field>
            </div>
          ))}
        </div>
      </fieldset>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex justify-end border-t border-charcoal/10 pt-6">
        <button
          type="submit"
          disabled={submitting}
          className="min-h-[44px] rounded-sm bg-charcoal px-6 py-2.5 text-sm uppercase tracking-wide text-ivory transition-colors hover:bg-gold disabled:opacity-60"
        >
          {submitting ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
