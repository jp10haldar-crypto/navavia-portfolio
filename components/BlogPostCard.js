// WHAT THIS FILE DOES: A single blog post "card" shown in the grid on the
// /blog page — cover image, title, excerpt, date, reading time, and tags.
// The whole card links to that post's own page.

import Link from "next/link";

function formatDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString(undefined, {
    dateStyle: "medium",
  });
}

export default function BlogPostCard({ post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-xl border border-white/10 bg-card transition-all duration-200 hover:-translate-y-1 hover:border-accent"
    >
      <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden bg-background">
        {post.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.coverImage}
            alt={post.title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="px-4 text-center text-sm font-medium text-muted">
            {post.title}
          </span>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-foreground">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-muted">{post.excerpt}</p>

        <div className="mt-4 flex items-center gap-3 text-xs text-muted">
          <span>{formatDate(post.publishedDate)}</span>
          <span>·</span>
          <span>{post.readingTime} min read</span>
        </div>

        {post.tags?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-background px-3 py-1 text-xs text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
