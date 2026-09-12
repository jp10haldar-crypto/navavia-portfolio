// WHAT THIS FILE DOES: A reusable block — a heading, an optional
// supporting line, and a grid of review cards. The same file is used on
// the homepage, the full Reviews page, and project detail pages; each one
// passes in its own heading, subheading, and list of reviews to show. If
// the list passed in is empty, the whole section hides itself instead of
// showing an empty heading with nothing underneath. Renders once on the
// server — the cards inside handle their own photo fallback.

import ReviewCard from "@/components/ReviewCard";

export default function ReviewsSection({ heading, subheading, reviews, limit }) {
  const visibleReviews =
    typeof limit === "number" ? reviews.slice(0, limit) : reviews;

  if (visibleReviews.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
        {heading}
      </h2>
      {subheading && <p className="mt-3 max-w-xl text-muted">{subheading}</p>}

      <div className="mt-8 grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  );
}
