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
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-16 sm:pt-24 lg:px-10">
      <Skeleton width="14rem" height="4rem" />
      <div className="mt-6">
        <Skeleton width="24rem" height="1.25rem" />
      </div>

      <div className="mt-16 flex gap-2">
        <Skeleton width="3.5rem" height="2.25rem" rounded="8px" />
        <Skeleton width="5rem" height="2.25rem" rounded="8px" />
      </div>

      <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <BlogPostCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
