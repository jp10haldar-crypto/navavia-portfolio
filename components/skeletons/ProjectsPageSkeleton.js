// WHAT THIS FILE DOES: The /projects page's loading screen — a heading
// bar, filter-button-shaped bars, and 6 card-shaped placeholders in the
// exact same grid the real page uses (1 column on mobile, 2 on tablet, 3
// on desktop), so the page doesn't visibly jump once real projects arrive.

import Skeleton from "@/components/Skeleton";
import ProjectCardSkeleton from "@/components/skeletons/ProjectCardSkeleton";

export default function ProjectsPageSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-12 pt-16 sm:pt-24 lg:px-10">
      <Skeleton width="18rem" height="4rem" />
      <div className="mt-6">
        <Skeleton width="26rem" height="1.25rem" />
      </div>

      <div className="mt-16 flex gap-2">
        <Skeleton width="3.5rem" height="2.25rem" rounded="8px" />
        <Skeleton width="6rem" height="2.25rem" rounded="8px" />
        <Skeleton width="7rem" height="2.25rem" rounded="8px" />
      </div>

      <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProjectCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
