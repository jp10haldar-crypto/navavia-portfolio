// WHAT THIS FILE DOES: The admin's enquiries dashboard, visible at
// /admin/enquiries. Shows every enquiry from the public contact form,
// newest first, as a list of cards (not a traditional table) so it reads
// well on a phone. Clicking a card expands it to show the full message.
// Changing the status dropdown saves immediately. Runs in the browser so
// it can load the live list and react to clicks.

"use client";

import { useEffect, useMemo, useState } from "react";
import {
  getAllEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
} from "@/lib/firestore";

const STATUS_OPTIONS = ["New", "Contacted", "In Discussion", "Won", "Lost"];
const FILTER_OPTIONS = ["All", ...STATUS_OPTIONS];

const STATUS_BADGE_CLASSES = {
  New: "bg-accent/20 text-accent",
  Contacted: "bg-blue-500/20 text-blue-400",
  "In Discussion": "bg-yellow-500/20 text-yellow-400",
  Won: "bg-green-500/20 text-green-400",
  Lost: "bg-white/10 text-muted",
};

function formatDate(timestamp) {
  if (!timestamp?.toDate) return "—";
  return timestamp.toDate().toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState(undefined); // undefined = still loading
  const [loadError, setLoadError] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [savedId, setSavedId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  function loadEnquiries() {
    return getAllEnquiries().then((result) => {
      if (result.success) {
        setEnquiries(result.data);
      } else {
        setLoadError(result.message);
      }
    });
  }

  useEffect(() => {
    loadEnquiries();
  }, []);

  async function handleStatusChange(id, status) {
    setEnquiries((current) =>
      current.map((item) => (item.id === id ? { ...item, status } : item))
    );

    const result = await updateEnquiryStatus(id, status);
    if (result.success) {
      setSavedId(id);
      setTimeout(() => setSavedId((current) => (current === id ? null : current)), 2000);
    } else {
      window.alert(result.message);
    }
  }

  async function handleDelete(enquiry) {
    const confirmed = window.confirm(
      `Are you sure you want to delete the enquiry from "${enquiry.fullName}"? This cannot be undone.`
    );
    if (!confirmed) return;

    setDeletingId(enquiry.id);
    const result = await deleteEnquiry(enquiry.id);
    setDeletingId(null);

    if (result.success) {
      setEnquiries((current) => current.filter((item) => item.id !== enquiry.id));
    } else {
      window.alert(result.message);
    }
  }

  const visibleEnquiries = useMemo(() => {
    if (!enquiries) return [];
    const term = searchTerm.trim().toLowerCase();

    return enquiries.filter((enquiry) => {
      const matchesFilter =
        activeFilter === "All" || enquiry.status === activeFilter;
      const matchesSearch =
        !term ||
        enquiry.fullName?.toLowerCase().includes(term) ||
        enquiry.email?.toLowerCase().includes(term);
      return matchesFilter && matchesSearch;
    });
  }, [enquiries, activeFilter, searchTerm]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Enquiries</h1>

      <input
        type="text"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search by name or email..."
        className="mt-6 w-full max-w-md rounded-lg border border-white/10 bg-card px-4 py-2.5 text-sm text-foreground outline-none focus:border-accent"
      />

      <div className="mt-4 flex flex-wrap gap-2">
        {FILTER_OPTIONS.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={
              activeFilter === filter
                ? "rounded-full border border-accent px-4 py-1.5 text-sm font-medium text-accent"
                : "rounded-full border border-white/10 px-4 py-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
            }
          >
            {filter}
          </button>
        ))}
      </div>

      {loadError && <p className="mt-6 text-muted">{loadError}</p>}
      {!loadError && enquiries === undefined && (
        <p className="mt-6 text-muted">Loading enquiries...</p>
      )}
      {!loadError && enquiries?.length > 0 && visibleEnquiries.length === 0 && (
        <p className="mt-6 text-muted">No enquiries match your filters.</p>
      )}
      {!loadError && enquiries?.length === 0 && (
        <p className="mt-6 text-muted">
          No enquiries yet. They&apos;ll show up here as soon as someone uses
          the contact form.
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3">
        {visibleEnquiries.map((enquiry) => {
          const isExpanded = expandedId === enquiry.id;

          return (
            <div
              key={enquiry.id}
              className="rounded-xl border border-white/10 bg-card p-5"
            >
              <button
                type="button"
                onClick={() =>
                  setExpandedId((current) =>
                    current === enquiry.id ? null : enquiry.id
                  )
                }
                className="flex w-full flex-col gap-2 text-left sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-xs text-muted">
                    {formatDate(enquiry.createdAt)}
                  </p>
                  <p className="mt-1 font-semibold text-foreground">
                    {enquiry.fullName}
                  </p>
                  <p className="text-sm text-muted">
                    {enquiry.country} · {enquiry.needType}
                  </p>
                </div>

                <span
                  className={`shrink-0 self-start rounded-full px-3 py-1 text-xs font-semibold ${
                    STATUS_BADGE_CLASSES[enquiry.status] || "bg-white/10 text-muted"
                  }`}
                >
                  {enquiry.status}
                </span>
              </button>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${enquiry.email}`}
                  onClick={(event) => event.stopPropagation()}
                  className="text-sm text-accent hover:opacity-80"
                >
                  {enquiry.email}
                </a>

                <select
                  value={enquiry.status}
                  onChange={(event) =>
                    handleStatusChange(enquiry.id, event.target.value)
                  }
                  className="rounded-lg border border-white/10 bg-background px-3 py-1.5 text-sm text-foreground outline-none focus:border-accent"
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>

                {savedId === enquiry.id && (
                  <span className="text-xs text-green-400">Saved ✓</span>
                )}

                <button
                  type="button"
                  onClick={() => handleDelete(enquiry)}
                  disabled={deletingId === enquiry.id}
                  className="ml-auto text-sm text-red-400 hover:opacity-80 disabled:opacity-50"
                >
                  {deletingId === enquiry.id ? "Deleting..." : "Delete"}
                </button>
              </div>

              {isExpanded && (
                <div className="mt-4 border-t border-white/10 pt-4 text-sm">
                  {enquiry.phone && (
                    <p className="text-muted">
                      <span className="text-foreground">Phone:</span>{" "}
                      {enquiry.phone}
                    </p>
                  )}
                  {enquiry.budgetRange && (
                    <p className="mt-1 text-muted">
                      <span className="text-foreground">Budget:</span>{" "}
                      {enquiry.budgetRange}
                    </p>
                  )}
                  <p className="mt-3 whitespace-pre-wrap text-foreground">
                    {enquiry.message}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
