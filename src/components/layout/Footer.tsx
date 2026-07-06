import Link from "next/link";
import { siteConfig, buildWhatsAppLink } from "@/data/site";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export function Footer() {
  const year = new Date().getFullYear();
  const whatsappHref = buildWhatsAppLink(
    "Hello, I would like to know more about your handcrafted collection."
  );

  return (
    <footer className="bg-charcoal text-ivory/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:grid-cols-2 md:grid-cols-4 md:px-10">
        <div className="sm:col-span-2 md:col-span-2">
          <p className="font-display text-2xl text-ivory">Mir Abdul Majeed</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-ivory/60">
            Preserving the art of Kashmiri Aari embroidery through handcrafted
            pieces made with patience, tradition, and devotion.
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
            {siteConfig.nav.map((item) => (
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
              {siteConfig.address.line1}
              <br />
              {siteConfig.address.line2}
              <br />
              {siteConfig.address.line3}
            </address>
          </div>
        </div>
      </div>

      <div className="border-t border-ivory/10 px-6 py-6 text-center text-xs text-ivory/40 md:px-10">
        &copy; {year} Mir Abdul Majeed. All rights reserved.
      </div>
    </footer>
  );
}
