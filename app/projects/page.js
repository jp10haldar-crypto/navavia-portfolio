// WHAT THIS FILE DOES: The "Our Work" page, visible at /projects. Next.js
// automatically turns this file into that page. It shows every project as
// a card in a grid, with filter buttons (All / Websites / Mobile Apps)
// above it. It runs in the browser because clicking a filter button needs
// to instantly change what's shown, without reloading the page.

"use client";

import { useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

const FILTERS = [
  { label: "All", value: "All" },
  { label: "Websites", value: "Website" },
  { label: "Mobile Apps", value: "Mobile App" },
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const visibleProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
        Our Work
      </h1>
      <p className="mt-3 max-w-xl text-muted">
        Websites and mobile applications we have built and delivered.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        {FILTERS.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => setActiveFilter(filter.value)}
            className={
              activeFilter === filter.value
                ? "rounded-full border border-accent px-4 py-2 text-sm font-medium text-accent"
                : "rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
            }
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
