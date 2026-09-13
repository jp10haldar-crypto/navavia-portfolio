// WHAT THIS FILE DOES: The "Edit Post" page, visible at
// /admin/blog/[postId]/edit. It first loads that one post from the
// database, then hands its current details to the shared BlogPostForm so
// the fields start out already filled in. Runs in the browser because it
// fetches data after the page opens.

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getBlogPostById } from "@/lib/firestore";
import BlogPostForm from "@/components/admin/BlogPostForm";

export default function EditBlogPostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(undefined); // undefined = still loading
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let isMounted = true;

    getBlogPostById(postId).then((result) => {
      if (!isMounted) return;
      if (result.success) {
        setPost(result.data);
      } else {
        setLoadError(result.message);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [postId]);

  if (loadError) {
    return <p className="text-muted">{loadError}</p>;
  }

  if (post === undefined) {
    return <p className="text-muted">Loading post...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Edit Post</h1>
      <div className="mt-8">
        <BlogPostForm postId={postId} initialPost={post} />
      </div>
    </div>
  );
}
