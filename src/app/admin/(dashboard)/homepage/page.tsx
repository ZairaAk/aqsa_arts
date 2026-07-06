import { getHomeContent } from "@/lib/repositories/homeContent";
import { getAllProducts } from "@/lib/repositories/products";
import { HomeContentForm } from "@/components/admin/homepage/HomeContentForm";
import { FeaturedProductsPanel } from "@/components/admin/homepage/FeaturedProductsPanel";

export default async function AdminHomepagePage() {
  const [content, products] = await Promise.all([getHomeContent(), getAllProducts()]);

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="font-display text-2xl text-charcoal">Homepage</h1>
        <p className="mt-1 text-sm text-charcoal/60">
          Edit the hero, about preview, featured collection and craftsmanship sections.
        </p>
      </div>

      <FeaturedProductsPanel products={products} />

      <div className="border-t border-charcoal/10 pt-8">
        <HomeContentForm content={content} />
      </div>
    </div>
  );
}
