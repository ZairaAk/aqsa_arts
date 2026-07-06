import { buildWhatsAppLink } from "@/data/site";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export function WhatsAppFloatingButton() {
  const href = buildWhatsAppLink(
    "Hello, I would like to know more about your handcrafted collection."
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-walnut text-ivory shadow-lg shadow-charcoal/20 transition-transform duration-300 hover:scale-105 hover:bg-walnut-light md:bottom-8 md:right-8"
    >
      <WhatsAppIcon className="h-6 w-6" />
    </a>
  );
}
