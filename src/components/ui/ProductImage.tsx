import Image from "next/image";

type ProductImageProps = {
  src?: string;
  alt: string;
  className?: string;
};

function EmbroideryMark() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className="h-12 w-12 text-walnut/30"
    >
      <circle cx="32" cy="32" r="22" strokeDasharray="2 4" />
      <path d="M20 32c4-10 8-14 12-14s8 4 12 14c-4 10-8 14-12 14s-8-4-12-14Z" />
      <circle cx="32" cy="32" r="3" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ProductImage({ src, alt, className = "" }: ProductImageProps) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-cream via-ivory to-cream ${className}`}
    >
      <div className="absolute inset-3 border border-gold/25" />
      <EmbroideryMark />
      <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-walnut/40">
        Image coming soon
      </span>
    </div>
  );
}
