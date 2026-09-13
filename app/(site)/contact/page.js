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

      <div className="mx-auto max-w-5xl px-6 pb-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_300px]">
          <EnquiryForm />

          {hasAnyContactDetail && (
            <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-card p-6">
              {settings.businessEmail && (
                <div>
                  <p className="text-sm text-muted">Email</p>
                  <a
                    href={`mailto:${settings.businessEmail}`}
                    className="font-medium text-foreground hover:text-accent"
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
                    className="font-medium text-foreground hover:text-accent"
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
                    className="font-medium text-accent hover:opacity-80"
                  >
                    Message us on WhatsApp
                  </a>
                </div>
              )}
              <SocialLinksRow socialLinks={settings.socialLinks} className="mt-2" />
              <p className="text-sm text-muted">
                We work with clients worldwide.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
