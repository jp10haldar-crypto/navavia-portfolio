// WHAT THIS FILE DOES: A loading placeholder shaped exactly like a real
// BlogPostCard (components/BlogPostCard.js) — a rectangle for the cover
// image, then bars standing in for the title, excerpt, and the
// date/reading-time line. Shown in place of real blog post cards while
// they're still being fetched.

import Skeleton from "@/components/Skeleton";

export default function BlogPostCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-card">
      <Skeleton width="100%" height="auto" rounded="0" className="aspect-video" />
      <div className="flex flex-col gap-3 p-5">
        <Skeleton width="80%" height="1.25rem" />
        <div className="flex flex-col gap-2">
          <Skeleton width="100%" height="0.875rem" />
          <Skeleton width="90%" height="0.875rem" />
        </div>
        <div className="mt-1 flex items-center gap-3">
          <Skeleton width="5rem" height="0.75rem" />
          <Skeleton width="4rem" height="0.75rem" />
        </div>
      </div>
    </div>
  );
}
