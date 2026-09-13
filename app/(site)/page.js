// WHAT THIS FILE DOES: This is the homepage — what visitors see when they
// open the website at the root URL ("/"). It loads projects, reviews, and
// homepage videos from the real database, then shows (in order): the
// Hero, Featured Work, the "How We Work" video section (published videos
// only), "What Our Clients Say", and a closing "Ready to get started?"
// call-to-action just above the footer. While that data is loading it
// shows a simple loading message, and if the database can't be reached it
// shows a clean message instead of crashing or leaving a blank page. The
// Header and Footer wrap around it automatically via app/(site)/layout.js,
// so they don't need to be added here.

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Hero from "@/components/Hero";
import FeaturedWork from "@/components/FeaturedWork";
import HomepageVideos from "@/components/HomepageVideos";
import ReviewsSection from "@/components/ReviewsSection";
import ClosingCTA from "@/components/ClosingCTA";
import { getAllProjects, getAllReviews, getAllHomepageVideos } from "@/lib/firestore";

export default function Home() {
  const [status, setStatus] = useState("loading"); // loading | error | ready
  const [projects, setProjects] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [videos, setVideos] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function load() {
      const [projectsResult, reviewsResult, videosResult] = await Promise.all([
        getAllProjects(),
        getAllReviews(),
        getAllHomepageVideos(),
      ]);

      if (!isMounted) return;

      if (!projectsResult.success || !reviewsResult.success) {
        setErrorMessage(
          !projectsResult.success ? projectsResult.message : reviewsResult.message
        );
        setStatus("error");
        return;
      }

      setProjects(projectsResult.data);
      setReviews(reviewsResult.data);
      setVideos(videosResult.success ? videosResult.data : []);
      setStatus("ready");
    }

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  const featuredProjects = projects.filter((project) => project.featured);
  const featuredReviews = reviews.filter((review) => review.featured);
  const publishedVideos = videos.filter((video) => video.published);

  return (
    <>
      <Hero />

      {status === "loading" && (
        <p className="mx-auto max-w-6xl px-6 py-16 text-center text-muted">
          Loading our work...
        </p>
      )}

      {status === "error" && (
        <p className="mx-auto max-w-6xl px-6 py-16 text-center text-muted">
          {errorMessage}
        </p>
      )}

      {status === "ready" && (
        <>
          <FeaturedWork projects={featuredProjects} />
          <HomepageVideos videos={publishedVideos} />
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
          <ClosingCTA />
        </>
      )}
    </>
  );
}
