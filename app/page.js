// WHAT THIS FILE DOES: This is the homepage — what visitors see when they
// open the website at the root URL ("/"). Next.js automatically treats any
// file named "page.js" inside the "app" folder as a visitable page. This
// one displays the Hero section, the Featured Work section, and a Reviews
// section (featured reviews only, with a link to the full Reviews page);
// the Header and Footer wrap around it automatically via app/layout.js, so
// they don't need to be added here.

import Link from "next/link";
import Hero from "@/components/Hero";
import FeaturedWork from "@/components/FeaturedWork";
import ReviewsSection from "@/components/ReviewsSection";
import { reviews } from "@/data/reviews";

export default function Home() {
  const featuredReviews = reviews.filter((review) => review.featured);

  return (
    <>
      <Hero />
      <FeaturedWork />
      <ReviewsSection
        heading="What Our Clients Say"
        subheading="Real feedback from businesses running the websites we built."
        reviews={featuredReviews}
      />
      {featuredReviews.length > 0 && (
        <div className="mx-auto -mt-8 max-w-6xl px-6 pb-16 text-center">
          <Link
            href="/reviews"
            className="font-medium text-accent transition-opacity hover:opacity-80"
          >
            Read All Reviews →
          </Link>
        </div>
      )}
    </>
  );
}
