// WHAT THIS FILE DOES: The admin's project list, visible at /admin/projects.
// Shows every project in a table with Edit/Preview/Delete buttons, and an
// "Add New Project" button at the top. Preview opens that project's public
// page in a new tab (so you never lose your place in the admin panel).
// Deleting always asks for confirmation first, so nothing gets removed by
// an accidental click. Runs in the browser so it can load the live list
// and react to clicks.

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllProjects, deleteProject } from "@/lib/firestore";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState(undefined); // undefined = still loading
  const [loadError, setLoadError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  function loadProjects() {
    return getAllProjects().then((result) => {
      if (result.success) {
        setProjects(result.data);
      } else {
        setLoadError(result.message);
      }
    });
  }

  useEffect(() => {
    loadProjects();
  }, []);

  async function handleDelete(project) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${project.title}"? This cannot be undone.`
    );
    if (!confirmed) return;

    setDeletingId(project.id);
    const result = await deleteProject(project.id);
    setDeletingId(null);

    if (result.success) {
      setProjects((current) => current.filter((item) => item.id !== project.id));
    } else {
      window.alert(result.message);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90"
        >
          Add New Project
        </Link>
      </div>

      {loadError && <p className="mt-6 text-muted">{loadError}</p>}
      {!loadError && projects === undefined && (
        <p className="mt-6 text-muted">Loading projects...</p>
      )}
      {!loadError && projects?.length === 0 && (
        <p className="mt-6 text-muted">
          No projects yet. Click &quot;Add New Project&quot; above, or import
          the starter data from the Dashboard.
        </p>
      )}

      {!loadError && projects?.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-muted">
                <th className="py-3 pr-4">Title</th>
                <th className="py-3 pr-4">Category</th>
                <th className="py-3 pr-4">Featured</th>
                <th className="py-3 pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-white/10">
                  <td className="py-3 pr-4 text-foreground">{project.title}</td>
                  <td className="py-3 pr-4 text-muted">{project.category}</td>
                  <td className="py-3 pr-4 text-muted">
                    {project.featured ? "Yes" : "No"}
                  </td>
                  <td className="py-3 pr-4">
                    <div className="flex gap-4">
                      <Link
                        href={`/admin/projects/${project.id}/edit`}
                        className="text-accent hover:opacity-80"
                      >
                        Edit
                      </Link>
                      {/* Opens in a new tab on purpose, so previewing the
                          public page never loses your place in the admin
                          panel. */}
                      <a
                        href={`/projects/${project.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted hover:text-foreground"
                      >
                        Preview ↗
                      </a>
                      <button
                        type="button"
                        onClick={() => handleDelete(project)}
                        disabled={deletingId === project.id}
                        className="text-red-400 hover:opacity-80 disabled:opacity-50"
                      >
                        {deletingId === project.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
