// WHAT THIS FILE DOES: The "Our Work" page, visible at /projects. It loads
// every project from the real database (instead of the old dummy list),
// then shows them in a filterable grid. While loading, it shows a simple
// loading message; if the database can't be reached, it shows a clean
// message instead of crashing or leaving a blank page. Runs in the browser
// because clicking a filter button needs to instantly change what's shown.

"use client";

import { useEffect, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import { getAllProjects } from "@/lib/firestore";

const FILTERS = [
  { label: "All", value: "All" },
  { label: "Websites", value: "Website" },
  { label: "Mobile Apps", value: "Mobile App" },
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [status, setStatus] = useState("loading"); // loading | error | ready
  const [projects, setProjects] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    getAllProjects().then((result) => {
      if (!isMounted) return;
      if (result.success) {
        setProjects(result.data);
        setStatus("ready");
      } else {
        setErrorMessage(result.message);
        setStatus("error");
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

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

      {status === "loading" && (
        <p className="mt-10 text-muted">Loading projects...</p>
      )}
      {status === "error" && <p className="mt-10 text-muted">{errorMessage}</p>}

      {status === "ready" && (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
