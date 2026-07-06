import { getAwards } from "@/lib/repositories/awards";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";

export async function AwardsTimeline() {
  const awards = await getAwards();

  return (
    <section className="bg-cream/50 px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="Recognition" title="Awards & Recognition" />

        <div className="relative mt-16 flex flex-col gap-12">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gold/30 sm:left-1/2 sm:-translate-x-1/2" />

          {awards.map((award, i) => (
            <FadeIn key={award.id} delay={i * 0.1}>
              <div
                className={`relative flex flex-col gap-2 pl-8 sm:w-1/2 sm:pl-0 ${
                  i % 2 === 0
                    ? "sm:pr-12 sm:text-right sm:items-end"
                    : "sm:ml-auto sm:pl-12"
                }`}
              >
                <span
                  className={`absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-gold bg-ivory ${
                    i % 2 === 0 ? "sm:left-auto sm:right-[-1.8rem]" : "sm:left-[-1.8rem]"
                  }`}
                />
                <span className="text-sm uppercase tracking-[0.2em] text-gold">
                  {award.year}
                </span>
                <h3 className="font-display text-xl text-charcoal">{award.title}</h3>
                <p className="text-sm leading-relaxed text-charcoal/65">
                  {award.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
