// WHAT THIS FILE DOES: The "Featured Work" section shown on the homepage,
// just below the main headline. It just displays whichever projects are
// handed to it — the homepage is the one that fetches from the real
// database and decides which projects count as "featured" before passing
// them in here. If there are none, this section hides itself completely.
// Its heading/subheading come from the admin Pages editor (with fallback
// defaults if left blank).

import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";

export default function FeaturedWork({
  projects,
  heading = "Featured Work",
  subheading = "",
}) {
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
        {heading || "Featured Work"}
      </h2>
      {subheading && <p className="mt-3 max-w-xl text-muted">{subheading}</p>}

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/projects"
          className="font-medium text-accent transition-opacity hover:opacity-80"
        >
          See All Projects →
        </Link>
      </div>
    </section>
  );
}
