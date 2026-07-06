export type Category = {
  slug: string;
  name: string;
};

export const categories: Category[] = [
  { slug: "aari-shawls", name: "Aari Shawls" },
  { slug: "kani-shawls", name: "Kani Shawls" },
  { slug: "suits-kurtis", name: "Suits & Kurtis" },
  { slug: "home-decor", name: "Home Décor" },
];

export function getCategories() {
  return categories;
}

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getCategoryName(slug: string) {
  return getCategoryBySlug(slug)?.name ?? slug;
}
