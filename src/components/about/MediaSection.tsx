import { getMediaFeatures } from "@/lib/repositories/media";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";

export async function MediaSection() {
  const mediaFeatures = await getMediaFeatures();

  return (
    <section className="px-6 py-16 sm:py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Media"
          title="Interviews & Features"
          description="Moments where his craft has been recognised and shared beyond the workshop."
        />

        <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {mediaFeatures.map((feature, i) => (
            <FadeIn key={feature.id} delay={i * 0.1}>
              <div className="flex h-full flex-col justify-between gap-4 rounded-sm border border-charcoal/10 p-5 transition-colors hover:border-gold/50 sm:gap-6 sm:rounded-none sm:p-8">
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
