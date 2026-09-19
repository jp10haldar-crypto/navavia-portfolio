// WHAT THIS FILE DOES: The one reusable "still loading" shape used
// everywhere on the site — a dark grey rounded rectangle with a soft
// light band sweeping across it on a loop. Every loading screen on the
// site is built out of several of these, sized and arranged to roughly
// match the real content that's about to replace them (e.g. a wide short
// one for a heading, a small circle for an avatar), so the page never
// looks broken or blank while data is being fetched, and doesn't visibly
// jump around once the real content arrives in its place.
//
// width/height accept anything CSS understands (e.g. "100%", "12rem",
// "3rem") — not just plain numbers — so this can be shaped into a full
// rectangle, a short text-line bar, or a perfect circle (pass the same
// value for width, height, and a large `rounded`).

export default function Skeleton({
  width = "100%",
  height = "1rem",
  rounded = "0.5rem",
  className = "",
}) {
  return (
    <div
      className={`relative overflow-hidden bg-card ${className}`}
      style={{ width, height, borderRadius: rounded }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}
