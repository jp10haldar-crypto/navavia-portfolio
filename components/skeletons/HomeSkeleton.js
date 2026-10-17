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

const FEATURED_IMAGE = "aspect-[16/10] lg:aspect-auto lg:h-[26rem]";

export default function HomeSkeleton() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-10">
        <Skeleton width="16rem" height="3rem" />
        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ProjectCardSkeleton imageClassName={FEATURED_IMAGE} />
          </div>
          <div className="lg:col-span-5">
            <ProjectCardSkeleton imageClassName={FEATURED_IMAGE} />
          </div>
        </div>
      </section>

      <section className="border-y border-white/6 bg-card/40">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-10">
          <Skeleton width="14rem" height="3rem" />
          <div className="mt-4">
            <Skeleton width="22rem" height="1.1rem" />
          </div>
          <div className="mt-14 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-9">
              <VideoBlockSkeleton />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-10">
        <Skeleton width="20rem" height="3rem" />
        <div className="mt-4">
          <Skeleton width="24rem" height="1.1rem" />
        </div>
        <div className="mt-16 gap-x-12 sm:columns-2 lg:columns-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="mb-14 break-inside-avoid">
              <ReviewCardSkeleton />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
