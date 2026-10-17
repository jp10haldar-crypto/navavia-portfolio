// WHAT THIS FILE DOES: The shared "frame" around every PUBLIC page only —
// the homepage, /projects, and /reviews — putting the Header above and the
// Footer below each one automatically. The admin area (/admin/*) lives
// outside this folder entirely, so it never gets this public Header or
// Footer — this is what keeps the public site and the admin panel
// completely separate. It runs for every public page load.
// It also loads Vercel Web Analytics here (not in the root layout) so that
// visits to the admin panel are never counted as site traffic.
// The "site-theme" wrapper is what switches on the public site's own
// colors and typefaces (see app/globals.css) — the admin panel never
// sits inside it, so it keeps its own look.

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";

export default function SiteLayout({ children }) {
  return (
    <div className="site-theme relative flex min-h-full flex-1 flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <Analytics />
    </div>
  );
}
