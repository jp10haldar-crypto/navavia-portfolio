// WHAT THIS FILE DOES: Shaped like a real blog post (components/
// BlogPostView.js) — a cover-image-shaped rectangle, a title bar, a
// meta-details line, and several paragraph-shaped bars standing in for
// the article text. Shown automatically by Next.js (via the neighboring
// loading.js file) while a post page isn't ready to show yet.

import Skeleton from "@/components/Skeleton";

export default function BlogPostSkeleton() {
  return (
    <div>
      <div className="mx-auto max-w-4xl px-6 pb-12 pt-14 sm:pt-20">
        <div className="flex items-center gap-5">
          <Skeleton width="6rem" height="0.875rem" />
          <Skeleton width="4rem" height="0.875rem" />
          <Skeleton width="5rem" height="0.875rem" />
        </div>
        <div className="mt-6 flex flex-col gap-3">
          <Skeleton width="90%" height="3.25rem" />
          <Skeleton width="60%" height="3.25rem" />
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-6">
        <Skeleton width="100%" height="auto" rounded="18px" className="aspect-[2/1]" />
      </div>
      <div className="mx-auto flex max-w-4xl flex-col gap-3 px-6 pb-20 pt-14 [&>*]:max-w-[44rem]">
        <Skeleton width="100%" height="1.1rem" />
        <Skeleton width="100%" height="1.1rem" />
        <Skeleton width="95%" height="1.1rem" />
        <Skeleton width="100%" height="1.1rem" />
        <Skeleton width="70%" height="1.1rem" />
      </div>
    </div>
  );
}
