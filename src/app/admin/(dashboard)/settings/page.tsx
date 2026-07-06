import { getSiteConfig } from "@/lib/repositories/siteConfig";
import { SiteConfigForm } from "@/components/admin/settings/SiteConfigForm";

export default async function AdminSettingsPage() {
  const config = await getSiteConfig();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl text-charcoal">General Settings</h1>
        <p className="mt-1 text-sm text-charcoal/60">
          Contact details, address and footer content shown across the site.
        </p>
      </div>
      <SiteConfigForm config={config} />
    </div>
  );
}
