import { getMediaFeatures } from "@/data/media";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";

export function MediaSection() {
  const mediaFeatures = getMediaFeatures();

  return (
    <section className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Media"
          title="Interviews & Features"
          description="Moments where his craft has been recognised and shared beyond the workshop."
        />

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {mediaFeatures.map((feature, i) => (
            <FadeIn key={feature.id} delay={i * 0.1}>
              <div className="flex h-full flex-col justify-between gap-6 border border-charcoal/10 p-8 transition-colors hover:border-gold/50">
                <span className="text-xs uppercase tracking-[0.25em] text-gold">
                  {feature.type}
                </span>
                <h3 className="font-display text-xl text-charcoal">
                  {feature.title}
                </h3>
                <div className="flex items-center justify-between text-sm text-charcoal/50">
                  <span>{feature.outlet}</span>
                  <span>{feature.year}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
