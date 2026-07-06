export type Product = {
  id: string;
  slug: string;
  name: string;
  categorySlug: string;
  shortDescription: string;
  description: string;
  material?: string;
  dimensions?: string;
  images: string[];
  featured?: boolean;
};

const products: Product[] = [
  {
    id: "prod-1",
    slug: "aari-embroidered-pashmina-shawl",
    name: "Aari Embroidered Pashmina Shawl",
    categorySlug: "aari-shawls",
    shortDescription:
      "Hand-embroidered pashmina shawl featuring intricate Aari needlework in floral motifs.",
    description:
      "A masterwork of patience and precision, this pashmina shawl carries hours of hand-guided Aari embroidery. Each stitch is drawn with a hooked needle to trace floral vines and paisley motifs passed down through generations of Kashmiri artisans. Wrapped around the shoulders, it feels less like an accessory and more like a piece of living heritage.",
    material: "Pure Pashmina wool, silk thread embroidery",
    dimensions: "Approx. 200cm x 100cm",
    images: [],
    featured: true,
  },
  {
    id: "prod-2",
    slug: "kani-jamawar-shawl",
    name: "Kani Jamawar Shawl",
    categorySlug: "kani-shawls",
    shortDescription:
      "Woven Kani shawl with traditional Jamawar patterning in warm earth tones.",
    description:
      "The Kani weave is one of the most labour-intensive techniques in Kashmiri textile art, worked entirely on small wooden spools rather than a shuttle. This Jamawar piece brings together warm walnut and gold tones in a pattern that can take months to complete on the loom.",
    material: "Fine wool blend, natural dyes",
    dimensions: "Approx. 210cm x 105cm",
    images: [],
    featured: true,
  },
  {
    id: "prod-3",
    slug: "aari-work-silk-suit",
    name: "Aari Work Silk Suit",
    categorySlug: "suits-kurtis",
    shortDescription:
      "Elegant silk suit adorned with fine Aari embroidery along the neckline and hem.",
    description:
      "Designed for occasions that call for quiet elegance, this silk suit is finished with hand-worked Aari embroidery along the neckline, cuffs, and hem. The embroidery pattern draws from traditional Kashmiri chinar leaf and floral motifs.",
    material: "Pure silk, cotton lining, silk thread",
    dimensions: "Made to size, available in S, M, L, XL",
    images: [],
    featured: true,
  },
  {
    id: "prod-4",
    slug: "hand-embroidered-cushion-covers",
    name: "Hand-Embroidered Cushion Covers",
    categorySlug: "home-decor",
    shortDescription:
      "A set of cushion covers bringing Aari embroidery artistry into the home.",
    description:
      "Bring the warmth of Kashmiri craftsmanship into your living space. Each cushion cover is individually embroidered by hand, featuring traditional motifs rendered in rich, muted colour palettes that complement any interior.",
    material: "Cotton base, silk and wool thread embroidery",
    dimensions: "40cm x 40cm (set of 2)",
    images: [],
    featured: true,
  },
  {
    id: "prod-5",
    slug: "aari-embroidered-stole",
    name: "Aari Embroidered Stole",
    categorySlug: "aari-shawls",
    shortDescription:
      "Lightweight wool stole with delicate Aari embroidery, perfect for everyday elegance.",
    description:
      "A lighter companion to the traditional shawl, this stole is ideal for everyday wear while still carrying the same dedication to hand embroidery. The subtle border work makes it a versatile addition to any wardrobe.",
    material: "Wool blend, silk thread",
    dimensions: "Approx. 180cm x 70cm",
    images: [],
  },
  {
    id: "prod-6",
    slug: "namda-hand-embroidered-rug",
    name: "Namda Hand-Embroidered Rug",
    categorySlug: "home-decor",
    shortDescription:
      "Traditional felted wool rug with hand chain-stitch embroidery.",
    description:
      "Namda rugs are made by felting wool rather than weaving it, then embellished with chain-stitch embroidery in bold traditional patterns. This piece adds warmth and character to any room, indoors and out of the ordinary.",
    material: "Felted wool, chain-stitch embroidery",
    dimensions: "Approx. 90cm x 150cm",
    images: [],
  },
  {
    id: "prod-7",
    slug: "aari-embroidered-kurti",
    name: "Aari Embroidered Kurti",
    categorySlug: "suits-kurtis",
    shortDescription:
      "Comfortable everyday kurti with delicate Aari embroidery detailing.",
    description:
      "Blending comfort with craftsmanship, this kurti features restrained Aari embroidery along the yoke, making it suitable for both daily wear and gatherings that call for understated grace.",
    material: "Cotton, silk thread embroidery",
    dimensions: "Made to size, available in S, M, L, XL",
    images: [],
  },
  {
    id: "prod-8",
    slug: "kani-stole",
    name: "Kani Woven Stole",
    categorySlug: "kani-shawls",
    shortDescription:
      "Finely woven Kani stole showcasing the discipline of traditional loom work.",
    description:
      "A smaller expression of the Kani weaving tradition, this stole demonstrates the same intricate patterning found in larger shawls, made accessible for daily use without compromising on craft.",
    material: "Wool blend",
    dimensions: "Approx. 180cm x 70cm",
    images: [],
  },
];

export function getAllProducts() {
  return products;
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}

export function getProductsByCategory(categorySlug: string) {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string) {
  return products.find((p) => p.id === id);
}

export function getAllSlugs() {
  return products.map((p) => p.slug);
}

export function getRelatedProducts(product: Product, limit = 3) {
  return products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, limit);
}
