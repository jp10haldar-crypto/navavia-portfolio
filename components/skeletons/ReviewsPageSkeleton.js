// WHAT THIS FILE DOES: The /reviews page's loading screen — a heading
// bar and 6 review-card-shaped placeholders in the exact same grid the
// real page uses, so the page doesn't visibly jump once real reviews
// arrive.

import Skeleton from "@/components/Skeleton";
import ReviewCardSkeleton from "@/components/skeletons/ReviewCardSkeleton";

export default function ReviewsPageSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <Skeleton width="12rem" height="2.25rem" />
      <div className="mt-3">
        <Skeleton width="22rem" height="1rem" />
      </div>

      <div className="mt-8 grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <ReviewCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
