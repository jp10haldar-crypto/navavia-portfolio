// WHAT THIS FILE DOES: The "Edit Review" page, visible at
// /admin/reviews/[reviewId]/edit. It first loads that one review from the
// database, then hands its current details to the shared ReviewForm so
// the fields start out already filled in. Runs in the browser because it
// fetches data after the page opens.

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getReviewById } from "@/lib/firestore";
import ReviewForm from "@/components/admin/ReviewForm";

export default function EditReviewPage() {
  const { reviewId } = useParams();
  const [review, setReview] = useState(undefined); // undefined = still loading
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let isMounted = true;

    getReviewById(reviewId).then((result) => {
      if (!isMounted) return;
      if (result.success) {
        setReview(result.data);
      } else {
        setLoadError(result.message);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [reviewId]);

  if (loadError) {
    return <p className="text-muted">{loadError}</p>;
  }

  if (review === undefined) {
    return <p className="text-muted">Loading review...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Edit Review</h1>
      <div className="mt-8">
        <ReviewForm reviewId={reviewId} initialReview={review} />
      </div>
    </div>
  );
}
