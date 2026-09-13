// WHAT THIS FILE DOES: The "What We Build" services page, visible at
// /services. Its content now comes from the admin Pages editor (the
// "services" page) instead of being fixed in this file — to change the
// wording, use the admin panel's Pages → Services screen, not this file.
// Loads on the SERVER (not in the browser) so this page keeps loading
// instantly with no spinner, exactly as it always has, and so its metadata
// below still works for search engines and social sharing. Ends with the
// same "Ready to get started?" section used on the homepage — that section
// is fixed, not admin-editable (see docs/DECISIONS.md).

import ClosingCTA from "@/components/ClosingCTA";
import PageSections from "@/components/PageSections";
import { getPageSections } from "@/lib/firestore";

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
