// WHAT THIS FILE DOES: The /reviews page's loading screen — a heading
// bar and 6 review-card-shaped placeholders in the exact same grid the
// real page uses, so the page doesn't visibly jump once real reviews
// arrive.

import Skeleton from "@/components/Skeleton";
import ReviewCardSkeleton from "@/components/skeletons/ReviewCardSkeleton";

export default function ReviewsPageSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-10">
      <Skeleton width="20rem" height="3rem" />
      <div className="mt-4">
        <Skeleton width="24rem" height="1.1rem" />
      </div>

      <div className="mt-16 gap-x-12 sm:columns-2 lg:columns-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="mb-14 break-inside-avoid">
            <ReviewCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
}
