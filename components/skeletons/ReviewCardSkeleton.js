// WHAT THIS FILE DOES: A loading placeholder shaped exactly like a real
// ReviewCard (components/ReviewCard.js) — a bar standing in for the star
// rating, a few bars for the quote text, then a small circle (the client's
// photo) next to bars for their name and role. Shown in place of real
// reviews while they're still being fetched, on the homepage and the
// /reviews page.

import Skeleton from "@/components/Skeleton";

export default function ReviewCardSkeleton() {
  return (
    <div className="flex h-full flex-col rounded-xl border border-white/10 bg-card p-6">
      <Skeleton width="6rem" height="1rem" />

      <div className="mt-4 flex flex-1 flex-col gap-2">
        <Skeleton width="100%" height="0.875rem" />
        <Skeleton width="100%" height="0.875rem" />
        <Skeleton width="60%" height="0.875rem" />
      </div>

      <div className="mt-6 flex items-center gap-3">
        <Skeleton width="3rem" height="3rem" rounded="9999px" />
        <div className="flex flex-col gap-2">
          <Skeleton width="6rem" height="0.875rem" />
          <Skeleton width="4.5rem" height="0.7rem" />
        </div>
      </div>
    </div>
  );
}
