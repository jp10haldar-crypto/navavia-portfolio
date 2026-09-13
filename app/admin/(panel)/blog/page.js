// WHAT THIS FILE DOES: The admin's blog post list, visible at
// /admin/blog. Shows every post (draft or published) with Edit/Preview/
// Delete buttons, and an "Add New Post" button. Preview opens the real
// post page in a new tab. Deleting always asks for confirmation first.
// Runs in the browser so it can load the live list and react to clicks.

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllBlogPosts, deleteBlogPost } from "@/lib/firestore";

function formatDate(dateString) {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleDateString(undefined, {
    dateStyle: "medium",
  });
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState(undefined); // undefined = still loading
  const [loadError, setLoadError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  function loadPosts() {
    return getAllBlogPosts().then((result) => {
      if (result.success) {
        setPosts(result.data);
      } else {
        setLoadError(result.message);
      }
    });
  }

  useEffect(() => {
    loadPosts();
  }, []);

  async function handleDelete(post) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${post.title}"? This cannot be undone.`
    );
    if (!confirmed) return;

    setDeletingId(post.id);
    const result = await deleteBlogPost(post.id);
    setDeletingId(null);

    if (result.success) {
      setPosts((current) => current.filter((item) => item.id !== post.id));
    } else {
      window.alert(result.message);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground">Blog</h1>
        <Link
          href="/admin/blog/new"
          className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90"
        >
          Add New Post
        </Link>
      </div>

      {loadError && <p className="mt-6 text-muted">{loadError}</p>}
      {!loadError && posts === undefined && (
        <p className="mt-6 text-muted">Loading posts...</p>
      )}
      {!loadError && posts?.length === 0 && (
        <p className="mt-6 text-muted">
          No posts yet. Click &quot;Add New Post&quot; above to write your first one.
        </p>
      )}

      {!loadError && posts?.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-muted">
                <th className="py-3 pr-4">Title</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3 pr-4">Date</th>
                <th className="py-3 pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-white/10">
                  <td className="py-3 pr-4 text-foreground">{post.title}</td>
                  <td className="py-3 pr-4 text-muted">
                    {post.published ? (
                      <span className="text-accent">Published</span>
                    ) : (
                      <span>Draft</span>
                    )}
                  </td>
                  <td className="py-3 pr-4 text-muted">
                    {formatDate(post.publishedDate)}
                  </td>
                  <td className="py-3 pr-4">
                    <div className="flex gap-4">
                      <Link
                        href={`/admin/blog/${post.id}/edit`}
                        className="text-accent hover:opacity-80"
                      >
                        Edit
                      </Link>
                      <a
                        href={`/admin/blog-preview/${post.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted hover:text-foreground"
                      >
                        Preview ↗
                      </a>
                      <button
                        type="button"
                        onClick={() => handleDelete(post)}
                        disabled={deletingId === post.id}
                        className="text-red-400 hover:opacity-80 disabled:opacity-50"
                      >
                        {deletingId === post.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
