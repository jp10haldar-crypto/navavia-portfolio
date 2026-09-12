// WHAT THIS FILE DOES: The "Featured Work" section shown on the homepage,
// just below the main headline. It shows only the projects marked
// featured: true in data/projects.js, plus a link to the full Projects
// page. It renders once on the server — nothing here needs to react to
// clicks itself (the cards inside handle their own image fallback).

import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function FeaturedWork() {
  const featuredProjects = projects.filter((project) => project.featured);

  if (featuredProjects.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
        Featured Work
      </h2>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project) => (
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
