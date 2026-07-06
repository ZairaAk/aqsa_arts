import { getAllProducts } from "@/lib/repositories/products";
import { getCategories } from "@/lib/repositories/categories";
import { ProductsTable } from "@/components/admin/products/ProductsTable";

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([getAllProducts(), getCategories()]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl text-charcoal">Products</h1>
        <p className="mt-1 text-sm text-charcoal/60">
          Manage the products shown in your collection.
        </p>
      </div>
      <ProductsTable products={products} categories={categories} />
    </div>
  );
}
