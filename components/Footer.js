// WHAT THIS FILE DOES: The footer shown at the bottom of every public
// page. It's added once in app/(site)/layout.js, so it automatically
// appears on the homepage, /projects, and /reviews — but never inside the
// admin area. Its email link and social icons come from the admin
// "Contact & Social" page — the same settings used on the Contact page and
// the homepage's closing section, so there's exactly one place to update
// them. It also shows a plain "Admin Login" link to /admin/login — never
// automatically signed in, always requiring the real email and password on
// that page — controlled by the "Show admin login link in footer" switch
// on the admin Settings page (on by default). Runs in the browser because
// it checks these settings in the real database.

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSiteSettings, DEFAULT_SITE_SETTINGS } from "@/lib/firestore";
import SocialLinksRow from "@/components/SocialLinksRow";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [settings, setSettings] = useState(DEFAULT_SITE_SETTINGS);

  useEffect(() => {
    getSiteSettings().then((result) => {
      setSettings(result.data);
    });
  }, []);

  return (
    <footer className="mt-auto border-t border-white/10 bg-card">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-10 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
        <div>
          <p className="font-bold text-foreground">Navavia</p>
          <p className="text-xs text-muted">Where Ideas Take Form</p>
          <p className="mt-2 max-w-xs text-sm text-muted">
            We build websites and mobile applications for growing businesses.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 text-sm sm:items-end">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:justify-end">
            {settings.businessEmail && (
              <a
                href={`mailto:${settings.businessEmail}`}
                className="text-muted transition-colors hover:text-accent"
              >
                Email
              </a>
            )}
            {settings.showAdminLoginLink && (
              <Link
                href="/admin/login"
                className="text-muted transition-colors hover:text-accent"
              >
                Admin Login
              </Link>
            )}
          </div>
          <SocialLinksRow socialLinks={settings.socialLinks} />
        </div>
      </div>

      <p className="pb-6 text-center text-xs text-muted">
        © {currentYear} Navavia. All rights reserved.
      </p>
    </footer>
  );
}
