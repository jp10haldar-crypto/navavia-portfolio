// WHAT THIS FILE DOES: The filterable grid of every project, used on the
// /projects page as one of its admin-editable sections. Runs in the
// browser because clicking a filter button needs to instantly change what
// shows, without reloading the page. The projects themselves come from the
// real database (passed in from the page); only this section's heading/
// subheading are admin-controlled.

"use client";

import { useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import FilterChips from "@/components/FilterChips";

const FILTERS = [
  { label: "All", value: "All" },
  { label: "Websites", value: "Website" },
  { label: "Mobile apps", value: "Mobile App" },
];

export default function ProjectsGridSection({ projects, heading, subheading }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const visibleProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-4 lg:px-10">
      <SectionHeading heading={heading} subheading={subheading} className="mb-10" />

      <FilterChips
        label="Filter projects"
        options={FILTERS}
        active={activeFilter}
        onChange={setActiveFilter}
      />

      <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {visibleProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {visibleProjects.length === 0 && (
        <p className="mt-4 text-muted">
          No projects in this category yet. Choose &ldquo;All&rdquo; to see
          everything.
        </p>
      )}
    </div>
  );
}
