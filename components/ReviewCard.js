// WHAT THIS FILE DOES: A single client review — star rating, the quote
// itself, and the client's photo/name/role at the bottom. Used wherever
// reviews are shown (homepage, the full Reviews page, and project detail
// pages). Set as a quotation rather than a boxed card: a thin rule above,
// a large amber quote mark, and the words themselves doing the work. It
// runs in the browser because it needs to detect when a client photo
// fails to load and swap in their initials instead.

"use client";

import { useState } from "react";

function getInitials(name) {
  return (name || "")
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          viewBox="0 0 20 20"
          className={`h-4 w-4 ${star <= rating ? "fill-accent" : "fill-white/15"}`}
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
    <figure className="flex h-full flex-col border-t border-white/10 pt-6">
      <div className="flex items-start justify-between">
        <svg viewBox="0 0 32 24" className="h-6 w-8 fill-accent" aria-hidden="true">
          <path d="M0 24V14.4C0 6.6 4.1 1.7 12.2 0l1.5 3.4C9.4 4.8 7.3 7.4 7 11.2h6V24H0zm18.3 0V14.4c0-7.8 4.1-12.7 12.2-14.4L32 3.4c-4.3 1.4-6.4 4-6.7 7.8h6V24H18.3z" />
        </svg>
        <StarRating rating={review.rating} />
      </div>

      <blockquote className="mt-5 flex-1 text-[1.1rem] leading-relaxed text-foreground">
        {review.reviewText}
      </blockquote>

      <figcaption className="mt-7 flex items-center gap-3">
        {showPhoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={review.clientPhoto}
            alt={review.clientName}
            onError={() => setPhotoFailed(true)}
            className="h-11 w-11 shrink-0 rounded-full object-cover ring-1 ring-white/10"
          />
        ) : (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-card border border-dashed border-line text-sm font-bold text-accent">
            {getInitials(review.clientName)}
          </div>
        )}

        <div>
          <p className="font-semibold text-foreground">{review.clientName}</p>
          {roleAndCompany && <p className="text-sm text-muted">{roleAndCompany}</p>}
        </div>
      </figcaption>
    </figure>
  );
}
