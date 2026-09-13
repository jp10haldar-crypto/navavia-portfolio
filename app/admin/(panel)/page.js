// WHAT THIS FILE DOES: The admin Dashboard, visible at /admin once signed
// in. Shows how many projects, reviews, and enquiries currently exist
// (plus how many enquiries are still "New"), the 5 most recent enquiries,
// the one-time button to import the starter sample data, and a reminder
// about clearing unused images from Cloudinary manually. It runs in the
// browser so it can fetch live counts and react to the button click.

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getAllProjects,
  getAllReviews,
  getAllEnquiries,
  seedInitialData,
} from "@/lib/firestore";

function formatDate(timestamp) {
  if (!timestamp?.toDate) return "—";
  return timestamp.toDate().toLocaleDateString(undefined, {
    dateStyle: "medium",
  });
}

export default function AdminDashboardPage() {
  const [projectCount, setProjectCount] = useState(null);
  const [reviewCount, setReviewCount] = useState(null);
  const [enquiryCount, setEnquiryCount] = useState(null);
  const [newEnquiryCount, setNewEnquiryCount] = useState(null);
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedMessage, setSeedMessage] = useState("");

  async function loadCounts() {
    const [projectsResult, reviewsResult, enquiriesResult] = await Promise.all([
      getAllProjects(),
      getAllReviews(),
      getAllEnquiries(),
    ]);
    setProjectCount(projectsResult.success ? projectsResult.data.length : null);
    setReviewCount(reviewsResult.success ? reviewsResult.data.length : null);

    if (enquiriesResult.success) {
      setEnquiryCount(enquiriesResult.data.length);
      setNewEnquiryCount(
        enquiriesResult.data.filter((enquiry) => enquiry.status === "New").length
      );
      setRecentEnquiries(enquiriesResult.data.slice(0, 5));
    }
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

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-white/10 bg-card p-6">
          <p className="text-sm text-muted">Total Enquiries</p>
          <p className="mt-2 text-3xl font-bold text-foreground">
            {enquiryCount === null ? "—" : enquiryCount}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-card p-6">
          <p className="text-sm text-muted">New Enquiries</p>
          <p className="mt-2 text-3xl font-bold text-accent">
            {newEnquiryCount === null ? "—" : newEnquiryCount}
          </p>
        </div>
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
        <div className="flex items-center justify-between">
          <p className="font-semibold text-foreground">Recent Enquiries</p>
          <Link
            href="/admin/enquiries"
            className="text-sm text-accent hover:opacity-80"
          >
            View All →
          </Link>
        </div>

        {recentEnquiries.length === 0 ? (
          <p className="mt-3 text-sm text-muted">No enquiries yet.</p>
        ) : (
          <div className="mt-4 flex flex-col divide-y divide-white/10">
            {recentEnquiries.map((enquiry) => (
              <div
                key={enquiry.id}
                className="flex items-center justify-between py-3 text-sm"
              >
                <div>
                  <p className="font-medium text-foreground">
                    {enquiry.fullName}
                  </p>
                  <p className="text-muted">
                    {formatDate(enquiry.createdAt)} · {enquiry.needType}
                  </p>
                </div>
                <span className="text-xs text-muted">{enquiry.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 rounded-xl border border-white/10 bg-card p-6">
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

      <div className="mt-6 rounded-xl border border-white/10 bg-card p-6">
        <p className="font-semibold text-foreground">About image storage</p>
        <p className="mt-2 text-sm text-muted">
          Images are hosted on Cloudinary&apos;s free plan. Deleting a project
          or review here removes it from this site, but the image files
          themselves stay on Cloudinary (the free plan doesn&apos;t allow
          deleting files from a website). If storage ever fills up, you can
          clear out unused images by logging into{" "}
          <a
            href="https://cloudinary.com/console"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:opacity-80"
          >
            your Cloudinary dashboard
          </a>{" "}
          directly and deleting them from the &quot;seller-backbone&quot;
          folder.
        </p>
      </div>
    </div>
  );
}
