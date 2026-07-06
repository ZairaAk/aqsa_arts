import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloatingButton } from "@/components/ui/WhatsAppFloatingButton";
import { getSiteConfig } from "@/lib/repositories/siteConfig";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteConfig = await getSiteConfig();

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header siteName={siteConfig.name} />
      <main className="flex-1">{children}</main>
      <Footer siteConfig={siteConfig} />
      <WhatsAppFloatingButton whatsappNumber={siteConfig.whatsappNumber} />
    </div>
  );
}
