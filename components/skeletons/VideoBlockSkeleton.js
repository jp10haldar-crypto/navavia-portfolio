// WHAT THIS FILE DOES: A loading placeholder shaped like one video block
// in the homepage's "How We Work" section (components/HomepageVideos.js)
// — a wide rectangle standing in for the video, with a title bar
// underneath. Shown while the list of homepage videos is still loading.

import Skeleton from "@/components/Skeleton";

export default function VideoBlockSkeleton() {
  return <Skeleton width="100%" height="auto" rounded="14px" className="aspect-video" />;
}
