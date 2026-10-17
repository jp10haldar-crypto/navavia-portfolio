// WHAT THIS FILE DOES: The "Featured Work" section shown on the homepage,
// just below the main headline. It just displays whichever projects are
// handed to it — the homepage is the one that fetches from the real
// database and decides which projects count as "featured" before passing
// them in here. If there are none, this section hides itself completely.
// Its heading/subheading come from the admin Pages editor (with fallback
// defaults if left blank).
//
// Laid out as an uneven grid on wide screens — rows alternate between a
// wide card + narrow card and narrow + wide — so it reads as a curated
// selection rather than a uniform catalogue.

import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";

// Column spans (out of 12) for each card position, repeating every four.
const SPANS = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

export default function FeaturedWork({
  projects,
  heading = "Featured Work",
  subheading = "",
}) {
  if (!projects || projects.length === 0) {
    return null;
  }

  // A lone last card on its own row gets the full width instead of
  // leaving a gap beside it.
  const isLoneLast = (index) => index === projects.length - 1 && index % 2 === 0;

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-10">
      <SectionHeading
        heading={heading || "Featured Work"}
        subheading={subheading}
        action={
          <Link href="/projects" className="btn-idea">
            All projects
          </Link>
        }
      />

      <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-12">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={isLoneLast(index) ? "sm:col-span-2 lg:col-span-12" : SPANS[index % 4]}
          >
            <ProjectCard
              project={project}
              imageClassName="aspect-[16/10] lg:aspect-auto lg:h-[26rem]"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
