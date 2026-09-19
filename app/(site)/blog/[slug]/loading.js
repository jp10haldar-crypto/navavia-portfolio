// WHAT THIS FILE DOES: Next.js shows this automatically, on its own,
// whenever a real blog post page (which loads its data on the server)
// isn't ready to show yet — a skeleton screen shaped like a real post
// instead of a blank gap. Nothing needs to call this file directly;
// Next.js finds it by its name, "loading.js", automatically.

import BlogPostSkeleton from "@/components/skeletons/BlogPostSkeleton";

export default function BlogPostLoading() {
  return <BlogPostSkeleton />;
}
