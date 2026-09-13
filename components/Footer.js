// WHAT THIS FILE DOES: The footer shown at the bottom of every public
// page. It's added once in app/(site)/layout.js, so it automatically
// appears on the homepage, /projects, and /reviews — but never inside the
// admin area. It runs in the browser because it checks whether you're
// currently signed in as admin, and only then shows a small "Admin Panel"
// link — so there's a quiet way back in without typing the URL, but only
// for someone who's actually signed in.

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getFirebaseAuth(), (user) => {
      setIsSignedIn(Boolean(user));
    });
    return unsubscribe;
  }, []);

  return (
    <footer className="mt-auto border-t border-white/10 bg-card">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-10 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
        <div>
          <p className="font-bold text-foreground">Navavia</p>
          <p className="text-xs text-muted">Where Ideas Take Form</p>
          <p className="mt-2 max-w-xs text-sm text-muted">
            We build websites and mobile applications for growing businesses.
          </p>
        </div>

        {/* PLACEHOLDER LINKS: both hrefs below are "#" for now. Replace the
            first with the real LinkedIn page URL, and the second with
            "mailto:you@example.com" once there's a real email to use. */}
        <div className="flex gap-6 text-sm">
          <a href="#" className="text-muted transition-colors hover:text-accent">
            LinkedIn
          </a>
          <a href="#" className="text-muted transition-colors hover:text-accent">
            Email
          </a>
          {isSignedIn && (
            <Link
              href="/admin"
              className="text-muted transition-colors hover:text-accent"
            >
              Admin Panel
            </Link>
          )}
        </div>
      </div>

      <p className="pb-6 text-center text-xs text-muted">
        © {currentYear} Navavia. All rights reserved.
      </p>
    </footer>
  );
}
