// WHAT THIS FILE DOES: The public "Contact" page, visible at /contact. The
// page's intro heading/subheading comes from the admin Pages editor. The
// form itself lives in components/EnquiryForm.js (shared with the
// homepage's optional embedded version). The info box (email, phone,
// WhatsApp, social icons) comes from the admin "Contact & Social" page —
// the same settings that feed the footer and the homepage's closing
// section, so there's exactly one place to update these details. Runs in
// the browser because it loads this page's sections and the site
// settings.

"use client";

import { useEffect, useState } from "react";
import { getPageSections, getSiteSettings } from "@/lib/firestore";
import PageSections from "@/components/PageSections";
import EnquiryForm from "@/components/EnquiryForm";
import SocialLinksRow from "@/components/SocialLinksRow";
import { buildWhatsAppLink, buildTelLink } from "@/lib/socialPlatforms";

export default function ContactPage() {
  const [sections, setSections] = useState([]);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    getPageSections("contact").then((result) => {
      if (result.success) {
        setSections(result.data.filter((section) => section.visible));
      }
    });
    getSiteSettings().then((result) => {
      setSettings(result.data);
    });
  }, []);

  const hasAnyContactDetail =
    settings &&
    (settings.businessEmail ||
      settings.phoneNumber ||
      settings.whatsappNumber ||
      Object.values(settings.socialLinks).some((link) => link.enabled && link.url));

  return (
    <div>
      <PageSections sections={sections} pageTitleFromFirstSection />

      <div className="mx-auto max-w-7xl px-6 pb-28 lg:px-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="rounded-[20px] bg-card p-6 ring-1 ring-white/10 sm:p-10 lg:col-span-8">
            <EnquiryForm />
          </div>

          <aside className="flex flex-col gap-7 lg:col-span-4 lg:pt-4">
            <div>
              <p className="font-display text-[1.6rem] font-semibold leading-tight text-foreground">
                We reply within 24 hours.
              </p>
              <p className="mt-3 text-muted">
                Tell us what you want to build and who it&apos;s for. We&apos;ll
                come back with questions and next steps.
              </p>
            </div>
            {hasAnyContactDetail && (
              <>
                {settings.businessEmail && (
                  <div>
                    <p className="text-sm text-muted">Email</p>
                    <a
                      href={`mailto:${settings.businessEmail}`}
                      className="link-draw mt-1 inline-block break-all text-lg text-foreground"
                    >
                      {settings.businessEmail}
                    </a>
                  </div>
                )}
                {settings.phoneNumber && (
                  <div>
                    <p className="text-sm text-muted">Phone</p>
                    <a
                      href={buildTelLink(settings.phoneNumber)}
                      className="link-draw mt-1 inline-block text-lg text-foreground"
                    >
                      {settings.phoneNumber}
                    </a>
                  </div>
                )}
                {settings.whatsappNumber && (
                  <div>
                    <p className="text-sm text-muted">WhatsApp</p>
                    <a
                      href={buildWhatsAppLink(settings.whatsappNumber)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-draw mt-1 inline-block text-lg text-accent"
                    >
                      Message us on WhatsApp
                    </a>
                  </div>
                )}
                <SocialLinksRow socialLinks={settings.socialLinks} />
              </>
            )}
            <p className="border-t border-white/10 pt-6 text-muted">
              We work with clients worldwide.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
