// WHAT THIS FILE DOES: The "Our Work" page, visible at /projects. It loads
// every project from the real database, plus this page's admin-editable
// sections, then renders them via PageSections — including the filterable
// projects grid, which is itself an admin-editable section (its heading/
// subheading/position/visibility come from the admin Pages editor; the
// actual projects always come from the Projects admin area). While
// loading, it shows a simple loading message; if the database can't be
// reached, it shows a clean message instead of crashing or leaving a blank
// page.

"use client";

import { useEffect, useState } from "react";
import PageSections from "@/components/PageSections";
import { getAllProjects, getPageSections } from "@/lib/firestore";

export default function ProjectsPage() {
  const [status, setStatus] = useState("loading"); // loading | error | ready
  const [projects, setProjects] = useState([]);
  const [sections, setSections] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    Promise.all([getAllProjects(), getPageSections("projects")]).then(
      ([projectsResult, sectionsResult]) => {
        if (!isMounted) return;
        if (projectsResult.success) {
          setProjects(projectsResult.data);
          setSections(sectionsResult.success ? sectionsResult.data : []);
          setStatus("ready");
        } else {
          setErrorMessage(projectsResult.message);
          setStatus("error");
        }
      }
    );

    return () => {
      isMounted = false;
    };
  }, []);

  const visibleSections = sections.filter((section) => section.visible);

  return (
    <div>
      {status === "loading" && (
        <p className="mx-auto max-w-6xl px-6 py-16 text-center text-muted">
          Loading projects...
        </p>
      )}
      {status === "error" && (
        <p className="mx-auto max-w-6xl px-6 py-16 text-center text-muted">
          {errorMessage}
        </p>
      )}
      {status === "ready" && (
        <PageSections
          sections={visibleSections}
          data={{ projects }}
          pageTitleFromFirstSection
        />
      )}
    </div>
  );
}
