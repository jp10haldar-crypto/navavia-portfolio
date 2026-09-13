// WHAT THIS FILE DOES: Next.js shows this automatically for ANY web
// address that doesn't match a real page on the site (a typo'd URL, an
// old bookmarked link, etc.) — styled to match the rest of the site
// instead of showing a plain, unbranded error page. It has to live here,
// at the top level, rather than alongside the other public pages, because
// only a top-level not-found.js can catch a URL that doesn't match
// anything at all — which means it includes the Header and Footer itself
// rather than inheriting them, so it still looks and feels like the rest
// of the site. You never link to this page directly; Next.js finds it by
// its file name alone.

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          404
        </p>
        <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-3 max-w-md text-muted">
          The page you&apos;re looking for doesn&apos;t exist or may have
          been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-accent px-6 py-3 font-semibold text-background transition-opacity hover:opacity-90"
        >
          Back to Homepage
        </Link>
      </main>
      <Footer />
    </>
  );
}
