// WHAT THIS FILE DOES: The admin's review list, visible at /admin/reviews.
// Shows every review in a table with Edit/Delete buttons, and an
// "Add New Review" button at the top. Deleting always asks for
// confirmation first. Runs in the browser so it can load the live list and
// react to clicks.

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllReviews, deleteReview } from "@/lib/firestore";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState(undefined); // undefined = still loading
  const [loadError, setLoadError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  async function loadReviews() {
    const result = await getAllReviews();
    if (result.success) {
      setReviews(result.data);
    } else {
      setLoadError(result.message);
    }
  }

  useEffect(() => {
    loadReviews();
  }, []);

  async function handleDelete(review) {
    const confirmed = window.confirm(
      `Are you sure you want to delete the review from "${review.clientName}"? This cannot be undone.`
    );
    if (!confirmed) return;

    setDeletingId(review.id);
    const result = await deleteReview(review.id);
    setDeletingId(null);

    if (result.success) {
      setReviews((current) => current.filter((item) => item.id !== review.id));
    } else {
      window.alert(result.message);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground">Reviews</h1>
        <Link
          href="/admin/reviews/new"
          className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90"
        >
          Add New Review
        </Link>
      </div>

      {loadError && <p className="mt-6 text-muted">{loadError}</p>}
      {!loadError && reviews === undefined && (
        <p className="mt-6 text-muted">Loading reviews...</p>
      )}
      {!loadError && reviews?.length === 0 && (
        <p className="mt-6 text-muted">
          No reviews yet. Click &quot;Add New Review&quot; above, or import
          the starter data from the Dashboard.
        </p>
      )}

      {!loadError && reviews?.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-muted">
                <th className="py-3 pr-4">Client</th>
                <th className="py-3 pr-4">Rating</th>
                <th className="py-3 pr-4">Featured</th>
                <th className="py-3 pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review.id} className="border-b border-white/10">
                  <td className="py-3 pr-4 text-foreground">
                    {review.clientName}
                  </td>
                  <td className="py-3 pr-4 text-muted">{review.rating} / 5</td>
                  <td className="py-3 pr-4 text-muted">
                    {review.featured ? "Yes" : "No"}
                  </td>
                  <td className="py-3 pr-4">
                    <div className="flex gap-4">
                      <Link
                        href={`/admin/reviews/${review.id}/edit`}
                        className="text-accent hover:opacity-80"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(review)}
                        disabled={deletingId === review.id}
                        className="text-red-400 hover:opacity-80 disabled:opacity-50"
                      >
                        {deletingId === review.id ? "Deleting..." : "Delete"}
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
