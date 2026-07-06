import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { homeContent } from "@/data/content/home";

export function AboutPreview() {
  const { aboutPreview } = homeContent;

  return (
    <section className="mx-auto max-w-4xl px-6 py-24 text-center md:px-10 md:py-32">
      <FadeIn>
        <span className="text-xs uppercase tracking-[0.35em] text-gold">
          {aboutPreview.eyebrow}
        </span>
        <h2 className="mt-4 font-display text-balance text-3xl leading-snug text-charcoal sm:text-4xl md:text-5xl">
          {aboutPreview.heading}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-balance text-base leading-relaxed text-charcoal/70 sm:text-lg">
          {aboutPreview.body}
        </p>
        <Link
          href={aboutPreview.ctaHref}
          className="mt-8 inline-flex items-center gap-2 border-b border-walnut pb-1 text-sm uppercase tracking-[0.2em] text-walnut transition-colors hover:text-gold hover:border-gold"
        >
          {aboutPreview.ctaLabel} &rarr;
        </Link>
      </FadeIn>
    </section>
  );
}
