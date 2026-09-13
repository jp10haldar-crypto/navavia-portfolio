// WHAT THIS FILE DOES: A single project "card" — used on both the homepage
// Featured Work section and the full Projects grid page, so it only has to
// be built once and looks the same everywhere. The whole card is a link to
// that project's detail page. It runs in the browser (not just once on the
// server) because it needs to detect when a screenshot image fails to load
// and swap in a placeholder box instead.

"use client";

import Link from "next/link";
import { useState } from "react";

export default function ProjectCard({ project }) {
  const [imageFailed, setImageFailed] = useState(false);
  // The first screenshot is normally { url, caption }; older projects
  // saved before captions existed have a plain URL string instead — this
  // works with either.
  const firstScreenshot = project.customerScreenshots?.[0];
  const thumbnail =
    typeof firstScreenshot === "string" ? firstScreenshot : firstScreenshot?.url;
  const showImage = thumbnail && !imageFailed;

  return (
    <Link
      href={`/projects/${project.id}`}
      className="group block overflow-hidden rounded-xl border border-white/10 bg-card transition-all duration-200 hover:-translate-y-1 hover:border-accent"
    >
      <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden bg-background">
        {showImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumbnail}
            alt={project.title}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="px-4 text-center text-sm font-medium text-muted">
            {project.title}
          </span>
        )}
      </div>

      <div className="p-5">
        <span className="text-xs font-semibold uppercase tracking-wide text-accent">
          {project.category}
        </span>
        <h3 className="mt-2 text-lg font-semibold text-foreground">
          {project.title}
        </h3>
        <p className="mt-2 text-sm text-muted">{project.shortDescription}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.techUsed.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-background px-3 py-1 text-xs text-muted"
            >
              {tech}
            </span>
          ))}
        </div>

        <span className="mt-5 inline-block text-sm font-medium text-accent">
          View Details →
        </span>
      </div>
    </Link>
  );
}
