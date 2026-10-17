// WHAT THIS FILE DOES: The footer shown at the bottom of every public
// page. It's added once in app/(site)/layout.js, so it automatically
// appears on every public page — but never inside the admin area. Its
// email link and social icons come from the admin "Contact & Social" page
// — the same settings used on the Contact page and the homepage's closing
// section, so there's exactly one place to update them. The Blog and
// Services links hide themselves if those pages are switched off in
// Settings. It also shows a plain "Admin login" link to /admin/login —
// never automatically signed in, always requiring the real email and
// password on that page — controlled by the "Show admin login link in
// footer" switch on the admin Settings page (on by default). Runs in the
// browser because it checks these settings in the real database.
//
// The huge "Navavia" across the bottom is decoration: it "takes form"
// (thin outline → heavy letters) as it scrolls into view — see
// ".footer-wordmark" in app/globals.css.

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSiteSettings, DEFAULT_SITE_SETTINGS } from "@/lib/firestore";
import SocialLinksRow from "@/components/SocialLinksRow";
import LogoMark from "@/components/LogoMark";

const FOOTER_LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services", settingsKey: "servicesEnabled" },
  { href: "/reviews", label: "Reviews" },
  { href: "/blog", label: "Blog", settingsKey: "blogEnabled" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [settings, setSettings] = useState(DEFAULT_SITE_SETTINGS);

  useEffect(() => {
    getSiteSettings().then((result) => {
      setSettings(result.data);
    });
  }, []);

  const visibleLinks = FOOTER_LINKS.filter(
    (link) => !link.settingsKey || settings[link.settingsKey]
  );

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-white/6">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 pb-10 pt-16 sm:grid-cols-2 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-5">
          <Link href="/" className="group inline-flex items-center gap-2.5">
            <LogoMark />
            <span className="font-display text-[1.35rem] font-bold tracking-[-0.03em] text-foreground">
              Navavia
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-[0.95rem] text-muted">
            Where Ideas Take Form. We build websites and mobile apps for
            growing businesses, and hand them over ready to run.
          </p>
        </div>

        <nav aria-label="Footer" className="lg:col-span-3">
          <p className="text-sm text-muted">Explore</p>
          <ul className="mt-4 flex flex-col gap-2.5">
            {visibleLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="link-draw text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-4">
          <p className="text-sm text-muted">Get in touch</p>
          <div className="mt-4 flex flex-col items-start gap-2.5">
            {settings.businessEmail ? (
              <a
                href={`mailto:${settings.businessEmail}`}
                className="link-draw break-all text-foreground"
              >
                {settings.businessEmail}
              </a>
            ) : (
              <Link href="/contact" className="link-draw text-foreground">
                Send us an enquiry
              </Link>
            )}
            <p className="text-[0.95rem] text-muted">We work with clients worldwide.</p>
          </div>
          <SocialLinksRow socialLinks={settings.socialLinks} className="mt-6" />
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 pb-4 text-sm text-muted lg:px-10">
        <p>© {currentYear} Navavia. All rights reserved.</p>
        {settings.showAdminLoginLink && (
          <Link href="/admin/login" className="transition-colors hover:text-foreground">
            Admin login
          </Link>
        )}
      </div>

      <p
        aria-hidden="true"
        className="footer-wordmark font-display pointer-events-none -mb-[0.2em] select-none whitespace-nowrap text-center text-[22.5vw] leading-[0.95]"
      >
        Navavia
      </p>
    </footer>
  );
}
