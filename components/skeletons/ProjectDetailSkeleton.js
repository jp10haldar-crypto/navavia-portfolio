// WHAT THIS FILE DOES: The individual project page's loading screen —
// shaped like the real page's sections (a category tag, title, and
// description near the top; a video-shaped rectangle for the walkthrough;
// a grid of screenshot-shaped rectangles below that) instead of a plain
// "Loading..." message.

import Skeleton from "@/components/Skeleton";

export default function ProjectDetailSkeleton() {
  return (
    <div>
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-12 sm:pt-16 lg:px-10">
        <Skeleton width="6rem" height="0.875rem" />
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Skeleton width="5rem" height="1rem" />
            <div className="mt-4 flex flex-col gap-3">
              <Skeleton width="85%" height="3.5rem" />
              <Skeleton width="55%" height="3.5rem" />
            </div>
            <div className="mt-6 flex max-w-2xl flex-col gap-2">
              <Skeleton width="100%" height="1rem" />
              <Skeleton width="90%" height="1rem" />
              <Skeleton width="70%" height="1rem" />
            </div>
          </div>
          <div className="flex flex-col gap-8 lg:col-span-4 lg:pt-10">
            <div className="flex flex-wrap gap-1.5">
              <Skeleton width="4rem" height="1.75rem" rounded="6px" />
              <Skeleton width="5rem" height="1.75rem" rounded="6px" />
              <Skeleton width="4.5rem" height="1.75rem" rounded="6px" />
            </div>
            <div className="flex gap-3">
              <Skeleton width="9rem" height="3rem" rounded="10px" />
              <Skeleton width="11rem" height="3rem" rounded="10px" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <Skeleton width="16rem" height="2.5rem" />
        <div className="mt-10">
          <Skeleton width="100%" height="auto" rounded="16px" className="aspect-video" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <Skeleton width="20rem" height="2.5rem" />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} width="100%" height="auto" rounded="14px" className="aspect-video" />
          ))}
        </div>
      </section>
    </div>
  );
}
