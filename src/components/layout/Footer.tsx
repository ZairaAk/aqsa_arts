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
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-4 gap-y-8 px-6 py-10 sm:grid-cols-2 sm:gap-10 sm:py-16 md:grid-cols-4 md:px-10">
        <div className="col-span-2 border-b border-ivory/10 pb-6 sm:col-span-2 sm:border-0 sm:pb-0">
          <p className="font-display text-xl text-ivory sm:text-2xl">{siteConfig.name}</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-ivory/60 sm:mt-3">
            {siteConfig.footerDescription}
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-[40px] items-center gap-2 text-sm text-gold-light transition-colors hover:text-gold sm:mt-6"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Chat on WhatsApp
          </a>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-ivory/40">Navigate</p>
          <ul className="mt-3 flex flex-col gap-2.5 sm:mt-4">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-[32px] items-center text-sm text-ivory/70 transition-colors hover:text-ivory"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-ivory/40">Contact</p>
          <div className="mt-3 flex flex-col gap-2.5 text-sm text-ivory/70 sm:mt-4">
            <a
              href={`tel:+91${siteConfig.phone}`}
              className="inline-flex min-h-[32px] items-center hover:text-ivory"
            >
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

      <div className="border-t border-ivory/10 px-6 py-5 text-center text-xs text-ivory/40 sm:py-6 md:px-10">
        &copy; {year} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
