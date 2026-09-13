// WHAT THIS FILE DOES: The final "Ready to get started?" section at the
// very bottom of the homepage, just above the footer. It's a static
// section (no data to load), so it just always shows. To put in your real
// email and WhatsApp details, edit the two PLACEHOLDER lines marked below
// in THIS file — nowhere else.

import Link from "next/link";

export default function ClosingCTA() {
  return (
    <section className="bg-card">
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
          Ready to get started?
        </h2>
        <p className="mt-3 text-muted">
          Tell us what you need and we will reply within 24 hours.
        </p>

        <Link
          href="/contact"
          className="mt-8 inline-block rounded-full bg-accent px-8 py-4 text-lg font-semibold text-background transition-opacity hover:opacity-90"
        >
          Get in Touch
        </Link>

        <div className="mt-8 flex flex-col items-center gap-2 text-sm">
          {/* PLACEHOLDER: replace "you@example.com" on the line below with
              your real email address. */}
          <a
            href="mailto:you@example.com"
            className="text-accent hover:opacity-80"
          >
            you@example.com
          </a>
          {/* PLACEHOLDER: replace the href below with your real WhatsApp
              link, e.g. "https://wa.me/15551234567" (your number, no
              spaces or symbols, after "wa.me/"). */}
          <a
            href="https://wa.me/00000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:opacity-80"
          >
            Message us on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
