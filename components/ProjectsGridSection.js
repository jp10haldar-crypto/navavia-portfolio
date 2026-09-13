// WHAT THIS FILE DOES: The filterable grid of every project, used on the
// /projects page as one of its admin-editable sections. Runs in the
// browser because clicking a filter button needs to instantly change what
// shows, without reloading the page. The projects themselves come from the
// real database (passed in from the page); only this section's heading/
// subheading are admin-controlled.

"use client";

import { useState } from "react";
import ProjectCard from "@/components/ProjectCard";

const FILTERS = [
  { label: "All", value: "All" },
  { label: "Websites", value: "Website" },
  { label: "Mobile Apps", value: "Mobile App" },
];

export default function ProjectsGridSection({ projects, heading, subheading }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const visibleProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      {heading && (
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
          {heading}
        </h2>
      )}
      {subheading && <p className="mt-3 max-w-xl text-muted">{subheading}</p>}

      <div className="mt-2 flex flex-wrap gap-3">
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
