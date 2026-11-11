// WHAT THIS FILE DOES: The admin "Ads & Tracking" page, visible at
// /admin/ads-tracking. Where you paste the IDs from your ad accounts —
// the Meta Pixel ID (Facebook/Instagram ads) and the Google Ads tag ID
// plus its conversion labels. Once saved, the public site starts loading
// those platforms' tracking on its next page load (no redeploy needed),
// and reports every enquiry as a "Lead" and every WhatsApp/email/phone
// tap as a "Contact", so the ad platforms learn which visitors become
// clients. Leaving a box blank keeps that platform switched off. It also
// builds ready-to-paste links for your ads, so enquiries are labelled
// with the campaign they came from. Saved in the same Firestore
// "settings" document as the other settings pages. Runs in the browser
// because it loads the current settings and reacts to typing.

"use client";

import { useEffect, useState } from "react";
import {
  getSiteSettings,
  updateSiteSettings,
  DEFAULT_SITE_SETTINGS,
} from "@/lib/firestore";
import {
  isValidMetaPixelId,
  isValidGoogleAdsId,
  isValidConversionLabel,
} from "@/lib/adTracking";

const INPUT_CLASSES =
  "mt-1 w-full rounded-lg border border-white/10 bg-card px-4 py-3 text-foreground outline-none focus:border-accent";

const FIELDS = [
  {
    key: "metaPixelId",
    label: "Meta Pixel ID",
    placeholder: "123456789012345",
    validate: isValidMetaPixelId,
    help: "Meta Events Manager → Data sources → your pixel. The number only (15–16 digits).",
    error: "A Meta Pixel ID is a long number only, e.g. 123456789012345.",
  },
  {
    key: "googleAdsId",
    label: "Google Ads tag ID",
    placeholder: "AW-123456789",
    validate: isValidGoogleAdsId,
    help: "Google Ads → Goals → Conversions → your conversion → Tag setup → \"Install the tag yourself\". It starts with AW-.",
    error: "A Google Ads tag ID looks like AW-123456789.",
  },
  {
    key: "googleAdsLeadLabel",
    label: "Google Ads conversion label — Enquiry form",
    placeholder: "AbC-D_efG-h12_34-567",
    validate: isValidConversionLabel,
    help: "In the same tag snippet, the part after the slash in send_to: 'AW-123456789/THIS_PART'. Create a conversion action named \"Enquiry form\" (category: Submit lead form).",
    error: "Paste only the label — the part after the \"/\".",
  },
  {
    key: "googleAdsContactLabel",
    label: "Google Ads conversion label — WhatsApp / email / phone tap",
    placeholder: "XyZ-1_abC-d23_45-678",
    validate: isValidConversionLabel,
    help: "Optional. A second conversion action named \"Contact tap\" (category: Contact). Leave blank to only count the enquiry form.",
    error: "Paste only the label — the part after the \"/\".",
  },
];

export default function AdminAdsTrackingPage() {
  const [values, setValues] = useState(DEFAULT_SITE_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [campaignName, setCampaignName] = useState("");

  useEffect(() => {
    getSiteSettings().then((result) => {
      setValues(result.data);
      setIsLoading(false);
    });
  }, []);

  function fieldError(field) {
    const value = (values[field.key] || "").trim();
    return value && !field.validate(value) ? field.error : "";
  }

  async function handleSave(event) {
    event.preventDefault();
    if (FIELDS.some((field) => fieldError(field))) {
      setSaveMessage("Please fix the highlighted boxes first.");
      return;
    }

    setIsSaving(true);
    setSaveMessage("");
    const update = {};
    for (const field of FIELDS) {
      update[field.key] = (values[field.key] || "").trim();
    }
    const result = await updateSiteSettings(update);
    setIsSaving(false);
    setSaveMessage(
      result.success
        ? "Saved. Tracking is live on the public site from its next page load."
        : result.message
    );
  }

  if (isLoading) {
    return <p className="text-muted">Loading...</p>;
  }

  // Only reached after settings have loaded in the browser, so window exists.
  const siteOrigin = window.location.origin;
  const campaignSlug =
    campaignName
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "your-campaign";
  const metaLink = `${siteOrigin}/?utm_source=facebook&utm_medium=paid&utm_campaign=${campaignSlug}`;
  const googleLink = `${siteOrigin}/?utm_source=google&utm_medium=cpc&utm_campaign=${campaignSlug}`;

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Ads & Tracking</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Connect your ad accounts so they can see which visitors send an
        enquiry — that&apos;s what lets them find more people like your real
        clients. Blank boxes keep that platform switched off. Your own
        admin panel is never tracked.
      </p>

      <form onSubmit={handleSave} className="mt-8 flex max-w-2xl flex-col gap-6">
        {FIELDS.map((field) => {
          const error = fieldError(field);
          return (
            <div key={field.key}>
              <label htmlFor={field.key} className="text-sm text-muted">
                {field.label}
              </label>
              <input
                id={field.key}
                type="text"
                value={values[field.key] || ""}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    [field.key]: event.target.value,
                  }))
                }
                placeholder={field.placeholder}
                aria-invalid={error ? true : undefined}
                className={`${INPUT_CLASSES} ${error ? "border-red-400/70" : ""}`}
              />
              <p className={`mt-1 text-xs ${error ? "text-red-300" : "text-muted"}`}>
                {error || field.help}
              </p>
            </div>
          );
        })}

        {saveMessage && <p className="text-sm text-muted">{saveMessage}</p>}

        <button
          type="submit"
          disabled={isSaving}
          className="self-start rounded-full bg-accent px-6 py-3 font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      </form>

      <div className="mt-12 max-w-2xl rounded-xl border border-white/10 bg-card p-6">
        <p className="font-semibold text-foreground">Links for your ads</p>
        <p className="mt-1 text-sm text-muted">
          Use these as the ad&apos;s website link so every enquiry is
          labelled with its campaign in the Enquiries list. (Google Ads also
          labels its own clicks automatically.) Swap the &quot;/&quot; for
          &quot;/services&quot; or &quot;/contact&quot; to send people
          straight to that page.
        </p>
        <label htmlFor="campaignName" className="mt-4 block text-sm text-muted">
          Campaign name
        </label>
        <input
          id="campaignName"
          type="text"
          value={campaignName}
          onChange={(event) => setCampaignName(event.target.value)}
          placeholder="e.g. Website leads November"
          className={INPUT_CLASSES}
        />
        <p className="mt-4 text-sm text-muted">Meta (Facebook / Instagram):</p>
        <code className="mt-1 block break-all rounded-lg bg-background p-3 text-xs text-foreground">
          {metaLink}
        </code>
        <p className="mt-4 text-sm text-muted">Google Ads:</p>
        <code className="mt-1 block break-all rounded-lg bg-background p-3 text-xs text-foreground">
          {googleLink}
        </code>
      </div>
    </div>
  );
}
