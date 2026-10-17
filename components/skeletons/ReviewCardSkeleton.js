// WHAT THIS FILE DOES: A loading placeholder shaped exactly like a real
// ReviewCard (components/ReviewCard.js) — a bar standing in for the star
// rating, a few bars for the quote text, then a small circle (the client's
// photo) next to bars for their name and role. Shown in place of real
// reviews while they're still being fetched, on the homepage and the
// /reviews page.

import Skeleton from "@/components/Skeleton";

export default function ReviewCardSkeleton() {
  return (
    <div className="border-t border-white/10 pt-7">
      <div className="flex justify-end">
        <Skeleton width="5.5rem" height="1rem" />
      </div>
      <div className="mt-4 flex flex-col gap-2.5">
        <Skeleton width="100%" height="1rem" />
        <Skeleton width="100%" height="1rem" />
        <Skeleton width="65%" height="1rem" />
      </div>
      <div className="mt-7 flex items-center gap-3">
        <Skeleton width="2.75rem" height="2.75rem" rounded="9999px" />
        <div className="flex flex-col gap-2">
          <Skeleton width="7rem" height="0.9rem" />
          <Skeleton width="5rem" height="0.75rem" />
        </div>
      </div>
    </div>
  );
}
