import Link from "next/link";
import { getAllProducts } from "@/lib/repositories/products";
import { getCategories } from "@/lib/repositories/categories";
import { getAwards } from "@/lib/repositories/awards";
import { getMediaFeatures } from "@/lib/repositories/media";
import { getSiteConfig } from "@/lib/repositories/siteConfig";

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-sm border border-charcoal/10 bg-white px-4 py-4 sm:px-5">
      <p className="text-xs uppercase tracking-wide text-charcoal/50">{label}</p>
      <p className="mt-1 truncate font-display text-2xl text-charcoal sm:text-3xl">{value}</p>
    </div>
  );
}

function QuickLink({ href, label, description }: { href: string; label: string; description: string }) {
  return (
    <Link
      href={href}
      className="flex min-h-[76px] flex-col justify-center gap-1 rounded-sm border border-charcoal/10 bg-white p-4 transition-colors hover:border-gold"
    >
      <span className="font-display text-base text-charcoal">{label}</span>
      <span className="text-xs text-charcoal/50">{description}</span>
    </Link>
  );
}

export default async function AdminDashboardPage() {
  const [products, categories, awards, mediaFeatures, siteConfig] = await Promise.all([
    getAllProducts(),
    getCategories(),
    getAwards(),
    getMediaFeatures(),
    getSiteConfig(),
  ]);

  const featuredCount = products.filter((p) => p.featured).length;

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 sm:gap-10">
      <section>
        <h2 className="font-display text-xl text-charcoal">Overview</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <StatCard label="Products" value={products.length} />
          <StatCard label="Categories" value={categories.length} />
          <StatCard label="Featured" value={featuredCount} />
          <StatCard label="WhatsApp" value={siteConfig.phoneDisplay} />
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl text-charcoal">Manage</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <QuickLink href="/admin/products" label="Products" description={`${products.length} products`} />
          <QuickLink href="/admin/homepage" label="Homepage" description="Hero, featured collection, craftsmanship" />
          <QuickLink
            href="/admin/about"
            label="About Page"
            description={`Artisan story, ${awards.length} awards, ${mediaFeatures.length} media features`}
          />
          <QuickLink href="/admin/settings" label="General Settings" description="Contact, address, footer" />
        </div>
      </section>
    </div>
  );
}
