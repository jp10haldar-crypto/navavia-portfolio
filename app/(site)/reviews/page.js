// WHAT THIS FILE DOES: The "Client Reviews" page, visible at /reviews. It
// loads every review from the real database, plus this page's admin-
// editable sections, then renders them via PageSections — the reviews
// feed and the closing "Want results like these?" call-to-action are both
// admin-editable sections. While loading, it shows a simple loading
// message; if the database can't be reached, it shows a clean message
// instead of crashing or leaving a blank page.

"use client";

import { useEffect, useState } from "react";
import PageSections from "@/components/PageSections";
import { getAllReviews, getPageSections } from "@/lib/firestore";

export default function ReviewsPage() {
  const [status, setStatus] = useState("loading"); // loading | error | ready
  const [reviews, setReviews] = useState([]);
  const [sections, setSections] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    Promise.all([getAllReviews(), getPageSections("reviews")]).then(
      ([reviewsResult, sectionsResult]) => {
        if (!isMounted) return;
        if (reviewsResult.success) {
          setReviews(reviewsResult.data);
          setSections(sectionsResult.success ? sectionsResult.data : []);
          setStatus("ready");
        } else {
          setErrorMessage(reviewsResult.message);
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
          Loading reviews...
        </p>
      )}

      {status === "error" && (
        <p className="mx-auto max-w-6xl px-6 py-16 text-center text-muted">
          {errorMessage}
        </p>
      )}

      {status === "ready" && (
        <PageSections sections={visibleSections} data={{ reviews }} />
      )}
    </div>
  );
}
