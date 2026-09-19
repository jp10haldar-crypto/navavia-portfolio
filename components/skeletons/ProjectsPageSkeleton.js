// WHAT THIS FILE DOES: The /projects page's loading screen — a heading
// bar, filter-button-shaped bars, and 6 card-shaped placeholders in the
// exact same grid the real page uses (1 column on mobile, 2 on tablet, 3
// on desktop), so the page doesn't visibly jump once real projects arrive.

import Skeleton from "@/components/Skeleton";
import ProjectCardSkeleton from "@/components/skeletons/ProjectCardSkeleton";

export default function ProjectsPageSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <Skeleton width="10rem" height="2.25rem" />
      <div className="mt-3">
        <Skeleton width="20rem" height="1rem" />
      </div>

      <div className="mt-8 flex gap-3">
        <Skeleton width="3.5rem" height="2.5rem" rounded="9999px" />
        <Skeleton width="6rem" height="2.5rem" rounded="9999px" />
        <Skeleton width="7rem" height="2.5rem" rounded="9999px" />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProjectCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
