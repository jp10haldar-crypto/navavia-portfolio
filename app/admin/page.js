// WHAT THIS FILE DOES: The private admin dashboard, visible at /admin. It
// asks Firebase whether someone is actually signed in; if not, it sends
// them to the login page instead of showing anything private. It runs in
// the browser because it needs to watch the live sign-in state and react
// to the Sign Out button.

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState(undefined); // undefined = still checking

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push("/admin/login");
      }
    });

    return unsubscribe;
  }, [router]);

  async function handleSignOut() {
    await signOut(auth);
    router.push("/admin/login");
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-6 py-24 text-center text-muted">
        Checking your sign-in status...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-2xl font-bold text-foreground">
        Welcome back, {user.email}
      </h1>
      <p className="mt-2 text-muted">
        This is the private admin area. The full tools for managing
        projects, reviews, and blog posts are built in a later step — for
        now, this page just confirms that signing in and out works.
      </p>

      <button
        type="button"
        onClick={handleSignOut}
        className="mt-8 rounded-full border border-accent px-6 py-3 font-semibold text-accent transition-colors hover:bg-accent hover:text-background"
      >
        Sign Out
      </button>
    </div>
  );
}
