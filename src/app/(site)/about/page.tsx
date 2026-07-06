import type { Metadata } from "next";
import { AwardsTimeline } from "@/components/about/AwardsTimeline";
import { MediaSection } from "@/components/about/MediaSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";
import { aboutContent } from "@/data/content/about";

export const metadata: Metadata = {
  title: "About | Mir Abdul Majeed",
  description:
    "The story of Mir Abdul Majeed, a Kashmiri artisan preserving the tradition of Aari embroidery through decades of dedicated craftsmanship.",
};

export default function AboutPage() {
  const { hero, journey, craftsmanship } = aboutContent;

  return (
    <>
      <section className="border-b border-charcoal/10 bg-charcoal px-6 py-24 text-center text-ivory md:px-10 md:py-32">
        <FadeIn>
          <span className="text-xs uppercase tracking-[0.35em] text-gold-light">
            {hero.eyebrow}
          </span>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-balance text-4xl leading-snug sm:text-5xl md:text-6xl">
            {hero.title}
          </h1>
        </FadeIn>
      </section>

      <section className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <div className="aspect-[4/5] w-full rounded-sm bg-gradient-to-br from-cream via-ivory to-cream" />
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="flex h-full flex-col justify-center gap-5">
              <span className="text-xs uppercase tracking-[0.3em] text-gold">
                {journey.eyebrow}
              </span>
              <h2 className="font-display text-3xl text-charcoal sm:text-4xl">
                {journey.heading}
              </h2>
              {journey.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-base leading-relaxed text-charcoal/70">
                  {paragraph}
                </p>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-cream/50 px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            eyebrow={craftsmanship.eyebrow}
            title={craftsmanship.title}
            description={craftsmanship.description}
          />
          <FadeIn delay={0.15}>
            <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-5 text-base leading-relaxed text-charcoal/70">
              {craftsmanship.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <AwardsTimeline />
      <MediaSection />
    </>
  );
}
