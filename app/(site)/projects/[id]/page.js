// WHAT THIS FILE DOES: The detail page for one single project, visible at
// URLs like /projects/1 and /projects/2. The "[id]" in the folder name
// tells Next.js to make ONE page template that works for every project —
// it reads which project to show from the database using the id in the
// URL. While that's loading it shows a skeleton screen shaped like the
// real page; if the id doesn't match any real project it shows a clean
// "not found" message; if the database can't be reached it shows a clean
// error message — never a crash or a blank page.

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getProjectById, getAllReviews } from "@/lib/firestore";
import ScreenshotGallery from "@/components/ScreenshotGallery";
import ReviewsSection from "@/components/ReviewsSection";
import ProjectDetailSkeleton from "@/components/skeletons/ProjectDetailSkeleton";
import FormingText from "@/components/FormingText";
import SectionHeading from "@/components/SectionHeading";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const [status, setStatus] = useState("loading"); // loading | notfound | error | ready
  const [project, setProject] = useState(null);
  const [projectReviews, setProjectReviews] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function load() {
      const [projectResult, reviewsResult] = await Promise.all([
        getProjectById(id),
        getAllReviews(),
      ]);

      if (!isMounted) return;

      if (!projectResult.success) {
        setStatus("notfound");
        return;
      }

      setProject(projectResult.data);
      setProjectReviews(
        reviewsResult.success
          ? reviewsResult.data.filter(
              (review) => String(review.projectId) === String(id)
            )
          : []
      );
      setStatus("ready");
    }

    load().catch(() => {
      if (isMounted) {
        setErrorMessage(
          "Something went wrong loading this project. Please try again."
        );
        setStatus("error");
      }
    });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (status === "loading") {
    return <ProjectDetailSkeleton />;
  }

  if (status === "error") {
    return (
      <div className="mx-auto max-w-7xl px-6 py-28 text-muted lg:px-10">
        {errorMessage}
      </div>
    );
  }

  if (status === "notfound") {
    return (
      <div className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
        <h1 className="font-display text-[clamp(2.25rem,5vw,3.75rem)] font-semibold text-foreground">
          Project not found
        </h1>
        <p className="mt-4 max-w-lg text-lg text-muted">
          This project doesn&apos;t exist or may have been removed. Browse
          the full list of projects instead.
        </p>
        <Link href="/projects" className="btn-idea mt-8">
          Back to all projects
        </Link>
      </div>
    );
  }

  const hasAdminScreenshots = project.adminScreenshots?.length > 0;

  return (
    <div>
      {/* TOP SECTION: category, title, description, tech tags, CTA buttons */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="blueprint-grid pointer-events-none absolute inset-x-0 -top-32 h-[140%]"
        />
        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-12 sm:pt-16 lg:px-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 5l-5 5 5 5" />
            </svg>
            All projects
          </Link>

          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              {project.category && <p className="text-muted">{project.category}</p>}
              <FormingText
                text={project.title}
                weight={640}
                className="font-display mt-3 text-[clamp(2.5rem,6vw,4.75rem)] leading-[1.02] tracking-[-0.024em] text-foreground"
              />
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
                {project.longDescription}
              </p>
            </div>

            <div className="flex flex-col gap-8 lg:col-span-4 lg:pt-10">
              {project.techUsed?.length > 0 && (
                <div>
                  <p className="text-sm text-muted">Built with</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {project.techUsed.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-md px-2.5 py-1 text-sm text-foreground ring-1 ring-white/10"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                {/* Hidden entirely if this project has no live link yet */}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-form"
                  >
                    Visit live site
                  </a>
                )}
                <Link href="/contact" className="btn-idea">
                  Start a similar project
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO WALKTHROUGH SECTION — always shown. If there's no video yet,
          a placeholder box fills the same space instead of leaving an
          empty-looking gap. */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <SectionHeading heading="See it in action" />
        {/* This wrapper keeps the video at a 16:9 shape at any screen width,
            so it resizes cleanly on mobile instead of overflowing. */}
        <div className="relative mt-10 aspect-video w-full overflow-hidden rounded-[16px] bg-card ring-1 ring-white/10">
          {project.youtubeId ? (
            <iframe
              src={`https://www.youtube.com/embed/${project.youtubeId}`}
              title={`${project.title} walkthrough video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <div className="blueprint-grid absolute inset-0 flex flex-col items-center justify-center gap-4 [mask-image:none]">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-line bg-card">
                <svg
                  viewBox="0 0 24 24"
                  className="ml-1 h-6 w-6 fill-foreground"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <p className="rounded-md bg-card px-3 py-1 text-sm text-muted">
                Walkthrough video coming soon
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CUSTOMER VIEW SECTION */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <SectionHeading
          heading="What your customers see"
          subheading="The public-facing website your visitors use."
        />
        <div className="mt-10">
          <ScreenshotGallery
            screenshots={project.customerScreenshots}
            altPrefix={`${project.title} — customer view`}
          />
        </div>
      </section>

      {/* ADMIN PANEL SECTION — a blueprint-grid band marks this as a
          separate area; hidden completely if there are no admin
          screenshots yet. */}
      {hasAdminScreenshots && (
        <section className="relative mt-8 overflow-hidden border-y border-white/6 bg-card/50">
          <div
            aria-hidden="true"
            className="blueprint-grid pointer-events-none absolute inset-0"
          />
          <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10">
            <SectionHeading
              heading="The admin panel you control"
              subheading="Add products, update prices, approve reviews. No developer needed."
            />
            <div className="mt-10">
              <ScreenshotGallery
                screenshots={project.adminScreenshots}
                altPrefix={`${project.title} — admin panel`}
              />
            </div>
          </div>
        </section>
      )}

      {/* CLIENT REVIEW SECTION — only shows reviews tied to this exact
          project; hides itself completely if there are none. */}
      <ReviewsSection heading="What this client said" reviews={projectReviews} />

      {/* BOTTOM CALL TO ACTION */}
      <section className="mx-auto max-w-7xl px-6 pb-28 pt-12 lg:px-10">
        <div className="flex flex-col gap-8 border-t border-white/10 pt-14 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="font-display max-w-2xl text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.04] text-foreground">
            Want something like this for your business?
          </h2>
          <Link href="/contact" className="btn-form self-start lg:self-auto">
            Start a project
          </Link>
        </div>
      </section>
    </div>
  );
}
