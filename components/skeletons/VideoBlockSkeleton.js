// WHAT THIS FILE DOES: A loading placeholder shaped like one video block
// in the homepage's "How We Work" section (components/HomepageVideos.js)
// — a wide rectangle standing in for the video, with a title bar
// underneath. Shown while the list of homepage videos is still loading.

import Skeleton from "@/components/Skeleton";

export default function VideoBlockSkeleton() {
  return (
    <div>
      <Skeleton width="100%" height="auto" className="aspect-video" />
      <div className="mt-3">
        <Skeleton width="60%" height="1.1rem" />
      </div>
    </div>
  );
}
