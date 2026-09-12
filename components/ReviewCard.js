// WHAT THIS FILE DOES: A single client review "card" — star rating, the
// quote itself, and the client's photo/name/role at the bottom. Used
// wherever reviews are shown (homepage, the full Reviews page, and project
// detail pages). It runs in the browser because it needs to detect when a
// client photo fails to load and swap in their initials instead.

"use client";

import { useState } from "react";

function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function StarRating({ rating }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          viewBox="0 0 20 20"
          className={`h-5 w-5 ${star <= rating ? "fill-accent" : "fill-white/15"}`}
          aria-hidden="true"
        >
          <path d="M10 1l2.9 6.3 6.9.6-5.2 4.6 1.6 6.8L10 15.9 3.8 19.3l1.6-6.8L.2 7.9l6.9-.6L10 1z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewCard({ review }) {
  const [photoFailed, setPhotoFailed] = useState(false);
  const showPhoto = review.clientPhoto && !photoFailed;
  const roleAndCompany = [review.clientRole, review.clientCompany]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="flex h-full flex-col rounded-xl border border-white/10 bg-card p-6">
      <StarRating rating={review.rating} />

      <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground">
        &ldquo;{review.reviewText}&rdquo;
      </p>

      <div className="mt-6 flex items-center gap-3">
        {showPhoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={review.clientPhoto}
            alt={review.clientName}
            onError={() => setPhotoFailed(true)}
            className="h-12 w-12 shrink-0 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-background">
            {getInitials(review.clientName)}
          </div>
        )}

        <div>
          <p className="font-bold text-foreground">{review.clientName}</p>
          {roleAndCompany && (
            <p className="text-xs text-muted">{roleAndCompany}</p>
          )}
        </div>
      </div>
    </div>
  );
}
