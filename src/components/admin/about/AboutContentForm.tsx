"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Field, inputClass, textareaClass } from "@/components/admin/shared/Field";
import { updateAboutContentAction } from "@/lib/actions/aboutContent";
import type { AboutContent } from "@/generated/prisma/client";

function ParagraphList({
  label,
  values,
  onChange,
}: {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs uppercase tracking-wide text-charcoal/60">{label}</span>
      {values.map((paragraph, index) => (
        <div key={index} className="flex flex-col gap-2 sm:flex-row sm:items-start">
          <textarea
            className={`${textareaClass} flex-1`}
            style={{ minHeight: 90 }}
            value={paragraph}
            onChange={(e) => {
              const next = [...values];
              next[index] = e.target.value;
              onChange(next);
            }}
          />
          <button
            type="button"
            onClick={() => onChange(values.filter((_, i) => i !== index))}
            disabled={values.length <= 1}
            className="min-h-[44px] rounded-sm border border-red-200 px-3 text-xs uppercase tracking-wide text-red-600 disabled:cursor-not-allowed disabled:opacity-40 sm:min-h-0 sm:self-start sm:py-2.5"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...values, ""])}
        className="min-h-[44px] self-start rounded-sm border border-dashed border-charcoal/25 px-4 text-sm text-charcoal/60 transition-colors hover:border-gold hover:text-charcoal"
      >
        Add paragraph
      </button>
    </div>
  );
}

export function AboutContentForm({ content }: { content: AboutContent }) {
  const router = useRouter();
  const [heroEyebrow, setHeroEyebrow] = useState(content.heroEyebrow);
  const [heroTitle, setHeroTitle] = useState(content.heroTitle);
  const [journeyEyebrow, setJourneyEyebrow] = useState(content.journeyEyebrow);
  const [journeyHeading, setJourneyHeading] = useState(content.journeyHeading);
  const [journeyParagraphs, setJourneyParagraphs] = useState(content.journeyParagraphs);
  const [craftsmanshipEyebrow, setCraftsmanshipEyebrow] = useState(content.craftsmanshipEyebrow);
  const [craftsmanshipTitle, setCraftsmanshipTitle] = useState(content.craftsmanshipTitle);
  const [craftsmanshipDescription, setCraftsmanshipDescription] = useState(
    content.craftsmanshipDescription
  );
  const [craftsmanshipParagraphs, setCraftsmanshipParagraphs] = useState(
    content.craftsmanshipParagraphs
  );

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const result = await updateAboutContentAction({
      heroEyebrow,
      heroTitle,
      journeyEyebrow,
      journeyHeading,
      journeyParagraphs: journeyParagraphs.filter((p) => p.trim().length > 0),
      craftsmanshipEyebrow,
      craftsmanshipTitle,
      craftsmanshipDescription,
      craftsmanshipParagraphs: craftsmanshipParagraphs.filter((p) => p.trim().length > 0),
    });

    setSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      toast.error(result.error);
      return;
    }

    toast.success("About page updated.");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
      <fieldset className="flex flex-col gap-4">
        <legend className="font-display text-lg text-charcoal">Hero</legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Eyebrow">
            <input className={inputClass} value={heroEyebrow} onChange={(e) => setHeroEyebrow(e.target.value)} />
          </Field>
          <Field label="Title">
            <input className={inputClass} value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} />
          </Field>
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-4 border-t border-charcoal/10 pt-8">
        <legend className="font-display text-lg text-charcoal">Artisan Story</legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Eyebrow">
            <input
              className={inputClass}
              value={journeyEyebrow}
              onChange={(e) => setJourneyEyebrow(e.target.value)}
            />
          </Field>
          <Field label="Heading">
            <input
              className={inputClass}
              value={journeyHeading}
              onChange={(e) => setJourneyHeading(e.target.value)}
            />
          </Field>
        </div>
        <ParagraphList label="Story Paragraphs" values={journeyParagraphs} onChange={setJourneyParagraphs} />
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
        <Field label="Description">
          <textarea
            className={textareaClass}
            style={{ minHeight: 70 }}
            value={craftsmanshipDescription}
            onChange={(e) => setCraftsmanshipDescription(e.target.value)}
          />
        </Field>
        <ParagraphList
          label="Craftsmanship Paragraphs"
          values={craftsmanshipParagraphs}
          onChange={setCraftsmanshipParagraphs}
        />
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
