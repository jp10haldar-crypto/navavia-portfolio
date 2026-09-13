// WHAT THIS FILE DOES: The "How We Work" video section on the homepage —
// general videos about the business itself (separate from the per-project
// walkthrough videos on each project's own page). It just displays
// whichever videos are handed to it, already filtered to published-only
// and sorted by display order — the homepage is the one that fetches from
// the real database and decides that before passing them in here. The
// first video shows large; the rest show smaller in a row beneath it. If
// there are none, this section hides itself completely.

export default function HomepageVideos({ videos }) {
  if (!videos || videos.length === 0) {
    return null;
  }

  const [featuredVideo, ...otherVideos] = videos;

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
        How We Work
      </h2>
      <p className="mt-3 max-w-xl text-muted">
        A closer look at what we build and how we build it.
      </p>

      <div className="mt-8">
        <VideoBlock video={featuredVideo} />

        {otherVideos.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherVideos.map((video) => (
              <VideoBlock key={video.id} video={video} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function VideoBlock({ video }) {
  return (
    <div>
      {/* This wrapper keeps the video at a 16:9 shape at any screen width,
          so it resizes cleanly on mobile instead of overflowing. */}
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-card">
        {video.youtubeId ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-muted">
            Video coming soon
          </div>
        )}
      </div>
      <p className="mt-3 font-semibold text-foreground">{video.title}</p>
      {video.description && (
        <p className="mt-1 text-sm text-muted">{video.description}</p>
      )}
    </div>
  );
}
