import { buildWhatsAppLink, productEnquiryMessage } from "@/lib/utils/whatsapp";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

type WhatsAppButtonProps = {
  whatsappNumber: string;
  productName?: string;
  message?: string;
  label?: string;
  variant?: "solid" | "outline";
  className?: string;
};

export function WhatsAppButton({
  whatsappNumber,
  productName,
  message,
  label = "Enquire on WhatsApp",
  variant = "solid",
  className = "",
}: WhatsAppButtonProps) {
  const text =
    message ?? (productName ? productEnquiryMessage(productName) : "Hello, I would like to know more about your handcrafted collection.");
  const href = buildWhatsAppLink(whatsappNumber, text);

  const base =
    "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm tracking-wide transition-colors duration-300";
  const styles =
    variant === "solid"
      ? "bg-walnut text-ivory hover:bg-walnut-light"
      : "border border-walnut text-walnut hover:bg-walnut hover:text-ivory";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${styles} ${className}`}
    >
      <WhatsAppIcon className="h-4 w-4" />
      {label}
    </a>
  );
}
