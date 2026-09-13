// WHAT THIS FILE DOES: The "Edit Video" page, visible at
// /admin/homepage-videos/[videoId]/edit. It first loads that one video
// from the database, then hands its current details to the shared
// HomepageVideoForm so the fields start out already filled in. Runs in
// the browser because it fetches data after the page opens.

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getHomepageVideoById } from "@/lib/firestore";
import HomepageVideoForm from "@/components/admin/HomepageVideoForm";

export default function EditHomepageVideoPage() {
  const { videoId } = useParams();
  const [video, setVideo] = useState(undefined); // undefined = still loading
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let isMounted = true;

    getHomepageVideoById(videoId).then((result) => {
      if (!isMounted) return;
      if (result.success) {
        setVideo(result.data);
      } else {
        setLoadError(result.message);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [videoId]);

  if (loadError) {
    return <p className="text-muted">{loadError}</p>;
  }

  if (video === undefined) {
    return <p className="text-muted">Loading video...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Edit Video</h1>
      <div className="mt-8">
        <HomepageVideoForm videoId={videoId} initialVideo={video} />
      </div>
    </div>
  );
}
