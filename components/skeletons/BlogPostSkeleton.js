// WHAT THIS FILE DOES: Shaped like a real blog post (components/
// BlogPostView.js) — a cover-image-shaped rectangle, a title bar, a
// meta-details line, and several paragraph-shaped bars standing in for
// the article text. Shown automatically by Next.js (via the neighboring
// loading.js file) while a post page isn't ready to show yet.

import Skeleton from "@/components/Skeleton";

export default function BlogPostSkeleton() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <Skeleton width="100%" height="auto" className="aspect-video" />

      <div className="mt-8">
        <Skeleton width="85%" height="2.25rem" />
      </div>

      <div className="mt-4 flex items-center gap-3">
        <Skeleton width="6rem" height="0.875rem" />
        <Skeleton width="4rem" height="0.875rem" />
        <Skeleton width="5rem" height="0.875rem" />
      </div>

      <div className="mt-10 flex flex-col gap-3">
        <Skeleton width="100%" height="1rem" />
        <Skeleton width="100%" height="1rem" />
        <Skeleton width="95%" height="1rem" />
        <Skeleton width="100%" height="1rem" />
        <Skeleton width="80%" height="1rem" />
        <div className="mt-4">
          <Skeleton width="50%" height="1.25rem" />
        </div>
        <Skeleton width="100%" height="1rem" />
        <Skeleton width="90%" height="1rem" />
        <Skeleton width="100%" height="1rem" />
      </div>
    </div>
  );
}
