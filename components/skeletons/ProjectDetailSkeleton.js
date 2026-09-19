// WHAT THIS FILE DOES: The individual project page's loading screen —
// shaped like the real page's sections (a category tag, title, and
// description near the top; a video-shaped rectangle for the walkthrough;
// a grid of screenshot-shaped rectangles below that) instead of a plain
// "Loading..." message.

import Skeleton from "@/components/Skeleton";

export default function ProjectDetailSkeleton() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-6 py-16">
        <Skeleton width="5rem" height="0.75rem" rounded="9999px" />
        <div className="mt-3">
          <Skeleton width="60%" height="2.25rem" />
        </div>
        <div className="mt-5 flex flex-col gap-2 max-w-2xl">
          <Skeleton width="100%" height="1rem" />
          <Skeleton width="90%" height="1rem" />
          <Skeleton width="70%" height="1rem" />
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <Skeleton width="3.5rem" height="1.5rem" rounded="9999px" />
          <Skeleton width="4.5rem" height="1.5rem" rounded="9999px" />
          <Skeleton width="4rem" height="1.5rem" rounded="9999px" />
        </div>
        <div className="mt-8 flex gap-4">
          <Skeleton width="9rem" height="3rem" rounded="9999px" />
          <Skeleton width="10rem" height="3rem" rounded="9999px" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <Skeleton width="10rem" height="1.75rem" />
        <div className="mt-8">
          <Skeleton width="100%" height="auto" className="aspect-video" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <Skeleton width="14rem" height="1.75rem" />
        <div className="mt-2">
          <Skeleton width="18rem" height="1rem" />
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Skeleton width="100%" height="auto" className="aspect-video" />
          <Skeleton width="100%" height="auto" className="aspect-video" />
        </div>
      </section>
    </div>
  );
}
