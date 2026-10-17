// WHAT THIS FILE DOES: A single blog post "card" shown in the grid on the
// /blog page — cover image, title, excerpt, date, reading time, and tags.
// The whole card links to that post's own page.

import Link from "next/link";

function formatDate(dateString) {
  if (!dateString) return "";
  // Locale is fixed ("en-US"), not the visitor's own browser locale
  // (passing undefined here used to do that) — otherwise the date the
  // server renders and the date the browser re-renders can genuinely
  // differ (e.g. "Sep 13, 2026" vs "13 Sept 2026"), which React reports
  // as a hydration mismatch and has to silently re-render to fix.
  return new Date(dateString).toLocaleDateString("en-US", {
    dateStyle: "medium",
  });
}

export default function BlogPostCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[14px] bg-card ring-1 ring-white/8 transition-[box-shadow] duration-500 group-hover:ring-white/20">
        {post.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.coverImage}
            alt={post.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 [transition-timing-function:var(--ease-form)] group-hover:scale-[1.03]"
          />
        ) : (
          // No cover image: the title set large on blueprint paper instead.
          <div className="blueprint-grid absolute inset-0 flex items-end p-6 [mask-image:none]">
            <span className="font-display line-clamp-3 text-[1.6rem] font-semibold leading-[1.05] text-foreground/85">
              {post.title}
            </span>
          </div>
        )}
      </div>

      <div className="mt-5 flex items-center gap-4 text-sm text-muted">
        <span>{formatDate(post.publishedDate)}</span>
        {post.readingTime && <span>{post.readingTime} min read</span>}
      </div>
      <h3 className="font-display mt-2 text-[1.45rem] font-semibold leading-tight text-foreground">
        <span className="link-draw">{post.title}</span>
      </h3>
      {post.excerpt && <p className="mt-2 line-clamp-3 text-[0.97rem] text-muted">{post.excerpt}</p>}

      {post.tags?.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md px-2 py-0.5 text-[12.5px] text-muted ring-1 ring-white/10"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </Link>
  );
}
