// WHAT THIS FILE DOES: Next.js shows this automatically, on its own,
// whenever the real /blog page (which loads its data on the server) isn't
// ready to show yet — a skeleton screen shaped like the real page (a
// heading bar, filter-button-shaped bars, and 6 post-card placeholders in
// the same grid) instead of a blank gap. Nothing needs to call this file
// directly; Next.js finds it by its name, "loading.js", automatically.

import Skeleton from "@/components/Skeleton";
import BlogPostCardSkeleton from "@/components/skeletons/BlogPostCardSkeleton";

export default function BlogLoading() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <Skeleton width="8rem" height="2.25rem" />
      <div className="mt-3">
        <Skeleton width="18rem" height="1rem" />
      </div>

      <div className="mt-8 flex gap-3">
        <Skeleton width="3.5rem" height="2.5rem" rounded="9999px" />
        <Skeleton width="5rem" height="2.5rem" rounded="9999px" />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <BlogPostCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
