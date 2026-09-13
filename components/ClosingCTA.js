// WHAT THIS FILE DOES: The final "Ready to get started?" section, used at
// the very bottom of the homepage and the Services page, just above the
// footer. It's fixed, not part of the admin Pages section system (see
// docs/DECISIONS.md — its button/links don't fit that system's one-button
// schema). Its email and WhatsApp links come from the admin "Contact &
// Social" page — the same settings used in the footer and on the Contact
// page — and each is hidden automatically if that detail hasn't been set
// yet. On the homepage only, when the admin turns on "Homepage enquiry
// form" in Settings, the full enquiry form appears right here too, so a
// visitor can send an enquiry without leaving the page. Runs in the
// browser because it loads those settings.

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
    <section className="bg-card">
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
          Ready to get started?
        </h2>
        <p className="mt-3 text-muted">
          Tell us what you need and we will reply within 24 hours.
        </p>

        {!shouldShowForm && (
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-accent px-8 py-4 text-lg font-semibold text-background transition-opacity hover:opacity-90"
          >
            Get in Touch
          </Link>
        )}

        {(settings.businessEmail || whatsappLink) && (
          <div className="mt-8 flex flex-col items-center gap-2 text-sm">
            {settings.businessEmail && (
              <a
                href={`mailto:${settings.businessEmail}`}
                className="text-accent hover:opacity-80"
              >
                {settings.businessEmail}
              </a>
            )}
            {whatsappLink && (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:opacity-80"
              >
                Message us on WhatsApp
              </a>
            )}
          </div>
        )}

        {shouldShowForm && (
          <div className="mx-auto mt-10 max-w-xl">
            <EnquiryForm />
          </div>
        )}
      </div>
    </section>
  );
}
