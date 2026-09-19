// WHAT THIS FILE DOES: The homepage's loading screen — shown in place of
// Featured Work, How We Work videos, and Client Reviews while all of that
// is still being fetched together (the homepage only ever shows real
// content once everything has arrived at once, so there's one shared
// loading screen for all three, not three separate ones). Reuses the
// exact same wrapper classes (max width, padding, grid columns) as the
// real sections it stands in for, so the page doesn't visibly jump when
// the real content swaps in.

import Skeleton from "@/components/Skeleton";
import ProjectCardSkeleton from "@/components/skeletons/ProjectCardSkeleton";
import ReviewCardSkeleton from "@/components/skeletons/ReviewCardSkeleton";
import VideoBlockSkeleton from "@/components/skeletons/VideoBlockSkeleton";

export default function HomeSkeleton() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 py-16">
        <Skeleton width="10rem" height="1.75rem" />
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <Skeleton width="9rem" height="1.75rem" />
        <div className="mt-3">
          <Skeleton width="20rem" height="1rem" />
        </div>
        <div className="mt-8">
          <VideoBlockSkeleton />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <Skeleton width="14rem" height="1.75rem" />
        <div className="mt-3">
          <Skeleton width="22rem" height="1rem" />
        </div>
        <div className="mt-8 grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ReviewCardSkeleton />
          <ReviewCardSkeleton />
          <ReviewCardSkeleton />
        </div>
      </section>
    </>
  );
}
