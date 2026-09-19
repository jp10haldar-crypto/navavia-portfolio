// WHAT THIS FILE DOES: The page for one single blog post, visible at
// /blog/your-post-slug. It loads the post on the SERVER (not in the
// browser), which is what lets this page set a real, correct page title,
// description, and social-media preview image for each individual post —
// essential for a blog built for search engines and for looking right
// when shared on LinkedIn or WhatsApp. If the slug genuinely doesn't match
// any published post, it shows a clean "Post not found" message. If
// something else goes wrong (e.g. the database can't be reached), it says
// so honestly instead — it never pretends a real error is a missing post.
// If the admin turns the whole blog off in Settings, every post page also
// behaves as if it doesn't exist — the normal "Page Not Found" screen.

import Link from "next/link";
// Renamed on import since this file already uses "notFound" as the name
// of a field on the result from getPublishedBlogPostBySlug.
import { notFound as showPageNotFound } from "next/navigation";
import BlogPostView from "@/components/BlogPostView";
import {
  getPublishedBlogPostBySlug,
  getPublishedBlogPosts,
  getSiteSettings,
} from "@/lib/firestore";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

// Sets this exact post's title, description, and social-share preview
// image. Runs automatically before the page renders — nothing needs to
// call this by hand.
//
// Title rule: if the admin typed a custom SEO Title, it's used exactly as
// typed — nothing is added to it. Only when that field is left empty does
// this add "— Navavia" automatically, so the brand name never appears
// twice just because someone already included it themselves.
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const result = await getPublishedBlogPostBySlug(slug);

  if (!result.success) {
    return { title: "Post not found — Navavia" };
  }

  const post = result.data;
  const title = post.metaTitle ? post.metaTitle : `${post.title} — Navavia`;
  const description = post.metaDescription || post.excerpt;
  const postUrl = `${SITE_URL}/blog/${post.slug}`;

  return {
    title,
    description,
    alternates: { canonical: postUrl },
    openGraph: {
      title,
      description,
      url: postUrl,
      type: "article",
      images: post.coverImage ? [{ url: post.coverImage }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const settingsResult = await getSiteSettings();
  if (!settingsResult.data.blogEnabled) {
    showPageNotFound();
  }

  const { slug } = await params;
  const result = await getPublishedBlogPostBySlug(slug);

  if (!result.success) {
    // notFound === true: no post with this slug exists (or it's a draft).
    // notFound === false: something actually went wrong (e.g. the
    // database couldn't be reached) — say that honestly instead.
    if (!result.notFound) {
      return (
        <div className="mx-auto max-w-xl px-6 py-24 text-center text-muted">
          {result.message}
        </div>
      );
    }

    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="text-2xl font-bold text-foreground">
          Post not found
        </h1>
        <p className="mt-3 text-muted">
          The post you&apos;re looking for doesn&apos;t exist or may have
          been removed.
        </p>
        <Link
          href="/blog"
          className="mt-6 inline-block rounded-full border border-accent px-6 py-3 font-semibold text-accent transition-colors hover:bg-accent hover:text-background"
        >
          Back to Insights
        </Link>
      </div>
    );
  }

  const post = result.data;

  const allPublished = await getPublishedBlogPosts();
  const relatedPosts = allPublished.success
    ? allPublished.data
        .filter(
          (candidate) =>
            candidate.id !== post.id &&
            candidate.tags?.some((tag) => post.tags?.includes(tag))
        )
        .slice(0, 3)
    : [];

  const postUrl = `${SITE_URL}/blog/${post.slug}`;

  // Tells Google this page is an article, so it can show richer search
  // results (author, publish date, etc.) — not something a visitor sees.
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage ? [post.coverImage] : undefined,
    author: { "@type": "Person", name: post.author },
    datePublished: post.publishedDate,
    mainEntityOfPage: postUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Escapes "<" so a title/excerpt/author containing the literal
        // text "</script>" can never prematurely close this tag and break
        // out into the rest of the page — search engines still read this
        // correctly as the same JSON either way.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <BlogPostView post={post} relatedPosts={relatedPosts} postUrl={postUrl} />
    </>
  );
}
