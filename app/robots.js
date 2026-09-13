// WHAT THIS FILE DOES: Automatically generates /robots.txt — the file
// that tells search engines which parts of the site they're allowed to
// index. Next.js serves this file itself; nothing needs to call it by
// hand. The admin area is blocked so it never shows up in Google results.

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
