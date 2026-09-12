// WHAT THIS FILE DOES: The main introduction section on the homepage — the
// big headline, a short supporting sentence, and two buttons. It sits
// between the Header and Footer (which come from app/layout.js, not from
// this file). It's kept as its own reusable piece separate from the
// homepage file itself.

import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-6 py-24 text-center sm:py-32">
      <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
        Websites and mobile apps, built to run without a developer.
      </h1>

      <p className="mt-6 max-w-xl text-base text-muted sm:text-lg">
        Seller Backbone builds complete, ready-to-run websites and mobile
        apps for businesses — so you get a finished product, not an
        unfinished project that still needs a developer on call.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        {/* This link points to /projects, which doesn't exist as a page yet
            — that page gets built in the next step. */}
        <Link
          href="/projects"
          className="rounded-full bg-accent px-6 py-3 font-semibold text-background transition-opacity hover:opacity-90"
        >
          View Our Work
        </Link>

        {/* This link points to /contact, which also doesn't exist yet —
            built in a later step. */}
        <Link
          href="/contact"
          className="rounded-full border border-accent px-6 py-3 font-semibold text-accent transition-colors hover:bg-accent hover:text-background"
        >
          Get in Touch
        </Link>
      </div>
    </section>
  );
}
