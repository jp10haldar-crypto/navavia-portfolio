// WHAT THIS FILE DOES: This is the homepage — what visitors see when they
// open the website at the root URL ("/"). It loads projects, reviews,
// homepage videos, AND this page's admin-editable sections from the real
// database, then shows: the Hero (fixed, not admin-editable — see
// docs/DECISIONS.md), whichever sections are set up in the admin Pages
// editor (Featured Work, How We Work videos, Client Reviews, in whatever
// order/visibility the admin chose), and a closing "Ready to get started?"
// call-to-action just above the footer (also fixed). While that data is
// loading it shows a simple loading message, and if the database can't be
// reached it shows a clean message instead of crashing or leaving a blank
// page. The Header and Footer wrap around it automatically via
// app/(site)/layout.js, so they don't need to be added here.

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Hero from "@/components/Hero";
import ClosingCTA from "@/components/ClosingCTA";
import PageSections from "@/components/PageSections";
import {
  getAllProjects,
  getAllReviews,
  getAllHomepageVideos,
  getPageSections,
  getSiteSettings,
  DEFAULT_SITE_SETTINGS,
} from "@/lib/firestore";

// Maps a homepage section's type to the Settings toggle that can switch it
// off entirely, on top of its own per-section visible flag from the admin
// Pages editor. Only applies here, on the homepage — the dedicated
// /reviews page's own reviews section is unaffected by
// "homepageReviewsEnabled".
const SECTION_SETTINGS_KEY = {
  featuredWork: "featuredWorkEnabled",
  homepageVideos: "homepageVideosEnabled",
  reviewsFeed: "homepageReviewsEnabled",
};

export default function Home() {
  const [status, setStatus] = useState("loading"); // loading | error | ready
  const [projects, setProjects] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [videos, setVideos] = useState([]);
  const [sections, setSections] = useState([]);
  const [settings, setSettings] = useState(DEFAULT_SITE_SETTINGS);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function load() {
      const [
        projectsResult,
        reviewsResult,
        videosResult,
        sectionsResult,
        settingsResult,
      ] = await Promise.all([
        getAllProjects(),
        getAllReviews(),
        getAllHomepageVideos(),
        getPageSections("home"),
        getSiteSettings(),
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
      setSections(sectionsResult.success ? sectionsResult.data : []);
      setSettings(settingsResult.data);
      setStatus("ready");
    }

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  const featuredReviews = reviews.filter((review) => review.featured);
  const visibleSections = sections
    .filter((section) => section.visible)
    .filter((section) => {
      const settingsKey = SECTION_SETTINGS_KEY[section.type];
      return settingsKey ? settings[settingsKey] : true;
    });

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
          <PageSections
            sections={visibleSections}
            data={{ projects, reviews, videos, reviewsFilter: "featured" }}
          />
          {settings.homepageReviewsEnabled && featuredReviews.length > 0 && (
            <div className="mx-auto -mt-8 max-w-6xl px-6 pb-16 text-center">
              <Link
                href="/reviews"
                className="font-medium text-accent transition-opacity hover:opacity-80"
              >
                Read All Reviews →
              </Link>
            </div>
          )}
          <ClosingCTA showEnquiryForm />
        </>
      )}
    </>
  );
}
