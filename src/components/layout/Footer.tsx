import Link from "next/link";
import { buildWhatsAppLink } from "@/lib/utils/whatsapp";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { NAV_ITEMS } from "@/lib/constants/nav";
import type { SiteConfig } from "@/generated/prisma/client";

export function Footer({ siteConfig }: { siteConfig: SiteConfig }) {
  const year = new Date().getFullYear();
  const whatsappHref = buildWhatsAppLink(
    siteConfig.whatsappNumber,
    "Hello, I would like to know more about your handcrafted collection."
  );

  return (
    <footer className="bg-charcoal text-ivory/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:grid-cols-2 md:grid-cols-4 md:px-10">
        <div className="sm:col-span-2 md:col-span-2">
          <p className="font-display text-2xl text-ivory">{siteConfig.name}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-ivory/60">
            {siteConfig.footerDescription}
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm text-gold-light transition-colors hover:text-gold"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Chat on WhatsApp
          </a>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-ivory/40">Navigate</p>
          <ul className="mt-4 flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-ivory/70 transition-colors hover:text-ivory"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-ivory/40">Contact</p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-ivory/70">
            <a href={`tel:+91${siteConfig.phone}`} className="hover:text-ivory">
              {siteConfig.phoneDisplay}
            </a>
            <address className="not-italic leading-relaxed">
              {siteConfig.addressLine1}
              <br />
              {siteConfig.addressLine2}
              <br />
              {siteConfig.addressLine3}
            </address>
          </div>
        </div>
      </div>

      <div className="border-t border-ivory/10 px-6 py-6 text-center text-xs text-ivory/40 md:px-10">
        &copy; {year} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
