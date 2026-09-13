// WHAT THIS FILE DOES: A grid of screenshots, reused on the project detail
// page for both the "customer view" section and the "admin panel" section.
// Clicking any screenshot opens it enlarged in a popup overlay; pressing
// Escape, clicking the × button, or clicking the dark background closes it
// again. It runs in the browser because it has to react to clicks and key
// presses.

"use client";

import { useEffect, useState } from "react";

function Thumbnail({ src, alt, onClick }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-background text-sm text-muted">
        Screenshot coming soon
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onClick={onClick}
      onError={() => setFailed(true)}
      className="aspect-video w-full cursor-pointer rounded-lg object-cover transition-opacity hover:opacity-90"
    />
  );
}

export default function ScreenshotGallery({ screenshots, altPrefix }) {
  const [openSrc, setOpenSrc] = useState(null);

  useEffect(() => {
    if (!openSrc) return undefined;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setOpenSrc(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openSrc]);

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {screenshots.map((src, index) => (
          <Thumbnail
            key={index}
            src={src}
            alt={`${altPrefix} screenshot ${index + 1}`}
            onClick={() => src && setOpenSrc(src)}
          />
        ))}
      </div>

      {openSrc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
          onClick={() => setOpenSrc(null)}
        >
          <button
            type="button"
            onClick={() => setOpenSrc(null)}
            aria-label="Close"
            className="absolute right-6 top-6 text-3xl text-white"
          >
            ×
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={openSrc}
            alt={altPrefix}
            onClick={(event) => event.stopPropagation()}
            className="max-h-full max-w-full rounded-lg object-contain"
          />
        </div>
      )}
    </>
  );
}
