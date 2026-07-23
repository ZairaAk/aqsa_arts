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
    year: "1968",
    title: "Pioneer of Aari Staple Embroidery",
    description:
      "Introduced staple yarn into Aari embroidery for the first time, an innovation that reshaped the craft across Kashmir and, as demand grew, brought staple-yarn manufacturing to India.",
  },
  {
    year: "1972",
    title: "First Position, Kashmir Arts Emporium",
    description:
      "Awarded first position and a cash prize at the Kashmir Arts Emporium, Srinagar, for the embroidered artwork “Apple Selling Kashmiri Girl.”",
  },
  {
    year: "1973",
    title: "Registered Craft Unit & National Trade",
    description:
      "Registered his workshop with the State Directorate of Handicrafts and began showcasing and trading embroidered work across India, including Kolkata.",
  },
  {
    year: "2003",
    title: "Krishna Nagar Utsav, West Bengal",
    description:
      "Specially invited to exhibit at the Krishna Nagar Utsav, organised by the West Bengal Directorate of Cottage & Small Scale Industries with the Ministry of Textiles, where his work received extraordinary appreciation.",
  },
  {
    year: "2005",
    title: "Exhibition in Mumbai",
    description:
      "Invited by the All India Port and Dock Workers Federation to exhibit his art in Mumbai.",
  },
  {
    year: "2021",
    title: "State Award 2017 — Certificate of Excellence",
    description:
      "Conferred the J&K Directorate of Handicrafts and Handlooms’ State Award 2017 (1st Prize) for the embroidered picture “Dancing Girl in Paddy Harvest.”",
  },
  {
    year: "2022",
    title: "Invited Supplier, Central Cottage Industries Corporation",
    description:
      "Invited by the Central Cottage Industries Corporation of India to supply his embroidered work to the Corporation.",
  },
  {
    year: "2022",
    title: "Master Craftsman, Karkhandar Scheme",
    description:
      "Appointed Master Craftsman under the state’s Karkhandar Scheme, training newly recruited young artisans from Kashmir, Mumbai, Bengal, and Ladakh.",
  },
];

export const seedMediaFeatures = [
  {
    title: "Feature Coming Soon",
    outlet: "To be added",
    year: "—",
    type: "ARTICLE" as const,
    url: null as string | null,
  },
];

export const seedHomeContent = {
  heroEyebrow: "Kashmiri Master Artisan",
  heroName: "Mir Abdul Majeed",
  heroSubtitle:
    "For more than six decades, Mir Abdul Majeed has shaped thread into heritage — pioneering Aari staple embroidery and carrying Kashmir's centuries-old craft of hand embroidery to homes across India.",
  heroCtaLabel: "Explore Collection",
  heroCtaHref: "/collections",
  heroImage: null as string | null,
  aboutPreviewEyebrow: "The Artisan",
  aboutPreviewHeading: "A craft learned out of necessity, carried on by devotion.",
  aboutPreviewBody:
    "At twelve, Mir Abdul Majeed left school to support his family, apprenticing in embroidery after his father's sudden illness. What began as necessity became six decades of mastery — pioneering new techniques, training thousands of artisans, and carrying Kashmiri craft onto national stages.",
  aboutPreviewCtaLabel: "Read His Story",
  aboutPreviewCtaHref: "/about",
  featuredEyebrow: "Featured Collection",
  featuredTitle: "Handcrafted With Six Decades of Skill",
  featuredDescription:
    "A curated selection from the atelier of Mir Abdul Majeed, hand-embroidered using Aari and Crewel techniques refined since he pioneered staple-yarn embroidery in 1968.",
  featuredCtaLabel: "View Full Collection",
  featuredCtaHref: "/collections",
  craftsmanshipEyebrow: "Our Values",
  craftsmanshipTitle: "The Craft Behind Every Piece",
  craftsmanshipValues: [
    {
      title: "Hand-Guided Aari Work",
      description:
        "Every motif is drawn with a hooked needle in the Aari technique — a craft Mir Abdul Majeed has practiced and taught for more than six decades.",
      icon: "M8 21h8M12 21v-5M7 12a5 5 0 0 1 10 0c0 2-1 3-2 4H9c-1-1-2-2-2-4Z",
    },
    {
      title: "Pioneering Innovation",
      description:
        "In 1968, he pioneered the use of staple yarn in Aari embroidery — an innovation that went on to reshape the craft across Kashmir.",
      icon: "M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z",
    },
    {
      title: "G.I.-Certified Heritage",
      description:
        "As founding chairman of Wirasat, he has helped secure Geographical Indication certification for eight traditional Kashmiri crafts.",
      icon: "M12 2 3 7l9 5 9-5-9-5ZM3 12l9 5 9-5M3 17l9 5 9-5",
    },
    {
      title: "Generations Trained",
      description:
        "Thousands of artisans, from Kashmir to Ladakh, have learned the craft directly under his guidance.",
      icon: "M4 4h16v16H4V4Zm4 4h8M8 12h8M8 16h5",
    },
  ],
};

export const seedAboutContent = {
  heroEyebrow: "His Story",
  heroTitle: "The Story of Mir Abdul Majeed",
  artisanImage: null as string | null,
  journeyEyebrow: "A Life in Thread",
  journeyHeading: "A Journey of Patience and Devotion",
  journeyParagraphs: [
    "Mir Abdul Majeed's father, Mir Ghulam Mohammad, was known across Srinagar as “Naqshgeer” — a master engraver of silver and copper. When his father fell suddenly ill, twelve-year-old Abdul Majeed left school to support his family, joining a crewel embroidery workshop to learn a trade. He mastered the craft quickly, and before long was training other young apprentices at a workshop of his own.",
    "In 1968, a British embroiderer working in Srinagar offered him Japanese staple yarn for use in Aari work. What began as an experiment became an innovation: his success with the material established Aari staple embroidery as a technique in its own right, and the demand it created eventually brought staple-yarn manufacturing to India.",
    "In the decades that followed, his work travelled far beyond Kashmir — exhibited in Kolkata, Mumbai, Delhi, and beyond, and recognised with a State Award for Excellence for his embroidered picture “Dancing Girl in Paddy Harvest.” Today, as founding chairman of the Kashmir Artisans Welfare Organisation and of Wirasat, he continues to train new artisans and champion Kashmiri craft on a national stage.",
  ],
  craftsmanshipEyebrow: "The Craft",
  craftsmanshipTitle: "The Art of Aari Embroidery",
  craftsmanshipDescription:
    "Aari embroidery is a centuries-old Kashmiri technique using a hooked needle to create dense, flowing chain stitches, a method Mir Abdul Majeed has practiced and refined for more than six decades.",
  craftsmanshipParagraphs: [
    "Unlike embroidery worked with a straight needle, Aari work uses a fine hooked tool that pulls thread from beneath the fabric, letting an artisan build dense, continuous patterns with remarkable speed and fluidity. In 1968, Mir Abdul Majeed pioneered the use of staple yarn within this technique, an innovation that changed the way Aari embroidery was practiced across the region.",
    "He later introduced calligraphy into embroidery, a rare application of the craft that has found its way into mosques and homes alike. Each piece still begins the traditional way: a hand-drawn outline, filled stitch by stitch over many days, in patterns of florals, paisleys, and chinar leaves rooted in the Kashmiri landscape.",
  ],
};

export const seedSiteConfig = {
  name: "Mir Abdul Majeed",
  shortName: "Mir Aari Kashmir",
  tagline: "Kashmiri Master Artisan of Aari & Crewel Embroidery",
  description:
    "Mir Abdul Majeed is a Kashmiri master artisan whose six-decade practice of Aari and Crewel embroidery pioneered staple-yarn work and helped bring Geographical Indication recognition to Kashmiri craft. Discover handcrafted shawls, suits, and home décor from his atelier in Srinagar.",
  phone: "9906560322",
  phoneDisplay: "+91 99065 60322",
  whatsappNumber: "919906560322",
  addressLine1: "Inside KathiDarwaza",
  addressLine2: "Rainawari",
  addressLine3: "Srinagar – 190015",
  footerDescription:
    "Six decades of Aari and Crewel embroidery from Srinagar, Kashmir — preserving heritage craftsmanship, one hand-stitched piece at a time.",
};
