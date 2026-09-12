// WHAT THIS FILE DOES: The admin Dashboard, visible at /admin once signed
// in. Shows how many projects and reviews currently exist in the database,
// and has the one-time button to import the starter sample data. It runs
// in the browser so it can fetch live counts and react to the button click.

"use client";

import { useEffect, useState } from "react";
import { getAllProjects, getAllReviews, seedInitialData } from "@/lib/firestore";

export default function AdminDashboardPage() {
  const [projectCount, setProjectCount] = useState(null);
  const [reviewCount, setReviewCount] = useState(null);
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedMessage, setSeedMessage] = useState("");

  async function loadCounts() {
    const [projectsResult, reviewsResult] = await Promise.all([
      getAllProjects(),
      getAllReviews(),
    ]);
    setProjectCount(projectsResult.success ? projectsResult.data.length : null);
    setReviewCount(reviewsResult.success ? reviewsResult.data.length : null);
  }

  useEffect(() => {
    loadCounts();
  }, []);

  async function handleSeed() {
    setIsSeeding(true);
    setSeedMessage("");
    const result = await seedInitialData();
    setIsSeeding(false);
    setSeedMessage(result.message);
    if (result.success) {
      loadCounts();
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-card p-6">
          <p className="text-sm text-muted">Projects</p>
          <p className="mt-2 text-3xl font-bold text-foreground">
            {projectCount === null ? "—" : projectCount}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-card p-6">
          <p className="text-sm text-muted">Reviews</p>
          <p className="mt-2 text-3xl font-bold text-foreground">
            {reviewCount === null ? "—" : reviewCount}
          </p>
        </div>
      </div>

      <div className="mt-10 rounded-xl border border-white/10 bg-card p-6">
        <p className="font-semibold text-foreground">
          One-time starter data import
        </p>
        <p className="mt-2 text-sm text-muted">
          Copies the sample projects and reviews this site launched with into
          the real database. Safe to click — it refuses to run again if
          it&apos;s already been done.
        </p>
        <button
          type="button"
          onClick={handleSeed}
          disabled={isSeeding}
          className="mt-4 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {isSeeding ? "Importing..." : "Import Starter Data"}
        </button>
        {seedMessage && <p className="mt-3 text-sm text-muted">{seedMessage}</p>}
      </div>
    </div>
  );
}
