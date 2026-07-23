import type { Metadata } from "next";
import Image from "next/image";
import { AwardsTimeline } from "@/components/about/AwardsTimeline";
import { MediaSection } from "@/components/about/MediaSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";
import { getAboutContent } from "@/lib/repositories/aboutContent";
import { getSiteConfig } from "@/lib/repositories/siteConfig";

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig();
  return {
    title: `About | ${siteConfig.name}`,
    description: `${siteConfig.name} is a Kashmiri master artisan whose six-decade practice of Aari embroidery pioneered staple-yarn work and helped bring Geographical Indication recognition to Kashmiri craft.`,
  };
}

export default async function AboutPage() {
  const content = await getAboutContent();

  return (
    <>
      <section className="px-6 pt-24 pb-24 md:px-10 md:pt-32 md:pb-32">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-gradient-to-br from-cream via-ivory to-cream">
              {content.artisanImage ? (
                <Image
                  src={content.artisanImage}
                  alt="Portrait of the artisan"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 40vw, 90vw"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-charcoal/30">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="h-16 w-16"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="1" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m3 16 5-5 4 4 5-6 4 5" />
                  </svg>
                  <span className="text-xs uppercase tracking-[0.3em]">Artisan Portrait</span>
                </div>
              )}
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="flex h-full flex-col justify-center gap-5">
              <span className="text-xs uppercase tracking-[0.3em] text-gold">
                {content.journeyEyebrow}
              </span>
              <h2 className="font-display text-3xl text-charcoal sm:text-4xl">
                {content.journeyHeading}
              </h2>
              {content.journeyParagraphs.map((paragraph) => (
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
            eyebrow={content.craftsmanshipEyebrow}
            title={content.craftsmanshipTitle}
            description={content.craftsmanshipDescription}
          />
          <FadeIn delay={0.15}>
            <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-5 text-base leading-relaxed text-charcoal/70">
              {content.craftsmanshipParagraphs.map((paragraph) => (
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
