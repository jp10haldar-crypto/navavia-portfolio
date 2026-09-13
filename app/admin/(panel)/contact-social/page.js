// WHAT THIS FILE DOES: The admin "Contact & Social" page, visible at
// /admin/contact-social. One place to set your business email, WhatsApp
// number, phone number, and up to 8 social media links (each with its own
// on/off switch). Saved in Firestore (the same "settings" document used by
// the admin Settings page), and automatically shown in the footer, the
// Contact page, and the homepage's closing section — so this is the only
// place these details ever need to be typed. Runs in the browser because
// it loads the current settings and reacts to typing and the Save click.

"use client";

import { useEffect, useState } from "react";
import {
  getSiteSettings,
  updateSiteSettings,
  DEFAULT_SITE_SETTINGS,
} from "@/lib/firestore";
import { SOCIAL_PLATFORMS, buildWhatsAppLink } from "@/lib/socialPlatforms";

const INPUT_CLASSES =
  "mt-1 w-full rounded-lg border border-white/10 bg-card px-4 py-3 text-foreground outline-none focus:border-accent";

export default function AdminContactSocialPage() {
  const [values, setValues] = useState(DEFAULT_SITE_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    getSiteSettings().then((result) => {
      setValues(result.data);
      setIsLoading(false);
    });
  }, []);

  function updateField(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function updateSocialLink(platformKey, changes) {
    setValues((current) => ({
      ...current,
      socialLinks: {
        ...current.socialLinks,
        [platformKey]: { ...current.socialLinks[platformKey], ...changes },
      },
    }));
  }

  async function handleSave(event) {
    event.preventDefault();
    setIsSaving(true);
    setSaveMessage("");

    const result = await updateSiteSettings({
      businessEmail: values.businessEmail.trim(),
      whatsappNumber: values.whatsappNumber.trim(),
      phoneNumber: values.phoneNumber.trim(),
      socialLinks: values.socialLinks,
    });

    setIsSaving(false);
    setSaveMessage(result.success ? "Saved." : result.message);
  }

  if (isLoading) {
    return <p className="text-muted">Loading...</p>;
  }

  const whatsappPreview = buildWhatsAppLink(values.whatsappNumber);

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Contact & Social</h1>
      <p className="mt-2 max-w-2xl text-muted">
        These details feed automatically into the footer, the Contact page,
        and the homepage&apos;s &quot;Ready to get started?&quot; section —
        edit them here once, and they update everywhere.
      </p>

      <form onSubmit={handleSave} className="mt-8 flex max-w-2xl flex-col gap-6">
        <div>
          <label className="text-sm text-muted">Business Email</label>
          <input
            type="email"
            value={values.businessEmail}
            onChange={(event) => updateField("businessEmail", event.target.value)}
            placeholder="you@yourbusiness.com"
            className={INPUT_CLASSES}
          />
        </div>

        <div>
          <label className="text-sm text-muted">WhatsApp Number</label>
          <input
            type="text"
            value={values.whatsappNumber}
            onChange={(event) => updateField("whatsappNumber", event.target.value)}
            placeholder="919876543210"
            className={INPUT_CLASSES}
          />
          <p className="mt-1 text-xs text-muted">
            Type the number with your country code, no spaces, no &quot;+&quot;
            sign, no dashes — e.g. a number normally written +91 98765 43210
            should be typed 919876543210.
            {whatsappPreview && (
              <>
                {" "}This will link to:{" "}
                <span className="text-foreground">{whatsappPreview}</span>
              </>
            )}
          </p>
        </div>

        <div>
          <label className="text-sm text-muted">Phone Number</label>
          <input
            type="text"
            value={values.phoneNumber}
            onChange={(event) => updateField("phoneNumber", event.target.value)}
            placeholder="+91 98765 43210"
            className={INPUT_CLASSES}
          />
          <p className="mt-1 text-xs text-muted">
            Shown as plain text and as a tappable call link — type it however
            you&apos;d like it displayed.
          </p>
        </div>

        <div>
          <p className="font-semibold text-foreground">Social Links</p>
          <p className="mt-1 text-sm text-muted">
            Only the ones you turn on appear on the site, each with its own
            icon.
          </p>

          <div className="mt-4 flex flex-col gap-3">
            {SOCIAL_PLATFORMS.map((platform) => {
              const Icon = platform.icon;
              const link = values.socialLinks[platform.key];
              return (
                <div
                  key={platform.key}
                  className="flex items-center gap-3 rounded-lg border border-white/10 bg-card p-3"
                >
                  <Icon size={20} className="shrink-0 text-muted" />
                  <span className="w-24 shrink-0 text-sm text-foreground">
                    {platform.label}
                  </span>
                  <input
                    type="text"
                    value={link.url}
                    onChange={(event) =>
                      updateSocialLink(platform.key, { url: event.target.value })
                    }
                    placeholder={platform.placeholder}
                    className="min-w-0 flex-1 rounded-lg border border-white/10 bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
                  />
                  <label className="flex shrink-0 items-center gap-2 text-xs text-muted">
                    <input
                      type="checkbox"
                      checked={link.enabled}
                      onChange={(event) =>
                        updateSocialLink(platform.key, {
                          enabled: event.target.checked,
                        })
                      }
                      className="h-5 w-5"
                    />
                    On
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        {saveMessage && <p className="text-sm text-muted">{saveMessage}</p>}

        <button
          type="submit"
          disabled={isSaving}
          className="self-start rounded-full bg-accent px-6 py-3 font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}
