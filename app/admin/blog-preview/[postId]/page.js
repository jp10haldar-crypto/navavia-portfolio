// WHAT THIS FILE DOES: The admin's blog post preview, visible at
// /admin/blog-preview/[postId]. Deliberately lives OUTSIDE the admin
// sidebar area (app/admin/(panel)/) so it shows exactly what a real
// visitor would see — no admin sidebar, no public header/footer, just the
// post itself with a small "draft preview" banner on top. Loads the post
// using the signed-in browser's own permissions — a draft is only
// readable while signed in (see firestore.rules), so if you're not signed
// in (or the post doesn't exist), this shows "Post not found," the same
// as it would for a random visitor. Runs in the browser because it
// fetches data after the page opens.

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getBlogPostById, getPublishedBlogPosts } from "@/lib/firestore";
import BlogPostView from "@/components/BlogPostView";

export default function BlogPostPreviewPage() {
  const { postId } = useParams();
  const [status, setStatus] = useState("loading"); // loading | notfound | ready
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      const result = await getBlogPostById(postId);
      if (!isMounted) return;

      if (!result.success) {
        setStatus("notfound");
        return;
      }

      setPost(result.data);

      const publishedResult = await getPublishedBlogPosts();
      if (isMounted && publishedResult.success) {
        setRelatedPosts(
          publishedResult.data
            .filter(
              (candidate) =>
                candidate.id !== result.data.id &&
                candidate.tags?.some((tag) => result.data.tags?.includes(tag))
            )
            .slice(0, 3)
        );
      }

      setStatus("ready");
    }

    load();

    return () => {
      isMounted = false;
    };
  }, [postId]);

  if (status === "loading") {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center text-muted">
        Loading preview...
      </div>
    );
  }

  if (status === "notfound") {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="text-2xl font-bold text-foreground">
          Post not found
        </h1>
        <p className="mt-3 text-muted">
          Either this post doesn&apos;t exist, or you&apos;re not signed in
          as admin in this browser.
        </p>
        <Link
          href="/admin/blog"
          className="mt-6 inline-block rounded-full border border-accent px-6 py-3 font-semibold text-accent transition-colors hover:bg-accent hover:text-background"
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  return <BlogPostView post={post} relatedPosts={relatedPosts} isPreview />;
}
