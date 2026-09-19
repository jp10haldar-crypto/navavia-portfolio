// WHAT THIS FILE DOES: A loading placeholder shaped exactly like a real
// ProjectCard (components/ProjectCard.js) — a rectangle where the image
// goes, then shorter bars standing in for the category tag, title,
// description, and tech tags. Shown in place of real project cards while
// they're still being fetched, on the homepage and the /projects page.

import Skeleton from "@/components/Skeleton";

export default function ProjectCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-card">
      <Skeleton width="100%" height="auto" rounded="0" className="aspect-video" />
      <div className="flex flex-col gap-3 p-5">
        <Skeleton width="30%" height="0.7rem" rounded="9999px" />
        <Skeleton width="70%" height="1.25rem" />
        <div className="flex flex-col gap-2">
          <Skeleton width="100%" height="0.875rem" />
          <Skeleton width="85%" height="0.875rem" />
        </div>
        <div className="mt-1 flex gap-2">
          <Skeleton width="3.5rem" height="1.5rem" rounded="9999px" />
          <Skeleton width="4.5rem" height="1.5rem" rounded="9999px" />
        </div>
      </div>
    </div>
  );
}
