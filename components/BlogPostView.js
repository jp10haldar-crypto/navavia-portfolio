// WHAT THIS FILE DOES: The full layout for one blog post — cover image,
// title, meta details, the formatted content, share buttons, and related
// posts. Used in two places: the real public post page (app/(site)/blog/
// [slug]/page.js) and the admin's "Preview" page, which is why it takes a
// `postUrl` (for the share buttons) and an `isPreview` flag (to hide share
// buttons and show a "draft preview" banner instead) as props rather than
// figuring those out itself.

import ShareButtons from "@/components/ShareButtons";
import BlogPostCard from "@/components/BlogPostCard";
import ClosingCTA from "@/components/ClosingCTA";
import FormingText from "@/components/FormingText";
import { sanitizeBlogContent } from "@/lib/sanitizeBlogContent";

function formatDate(dateString) {
  if (!dateString) return "";
  // Locale is fixed ("en-US"), not the visitor's own browser locale —
  // see components/BlogPostCard.js for why (a real hydration-mismatch bug
  // fixed at the same time as this one).
  return new Date(dateString).toLocaleDateString("en-US", {
    dateStyle: "long",
  });
}

export default function BlogPostView({ post, relatedPosts, postUrl, isPreview }) {
  return (
    <article>
      {isPreview && (
        <div className="bg-accent/10 px-6 py-3 text-center text-sm font-medium text-accent">
          This is a draft preview — it is not visible to the public yet.
        </div>
      )}

      <header className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="blueprint-grid pointer-events-none absolute inset-x-0 -top-32 h-[140%]"
        />
        <div className="relative mx-auto max-w-4xl px-6 pb-12 pt-14 sm:pt-20">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted">
            <span>{formatDate(post.publishedDate)}</span>
            {post.readingTime && <span>{post.readingTime} min read</span>}
            {post.author && <span>By {post.author}</span>}
          </div>

          <FormingText
            text={post.title}
            weight={640}
            className="font-display mt-5 text-[clamp(2.3rem,5.4vw,4.25rem)] leading-[1.04] tracking-[-0.024em] text-foreground"
          />

          {post.tags?.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-md px-2 py-0.5 text-[13px] text-muted ring-1 ring-white/10"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      {post.coverImage && (
        <div className="mx-auto max-w-6xl px-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.coverImage}
            alt={post.title}
            className="aspect-[2/1] w-full rounded-[18px] object-cover ring-1 ring-white/10"
          />
        </div>
      )}

      {/* Same outer width as the header above, so the title and the text
          share one left edge; the text itself is held to a reading width. */}
      <div className="mx-auto max-w-4xl px-6 pb-20 pt-14">
        <div className="max-w-[44rem]">
          {!isPreview && postUrl && (
            <div className="mb-12 border-b border-white/10 pb-8">
              <ShareButtons url={postUrl} title={post.title} />
            </div>
          )}

          {/* Run through a sanitizer before this ever reaches
              dangerouslySetInnerHTML — this content is typed in the admin's
              rich-text editor and only a signed-in account can save it, but
              defense-in-depth matters here specifically: it's rendered as
              raw HTML to every visitor who reads the post, so a compromised
              or unauthorized account writing to this field is a direct path
              to a real attack on real visitors, not just an admin-panel
              problem. Strips anything dangerous (script tags, event-handler
              attributes) while keeping normal formatting (headings, bold,
              lists, links) untouched. */}
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: sanitizeBlogContent(post.content) }}
          />
        </div>
      </div>

      {relatedPosts?.length > 0 && (
        <section className="border-t border-white/6">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
            <h2 className="font-display text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.04] text-foreground">
              Related posts
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <BlogPostCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}

      {!isPreview && <ClosingCTA />}
    </article>
  );
}
