// WHAT THIS FILE DOES: A reusable block — a heading, an optional
// supporting line, and the client reviews themselves. The same file is
// used on the homepage, the full Reviews page, and project detail pages;
// each one passes in its own heading, subheading, and list of reviews to
// show. If the list passed in is empty, the whole section hides itself
// instead of showing an empty heading with nothing underneath. Reviews
// flow into columns (like a magazine), so short and long quotes sit
// together without leaving gaps. Renders once on the server — the reviews
// inside handle their own photo fallback.
//
// `action` is an optional link shown beside the heading (the homepage uses
// it for "Read all reviews").

import ReviewCard from "@/components/ReviewCard";
import SectionHeading from "@/components/SectionHeading";

export default function ReviewsSection({ heading, subheading, reviews, limit, action }) {
  const visibleReviews =
    typeof limit === "number" ? reviews.slice(0, limit) : reviews;

  if (visibleReviews.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-10">
      <SectionHeading heading={heading} subheading={subheading} action={action} />

      <div className="mt-16 gap-x-12 sm:columns-2 lg:columns-3">
        {visibleReviews.map((review) => (
          <div key={review.id} className="mb-14 break-inside-avoid">
            <ReviewCard review={review} />
          </div>
        ))}
      </div>
    </section>
  );
}
