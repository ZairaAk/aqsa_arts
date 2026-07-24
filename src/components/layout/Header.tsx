"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_ITEMS } from "@/lib/constants/nav";

export function Header({ siteName }: { siteName: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-ivory/90 backdrop-blur-sm shadow-sm shadow-charcoal/5" : "bg-transparent"
      }`}
    >
      <div className="relative z-10 mx-auto flex max-w-6xl items-center justify-between bg-inherit px-6 py-5 md:px-10">
        <Link href="/" className="font-display text-xl tracking-wide text-charcoal">
          {siteName}
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm uppercase tracking-[0.2em] transition-colors ${
                  active ? "text-gold" : "text-charcoal/70 hover:text-charcoal"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-px w-6 bg-charcoal transition-transform duration-300 ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-charcoal transition-transform duration-300 ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-0 bg-charcoal/40 backdrop-blur-[2px] transition-opacity duration-300 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
      />

      <div
        className={`relative z-10 overflow-hidden border-t border-charcoal/10 bg-ivory shadow-lg shadow-charcoal/5 transition-[grid-template-rows] duration-300 ease-in-out md:hidden ${
          open ? "grid grid-rows-[1fr]" : "grid grid-rows-[0fr] border-t-0"
        }`}
      >
        <nav className="flex min-h-0 flex-col gap-1 px-6 py-3">
          {NAV_ITEMS.map((item, index) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                style={{
                  transitionDelay: open ? `${index * 40}ms` : "0ms",
                }}
                className={`flex min-h-[52px] items-center border-b border-charcoal/5 text-sm uppercase tracking-[0.2em] transition-all duration-300 last:border-0 ${
                  open ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
                } ${active ? "text-gold" : "text-charcoal/70"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
