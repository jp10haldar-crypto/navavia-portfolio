// WHAT THIS FILE DOES: The "share this post" buttons at the top of a blog
// post — LinkedIn, Facebook, WhatsApp, and a "Copy Link" button. Each
// share button just opens that service's own share page in a new tab with
// the post's link pre-filled; nothing is posted automatically. Runs in the
// browser because the copy-link button needs to react to a click and show
// a brief confirmation.

"use client";

import { useState } from "react";

export default function ShareButtons({ url, title }) {
  const [isCopied, setIsCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      window.alert("Could not copy the link. Please copy it from the address bar instead.");
    }
  }

  const linkClasses =
    "rounded-full border border-white/10 px-4 py-2 text-sm text-muted transition-colors hover:text-foreground";

  return (
    <div className="flex flex-wrap gap-2">
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClasses}
      >
        LinkedIn
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClasses}
      >
        Facebook
      </a>
      <a
        href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClasses}
      >
        WhatsApp
      </a>
      <button type="button" onClick={handleCopyLink} className={linkClasses}>
        {isCopied ? "Copied!" : "Copy Link"}
      </button>
    </div>
  );
}
