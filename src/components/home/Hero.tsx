"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { HomeContent } from "@/generated/prisma/client";

export function Hero({ content }: { content: HomeContent }) {
  return (
    <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden bg-charcoal text-ivory">
      <div className="pointer-events-none absolute inset-0">
        {content.heroImage ? (
          <Image
            src={content.heroImage}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-charcoal via-charcoal to-[#241b12] text-ivory/25">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="h-20 w-20"
            >
              <rect x="3" y="3" width="18" height="18" rx="1" />
              <circle cx="9" cy="9" r="2" />
              <path d="m3 16 5-5 4 4 5-6 4 5" />
            </svg>
            <span className="text-xs uppercase tracking-[0.3em]">Hero Image</span>
          </div>
        )}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(176,141,79,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-charcoal/50" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-xs uppercase tracking-[0.4em] text-gold-light"
        >
          {content.heroEyebrow}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-balance text-5xl leading-tight sm:text-6xl md:text-7xl"
        >
          {content.heroName}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl text-balance text-base leading-relaxed text-ivory/70 sm:text-lg"
        >
          {content.heroSubtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4"
        >
          <Link
            href={content.heroCtaHref}
            className="inline-flex items-center gap-3 rounded-full border border-gold/60 px-8 py-4 text-sm uppercase tracking-[0.25em] text-ivory transition-colors duration-300 hover:bg-gold hover:text-charcoal"
          >
            {content.heroCtaLabel}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
