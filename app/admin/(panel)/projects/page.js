// WHAT THIS FILE DOES: The admin's project list, visible at /admin/projects.
// Shows every project in a table with Edit/Preview/Delete buttons, and an
// "Add New Project" button at the top. Preview opens that project's public
// page in a new tab (so you never lose your place in the admin panel).
// Deleting always asks for confirmation first, so nothing gets removed by
// an accidental click.
// The list is in the same order the projects appear on the public site
// (homepage Featured Work and /projects). Change it by dragging a row by
// its ⠿ handle, or with the ↑ / ↓ buttons (which also work on a phone,
// where dragging doesn't). Each change saves immediately. Runs in the
// browser so it can load the live list and react to clicks and drags.

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllProjects, deleteProject, reorderProjects } from "@/lib/firestore";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState(undefined); // undefined = still loading
  const [loadError, setLoadError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [dragIndex, setDragIndex] = useState(null);
  const [dropIndex, setDropIndex] = useState(null);
  const [isSavingOrder, setIsSavingOrder] = useState(false);
  const [orderMessage, setOrderMessage] = useState("");

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

  // Moves the project at `fromIndex` to `toIndex`, shows the new order
  // straight away, then saves it. If saving fails, the previous order is
  // put back so the screen never shows an order that wasn't saved.
  async function moveProject(fromIndex, toIndex) {
    if (
      isSavingOrder ||
      fromIndex === toIndex ||
      toIndex < 0 ||
      toIndex >= projects.length
    ) {
      return;
    }

    const previous = projects;
    const reordered = [...projects];
    const [moved] = reordered.splice(fromIndex, 1);
    reordered.splice(toIndex, 0, moved);
    setProjects(reordered);
    setIsSavingOrder(true);
    setOrderMessage("Saving order...");

    const result = await reorderProjects(reordered);
    setIsSavingOrder(false);
    if (result.success) {
      setOrderMessage("Order saved. It's live on the site.");
    } else {
      setProjects(previous);
      setOrderMessage(result.message);
    }
  }

  function handleDrop(targetIndex) {
    const fromIndex = dragIndex;
    setDragIndex(null);
    setDropIndex(null);
    if (fromIndex !== null) moveProject(fromIndex, targetIndex);
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
        <p className="mt-6 text-sm text-muted">
          This is the order projects appear on the site. Drag a row by its ⠿
          handle, or use the ↑ ↓ buttons, to change it.
          {orderMessage && (
            <span role="status" className="ml-2 text-foreground">
              {orderMessage}
            </span>
          )}
        </p>
      )}

      {!loadError && projects?.length > 0 && (
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[660px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-muted">
                <th className="w-24 py-3 pr-4">Order</th>
                <th className="py-3 pr-4">Title</th>
                <th className="py-3 pr-4">Category</th>
                <th className="py-3 pr-4">Featured</th>
                <th className="py-3 pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr
                  key={project.id}
                  draggable={!isSavingOrder}
                  onDragStart={() => setDragIndex(index)}
                  onDragEnd={() => {
                    setDragIndex(null);
                    setDropIndex(null);
                  }}
                  onDragOver={(event) => {
                    event.preventDefault();
                    setDropIndex(index);
                  }}
                  onDrop={() => handleDrop(index)}
                  className={`border-b border-white/10 transition-colors ${
                    dragIndex === index ? "opacity-40" : ""
                  } ${
                    dropIndex === index && dragIndex !== index
                      ? "bg-accent/10"
                      : ""
                  }`}
                >
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-1 text-muted">
                      <span
                        className="cursor-move select-none px-1 text-lg"
                        title="Drag to reorder"
                        aria-hidden="true"
                      >
                        ⠿
                      </span>
                      <button
                        type="button"
                        onClick={() => moveProject(index, index - 1)}
                        disabled={index === 0 || isSavingOrder}
                        aria-label={`Move "${project.title}" up`}
                        className="rounded px-1.5 py-0.5 hover:bg-white/10 hover:text-foreground disabled:opacity-30 disabled:hover:bg-transparent"
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        onClick={() => moveProject(index, index + 1)}
                        disabled={index === projects.length - 1 || isSavingOrder}
                        aria-label={`Move "${project.title}" down`}
                        className="rounded px-1.5 py-0.5 hover:bg-white/10 hover:text-foreground disabled:opacity-30 disabled:hover:bg-transparent"
                      >
                        ↓
                      </button>
                    </div>
                  </td>
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
