import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";
import type { HomeContent } from "@/generated/prisma/client";
import type { CraftsmanshipValueInput } from "@/lib/validation/homeContent";

export function CraftsmanshipSection({ content }: { content: HomeContent }) {
  const values = content.craftsmanshipValues as CraftsmanshipValueInput[];

  return (
    <section className="px-6 py-16 sm:py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow={content.craftsmanshipEyebrow} title={content.craftsmanshipTitle} />

        <div className="mt-10 grid grid-cols-1 gap-8 sm:mt-16 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4">
          {values.map((value, i) => (
            <FadeIn key={value.title} delay={i * 0.1}>
              <div className="flex flex-col items-center gap-3 text-center sm:gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 text-walnut sm:h-16 sm:w-16">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 sm:h-7 sm:w-7"
                  >
                    <path d={value.icon} />
                  </svg>
                </span>
                <h3 className="font-display text-lg text-charcoal sm:text-xl">{value.title}</h3>
                <p className="text-sm leading-relaxed text-charcoal/65">
                  {value.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
