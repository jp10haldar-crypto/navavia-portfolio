// WHAT THIS FILE DOES: The admin's Settings page, visible at
// /admin/settings. Currently holds one on/off switch: whether the "Admin
// Login" link shows in the public site's footer. Saved in Firestore (the
// "settings" collection) so it applies immediately to every visitor, on
// every device, without needing a new deployment. Runs in the browser
// because it loads the current setting and reacts to the toggle/save click.

"use client";

import { useEffect, useState } from "react";
import { getSiteSettings, updateSiteSettings } from "@/lib/firestore";

export default function AdminSettingsPage() {
  const [showAdminLoginLink, setShowAdminLoginLink] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    getSiteSettings().then((result) => {
      setShowAdminLoginLink(result.data.showAdminLoginLink);
      setIsLoading(false);
    });
  }, []);

  async function handleToggle(nextValue) {
    setShowAdminLoginLink(nextValue);
    setIsSaving(true);
    setSaveMessage("");

    const result = await updateSiteSettings({ showAdminLoginLink: nextValue });

    setIsSaving(false);
    if (result.success) {
      setSaveMessage("Saved.");
    } else {
      setSaveMessage(result.message);
      // Roll the switch back visually if saving actually failed, so the
      // screen never shows a setting that didn't really take effect.
      setShowAdminLoginLink(!nextValue);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Settings</h1>
      <p className="mt-2 text-muted">
        Site-wide switches you can change here, without needing any code
        changes or a new deployment.
      </p>

      {isLoading ? (
        <p className="mt-6 text-muted">Loading settings...</p>
      ) : (
        <div className="mt-6 max-w-lg rounded-xl border border-white/10 bg-card p-6">
          <label className="flex items-center justify-between gap-4">
            <span>
              <span className="block font-medium text-foreground">
                Show admin login link in footer
              </span>
              <span className="block text-sm text-muted">
                When on, every page on the public site shows a small
                &quot;Admin Login&quot; link in the footer, leading to
                /admin/login. When off, that link is hidden — you can still
                open /admin/login directly by typing the address.
              </span>
            </span>
            <input
              type="checkbox"
              checked={showAdminLoginLink}
              onChange={(event) => handleToggle(event.target.checked)}
              disabled={isSaving}
              className="h-6 w-6 shrink-0"
            />
          </label>
          {saveMessage && (
            <p className="mt-4 text-sm text-muted">{saveMessage}</p>
          )}
        </div>
      )}
    </div>
  );
}
