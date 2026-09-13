// WHAT THIS FILE DOES: The "Add New Post" page, visible at
// /admin/blog/new. It's just the shared BlogPostForm with nothing
// pre-filled in.

import BlogPostForm from "@/components/admin/BlogPostForm";

export default function NewBlogPostPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Add New Post</h1>
      <div className="mt-8">
        <BlogPostForm />
      </div>
    </div>
  );
}
