// WHAT THIS FILE DOES: The detail page for one single project, visible at
// URLs like /projects/1 and /projects/2. The "[id]" in the folder name
// tells Next.js to make ONE page template that works for every project —
// it reads which project to show from the number in the URL itself,
// instead of needing a separate file per project. If that number doesn't
// match any real project, it shows a clean "not found" message instead of
// crashing.

import Link from "next/link";
import { projects } from "@/data/projects";
import ScreenshotGallery from "@/components/ScreenshotGallery";

export default async function ProjectDetailPage({ params }) {
  const { id } = await params;
  const project = projects.find((item) => String(item.id) === id);

  if (!project) {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="text-2xl font-bold text-foreground">
          Project not found
        </h1>
        <p className="mt-3 text-muted">
          The project you&apos;re looking for doesn&apos;t exist or may have
          been removed.
        </p>
        <Link
          href="/projects"
          className="mt-6 inline-block rounded-full border border-accent px-6 py-3 font-semibold text-accent transition-colors hover:bg-accent hover:text-background"
        >
          Back to All Projects
        </Link>
      </div>
    );
  }

  const hasAdminScreenshots = project.adminScreenshots?.length > 0;

  return (
    <div>
      {/* TOP SECTION: category, title, description, tech tags, CTA buttons */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <span className="text-xs font-semibold uppercase tracking-wide text-accent">
          {project.category}
        </span>
        <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-4 max-w-2xl text-muted">{project.longDescription}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.techUsed.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-card px-3 py-1 text-xs text-muted"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          {/* Hidden entirely if this project has no live link yet */}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-accent px-6 py-3 text-center font-semibold text-background transition-opacity hover:opacity-90"
            >
              Visit Live Site
            </a>
          )}
          <Link
            href="/projects"
            className="rounded-full border border-accent px-6 py-3 text-center font-semibold text-accent transition-colors hover:bg-accent hover:text-background"
          >
            Back to All Projects
          </Link>
        </div>
      </section>

      {/* VIDEO WALKTHROUGH SECTION — hidden completely if there's no video yet */}
      {project.youtubeId && (
        <section className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            See It In Action
          </h2>
          {/* This wrapper keeps the video at a 16:9 shape at any screen
              width, so it resizes cleanly on mobile instead of overflowing. */}
          <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-lg bg-card">
            <iframe
              src={`https://www.youtube.com/embed/${project.youtubeId}`}
              title={`${project.title} walkthrough video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </section>
      )}

      {/* CUSTOMER VIEW SECTION */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
          What Your Customers See
        </h2>
        <p className="mt-2 text-muted">
          The public-facing website your visitors use.
        </p>
        <div className="mt-8">
          <ScreenshotGallery
            screenshots={project.customerScreenshots}
            altPrefix={`${project.title} — customer view`}
          />
        </div>
      </section>

      {/* ADMIN PANEL SECTION — a visibly different background shade marks
          this as a separate area; hidden completely if there are no admin
          screenshots yet. */}
      {hasAdminScreenshots && (
        <section className="bg-card">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              The Admin Panel You Control
            </h2>
            <p className="mt-2 text-muted">
              Add products, update prices, approve reviews — no developer
              needed.
            </p>
            <div className="mt-8">
              <ScreenshotGallery
                screenshots={project.adminScreenshots}
                altPrefix={`${project.title} — admin panel`}
              />
            </div>
          </div>
        </section>
      )}

      {/* BOTTOM CALL TO ACTION */}
      <section className="mx-auto max-w-6xl px-6 py-16 text-center">
        <p className="text-xl font-semibold text-foreground">
          Want something like this for your business?
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-block rounded-full bg-accent px-6 py-3 font-semibold text-background transition-opacity hover:opacity-90"
        >
          Get in Touch
        </Link>
      </section>
    </div>
  );
}
