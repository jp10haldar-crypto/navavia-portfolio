// WHAT THIS FILE DOES: The "Insights" blog listing page, visible at /blog.
// Unlike most other public pages in this project, this one loads its data
// on the SERVER, not in the browser — that's what lets search engines and
// social media previews see the real post titles immediately, which is
// the whole point of a blog built for SEO. It runs once per visit, before
// the page is sent to the browser.

import BlogListClient from "@/components/BlogListClient";
import { getPublishedBlogPosts } from "@/lib/firestore";

export const metadata = {
  title: "Insights — Navavia",
  description:
    "Articles and insights from Navavia on building websites and mobile apps.",
};

export default async function BlogPage() {
  const result = await getPublishedBlogPosts();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
        Insights
      </h1>
      <p className="mt-3 max-w-xl text-muted">
        Articles and ideas from the Navavia team.
      </p>

      {result.success ? (
        <BlogListClient posts={result.data} />
      ) : (
        <p className="mt-10 text-muted">{result.message}</p>
      )}
    </div>
  );
}
