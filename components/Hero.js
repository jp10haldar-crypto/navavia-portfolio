// WHAT THIS FILE DOES: This is the big centered title shown on the homepage.
// It's a reusable "component" (a piece of UI) so it could be reused on other
// pages later if needed. It runs on the server when the page is built/loaded,
// then Next.js sends the finished HTML to the visitor's browser.

export default function Hero() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <h1 className="text-center text-3xl sm:text-5xl font-bold text-white tracking-tight">
        Seller Backbone — Portfolio
      </h1>
    </div>
  );
}
