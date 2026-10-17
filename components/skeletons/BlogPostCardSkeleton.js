// WHAT THIS FILE DOES: A loading placeholder shaped exactly like a real
// BlogPostCard (components/BlogPostCard.js) — a rectangle for the cover
// image, then bars standing in for the title, excerpt, and the
// date/reading-time line. Shown in place of real blog post cards while
// they're still being fetched.

import Skeleton from "@/components/Skeleton";

export default function BlogPostCardSkeleton() {
  return (
    <div>
      <Skeleton width="100%" height="auto" rounded="14px" className="aspect-[16/10]" />
      <div className="mt-5 flex items-center gap-4">
        <Skeleton width="5rem" height="0.8rem" />
        <Skeleton width="4rem" height="0.8rem" />
      </div>
      <div className="mt-3">
        <Skeleton width="85%" height="1.4rem" />
      </div>
      <div className="mt-3 flex flex-col gap-2">
        <Skeleton width="100%" height="0.875rem" />
        <Skeleton width="90%" height="0.875rem" />
      </div>
    </div>
  );
}
