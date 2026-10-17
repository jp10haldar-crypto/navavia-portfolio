// WHAT THIS FILE DOES: A single project "card" — used on both the homepage
// Featured Work section and the full Projects grid page, so it only has to
// be built once and looks the same everywhere. The whole card is a link to
// that project's detail page. The screenshot sits in a small browser
// window; if the project has admin-panel screenshots, hovering (or
// keyboard-focusing) the card switches the picture from the customer view
// to the admin panel — the same "both sides" idea as the homepage's
// headline picture. It runs in the browser (not just once on the server)
// because it needs to detect when a screenshot image fails to load and
// swap in a placeholder instead, and to measure each screenshot's shape.
//
// The picture adapts to the screenshot's shape:
// - Wide screenshots (websites) fill the window, anchored to the top-left
//   corner so the site's logo and headline are never cut off.
// - Tall screenshots (phone apps) are shown as up to three phones side by
//   side, which spread apart slightly on hover — a phone screen cropped
//   into a wide box would only ever show its top strip.
// Until the first screenshot has loaded, the project's category ("Mobile
// App" or not) is used as the best guess for its shape.
//
// `imageClassName` lets a layout give the picture a different shape (the
// homepage's Featured Work uses a taller, fixed height on wide screens).

"use client";

import Link from "next/link";
import { useCallback, useState } from "react";

// Screenshots are normally { url, caption }; older projects saved before
// captions existed have a plain URL string instead — this works with
// either.
function screenshotUrls(screenshots) {
  return (screenshots || [])
    .map((item) => (typeof item === "string" ? item : item?.url))
    .filter(Boolean);
}

// Where each phone sits, by how many are shown: `x` is the sideways shift
// (as a fraction of one phone's width), `s` the scale. With three, the
// first screenshot stands in front, in the middle.
const PHONE_LAYOUTS = {
  1: [{ x: 0, s: 1, front: true }],
  2: [
    { x: -0.56, s: 1, front: true },
    { x: 0.56, s: 1, front: true },
  ],
  3: [
    { x: 0, s: 1, front: true },
    { x: -0.7, s: 0.86 },
    { x: 0.7, s: 0.86 },
  ],
};
const DEFAULT_PHONE_RATIO = 9 / 19.5;

export default function ProjectCard({
  project,
  imageClassName = "aspect-[16/10]",
}) {
  const [brokenUrls, setBrokenUrls] = useState([]);
  const [adminFailed, setAdminFailed] = useState(false);
  // Width ÷ height of the first screenshot, once it has loaded.
  const [shape, setShape] = useState(null);

  const customerUrls = screenshotUrls(project.customerScreenshots).filter(
    (url) => !brokenUrls.includes(url)
  );
  const thumbnail = customerUrls[0];
  const adminThumbnail = screenshotUrls(project.adminScreenshots)[0];
  const showImage = Boolean(thumbnail);
  const showAdmin = showImage && adminThumbnail && !adminFailed;
  const isPhone = shape ? shape < 1 : project.category === "Mobile App";
  const phoneRatio = shape && shape < 1 ? shape : DEFAULT_PHONE_RATIO;
  const phoneShots = customerUrls.slice(0, 3);
  const phoneLayout = PHONE_LAYOUTS[phoneShots.length] || [];

  // Reads the first screenshot's real shape — both when it finishes
  // loading and if it was already loaded (cached) before this ran.
  const measure = useCallback((img) => {
    if (img?.complete && img.naturalWidth) {
      setShape(img.naturalWidth / img.naturalHeight);
    }
  }, []);

  function markBroken(url) {
    setBrokenUrls((current) => (current.includes(url) ? current : [...current, url]));
  }

  return (
    <Link href={`/projects/${project.id}`} className="group block">
      <div className="overflow-hidden rounded-[14px] bg-card ring-1 ring-white/8 transition-[box-shadow,transform] duration-500 [transition-timing-function:var(--ease-form)] group-hover:-translate-y-1 group-hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)] group-hover:ring-white/15">
        <div className="flex h-8 items-center gap-1.5 border-b border-white/6 px-3">
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          {showAdmin && (
            <span className="relative ml-auto h-4 overflow-hidden text-[11px] leading-4 text-muted">
              <span className="block transition-transform duration-500 group-hover:-translate-y-4 group-focus-visible:-translate-y-4">
                Customer view
              </span>
              <span className="block text-accent transition-transform duration-500 group-hover:-translate-y-4 group-focus-visible:-translate-y-4">
                Admin panel
              </span>
            </span>
          )}
        </div>

        <div className={`relative w-full overflow-hidden ${imageClassName}`}>
          {showImage && isPhone && (
            <>
              <div
                aria-hidden="true"
                className="blueprint-grid absolute inset-0 [mask-image:none]"
              />
              {phoneShots.map((url, index) => {
                const position = phoneLayout[index];
                const isFirst = index === 0;
                return (
                  <div
                    key={url}
                    className="absolute left-1/2 top-[10%] h-[98%] origin-top transition-transform duration-700 [transition-timing-function:var(--ease-form)] group-hover:[--spread:1.16]"
                    style={{
                      aspectRatio: phoneRatio,
                      zIndex: position.front ? 2 : 1,
                      transform: `translateX(calc(-50% + ${position.x} * var(--spread, 1) * 100%)) scale(${position.s})`,
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={url}
                      alt={isFirst ? project.title : ""}
                      loading="lazy"
                      ref={isFirst ? measure : undefined}
                      onLoad={isFirst ? (event) => measure(event.currentTarget) : undefined}
                      onError={() => markBroken(url)}
                      className={`h-full w-full rounded-[16px] object-cover object-top shadow-[0_30px_60px_-20px_rgba(0,0,0,0.85)] ring-1 ring-white/15 transition-[filter] duration-700 ${
                        position.front ? "" : "brightness-[0.65] group-hover:brightness-90"
                      }`}
                    />
                  </div>
                );
              })}
            </>
          )}

          {showImage && !isPhone && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={thumbnail}
              alt={project.title}
              loading="lazy"
              ref={measure}
              onLoad={(event) => measure(event.currentTarget)}
              onError={() => markBroken(thumbnail)}
              className="absolute inset-0 h-full w-full object-cover object-left-top transition-transform duration-700 [transition-timing-function:var(--ease-form)] group-hover:scale-[1.03]"
            />
          )}

          {showAdmin && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={adminThumbnail}
              alt=""
              loading="lazy"
              onError={() => setAdminFailed(true)}
              className="absolute inset-0 z-10 h-full w-full bg-card object-cover object-left-top opacity-0 transition-[opacity,clip-path] duration-700 [clip-path:inset(0_0_0_100%)] [transition-timing-function:var(--ease-form)] group-hover:opacity-100 group-hover:[clip-path:inset(0_0_0_0)] group-focus-visible:opacity-100 group-focus-visible:[clip-path:inset(0_0_0_0)]"
            />
          )}

          {!showImage && (
            // No screenshot yet: shown as an unbuilt blueprint, in keeping
            // with the rest of the site.
            <div className="blueprint-grid absolute inset-0 flex items-center justify-center [mask-image:none]">
              <span className="font-display rounded-md bg-card px-4 py-2 text-center text-lg font-semibold text-muted">
                {project.title}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 flex items-start justify-between gap-6">
        <h3 className="font-display text-[1.5rem] font-semibold leading-tight text-foreground">
          <span className="link-draw">{project.title}</span>
        </h3>
        {project.category && (
          <span className="mt-1.5 shrink-0 text-sm text-muted">{project.category}</span>
        )}
      </div>
      {project.shortDescription && (
        <p className="mt-2 max-w-xl text-[0.97rem] text-muted">{project.shortDescription}</p>
      )}
      {project.techUsed?.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.techUsed.map((tech) => (
            <li
              key={tech}
              className="rounded-md px-2 py-0.5 text-[12.5px] text-muted ring-1 ring-white/10"
            >
              {tech}
            </li>
          ))}
        </ul>
      )}
    </Link>
  );
}
