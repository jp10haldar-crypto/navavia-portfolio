// WHAT THIS FILE DOES: The footer shown at the bottom of every page. It's
// added once in app/layout.js, so it automatically appears everywhere.
// Unlike the header, nothing here needs to react to clicks, so it renders
// once on the server and is sent to the browser as plain HTML.

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-white/10 bg-card">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-10 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
        <div>
          <p className="font-bold text-foreground">Seller Backbone</p>
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
        </div>
      </div>

      <p className="pb-6 text-center text-xs text-muted">
        © {currentYear} Seller Backbone. All rights reserved.
      </p>
    </footer>
  );
}
