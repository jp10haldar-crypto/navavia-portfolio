// WHAT THIS FILE DOES: Next.js shows this automatically for ANY web
// address that doesn't match a real page on the site (a typo'd URL, an
// old bookmarked link, etc.) — styled to match the rest of the site
// instead of showing a plain, unbranded error page. It has to live here,
// at the top level, rather than alongside the other public pages, because
// only a top-level not-found.js can catch a URL that doesn't match
// anything at all — which means it includes the Header, Footer, and the
// public site's "site-theme" wrapper itself rather than inheriting them,
// so it still looks and feels like the rest of the site. You never link to
// this page directly; Next.js finds it by its file name alone.
//
// The large "404" is drawn as an unbuilt blueprint outline — a page that
// never took form.

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="site-theme relative flex min-h-full flex-1 flex-col">
      <Header />
      <main className="relative flex flex-1 items-center overflow-hidden">
        <div
          aria-hidden="true"
          className="blueprint-grid pointer-events-none absolute inset-0"
        />
        <div className="relative mx-auto w-full max-w-7xl px-6 py-24 lg:px-10">
          <p
            aria-hidden="true"
            className="font-display select-none text-[clamp(7rem,24vw,18rem)] leading-[0.85] text-background [-webkit-text-stroke:3px_var(--line)] [paint-order:stroke_fill] [font-variation-settings:'wght'_300]"
          >
            404
          </p>
          <h1 className="font-display mt-8 text-[clamp(2.25rem,5vw,3.75rem)] font-semibold text-foreground">
            Page not found
          </h1>
          <p className="mt-4 max-w-md text-lg text-muted">
            There&apos;s no page at this address. It may have moved, or the
            link may have a typo.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/" className="btn-form">
              Go to the homepage
            </Link>
            <Link href="/projects" className="btn-idea">
              See our work
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
