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

      <div className="mx-auto max-w-2xl px-6 py-16">
        {post.coverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.coverImage}
            alt={post.title}
            className="aspect-video w-full rounded-lg object-cover"
          />
        )}

        <h1 className="mt-8 text-3xl font-bold text-foreground sm:text-4xl">
          {post.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted">
          <span>{formatDate(post.publishedDate)}</span>
          <span>·</span>
          <span>{post.author}</span>
          <span>·</span>
          <span>{post.readingTime} min read</span>
        </div>

        {post.tags?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-card px-3 py-1 text-xs text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {!isPreview && postUrl && (
          <div className="mt-6">
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
          className="blog-content mt-10"
          dangerouslySetInnerHTML={{ __html: sanitizeBlogContent(post.content) }}
        />
      </div>

      {relatedPosts?.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-2xl font-bold text-foreground">
            Related Posts
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <BlogPostCard key={relatedPost.id} post={relatedPost} />
            ))}
          </div>
        </section>
      )}

      {!isPreview && <ClosingCTA />}
    </article>
  );
}
