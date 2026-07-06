export const siteConfig = {
  name: "Mir Abdul Majeed",
  shortName: "Mir Aari Kashmir",
  tagline: "Kashmiri Artisan - Aari Embroidery & Handicrafts",
  description:
    "A digital showcase of Mir Abdul Majeed's handcrafted Aari embroidery and traditional Kashmiri handicrafts, preserving decades of heritage and craftsmanship.",
  phone: "9906560322",
  phoneDisplay: "+91 99065 60322",
  whatsappNumber: "919906560322",
  address: {
    line1: "Inside KathiDarwaza",
    line2: "Rainawari",
    line3: "Srinagar – 190015",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Collections", href: "/collections" },
    { label: "About", href: "/about" },
  ],
} as const;

export function buildWhatsAppLink(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`;
}

export function productEnquiryMessage(productName: string) {
  return `Hello, I am interested in the product '${productName}'. Could you please share more details?`;
}
