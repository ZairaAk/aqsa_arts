import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";
import type { HomeContent } from "@/generated/prisma/client";
import type { CraftsmanshipValueInput } from "@/lib/validation/homeContent";

export function CraftsmanshipSection({ content }: { content: HomeContent }) {
  const values = content.craftsmanshipValues as CraftsmanshipValueInput[];

  return (
    <section className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow={content.craftsmanshipEyebrow} title={content.craftsmanshipTitle} />

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, i) => (
            <FadeIn key={value.title} delay={i * 0.1}>
              <div className="flex flex-col items-center gap-4 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 text-walnut">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-7 w-7"
                  >
                    <path d={value.icon} />
                  </svg>
                </span>
                <h3 className="font-display text-xl text-charcoal">{value.title}</h3>
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
