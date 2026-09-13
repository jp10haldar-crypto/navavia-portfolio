// WHAT THIS FILE DOES: Automatically generates /sitemap.xml — a list of
// every page on the site that search engines should know about. Next.js
// serves this file itself; nothing needs to call it by hand. It includes
// every PUBLISHED blog post automatically, so a new post joins the
// sitemap by itself the moment you publish it — no extra step needed.
//
// NEXT_PUBLIC_SITE_URL isn't set yet (the site isn't live on a real domain
// until Step 11 — deploy). Once it is, set that environment variable to
// the real address (e.g. https://navavia.com) so the links below point to
// the live site instead of localhost.

import { getPublishedBlogPosts } from "@/lib/firestore";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap() {
  const staticPages = ["", "/projects", "/reviews", "/contact", "/blog"].map(
    (path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: new Date(),
    })
  );

  const result = await getPublishedBlogPosts();
  const postPages = result.success
    ? result.data.map((post) => ({
        url: `${SITE_URL}/blog/${post.slug}`,
        lastModified: post.publishedDate
          ? new Date(post.publishedDate)
          : new Date(),
      }))
    : [];

  return [...staticPages, ...postPages];
}
