export function buildWhatsAppLink(whatsappNumber: string, message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${whatsappNumber}?text=${encoded}`;
}

export function productEnquiryMessage(productName: string) {
  return `Hello, I am interested in the product '${productName}'. Could you please share more details?`;
}
