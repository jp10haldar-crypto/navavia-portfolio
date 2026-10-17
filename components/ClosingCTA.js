// WHAT THIS FILE DOES: The final "Tell us what you want to build" section,
// used at the very bottom of the homepage, the Services page, and blog
// posts, just above the footer. It's fixed, not part of the admin Pages
// section system (see docs/DECISIONS.md — its button/links don't fit that
// system's one-button schema). Its email and WhatsApp links come from the
// admin "Contact & Social" page — the same settings used in the footer and
// on the Contact page — and each is hidden automatically if that detail
// hasn't been set yet. On the homepage only, when the admin turns on
// "Homepage enquiry form" in Settings, the full enquiry form appears right
// here too, so a visitor can send an enquiry without leaving the page.
// Runs in the browser because it loads those settings.

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSiteSettings, DEFAULT_SITE_SETTINGS } from "@/lib/firestore";
import { buildWhatsAppLink } from "@/lib/socialPlatforms";
import EnquiryForm from "@/components/EnquiryForm";

export default function ClosingCTA({ showEnquiryForm = false }) {
  const [settings, setSettings] = useState(DEFAULT_SITE_SETTINGS);

  useEffect(() => {
    getSiteSettings().then((result) => {
      setSettings(result.data);
    });
  }, []);

  const whatsappLink = buildWhatsAppLink(settings.whatsappNumber);
  const shouldShowForm = showEnquiryForm && settings.homepageEnquiryFormEnabled;

  return (
    <section className="relative overflow-hidden border-t border-white/6">
      <div
        aria-hidden="true"
        className="blueprint-grid pointer-events-none absolute inset-0"
      />

      <div
        className={`relative mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 py-24 sm:py-32 lg:px-10 ${
          shouldShowForm ? "lg:grid-cols-12" : ""
        }`}
      >
        <div className={shouldShowForm ? "lg:col-span-5" : "max-w-3xl"}>
          <h2 className="font-display text-[clamp(2.4rem,5.4vw,4.5rem)] font-semibold leading-none text-foreground">
            Tell us what you want to build.
          </h2>
          <p className="mt-6 max-w-md text-lg text-muted">
            Share the idea in a few lines. We will reply within 24 hours.
          </p>

          {!shouldShowForm && (
            <Link href="/contact" className="btn-form mt-10">
              Start a project
            </Link>
          )}

          {(settings.businessEmail || whatsappLink) && (
            <div className="mt-10 flex flex-col items-start gap-3 border-t border-white/10 pt-8">
              {settings.businessEmail && (
                <a
                  href={`mailto:${settings.businessEmail}`}
                  className="link-draw text-lg text-foreground"
                >
                  {settings.businessEmail}
                </a>
              )}
              {whatsappLink && (
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-draw text-lg text-accent"
                >
                  Message us on WhatsApp
                </a>
              )}
            </div>
          )}
        </div>

        {shouldShowForm && (
          <div className="rounded-[20px] bg-card/90 p-6 ring-1 ring-white/10 backdrop-blur sm:p-10 lg:col-span-7">
            <EnquiryForm />
          </div>
        )}
      </div>
    </section>
  );
}
