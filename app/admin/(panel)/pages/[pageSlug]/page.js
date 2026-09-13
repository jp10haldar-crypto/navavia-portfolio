// WHAT THIS FILE DOES: The section editor for one page, visible at
// /admin/pages/[pageSlug] (e.g. /admin/pages/home). Shows every section on
// that page in order, with Add/Edit/Delete/reorder/visibility controls, and
// a Preview link that opens the real live page in a new tab. Runs in the
// browser because it reacts to drags, clicks, and form input.

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  getPageSections,
  addPageSection,
  updatePageSection,
  deletePageSection,
  reorderPageSections,
} from "@/lib/firestore";
import { MANAGED_PAGES } from "@/lib/pageList";
import SectionForm, {
  SECTION_TYPES,
  AUTOMATIC_SECTION_TYPES,
} from "@/components/admin/SectionForm";

const ALL_TYPES = [...SECTION_TYPES, ...AUTOMATIC_SECTION_TYPES];

function typeLabel(type) {
  return ALL_TYPES.find((t) => t.value === type)?.label || type;
}

export default function AdminPageSectionsEditor() {
  const params = useParams();
  const pageSlug = params.pageSlug;
  const pageInfo = MANAGED_PAGES.find((page) => page.slug === pageSlug);

  const [sections, setSections] = useState(undefined); // undefined = loading
  const [loadError, setLoadError] = useState("");
  const [mode, setMode] = useState("list"); // list | picking-type | editing
  const [editingSection, setEditingSection] = useState(null);
  const [newSectionType, setNewSectionType] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [dragIndex, setDragIndex] = useState(null);

  function loadSections() {
    return getPageSections(pageSlug).then((result) => {
      if (result.success) {
        setSections(result.data);
      } else {
        setLoadError(result.message);
      }
    });
  }

  useEffect(() => {
    if (pageInfo) {
      loadSections();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSlug]);

  if (!pageInfo) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-foreground">Page not found</h1>
        <p className="mt-2 text-muted">
          There&apos;s no manageable page called &quot;{pageSlug}&quot;.
        </p>
        <Link href="/admin/pages" className="mt-4 inline-block text-accent">
          ← Back to Pages
        </Link>
      </div>
    );
  }

  async function handleSave(values) {
    const sectionData = { ...values, page: pageSlug };

    if (editingSection) {
      const result = await updatePageSection(editingSection.id, sectionData);
      if (result.success) {
        setMode("list");
        setEditingSection(null);
        loadSections();
      }
      return result;
    }

    const nextOrder =
      (sections && sections.length > 0
        ? Math.max(...sections.map((s) => s.displayOrder ?? 0))
        : 0) + 1;
    const result = await addPageSection({
      ...sectionData,
      displayOrder: nextOrder,
    });
    if (result.success) {
      setMode("list");
      setNewSectionType(null);
      loadSections();
    }
    return result;
  }

  async function handleDelete(section) {
    const confirmed = window.confirm(
      `Delete this ${typeLabel(section.type)} section? This cannot be undone.`
    );
    if (!confirmed) return;

    setDeletingId(section.id);
    const result = await deletePageSection(section.id);
    setDeletingId(null);

    if (result.success) {
      setSections((current) => current.filter((s) => s.id !== section.id));
    } else {
      window.alert(result.message);
    }
  }

  async function handleToggleVisible(section) {
    const result = await updatePageSection(section.id, {
      visible: !section.visible,
    });
    if (result.success) {
      setSections((current) =>
        current.map((s) =>
          s.id === section.id ? { ...s, visible: !s.visible } : s
        )
      );
    } else {
      window.alert(result.message);
    }
  }

  async function handleReorderDrop(targetIndex) {
    if (dragIndex === null || dragIndex === targetIndex) return;

    const reordered = [...sections];
    const [moved] = reordered.splice(dragIndex, 1);
    reordered.splice(targetIndex, 0, moved);
    setDragIndex(null);
    setSections(reordered);

    const result = await reorderPageSections(reordered);
    if (result.success) {
      loadSections();
    } else {
      window.alert(result.message);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link href="/admin/pages" className="text-sm text-accent">
            ← Back to Pages
          </Link>
          <h1 className="mt-1 text-2xl font-bold text-foreground">
            {pageInfo.label} — Sections
          </h1>
        </div>
        <div className="flex gap-3">
          <a
            href={pageInfo.publicPath}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/10 px-5 py-2 text-sm font-medium text-foreground hover:border-accent"
          >
            Preview ↗
          </a>
          {mode === "list" && (
            <button
              type="button"
              onClick={() => setMode("picking-type")}
              className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90"
            >
              Add Section
            </button>
          )}
        </div>
      </div>

      {mode === "picking-type" && (
        <div className="mt-6 rounded-xl border border-white/10 bg-card p-6">
          <p className="font-semibold text-foreground">Choose a section type</p>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {ALL_TYPES.map((sectionType) => (
              <button
                key={sectionType.value}
                type="button"
                onClick={() => {
                  setNewSectionType(sectionType.value);
                  setMode("editing");
                }}
                className="rounded-lg border border-white/10 p-4 text-left transition-colors hover:border-accent"
              >
                <p className="font-medium text-foreground">
                  {sectionType.label}
                </p>
                <p className="mt-1 text-xs text-muted">
                  {sectionType.description}
                </p>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setMode("list")}
            className="mt-4 text-sm text-muted hover:text-foreground"
          >
            Cancel
          </button>
        </div>
      )}

      {mode === "editing" && (
        <div className="mt-6">
          <SectionForm
            type={editingSection ? editingSection.type : newSectionType}
            initialSection={editingSection}
            onSave={handleSave}
            onCancel={() => {
              setMode("list");
              setEditingSection(null);
              setNewSectionType(null);
            }}
          />
        </div>
      )}

      {mode === "list" && (
        <>
          {loadError && <p className="mt-6 text-muted">{loadError}</p>}

          {!loadError && sections === undefined && (
            <p className="mt-6 text-muted">Loading sections...</p>
          )}

          {!loadError && sections?.length === 0 && (
            <p className="mt-6 text-muted">
              No sections yet. Click &quot;Add Section&quot; above, or import
              the starter content from the Pages list.
            </p>
          )}

          {!loadError && sections?.length > 0 && (
            <>
              <p className="mt-6 text-sm text-muted">
                Drag a row by its handle to change its order.
              </p>
              <div className="mt-3 flex flex-col gap-2">
                {sections.map((section, index) => (
                  <div
                    key={section.id}
                    draggable
                    onDragStart={() => setDragIndex(index)}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={() => handleReorderDrop(index)}
                    className="flex items-center gap-4 rounded-xl border border-white/10 bg-card p-4"
                  >
                    <span
                      className="cursor-move select-none text-muted"
                      title="Drag to reorder"
                    >
                      ⠿
                    </span>

                    <div className="flex-1">
                      <p className="font-semibold text-foreground">
                        {section.heading || "(no heading)"}
                      </p>
                      <p className="text-xs text-muted">
                        {typeLabel(section.type)} · Order:{" "}
                        {section.displayOrder} ·{" "}
                        {section.visible ? (
                          <span className="text-accent">Visible</span>
                        ) : (
                          <span>Hidden</span>
                        )}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggleVisible(section)}
                      className="text-sm text-muted hover:text-foreground"
                    >
                      {section.visible ? "Hide" : "Show"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingSection(section);
                        setMode("editing");
                      }}
                      className="text-sm text-accent hover:opacity-80"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(section)}
                      disabled={deletingId === section.id}
                      className="text-sm text-red-400 hover:opacity-80 disabled:opacity-50"
                    >
                      {deletingId === section.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
