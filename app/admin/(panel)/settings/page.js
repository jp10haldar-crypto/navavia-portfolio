// WHAT THIS FILE DOES: The admin's Settings page, visible at
// /admin/settings. On/off switches for entire sections and pages of the
// public site — turning one off makes that section (or page, plus its
// navigation link) disappear from the live site completely, without
// deleting anything. Saved in Firestore (the "settings" collection) so
// changes apply immediately to every visitor, on every device, without
// needing a new deployment. Each switch saves the moment you click it —
// there's no separate "Save" button. Runs in the browser because it loads
// the current settings and reacts to each toggle click.

"use client";

import { useEffect, useState } from "react";
import {
  getSiteSettings,
  updateSiteSettings,
  DEFAULT_SITE_SETTINGS,
} from "@/lib/firestore";

const TOGGLES = [
  {
    key: "featuredWorkEnabled",
    label: "Featured Work (homepage)",
    description: "The \"Featured Work\" section on the homepage.",
  },
  {
    key: "homepageVideosEnabled",
    label: "How We Work videos (homepage)",
    description: "The \"How We Work\" video section on the homepage.",
  },
  {
    key: "homepageReviewsEnabled",
    label: "Client reviews (homepage)",
    description:
      "The \"What Our Clients Say\" section on the homepage. The full /reviews page stays separate and isn't affected by this.",
  },
  {
    key: "homepageEnquiryFormEnabled",
    label: "Homepage enquiry form",
    description:
      "The full enquiry form embedded in the homepage's \"Ready to get started?\" section.",
  },
  {
    key: "blogEnabled",
    label: "Blog",
    description:
      "The entire Blog section — every post, the Insights page, and its link in the navigation menu.",
  },
  {
    key: "servicesEnabled",
    label: "Services page",
    description: "The entire \"What We Build\" page and its navigation link.",
  },
  {
    key: "showAdminLoginLink",
    label: "Admin login link in footer",
    description:
      "A small \"Admin Login\" link in the public footer, leading to /admin/login. When off, you can still open /admin/login directly by typing the address.",
  },
];

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState(DEFAULT_SITE_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);
  const [savingKey, setSavingKey] = useState(null);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    getSiteSettings().then((result) => {
      setSettings(result.data);
      setIsLoading(false);
    });
  }, []);

  async function handleToggle(key, nextValue) {
    setSettings((current) => ({ ...current, [key]: nextValue }));
    setSavingKey(key);
    setSaveMessage("");

    const result = await updateSiteSettings({ [key]: nextValue });

    setSavingKey(null);
    if (result.success) {
      setSaveMessage("Saved.");
    } else {
      setSaveMessage(result.message);
      // Roll the switch back visually if saving actually failed, so the
      // screen never shows a setting that didn't really take effect.
      setSettings((current) => ({ ...current, [key]: !nextValue }));
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Settings</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Turn whole sections or pages on or off across the site. Everything
        defaults to on. Turning something off makes it disappear from the
        live site completely — nothing is deleted, and switching it back on
        brings it right back.
      </p>

      {isLoading ? (
        <p className="mt-6 text-muted">Loading settings...</p>
      ) : (
        <div className="mt-6 flex max-w-2xl flex-col gap-3">
          {TOGGLES.map((toggle) => (
            <label
              key={toggle.key}
              className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-card p-6"
            >
              <span>
                <span className="block font-medium text-foreground">
                  {toggle.label}
                </span>
                <span className="block text-sm text-muted">
                  {toggle.description}
                </span>
              </span>
              <input
                type="checkbox"
                checked={settings[toggle.key]}
                onChange={(event) =>
                  handleToggle(toggle.key, event.target.checked)
                }
                disabled={savingKey === toggle.key}
                className="h-6 w-6 shrink-0"
              />
            </label>
          ))}
          {saveMessage && <p className="text-sm text-muted">{saveMessage}</p>}
        </div>
      )}
    </div>
  );
}
