// WHAT THIS FILE DOES: A loading placeholder shaped exactly like a real
// ProjectCard (components/ProjectCard.js) — a rectangle where the image
// goes, then shorter bars standing in for the category tag, title,
// description, and tech tags. Shown in place of real project cards while
// they're still being fetched, on the homepage and the /projects page.

import Skeleton from "@/components/Skeleton";

export default function ProjectCardSkeleton({ imageClassName = "aspect-[16/10]" }) {
  return (
    <div>
      <div className="overflow-hidden rounded-[14px] bg-card ring-1 ring-white/8">
        <div className="h-8 border-b border-white/6" />
        <Skeleton width="100%" height="auto" rounded="0" className={imageClassName} />
      </div>
      <div className="mt-5 flex items-start justify-between gap-6">
        <Skeleton width="60%" height="1.5rem" />
        <Skeleton width="4.5rem" height="0.875rem" />
      </div>
      <div className="mt-3 flex flex-col gap-2">
        <Skeleton width="100%" height="0.875rem" />
        <Skeleton width="80%" height="0.875rem" />
      </div>
      <div className="mt-4 flex gap-1.5">
        <Skeleton width="3.5rem" height="1.4rem" rounded="6px" />
        <Skeleton width="4.5rem" height="1.4rem" rounded="6px" />
        <Skeleton width="4rem" height="1.4rem" rounded="6px" />
      </div>
    </div>
  );
}
