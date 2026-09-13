"use client";

// WHAT THIS FILE DOES: A temporary diagnostic page for checking why the live
// site might be broken, without needing to read browser console errors.
// Open it at yoursite.vercel.app/debug. It checks, in this order:
//   1. Whether each of the 10 NEXT_PUBLIC_ environment variables is present
//      (never shows the actual value — only PRESENT or MISSING).
//   2. Whether Firebase itself managed to start up (YES/NO), and the exact
//      error if not.
//   3. A real, live attempt to read each of the four database collections
//      the public site depends on, showing how many items came back (or the
//      exact error) and how long each attempt took.
// Every check is wrapped so a failure anywhere just shows as a red result on
// screen — it can never crash this page or leave it stuck loading.
//
// DELETE THE WHOLE app/debug FOLDER once the live-site problem is solved.
// This page is not linked from anywhere on the site and is blocked from
// search engines (see app/debug/layout.js and app/robots.js), but it is
// still reachable by anyone who knows or guesses the URL while it exists.

import { useEffect, useState } from "react";
import { db, firebaseInitError } from "@/lib/firebase";
import {
  getAllProjects,
  getAllReviews,
  getAllHomepageVideos,
  getPublishedBlogPosts,
} from "@/lib/firestore";

// Each one is written out by hand (not looped over from a list of names)
// because Next.js can only replace `process.env.NEXT_PUBLIC_...` with the
// real value when it's typed out literally like this in the code — a
// dynamic lookup like process.env[name] would not work here.
const ENV_CHECKS = [
  {
    name: "NEXT_PUBLIC_FIREBASE_API_KEY",
    present: Boolean(process.env.NEXT_PUBLIC_FIREBASE_API_KEY),
  },
  {
    name: "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
    present: Boolean(process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN),
  },
  {
    name: "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
    present: Boolean(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID),
  },
  {
    name: "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
    present: Boolean(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET),
  },
  {
    name: "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
    present: Boolean(process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID),
  },
  {
    name: "NEXT_PUBLIC_FIREBASE_APP_ID",
    present: Boolean(process.env.NEXT_PUBLIC_FIREBASE_APP_ID),
  },
  {
    name: "NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID",
    present: Boolean(process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID),
  },
  {
    name: "NEXT_PUBLIC_SITE_URL",
    present: Boolean(process.env.NEXT_PUBLIC_SITE_URL),
  },
  {
    name: "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME",
    present: Boolean(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME),
  },
  {
    name: "NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET",
    present: Boolean(process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET),
  },
];

// Runs one live database read, timing it and turning any outcome — success,
// a reported failure, or an unexpected crash — into the same plain shape so
// the page always has something safe to display.
function runLiveTest(label, readFunction) {
  const startedAt = performance.now();
  return readFunction()
    .then((result) => ({
      label,
      seconds: ((performance.now() - startedAt) / 1000).toFixed(2),
      success: Boolean(result?.success),
      count: result?.success ? result.data?.length ?? 0 : null,
      message: result?.success ? null : result?.message || "Unknown error.",
    }))
    .catch((error) => ({
      label,
      seconds: ((performance.now() - startedAt) / 1000).toFixed(2),
      success: false,
      count: null,
      message: error?.message || String(error),
    }));
}

export default function DebugPage() {
  const [testResults, setTestResults] = useState(null);

  useEffect(() => {
    Promise.all([
      runLiveTest("Projects", getAllProjects),
      runLiveTest("Reviews", getAllReviews),
      runLiveTest("Homepage Videos", getAllHomepageVideos),
      runLiveTest("Blog Posts", getPublishedBlogPosts),
    ]).then((results) => {
      setTestResults(results);
    });
  }, []);

  const firebaseOk = db !== null;
  const missingCount = ENV_CHECKS.filter((check) => !check.present).length;

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="rounded-xl border-2 border-yellow-400 bg-yellow-400/10 p-5">
          <p className="text-lg font-bold text-yellow-300">
            ⚠ Temporary diagnostic page
          </p>
          <p className="mt-1 text-yellow-100">
            This page exists only to help find a live-site problem. Delete
            the whole <code className="text-yellow-300">app/debug</code>{" "}
            folder once the problem is solved — it should not stay on the
            live site permanently.
          </p>
        </div>

        <div>
          <h1 className="text-3xl font-bold">Navavia — Live Site Diagnostic</h1>
          <p className="mt-1 text-slate-400">
            Everything below runs live, right now, in your browser.
          </p>
        </div>

        {/* Section 1: environment variables */}
        <section className="rounded-xl border border-slate-700 bg-slate-900 p-5">
          <h2 className="text-xl font-semibold">
            1. Environment variables ({ENV_CHECKS.length - missingCount} of{" "}
            {ENV_CHECKS.length} present)
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Only whether each one is present is shown — never the real value.
          </p>
          <ul className="mt-4 space-y-2">
            {ENV_CHECKS.map((check) => (
              <li
                key={check.name}
                className="flex items-center justify-between rounded-lg bg-slate-800 px-4 py-3"
              >
                <span className="font-mono text-sm sm:text-base">
                  {check.name}
                </span>
                <span
                  className={`ml-4 shrink-0 rounded-full px-3 py-1 text-sm font-bold ${
                    check.present
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {check.present ? "PRESENT" : "MISSING"}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Section 2: Firebase initialisation */}
        <section className="rounded-xl border border-slate-700 bg-slate-900 p-5">
          <h2 className="text-xl font-semibold">2. Firebase initialisation</h2>
          <div className="mt-4 flex items-center gap-3">
            <span className="text-lg">Did Firebase start up successfully?</span>
            <span
              className={`rounded-full px-4 py-1 text-lg font-bold ${
                firebaseOk
                  ? "bg-green-500/20 text-green-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {firebaseOk ? "YES" : "NO"}
            </span>
          </div>
          {!firebaseOk && (
            <div className="mt-4 rounded-lg bg-red-500/10 p-4">
              <p className="font-semibold text-red-300">Exact error message:</p>
              <p className="mt-1 font-mono text-sm text-red-200">
                {firebaseInitError || "No error message was captured."}
              </p>
            </div>
          )}
        </section>

        {/* Section 3: live database reads */}
        <section className="rounded-xl border border-slate-700 bg-slate-900 p-5">
          <h2 className="text-xl font-semibold">3. Live database read test</h2>
          <p className="mt-1 text-sm text-slate-400">
            Each one is attempted live, right now, whether or not Firebase
            reported a problem above.
          </p>

          {!testResults && (
            <p className="mt-4 text-lg text-slate-300">
              Running tests — this page will never hang, results appear
              within 15 seconds at most...
            </p>
          )}

          {testResults && (
            <ul className="mt-4 space-y-3">
              {testResults.map((result) => (
                <li
                  key={result.label}
                  className="rounded-lg bg-slate-800 p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-lg font-semibold">
                      {result.label}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-slate-400">
                        took {result.seconds}s
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-bold ${
                          result.success
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {result.success ? "SUCCESS" : "FAILED"}
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 text-base">
                    {result.success
                      ? `${result.count} item${
                          result.count === 1 ? "" : "s"
                        } found.`
                      : `Error: ${result.message}`}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
