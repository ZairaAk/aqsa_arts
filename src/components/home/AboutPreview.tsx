import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import type { HomeContent } from "@/generated/prisma/client";

export function AboutPreview({ content }: { content: HomeContent }) {
  const aboutPreview = {
    eyebrow: content.aboutPreviewEyebrow,
    heading: content.aboutPreviewHeading,
    body: content.aboutPreviewBody,
    ctaLabel: content.aboutPreviewCtaLabel,
    ctaHref: content.aboutPreviewCtaHref,
  };

  return (
    <section className="mx-auto max-w-4xl px-6 py-16 text-center sm:py-24 md:px-10 md:py-32">
      <FadeIn>
        <span className="text-xs uppercase tracking-[0.3em] text-gold sm:tracking-[0.35em]">
          {aboutPreview.eyebrow}
        </span>
        <h2 className="mt-3 font-display text-balance text-2xl leading-snug text-charcoal sm:mt-4 sm:text-4xl md:text-5xl">
          {aboutPreview.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-balance text-base leading-relaxed text-charcoal/70 sm:mt-6 sm:text-lg">
          {aboutPreview.body}
        </p>
        <Link
          href={aboutPreview.ctaHref}
          className="mt-6 inline-flex min-h-[44px] items-center gap-2 border-b border-walnut pb-1 text-sm uppercase tracking-[0.2em] text-walnut transition-colors hover:text-gold hover:border-gold sm:mt-8"
        >
          {aboutPreview.ctaLabel} &rarr;
        </Link>
      </FadeIn>
    </section>
  );
}
