"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Modal } from "@/components/admin/shared/Modal";
import { ConfirmDialog } from "@/components/admin/shared/ConfirmDialog";
import { ProductForm } from "@/components/admin/products/ProductForm";
import { deleteProductAction, setProductFeaturedAction } from "@/lib/actions/products";
import type { ProductWithCategory } from "@/lib/repositories/products";

type Category = { slug: string; name: string };

const PAGE_SIZE = 20;

export function ProductsTable({
  products,
  categories,
}: {
  products: ProductWithCategory[];
  categories: Category[];
}) {
  const router = useRouter();
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductWithCategory | undefined>();
  const [deleteTarget, setDeleteTarget] = useState<ProductWithCategory | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesQuery = !q || product.name.toLowerCase().includes(q);
      const matchesCategory = categoryFilter === "all" || product.categorySlug === categoryFilter;
      return matchesQuery && matchesCategory;
    });
  }, [products, query, categoryFilter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function updateQuery(value: string) {
    setQuery(value);
    setPage(1);
  }

  function updateCategoryFilter(value: string) {
    setCategoryFilter(value);
    setPage(1);
  }

  function openCreate() {
    setEditingProduct(undefined);
    setFormOpen(true);
  }

  function openEdit(product: ProductWithCategory) {
    setEditingProduct(product);
    setFormOpen(true);
  }

  function handleSaved() {
    setFormOpen(false);
    router.refresh();
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    const result = await deleteProductAction(deleteTarget.id);
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    toast.success("Product deleted.");
    setDeleteTarget(null);
    router.refresh();
  }

  async function toggleFeatured(product: ProductWithCategory) {
    setTogglingId(product.id);
    const result = await setProductFeaturedAction(product.id, !product.featured);
    setTogglingId(null);
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-charcoal/60">
          {filtered.length} of {products.length} product{products.length === 1 ? "" : "s"}
        </p>
        <button
          type="button"
          onClick={openCreate}
          className="min-h-[44px] rounded-sm bg-charcoal px-4 py-2.5 text-sm uppercase tracking-wide text-ivory transition-colors hover:bg-gold sm:w-auto"
        >
          Add Product
        </button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="search"
          value={query}
          onChange={(e) => updateQuery(e.target.value)}
          placeholder="Search products by name..."
          className="min-h-[44px] w-full rounded-sm border border-charcoal/20 bg-white px-3 py-2.5 text-sm text-charcoal outline-none transition-colors focus:border-gold sm:max-w-xs"
        />
        <select
          value={categoryFilter}
          onChange={(e) => updateCategoryFilter(e.target.value)}
          className="min-h-[44px] w-full rounded-sm border border-charcoal/20 bg-white px-3 py-2.5 text-sm text-charcoal outline-none transition-colors focus:border-gold sm:w-56"
        >
          <option value="all">All categories</option>
          {categories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-3 sm:hidden">
        {paginated.map((product) => (
          <div key={product.id} className="rounded-sm border border-charcoal/10 bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-display text-base text-charcoal">{product.name}</p>
                <p className="text-xs text-charcoal/50">{product.category.name}</p>
              </div>
              {product.featured && (
                <span className="rounded-sm bg-gold/15 px-2 py-1 text-[10px] uppercase tracking-wide text-gold">
                  Featured
                </span>
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => toggleFeatured(product)}
                disabled={togglingId === product.id}
                className="min-h-[40px] flex-1 rounded-sm border border-charcoal/20 px-3 text-xs uppercase tracking-wide text-charcoal/70 disabled:opacity-60"
              >
                {product.featured ? "Unfeature" : "Feature"}
              </button>
              <button
                type="button"
                onClick={() => openEdit(product)}
                className="min-h-[40px] flex-1 rounded-sm border border-charcoal/20 px-3 text-xs uppercase tracking-wide text-charcoal/70"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => setDeleteTarget(product)}
                className="min-h-[40px] flex-1 rounded-sm border border-red-200 px-3 text-xs uppercase tracking-wide text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="rounded-sm border border-dashed border-charcoal/20 p-6 text-center text-sm text-charcoal/50">
            {products.length === 0 ? "No products yet." : "No products match your search."}
          </p>
        )}
      </div>

      <div className="hidden overflow-x-auto rounded-sm border border-charcoal/10 bg-white sm:block">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-charcoal/10 text-xs uppercase tracking-wide text-charcoal/50">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Featured</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((product) => (
              <tr key={product.id} className="border-b border-charcoal/5 last:border-0">
                <td className="px-4 py-3 text-charcoal">{product.name}</td>
                <td className="px-4 py-3 text-charcoal/70">{product.category.name}</td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => toggleFeatured(product)}
                    disabled={togglingId === product.id}
                    className={`rounded-sm px-2.5 py-1 text-xs uppercase tracking-wide transition-colors disabled:opacity-60 ${
                      product.featured
                        ? "bg-gold/15 text-gold hover:bg-gold/25"
                        : "bg-charcoal/5 text-charcoal/50 hover:bg-charcoal/10"
                    }`}
                  >
                    {product.featured ? "Yes" : "No"}
                  </button>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => openEdit(product)}
                      className="rounded-sm border border-charcoal/20 px-3 py-1.5 text-xs uppercase tracking-wide text-charcoal/70 hover:bg-charcoal/5"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(product)}
                      className="rounded-sm border border-red-200 px-3 py-1.5 text-xs uppercase tracking-wide text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-sm text-charcoal/50">
                  {products.length === 0 ? "No products yet." : "No products match your search."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pageCount > 1 && (
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="min-h-[40px] rounded-sm border border-charcoal/20 px-4 text-xs uppercase tracking-wide text-charcoal/70 disabled:opacity-40"
          >
            Previous
          </button>
          <p className="text-xs uppercase tracking-wide text-charcoal/50">
            Page {currentPage} of {pageCount}
          </p>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            disabled={currentPage === pageCount}
            className="min-h-[40px] rounded-sm border border-charcoal/20 px-4 text-xs uppercase tracking-wide text-charcoal/70 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}

      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editingProduct ? "Edit Product" : "Add Product"}
        size="lg"
      >
        <ProductForm
          key={editingProduct?.id ?? "new"}
          product={editingProduct}
          categories={categories}
          onClose={() => setFormOpen(false)}
          onSaved={handleSaved}
        />
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Product"
        description={`Are you sure you want to delete "${deleteTarget?.name}"? This cannot be undone and will remove its images.`}
      />
    </div>
  );
}
