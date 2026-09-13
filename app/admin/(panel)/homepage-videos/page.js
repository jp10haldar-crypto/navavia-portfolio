// WHAT THIS FILE DOES: The admin's homepage videos list, visible at
// /admin/homepage-videos. Shows every video (published or draft) in
// display order, with Edit/Delete buttons, an "Add New Video" button, and
// a one-time "Import Starter Videos" button for first-time setup. Drag a
// row to reorder it — the new order saves immediately. Runs in the
// browser so it can load the live list and react to clicks/drags.

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getAllHomepageVideos,
  deleteHomepageVideo,
  reorderHomepageVideos,
  seedHomepageVideos,
} from "@/lib/firestore";

export default function AdminHomepageVideosPage() {
  const [videos, setVideos] = useState(undefined); // undefined = still loading
  const [loadError, setLoadError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [dragIndex, setDragIndex] = useState(null);
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedMessage, setSeedMessage] = useState("");

  function loadVideos() {
    return getAllHomepageVideos().then((result) => {
      if (result.success) {
        setVideos(result.data);
      } else {
        setLoadError(result.message);
      }
    });
  }

  useEffect(() => {
    loadVideos();
  }, []);

  async function handleDelete(video) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${video.title}"? This cannot be undone.`
    );
    if (!confirmed) return;

    setDeletingId(video.id);
    const result = await deleteHomepageVideo(video.id);
    setDeletingId(null);

    if (result.success) {
      setVideos((current) => current.filter((item) => item.id !== video.id));
    } else {
      window.alert(result.message);
    }
  }

  async function handleReorderDrop(targetIndex) {
    if (dragIndex === null || dragIndex === targetIndex) return;

    const reordered = [...videos];
    const [moved] = reordered.splice(dragIndex, 1);
    reordered.splice(targetIndex, 0, moved);
    setDragIndex(null);
    setVideos(reordered);

    const result = await reorderHomepageVideos(reordered);
    if (result.success) {
      loadVideos();
    } else {
      window.alert(result.message);
    }
  }

  async function handleSeed() {
    setIsSeeding(true);
    setSeedMessage("");
    const result = await seedHomepageVideos();
    setIsSeeding(false);
    setSeedMessage(result.message);
    if (result.success) {
      loadVideos();
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground">Homepage Videos</h1>
        <Link
          href="/admin/homepage-videos/new"
          className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90"
        >
          Add New Video
        </Link>
      </div>

      {loadError && <p className="mt-6 text-muted">{loadError}</p>}

      {!loadError && videos?.length === 0 && (
        <div className="mt-6 rounded-xl border border-white/10 bg-card p-6">
          <p className="text-sm text-muted">
            No videos yet. Click &quot;Add New Video&quot; above, or import 3
            starter drafts to get going.
          </p>
          <button
            type="button"
            onClick={handleSeed}
            disabled={isSeeding}
            className="mt-4 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {isSeeding ? "Importing..." : "Import Starter Videos"}
          </button>
          {seedMessage && <p className="mt-3 text-sm text-muted">{seedMessage}</p>}
        </div>
      )}

      {!loadError && videos === undefined && (
        <p className="mt-6 text-muted">Loading videos...</p>
      )}

      {!loadError && videos?.length > 0 && (
        <>
          <p className="mt-6 text-sm text-muted">
            Drag a row by its handle to change its order.
          </p>
          <div className="mt-3 flex flex-col gap-2">
            {videos.map((video, index) => (
              <div
                key={video.id}
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
                  <p className="font-semibold text-foreground">{video.title}</p>
                  <p className="text-xs text-muted">
                    Order: {video.displayOrder} ·{" "}
                    {video.published ? (
                      <span className="text-accent">Published</span>
                    ) : (
                      <span>Draft</span>
                    )}
                  </p>
                </div>

                <Link
                  href={`/admin/homepage-videos/${video.id}/edit`}
                  className="text-sm text-accent hover:opacity-80"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(video)}
                  disabled={deletingId === video.id}
                  className="text-sm text-red-400 hover:opacity-80 disabled:opacity-50"
                >
                  {deletingId === video.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
