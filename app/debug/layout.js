// WHAT THIS FILE DOES: Wraps the temporary /debug diagnostic page. Its only
// job is to tell search engines never to index this page (on top of the
// /debug block already added to robots.js) — this page shows internal
// technical details and was never meant to be a real part of the site.
// DELETE this whole app/debug folder once the live-site problem is solved.

export const metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
  title: "Debug — Navavia (temporary)",
};

export default function DebugLayout({ children }) {
  return children;
}
