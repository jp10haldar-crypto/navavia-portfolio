// WHAT THIS FILE DOES: The interactive part of the /blog page — the tag
// filter buttons and the grid of post cards. It's handed the already-
// loaded list of posts as a prop (fetched once, on the server, by
// app/(site)/blog/page.js) and just filters that same list in the
// browser when a tag button is clicked — no extra loading. Runs in the
// browser because it reacts to button clicks.

"use client";

import { useState } from "react";
import BlogPostCard from "@/components/BlogPostCard";

export default function BlogListClient({ posts }) {
  const [activeTag, setActiveTag] = useState("All");

  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.tags || []))
  );
  const filters = ["All", ...allTags];

  const visiblePosts =
    activeTag === "All"
      ? posts
      : posts.filter((post) => post.tags?.includes(activeTag));

  if (posts.length === 0) {
    return (
      <p className="mt-10 text-muted">
        No posts yet — check back soon.
      </p>
    );
  }

  return (
    <div>
      {allTags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveTag(filter)}
              className={
                activeTag === filter
                  ? "rounded-full border border-accent px-4 py-2 text-sm font-medium text-accent"
                  : "rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
              }
            >
              {filter}
            </button>
          ))}
        </div>
      )}

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visiblePosts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
