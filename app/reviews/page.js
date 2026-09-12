// WHAT THIS FILE DOES: The "Client Reviews" page, visible at /reviews.
// Next.js automatically turns this file into that page. It shows every
// review (not just the featured ones shown on the homepage), followed by
// a closing call-to-action linking to the contact page.

import Link from "next/link";
import ReviewsSection from "@/components/ReviewsSection";
import { reviews } from "@/data/reviews";

export default function ReviewsPage() {
  return (
    <div>
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
    </div>
  );
}
