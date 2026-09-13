// WHAT THIS FILE DOES: The footer shown at the bottom of every public
// page. It's added once in app/(site)/layout.js, so it automatically
// appears on the homepage, /projects, and /reviews — but never inside the
// admin area. It shows a plain "Admin Login" link to /admin/login — never
// automatically signed in, always requiring the real email and password on
// that page — controlled by the "Show admin login link in footer" switch
// on the admin Settings page (on by default). It runs in the browser
// because it checks that switch in the real database.

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSiteSettings } from "@/lib/firestore";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [showAdminLoginLink, setShowAdminLoginLink] = useState(true);

  useEffect(() => {
    getSiteSettings().then((result) => {
      setShowAdminLoginLink(result.data.showAdminLoginLink);
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

        {/* PLACEHOLDER LINKS: both hrefs below are "#" for now. Replace the
            first with the real LinkedIn page URL, and the second with
            "mailto:you@example.com" once there's a real email to use. */}
        <div className="flex gap-6 text-sm">
          <a href="#" className="text-muted transition-colors hover:text-accent">
            LinkedIn
          </a>
          <a href="#" className="text-muted transition-colors hover:text-accent">
            Email
          </a>
          {showAdminLoginLink && (
            <Link
              href="/admin/login"
              className="text-muted transition-colors hover:text-accent"
            >
              Admin Login
            </Link>
          )}
        </div>
      </div>

      <p className="pb-6 text-center text-xs text-muted">
        © {currentYear} Navavia. All rights reserved.
      </p>
    </footer>
  );
}
