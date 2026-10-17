// WHAT THIS FILE DOES: The "How We Work" video section on the homepage —
// general videos about the business itself (separate from the per-project
// walkthrough videos on each project's own page). It just displays
// whichever videos are handed to it, already filtered to published-only
// and sorted by display order — the homepage is the one that fetches from
// the real database and decides that before passing them in here. The
// first video shows large; the rest show smaller in a row beneath it. If
// there are none, this section hides itself completely. Its heading/
// subheading come from the admin Pages editor (with fallback defaults if
// left blank).

import SectionHeading from "@/components/SectionHeading";

export default function HomepageVideos({
  videos,
  heading = "How We Work",
  subheading = "A closer look at what we build and how we build it.",
}) {
  if (!videos || videos.length === 0) {
    return null;
  }

  const [featuredVideo, ...otherVideos] = videos;

  return (
    <section className="relative border-y border-white/6 bg-card/40">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-10">
        <SectionHeading heading={heading || "How We Work"} subheading={subheading} />

        <div className="mt-14">
          <VideoBlock video={featuredVideo} large />

          {otherVideos.length > 0 && (
            <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {otherVideos.map((video) => (
                <VideoBlock key={video.id} video={video} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function VideoBlock({ video, large = false }) {
  return (
    <div className={large ? "grid gap-8 lg:grid-cols-12 lg:items-end" : ""}>
      {/* This wrapper keeps the video at a 16:9 shape at any screen width,
          so it resizes cleanly on mobile instead of overflowing. */}
      <div
        className={`relative aspect-video w-full overflow-hidden rounded-[14px] bg-background ring-1 ring-white/10 ${
          large ? "lg:col-span-9" : ""
        }`}
      >
        {video.youtubeId ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <div className="blueprint-grid absolute inset-0 flex items-center justify-center text-sm text-muted [mask-image:none]">
            <span className="rounded-md bg-background px-3 py-1.5">Video coming soon</span>
          </div>
        )}
      </div>
      <div className={large ? "lg:col-span-3 lg:pb-2" : "mt-4"}>
        <p
          className={`font-display font-semibold leading-tight text-foreground ${
            large ? "text-[1.75rem]" : "text-[1.25rem]"
          }`}
        >
          {video.title}
        </p>
        {video.description && (
          <p className="mt-2 text-[0.97rem] text-muted">{video.description}</p>
        )}
      </div>
    </div>
  );
}
