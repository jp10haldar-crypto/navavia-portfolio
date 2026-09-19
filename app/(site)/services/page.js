// WHAT THIS FILE DOES: The "What We Build" services page, visible at
// /services. Its content now comes from the admin Pages editor (the
// "services" page) instead of being fixed in this file — to change the
// wording, use the admin panel's Pages → Services screen, not this file.
// Loads on the SERVER (not in the browser) so this page keeps loading
// instantly with no spinner, exactly as it always has, and so its metadata
// below still works for search engines and social sharing. Ends with the
// same "Ready to get started?" section used on the homepage — that section
// is fixed, not admin-editable (see docs/DECISIONS.md). If the admin turns
// this whole page off in Settings, it behaves as if it doesn't exist at
// all — the normal "Page Not Found" screen, same as any broken link.
//
// `revalidate = 60` means: served instantly from a cached copy that's
// never more than 60 seconds old, refreshed quietly in the background.
// Without it, a Server Component page like this one gets fully baked in
// at build/deploy time and never updates again on its own — found and
// fixed the same bug on the blog list page first (docs/DECISIONS.md); it
// applied here too, for the same reason.

import { notFound } from "next/navigation";
import ClosingCTA from "@/components/ClosingCTA";
import PageSections from "@/components/PageSections";
import { getPageSections, getSiteSettings } from "@/lib/firestore";

export const revalidate = 60;

export const metadata = {
  title: "What We Build — Navavia",
  description:
    "Websites, mobile apps, and complete business systems — built once, handed over with a full admin panel, and run without needing a developer.",
  openGraph: {
    title: "What We Build — Navavia",
    description:
      "Websites, mobile apps, and complete business systems — built once, handed over with a full admin panel, and run without needing a developer.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "What We Build — Navavia",
    description:
      "Websites, mobile apps, and complete business systems — built once, handed over with a full admin panel, and run without needing a developer.",
  },
};

export default async function ServicesPage() {
  const settingsResult = await getSiteSettings();
  if (!settingsResult.data.servicesEnabled) {
    notFound();
  }

  const result = await getPageSections("services");
  const sections = result.success
    ? result.data.filter((section) => section.visible)
    : [];

  return (
    <div>
      <PageSections sections={sections} pageTitleFromFirstSection />
      <ClosingCTA />
    </div>
  );
}
