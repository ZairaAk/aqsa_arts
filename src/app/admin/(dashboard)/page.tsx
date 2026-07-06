import { getAllProducts } from "@/data/products";
import { getCategories, getCategoryName } from "@/data/categories";
import { siteConfig } from "@/data/site";

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-sm border border-charcoal/10 bg-white px-5 py-4">
      <p className="text-xs uppercase tracking-wide text-charcoal/50">{label}</p>
      <p className="mt-1 font-display text-3xl text-charcoal">{value}</p>
    </div>
  );
}

export default function AdminDashboardPage() {
  const products = getAllProducts();
  const categories = getCategories();
  const featuredCount = products.filter((p) => p.featured).length;

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10">
      <section>
        <h2 className="font-display text-xl text-charcoal">Overview</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard label="Products" value={products.length} />
          <StatCard label="Categories" value={categories.length} />
          <StatCard label="Featured" value={featuredCount} />
          <StatCard label="WhatsApp" value={siteConfig.phoneDisplay} />
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl text-charcoal">Site Info</h2>
        <div className="mt-4 rounded-sm border border-charcoal/10 bg-white p-5 text-sm text-charcoal/70">
          <p>
            <span className="text-charcoal/50">Name:</span> {siteConfig.name}
          </p>
          <p className="mt-1">
            <span className="text-charcoal/50">Tagline:</span>{" "}
            {siteConfig.tagline}
          </p>
          <p className="mt-1">
            <span className="text-charcoal/50">Phone:</span>{" "}
            {siteConfig.phoneDisplay}
          </p>
          <p className="mt-1">
            <span className="text-charcoal/50">Address:</span>{" "}
            {siteConfig.address.line1}, {siteConfig.address.line2},{" "}
            {siteConfig.address.line3}
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl text-charcoal">Products</h2>
        <div className="mt-4 overflow-x-auto rounded-sm border border-charcoal/10 bg-white">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead>
              <tr className="border-b border-charcoal/10 text-xs uppercase tracking-wide text-charcoal/50">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Featured</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-charcoal/5 last:border-0">
                  <td className="px-4 py-3 text-charcoal">{product.name}</td>
                  <td className="px-4 py-3 text-charcoal/70">
                    {getCategoryName(product.categorySlug)}
                  </td>
                  <td className="px-4 py-3 text-charcoal/70">
                    {product.featured ? "Yes" : "No"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-charcoal/50">
          Products and page content are stored in src/data/ and are edited in
          code for now. This dashboard is read-only.
        </p>
      </section>
    </div>
  );
}
