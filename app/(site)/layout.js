// WHAT THIS FILE DOES: The shared "frame" around every PUBLIC page only —
// the homepage, /projects, and /reviews — putting the Header above and the
// Footer below each one automatically. The admin area (/admin/*) lives
// outside this folder entirely, so it never gets this public Header or
// Footer — this is what keeps the public site and the admin panel
// completely separate. It runs for every public page load.

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SiteLayout({ children }) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
