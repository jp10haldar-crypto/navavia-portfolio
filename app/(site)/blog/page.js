// WHAT THIS FILE DOES: The "Insights" blog listing page, visible at /blog.
// Its intro heading and the blog feed itself are both admin-editable
// sections (from the admin Pages editor), but the actual list of posts
// still comes from the real blog posts collection, exactly as before.
// Unlike most other public pages in this project, this one loads its data
// on the SERVER, not in the browser — that's what lets search engines and
// social media previews see the real post titles immediately, which is
// the whole point of a blog built for SEO. If the admin turns the whole
// blog off in Settings, this behaves as if it doesn't exist at all — the
// normal "Page Not Found" screen.

import { notFound } from "next/navigation";
import PageSections from "@/components/PageSections";
import {
  getPublishedBlogPosts,
  getPageSections,
  getSiteSettings,
} from "@/lib/firestore";

export const metadata = {
  title: "Insights — Navavia",
  description:
    "Articles and insights from Navavia on building websites and mobile apps.",
};

export default async function BlogPage() {
  const settingsResult = await getSiteSettings();
  if (!settingsResult.data.blogEnabled) {
    notFound();
  }

  const [postsResult, sectionsResult] = await Promise.all([
    getPublishedBlogPosts(),
    getPageSections("blog"),
  ]);

  if (!postsResult.success) {
    return (
      <p className="mx-auto max-w-6xl px-6 py-16 text-center text-muted">
        {postsResult.message}
      </p>
    );
  }

  const sections = sectionsResult.success
    ? sectionsResult.data.filter((section) => section.visible)
    : [];

  return (
    <PageSections
      sections={sections}
      data={{ posts: postsResult.data }}
      pageTitleFromFirstSection
    />
  );
}
