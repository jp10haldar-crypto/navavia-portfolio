// WHAT THIS FILE DOES: The "Client Reviews" page, visible at /reviews. It
// loads every review from the real database (instead of the old dummy
// list). While loading, it shows a simple loading message; if the database
// can't be reached, it shows a clean message instead of crashing or
// leaving a blank page.

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ReviewsSection from "@/components/ReviewsSection";
import { getAllReviews } from "@/lib/firestore";

export default function ReviewsPage() {
  const [status, setStatus] = useState("loading"); // loading | error | ready
  const [reviews, setReviews] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    getAllReviews().then((result) => {
      if (!isMounted) return;
      if (result.success) {
        setReviews(result.data);
        setStatus("ready");
      } else {
        setErrorMessage(result.message);
        setStatus("error");
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

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
        <>
          <ReviewsSection
            heading="Client Reviews"
            subheading="Honest feedback from the businesses we work with."
            reviews={reviews}
          />

          <section className="mx-auto max-w-6xl px-6 py-16 text-center">
            <p className="text-xl font-semibold text-foreground">
              Want results like these for your business?
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-block rounded-full bg-accent px-6 py-3 font-semibold text-background transition-opacity hover:opacity-90"
            >
              Get in Touch
            </Link>
          </section>
        </>
      )}
    </div>
  );
}
