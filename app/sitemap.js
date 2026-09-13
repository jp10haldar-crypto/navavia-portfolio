// WHAT THIS FILE DOES: Automatically generates /sitemap.xml — a list of
// every page on the site that search engines should know about. Next.js
// serves this file itself; nothing needs to call it by hand. It includes
// every PUBLISHED blog post and every project automatically, so new ones
// join the sitemap by themselves — no extra step needed. This file only
// ever reads from the database (via lib/firestore.js) — it deliberately
// never touches Authentication in any way (see lib/firebase.js), and if
// the database can't be reached while Vercel is building the site, this
// still produces a valid sitemap with the fixed pages (homepage, projects,
// reviews, blog, contact) rather than failing the whole deployment.
//
// NEXT_PUBLIC_SITE_URL isn't set yet (the site isn't live on a real domain
// until Step 11 — deploy). Once it is, set that environment variable to
// the real address (e.g. https://navavia.com) so the links below point to
// the live site instead of localhost.

import { getPublishedBlogPosts, getAllProjects } from "@/lib/firestore";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const STATIC_PAGES = [
  "",
  "/projects",
  "/reviews",
  "/blog",
  "/services",
  "/contact",
];

export default async function sitemap() {
  const staticPages = STATIC_PAGES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  let postPages = [];
  let projectPages = [];

  // Each of these is wrapped separately, and lib/firestore.js's own
  // functions already catch their own errors rather than throwing — this
  // extra try/catch is a second safety net, so that even something
  // unexpected here can never take down the whole sitemap (and with it,
  // the whole build).
  try {
    const result = await getPublishedBlogPosts();
    if (result.success) {
      postPages = result.data.map((post) => ({
        url: `${SITE_URL}/blog/${post.slug}`,
        lastModified: post.publishedDate
          ? new Date(post.publishedDate)
          : new Date(),
      }));
    }
  } catch {
    // Database unreachable — the sitemap still returns the static pages.
  }

  try {
    const result = await getAllProjects();
    if (result.success) {
      projectPages = result.data.map((project) => ({
        url: `${SITE_URL}/projects/${project.id}`,
        lastModified: new Date(),
      }));
    }
  } catch {
    // Database unreachable — the sitemap still returns the static pages.
  }

  return [...staticPages, ...postPages, ...projectPages];
}
