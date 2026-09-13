// WHAT THIS FILE DOES: Next.js shows this automatically while a blog post
// page is still loading its data from the database (if the connection is
// slow) — never a blank screen, and never the "Post not found" message
// before the real answer is known. You never import or call this file
// directly; Next.js finds it by its name alone.

export default function LoadingBlogPost() {
  return (
    <div className="mx-auto max-w-xl px-6 py-24 text-center text-muted">
      Loading post...
    </div>
  );
}
