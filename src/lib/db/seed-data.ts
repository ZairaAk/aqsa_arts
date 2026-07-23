// Snapshot of the site's original static content (from src/data/*.ts before the
// database migration). Used both by prisma/seed.ts (initial DB population) and
// by the singleton content repositories (get-or-create fallback if a row is
// somehow missing, e.g. before the first seed has run).

export const seedCategories = [
  { slug: "aari-shawl", name: "Aari Shawl" },
  { slug: "sozni-shawl", name: "Sozni Shawl" },
  { slug: "home-decor", name: "Home Decor" },
  { slug: "saaris", name: "Saaris" },
  { slug: "stole", name: "Stole" },
  { slug: "suits", name: "Suits" },
  { slug: "kurtis", name: "Kurtis" },
];

export const seedProducts = [
  {
    slug: "aari-embroidered-pashmina-shawl",
    name: "Aari Embroidered Pashmina Shawl",
    categorySlug: "aari-shawl",
    shortDescription:
      "Hand-embroidered pashmina shawl featuring intricate Aari needlework in floral motifs.",
    description:
      "A masterwork of patience and precision, this pashmina shawl carries hours of hand-guided Aari embroidery. Each stitch is drawn with a hooked needle to trace floral vines and paisley motifs passed down through generations of Kashmiri artisans. Wrapped around the shoulders, it feels less like an accessory and more like a piece of living heritage.",
    material: "Pure Pashmina wool, silk thread embroidery",
    dimensions: "Approx. 200cm x 100cm",
    images: [] as string[],
    featured: true,
  },
  {
    slug: "kani-jamawar-shawl",
    name: "Kani Jamawar Shawl",
    categorySlug: "sozni-shawl",
    shortDescription:
      "Woven Kani shawl with traditional Jamawar patterning in warm earth tones.",
    description:
      "The Kani weave is one of the most labour-intensive techniques in Kashmiri textile art, worked entirely on small wooden spools rather than a shuttle. This Jamawar piece brings together warm walnut and gold tones in a pattern that can take months to complete on the loom.",
    material: "Fine wool blend, natural dyes",
    dimensions: "Approx. 210cm x 105cm",
    images: [] as string[],
    featured: true,
  },
  {
    slug: "aari-work-silk-suit",
    name: "Aari Work Silk Suit",
    categorySlug: "saaris",
    shortDescription:
      "Elegant silk suit adorned with fine Aari embroidery along the neckline and hem.",
    description:
      "Designed for occasions that call for quiet elegance, this silk suit is finished with hand-worked Aari embroidery along the neckline, cuffs, and hem. The embroidery pattern draws from traditional Kashmiri chinar leaf and floral motifs.",
    material: "Pure silk, cotton lining, silk thread",
    dimensions: "Made to size, available in S, M, L, XL",
    images: [] as string[],
    featured: true,
  },
  {
    slug: "hand-embroidered-cushion-covers",
    name: "Hand-Embroidered Cushion Covers",
    categorySlug: "home-decor",
    shortDescription:
      "A set of cushion covers bringing Aari embroidery artistry into the home.",
    description:
      "Bring the warmth of Kashmiri craftsmanship into your living space. Each cushion cover is individually embroidered by hand, featuring traditional motifs rendered in rich, muted colour palettes that complement any interior.",
    material: "Cotton base, silk and wool thread embroidery",
    dimensions: "40cm x 40cm (set of 2)",
    images: [] as string[],
    featured: true,
  },
  {
    slug: "aari-embroidered-stole",
    name: "Aari Embroidered Stole",
    categorySlug: "stole",
    shortDescription:
      "Lightweight wool stole with delicate Aari embroidery, perfect for everyday elegance.",
    description:
      "A lighter companion to the traditional shawl, this stole is ideal for everyday wear while still carrying the same dedication to hand embroidery. The subtle border work makes it a versatile addition to any wardrobe.",
    material: "Wool blend, silk thread",
    dimensions: "Approx. 180cm x 70cm",
    images: [] as string[],
    featured: false,
  },
  {
    slug: "namda-hand-embroidered-rug",
    name: "Namda Hand-Embroidered Rug",
    categorySlug: "home-decor",
    shortDescription: "Traditional felted wool rug with hand chain-stitch embroidery.",
    description:
      "Namda rugs are made by felting wool rather than weaving it, then embellished with chain-stitch embroidery in bold traditional patterns. This piece adds warmth and character to any room, indoors and out of the ordinary.",
    material: "Felted wool, chain-stitch embroidery",
    dimensions: "Approx. 90cm x 150cm",
    images: [] as string[],
    featured: false,
  },
  {
    slug: "aari-embroidered-kurti",
    name: "Aari Embroidered Kurti",
    categorySlug: "saaris",
    shortDescription: "Comfortable everyday kurti with delicate Aari embroidery detailing.",
    description:
      "Blending comfort with craftsmanship, this kurti features restrained Aari embroidery along the yoke, making it suitable for both daily wear and gatherings that call for understated grace.",
    material: "Cotton, silk thread embroidery",
    dimensions: "Made to size, available in S, M, L, XL",
    images: [] as string[],
    featured: false,
  },
  {
    slug: "kani-stole",
    name: "Kani Woven Stole",
    categorySlug: "stole",
    shortDescription:
      "Finely woven Kani stole showcasing the discipline of traditional loom work.",
    description:
      "A smaller expression of the Kani weaving tradition, this stole demonstrates the same intricate patterning found in larger shawls, made accessible for daily use without compromising on craft.",
    material: "Wool blend",
    dimensions: "Approx. 180cm x 70cm",
    images: [] as string[],
    featured: false,
  },
];

export const seedAwards = [
  {
    year: "1998",
    title: "State Recognition for Master Craftsmanship",
    description:
      "Honoured by the state handicrafts department for outstanding contribution to preserving Aari embroidery techniques.",
  },
  {
    year: "2006",
    title: "Exhibition Feature, National Crafts Fair",
    description:
      "Selected to showcase handcrafted Aari work at a national-level crafts exhibition, representing Kashmiri artisans.",
  },
  {
    year: "2015",
    title: "Excellence in Traditional Textile Arts",
    description:
      "Recognised for decades of dedication to hand embroidery and mentoring the next generation of local artisans.",
  },
];

export const seedMediaFeatures = [
  {
    title: "Preserving the Art of Aari Embroidery",
    outlet: "Local Heritage Journal",
    year: "2019",
    type: "ARTICLE" as const,
    url: null as string | null,
  },
  {
    title: "Voices of Kashmiri Craft",
    outlet: "Regional Arts Documentary",
    year: "2021",
    type: "VIDEO" as const,
    url: null as string | null,
  },
  {
    title: "A Conversation on Tradition and Technique",
    outlet: "Craft & Culture Podcast",
    year: "2023",
    type: "INTERVIEW" as const,
    url: null as string | null,
  },
];

export const seedHomeContent = {
  heroEyebrow: "Kashmiri Artisan",
  heroName: "Mir Abdul Majeed",
  heroSubtitle:
    "A traditional Kashmiri artisan devoted to the art of handcrafted Aari embroidery and heirloom handicrafts, carrying forward a legacy of patience, skill, and heritage.",
  heroCtaLabel: "Explore Collection",
  heroCtaHref: "/collections",
  heroImage: null as string | null,
  aboutPreviewEyebrow: "The Artisan",
  aboutPreviewHeading: "A lifetime devoted to the needle, the thread, and the story they tell.",
  aboutPreviewBody:
    "For decades, Mir Abdul Majeed has practiced the delicate art of Aari embroidery, a tradition passed down through generations of Kashmiri craftsmen. Every piece that leaves his hands carries the patience of hours spent perfecting a single motif, and the quiet pride of keeping a centuries-old craft alive.",
  aboutPreviewCtaLabel: "Read His Story",
  aboutPreviewCtaHref: "/about",
  featuredEyebrow: "Featured Collection",
  featuredTitle: "Handcrafted With Devotion",
  featuredDescription:
    "A curated selection of pieces that showcase the depth and detail of traditional Kashmiri Aari embroidery.",
  featuredCtaLabel: "View Full Collection",
  featuredCtaHref: "/collections",
  craftsmanshipEyebrow: "Our Values",
  craftsmanshipTitle: "The Craft Behind Every Piece",
  craftsmanshipValues: [
    {
      title: "Handmade",
      description: "Every piece is crafted entirely by hand, with no shortcuts taken in the process.",
      icon: "M8 21h8M12 21v-5M7 12a5 5 0 0 1 10 0c0 2-1 3-2 4H9c-1-1-2-2-2-4Z",
    },
    {
      title: "Traditional Techniques",
      description: "Methods passed down through generations, practiced with unwavering discipline.",
      icon: "M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z",
    },
    {
      title: "Premium Craftsmanship",
      description: "Meticulous attention to detail, resulting in pieces of lasting quality.",
      icon: "M12 2 3 7l9 5 9-5-9-5ZM3 12l9 5 9-5M3 17l9 5 9-5",
    },
    {
      title: "Custom Orders",
      description: "Bespoke pieces tailored to your vision, made with the same devoted care.",
      icon: "M4 4h16v16H4V4Zm4 4h8M8 12h8M8 16h5",
    },
  ],
};

export const seedAboutContent = {
  heroEyebrow: "His Story",
  heroTitle: "About Mir Abdul Majeed",
  artisanImage: null as string | null,
  journeyEyebrow: "A Life in Thread",
  journeyHeading: "A Journey of Patience and Devotion",
  journeyParagraphs: [
    "Mir Abdul Majeed began learning the art of Aari embroidery as a young apprentice in Srinagar, watching the artisans before him guide a hooked needle across stretched fabric with quiet, practiced confidence. Over decades, he has honed this inherited skill into a lifelong craft, working from his home inside KathiDarwaza, Rainawari, a neighbourhood steeped in the traditions of Kashmiri handwork.",
    "What began as an apprenticeship became a devotion: to preserving techniques that are slowly disappearing, to training younger hands in the same discipline he once learned, and to ensuring that every shawl, suit, and furnishing that leaves his workshop honours the tradition it comes from.",
  ],
  craftsmanshipEyebrow: "The Craft",
  craftsmanshipTitle: "The Art of Aari Embroidery",
  craftsmanshipDescription:
    "Aari embroidery is a centuries-old Kashmiri technique using a hooked needle to create dense, flowing chain stitches, a method that demands equal parts precision and imagination.",
  craftsmanshipParagraphs: [
    "Unlike embroidery done with a conventional needle, Aari work uses a fine, hooked tool that pulls thread from beneath the fabric, allowing artisans to build intricate, continuous patterns quickly and with remarkable fluidity. The result is a style of embroidery known for its detailed florals, paisleys, and chinar leaf motifs, patterns deeply tied to the landscape and culture of Kashmir.",
    "Each piece begins with a hand-drawn or block-printed outline, which is then filled in stitch by stitch, often taking days or weeks depending on the complexity of the design. It is a craft that rewards patience above all else, a value Mir Abdul Majeed has carried through every piece he has created.",
  ],
};

export const seedSiteConfig = {
  name: "Mir Abdul Majeed",
  shortName: "Mir Aari Kashmir",
  tagline: "Kashmiri Artisan - Aari Embroidery & Handicrafts",
  description:
    "A digital showcase of Mir Abdul Majeed's handcrafted Aari embroidery and traditional Kashmiri handicrafts, preserving decades of heritage and craftsmanship.",
  phone: "9906560322",
  phoneDisplay: "+91 99065 60322",
  whatsappNumber: "919906560322",
  addressLine1: "Inside KathiDarwaza",
  addressLine2: "Rainawari",
  addressLine3: "Srinagar – 190015",
  footerDescription:
    "Preserving the art of Kashmiri Aari embroidery through handcrafted pieces made with patience, tradition, and devotion.",
};
