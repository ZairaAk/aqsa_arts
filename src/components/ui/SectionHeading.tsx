type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex flex-col gap-3 sm:gap-4 ${alignment}`}>
      {eyebrow && (
        <span
          className={`text-xs uppercase tracking-[0.35em] ${
            light ? "text-gold-light" : "text-gold"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-display text-3xl sm:text-4xl md:text-5xl text-balance ${
          light ? "text-ivory" : "text-charcoal"
        }`}
      >
        {title}
      </h2>
      <div className="divider-gold h-px w-20" />
      {description && (
        <p
          className={`max-w-2xl text-base sm:text-lg leading-relaxed ${
            light ? "text-ivory/80" : "text-charcoal/70"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
