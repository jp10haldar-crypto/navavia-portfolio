// WHAT THIS FILE DOES: A single project "card" — used on both the homepage
// Featured Work section and the full Projects grid page, so it only has to
// be built once and looks the same everywhere. The whole card is a link to
// that project's detail page. The screenshot sits in a small browser
// window; if the project has admin-panel screenshots, hovering (or
// keyboard-focusing) the card switches the picture from the customer view
// to the admin panel — the same "both sides" idea as the homepage's
// headline picture. It runs in the browser (not just once on the server)
// because it needs to detect when a screenshot image fails to load and
// swap in a placeholder instead.
//
// `imageClassName` lets a layout give the picture a different shape (the
// homepage's Featured Work uses a taller, fixed height on wide screens).

"use client";

import Link from "next/link";
import { useState } from "react";

// Screenshots are normally { url, caption }; older projects saved before
// captions existed have a plain URL string instead — this works with
// either.
function firstUrl(screenshots) {
  const first = screenshots?.[0];
  return typeof first === "string" ? first : first?.url;
}

export default function ProjectCard({
  project,
  imageClassName = "aspect-[16/10]",
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const [adminFailed, setAdminFailed] = useState(false);
  const thumbnail = firstUrl(project.customerScreenshots);
  const adminThumbnail = firstUrl(project.adminScreenshots);
  const showImage = thumbnail && !imageFailed;
  const showAdmin = showImage && adminThumbnail && !adminFailed;

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
          {showImage ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={thumbnail}
                alt={project.title}
                loading="lazy"
                onError={() => setImageFailed(true)}
                className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 [transition-timing-function:var(--ease-form)] group-hover:scale-[1.03]"
              />
              {showAdmin && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={adminThumbnail}
                  alt=""
                  loading="lazy"
                  onError={() => setAdminFailed(true)}
                  className="absolute inset-0 h-full w-full object-cover object-top opacity-0 transition-[opacity,clip-path] duration-700 [clip-path:inset(0_0_0_100%)] [transition-timing-function:var(--ease-form)] group-hover:opacity-100 group-hover:[clip-path:inset(0_0_0_0)] group-focus-visible:opacity-100 group-focus-visible:[clip-path:inset(0_0_0_0)]"
                />
              )}
            </>
          ) : (
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
