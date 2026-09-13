// WHAT THIS FILE DOES: Connects this app to the Navavia Firebase project,
// using the secret keys stored in .env.local (never committed to git) or,
// once deployed, in Vercel's environment variables. Every other file that
// needs the database imports "db" from here; anything that needs to check
// or change sign-in status calls getFirebaseAuth() — see the note below on
// why those two are kept deliberately separate. It runs once, the first
// time any page imports it.
//
// Note: image uploads do NOT go through Firebase — they use Cloudinary
// instead (see lib/storage.js), because Firebase Storage now requires a
// paid plan. Firestore (the database) and Authentication (admin login)
// stay on Firebase's free plan exactly as before.
//
// Why Authentication is set up lazily (only when actually asked for),
// instead of automatically the moment this file is imported: pages like
// the sitemap only ever need the database, and are built by Next.js/
// Vercel on the server, not in a visitor's browser. Setting up
// Authentication eagerly here used to run some browser-only sign-in setup
// during that server-side build step, which isn't a real problem with the
// database at all — but it was enough to crash the sitemap's build with a
// confusing "invalid API key" error. Now, importing this file to reach the
// database never touches Authentication in any way, so it can never be
// affected by an Authentication-side problem again.

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Next.js reloads files often during development; this check stops Firebase
// from being initialized more than once and throwing an error about it.
// Wrapped so that a missing/invalid key can never crash the whole app just
// by importing this file — every database function already reports a
// clear error instead of crashing if "db" turns out to be unusable.
let firebaseApp = null;
// Kept so the /debug diagnostic page can show the exact failure on screen —
// everywhere else, code just checks whether "db" ended up usable or not.
export let firebaseInitError = null;
try {
  firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
} catch (error) {
  firebaseInitError = error?.message || String(error);
  console.error("Firebase failed to initialize:", firebaseInitError);
}

export const db = firebaseApp ? getFirestore(firebaseApp) : null;

// Authentication is created only the first time something actually calls
// this function (the admin login page, the admin sidebar's sign-in check,
// and the public footer's "Admin Panel" link check) — never automatically
// just because this file was imported. This is what keeps database-only
// code (like the sitemap) completely untouched by Authentication.
let cachedAuth = null;

export function getFirebaseAuth() {
  if (!cachedAuth && firebaseApp) {
    cachedAuth = getAuth(firebaseApp);

    // Keeps admins signed in between visits. Browser-only (needs
    // IndexedDB), so this is skipped automatically anywhere else —
    // there's no visitor "session" to persist during a server build.
    if (typeof window !== "undefined") {
      setPersistence(cachedAuth, browserLocalPersistence).catch(() => {
        // If this fails, signing in still works — only the "stay signed
        // in across visits" convenience might not.
      });
    }
  }
  return cachedAuth;
}
