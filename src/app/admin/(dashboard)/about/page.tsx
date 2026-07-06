import { getAboutContent } from "@/lib/repositories/aboutContent";
import { getAwards } from "@/lib/repositories/awards";
import { getMediaFeatures } from "@/lib/repositories/media";
import { AboutContentForm } from "@/components/admin/about/AboutContentForm";
import { AwardsManager } from "@/components/admin/about/AwardsManager";
import { MediaManager } from "@/components/admin/about/MediaManager";

export default async function AdminAboutPage() {
  const [content, awards, mediaFeatures] = await Promise.all([
    getAboutContent(),
    getAwards(),
    getMediaFeatures(),
  ]);

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="font-display text-2xl text-charcoal">About Page</h1>
        <p className="mt-1 text-sm text-charcoal/60">
          Edit the artisan story, craftsmanship section, awards and media features.
        </p>
      </div>

      <AboutContentForm content={content} />

      <div className="border-t border-charcoal/10 pt-8">
        <AwardsManager awards={awards} />
      </div>

      <div className="border-t border-charcoal/10 pt-8">
        <MediaManager features={mediaFeatures} />
      </div>
    </div>
  );
}
