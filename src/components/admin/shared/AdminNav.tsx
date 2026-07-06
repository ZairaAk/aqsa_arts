"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Overview", href: "/admin" },
  { label: "Products", href: "/admin/products" },
  { label: "Homepage", href: "/admin/homepage" },
  { label: "About Page", href: "/admin/about" },
  { label: "Settings", href: "/admin/settings" },
];

function isActive(pathname: string, href: string) {
  return href === "/admin" ? pathname === href : pathname.startsWith(href);
}

export function AdminNav() {
  const pathname = usePathname();

  return (
    <>
      <nav className="flex gap-1 overflow-x-auto border-b border-charcoal/10 bg-ivory px-4 py-2 md:hidden">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`shrink-0 rounded-sm px-3 py-2 text-xs uppercase tracking-wide transition-colors ${
              isActive(pathname, item.href)
                ? "bg-charcoal text-ivory"
                : "text-charcoal/60 hover:bg-charcoal/5"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <nav className="hidden w-56 shrink-0 flex-col gap-1 border-r border-charcoal/10 bg-ivory p-4 md:flex">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-sm px-3 py-2.5 text-sm transition-colors ${
              isActive(pathname, item.href)
                ? "bg-charcoal text-ivory"
                : "text-charcoal/70 hover:bg-charcoal/5"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
