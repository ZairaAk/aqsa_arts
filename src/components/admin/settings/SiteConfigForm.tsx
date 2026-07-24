"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Field, inputClass, textareaClass } from "@/components/admin/shared/Field";
import { updateSiteConfigAction } from "@/lib/actions/siteConfig";
import type { SiteConfig } from "@/generated/prisma/client";

export function SiteConfigForm({ config }: { config: SiteConfig }) {
  const router = useRouter();
  const [name, setName] = useState(config.name);
  const [shortName, setShortName] = useState(config.shortName);
  const [tagline, setTagline] = useState(config.tagline);
  const [description, setDescription] = useState(config.description);
  const [phone, setPhone] = useState(config.phone);
  const [phoneDisplay, setPhoneDisplay] = useState(config.phoneDisplay);
  const [whatsappNumber, setWhatsappNumber] = useState(config.whatsappNumber);
  const [addressLine1, setAddressLine1] = useState(config.addressLine1);
  const [addressLine2, setAddressLine2] = useState(config.addressLine2);
  const [addressLine3, setAddressLine3] = useState(config.addressLine3);
  const [footerDescription, setFooterDescription] = useState(config.footerDescription);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const result = await updateSiteConfigAction({
      name,
      shortName,
      tagline,
      description,
      phone,
      phoneDisplay,
      whatsappNumber,
      addressLine1,
      addressLine2,
      addressLine3,
      footerDescription,
    });

    setSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      toast.error(result.error);
      return;
    }

    toast.success("Settings updated.");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 sm:gap-10">
      <fieldset className="flex flex-col gap-4">
        <legend className="font-display text-lg text-charcoal">Brand</legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Full Name">
            <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} />
          </Field>
          <Field label="Short Name">
            <input className={inputClass} value={shortName} onChange={(e) => setShortName(e.target.value)} />
          </Field>
        </div>
        <Field label="Tagline">
          <input className={inputClass} value={tagline} onChange={(e) => setTagline(e.target.value)} />
        </Field>
        <Field label="Site Description" hint="Used for SEO and browser previews.">
          <textarea
            className={textareaClass}
            style={{ minHeight: 70 }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Field>
      </fieldset>

      <fieldset className="flex flex-col gap-4 border-t border-charcoal/10 pt-6 sm:pt-8">
        <legend className="font-display text-lg text-charcoal">Contact</legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Phone Number" hint="Digits only, used for tel: links.">
            <input className={inputClass} value={phone} onChange={(e) => setPhone(e.target.value)} />
          </Field>
          <Field label="Phone Display" hint="How the number is shown on the site.">
            <input
              className={inputClass}
              value={phoneDisplay}
              onChange={(e) => setPhoneDisplay(e.target.value)}
            />
          </Field>
        </div>
        <Field label="WhatsApp Number" hint="Country code + number, no symbols (e.g. 919906560322).">
          <input
            className={inputClass}
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
          />
        </Field>
      </fieldset>

      <fieldset className="flex flex-col gap-4 border-t border-charcoal/10 pt-6 sm:pt-8">
        <legend className="font-display text-lg text-charcoal">Address</legend>
        <Field label="Line 1">
          <input className={inputClass} value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} />
        </Field>
        <Field label="Line 2">
          <input className={inputClass} value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} />
        </Field>
        <Field label="Line 3">
          <input className={inputClass} value={addressLine3} onChange={(e) => setAddressLine3(e.target.value)} />
        </Field>
      </fieldset>

      <fieldset className="flex flex-col gap-4 border-t border-charcoal/10 pt-6 sm:pt-8">
        <legend className="font-display text-lg text-charcoal">Footer</legend>
        <Field label="Footer Description">
          <textarea
            className={textareaClass}
            style={{ minHeight: 70 }}
            value={footerDescription}
            onChange={(e) => setFooterDescription(e.target.value)}
          />
        </Field>
      </fieldset>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex flex-col border-t border-charcoal/10 pt-6 sm:flex-row sm:justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="min-h-[44px] w-full rounded-sm bg-charcoal px-6 py-2.5 text-sm uppercase tracking-wide text-ivory transition-colors hover:bg-gold disabled:opacity-60 sm:w-auto"
        >
          {submitting ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
