"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { HomeContent } from "@/generated/prisma/client";

export function Hero({ content }: { content: HomeContent }) {
  return (
    <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden bg-charcoal text-ivory">
      <div className="pointer-events-none absolute inset-0">
        {content.heroImage && (
          <Image
            src={content.heroImage}
            alt=""
            fill
            priority
            className="object-cover opacity-50"
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(176,141,79,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-charcoal/40" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <div className="absolute inset-6 border border-ivory/10 sm:inset-10" />
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-ivory/40"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-10 w-px bg-gradient-to-b from-ivory/50 to-transparent" />
      </motion.div>
    </section>
  );
}
