// WHAT THIS FILE DOES: Connects this app to the Seller Backbone Firebase
// project, using the secret keys stored in .env.local (never committed to
// git). Every other file that needs Firebase — the admin login page, and
// lib/firestore.js for reading/writing data — imports "auth" or "db" from
// here instead of connecting to Firebase itself. It runs once, the first
// time any page imports it.
//
// Note: image uploads do NOT go through Firebase — they use Cloudinary
// instead (see lib/storage.js), because Firebase Storage now requires a
// paid plan. Firestore (the database) and Authentication (admin login)
// stay on Firebase's free plan exactly as before.

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
const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

// Keeps you signed in between visits (even after closing the browser)
// instead of asking you to log in again every time. This is Firebase's
// default behavior for websites, but it's set explicitly here so it's a
// deliberate, documented choice rather than an accident. (It won't persist
// in a private/incognito window, or if browser site data is cleared.)
setPersistence(auth, browserLocalPersistence);
