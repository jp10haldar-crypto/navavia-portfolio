// WHAT THIS FILE DOES: The shared frame around every admin page EXCEPT the
// login page — a sidebar with Dashboard/Enquiries/Projects/Reviews links
// (Enquiries shows a small badge counting how many are still "New"), a
// "View Public Site" link (opens in a new tab, so it never risks losing
// your admin session), and a Sign Out button. Before showing any of that,
// it double-checks with Firebase that someone is actually signed in; if
// not, it redirects to the login page instead of showing anything private.
// It runs in the browser because it watches live sign-in state, loads the
// new-enquiry count, and reacts to the mobile menu toggle.

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";
import { getAllEnquiries } from "@/lib/firestore";

const NAV_LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/enquiries", label: "Enquiries" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/reviews", label: "Reviews" },
  { href: "/admin/homepage-videos", label: "Homepage Videos" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/pages", label: "Pages" },
  { href: "/admin/settings", label: "Settings" },
];

export default function AdminPanelLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(undefined); // undefined = still checking
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [newEnquiryCount, setNewEnquiryCount] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getFirebaseAuth(), (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push("/admin/login");
      }
    });
    return unsubscribe;
  }, [router]);

  useEffect(() => {
    if (!user) return;

    getAllEnquiries().then((result) => {
      if (result.success) {
        setNewEnquiryCount(
          result.data.filter((enquiry) => enquiry.status === "New").length
        );
      }
    });
  }, [user, pathname]);

  async function handleSignOut() {
    await signOut(getFirebaseAuth());
    router.push("/admin/login");
  }

  // While this is anything other than a real signed-in user (still
  // checking, or confirmed signed out), only this loading screen is ever
  // shown — the real admin content below it never renders, so there's
  // nothing to "flash" before the redirect to /admin/login happens.
  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 text-muted">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-accent" />
        <p>Checking your sign-in status...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Mobile-only top bar with a hamburger toggle for the sidebar below */}
      <div className="flex items-center justify-between border-b border-white/10 bg-card px-6 py-4 md:hidden">
        <span className="font-bold text-foreground">Navavia Admin</span>
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="flex flex-col gap-1.5 p-2"
          aria-label="Toggle admin menu"
        >
          <span className="block h-0.5 w-6 bg-foreground" />
          <span className="block h-0.5 w-6 bg-foreground" />
          <span className="block h-0.5 w-6 bg-foreground" />
        </button>
      </div>

      {/* Sidebar — always visible on desktop; on mobile it's hidden until
          the hamburger button above is tapped. */}
      <aside
        className={`w-full flex-col border-white/10 bg-card px-6 py-8 md:flex md:w-64 md:shrink-0 md:border-r ${
          isMenuOpen ? "flex" : "hidden"
        }`}
      >
        <p className="hidden font-bold text-foreground md:mb-8 md:block">
          Navavia Admin
        </p>

        <nav className="flex flex-1 flex-col gap-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={
                pathname === link.href
                  ? "flex items-center justify-between rounded-lg bg-background px-4 py-2 font-medium text-accent"
                  : "flex items-center justify-between rounded-lg px-4 py-2 text-foreground transition-colors hover:bg-background"
              }
            >
              {link.label}
              {link.href === "/admin/enquiries" && newEnquiryCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-xs font-bold text-background">
                  {newEnquiryCount}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Opens in a new tab on purpose — browsing the public site should
            never risk losing your admin session in this tab. */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 rounded-full border border-white/10 px-4 py-2 text-center text-sm font-medium text-muted transition-colors hover:text-foreground"
        >
          View Public Site ↗
        </a>

        <button
          type="button"
          onClick={handleSignOut}
          className="mt-3 rounded-full border border-accent px-4 py-2 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-background"
        >
          Sign Out
        </button>
      </aside>

      <main className="flex-1 px-6 py-10 md:px-10">{children}</main>
    </div>
  );
}
