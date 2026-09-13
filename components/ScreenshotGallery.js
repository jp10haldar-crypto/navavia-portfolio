// WHAT THIS FILE DOES: A grid of screenshots, reused on the project detail
// page for both the "customer view" section and the "admin panel" section
// — each call to this component gets its own independent popup, so
// sliding through one set (e.g. customer screenshots) never jumps into the
// other (e.g. admin screenshots). Clicking any screenshot opens it
// enlarged in a popup with its caption and a "3 of 7" counter, and you can
// move to the next/previous image without closing the popup — via the
// on-screen arrow buttons, the left/right arrow keys, or swiping on a
// phone. It stops at the first and last image instead of wrapping around,
// greying out whichever arrow has nowhere further to go. Pressing Escape,
// clicking the × button, or clicking the dark background closes it; while
// it's open, the page behind it can't be scrolled. Runs in the browser
// because it reacts to clicks, key presses, and touch gestures.
//
// Each screenshot is normally { url, caption } — older projects saved
// before captions existed have plain URL strings instead; those are
// treated as { url: thatString, caption: "" }, so nothing about them
// breaks.

"use client";

import { useEffect, useRef, useState } from "react";

const SWIPE_THRESHOLD_PX = 40;

function normalizeScreenshots(screenshots) {
  return (screenshots || []).map((item) =>
    typeof item === "string" ? { url: item, caption: "" } : item
  );
}

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
  const images = normalizeScreenshots(screenshots);
  const [openIndex, setOpenIndex] = useState(null);
  const touchStartX = useRef(null);

  const isOpen = openIndex !== null;
  const hasPrev = isOpen && openIndex > 0;
  const hasNext = isOpen && openIndex < images.length - 1;

  function goPrev() {
    if (hasPrev) setOpenIndex((current) => current - 1);
  }

  function goNext() {
    if (hasNext) setOpenIndex((current) => current + 1);
  }

  // Blocks the page behind from scrolling while the popup is open. Kept
  // in its own effect, separate from the keyboard listener below, so it
  // only ever runs once when the popup opens and once when it closes —
  // not on every next/previous image change, which would otherwise
  // capture "hidden" as the "previous" value partway through and fail to
  // restore true normal scrolling when the popup finally closes.
  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  // Keyboard control (Escape, arrow keys) — re-attached whenever the
  // current image changes, so hasPrev/hasNext are always up to date for
  // the boundary check.
  useEffect(() => {
    if (!isOpen) return undefined;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setOpenIndex(null);
      } else if (event.key === "ArrowLeft") {
        goPrev();
      } else if (event.key === "ArrowRight") {
        goNext();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, openIndex, images.length]);

  function handleTouchStart(event) {
    touchStartX.current = event.touches[0].clientX;
  }

  function handleTouchEnd(event) {
    if (touchStartX.current === null) return;
    const deltaX = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX) return;
    if (deltaX < 0) {
      goNext(); // swiped left -> next image
    } else {
      goPrev(); // swiped right -> previous image
    }
  }

  const current = isOpen ? images[openIndex] : null;

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {images.map((image, index) => (
          <Thumbnail
            key={index}
            src={image.url}
            alt={image.caption || `${altPrefix} screenshot ${index + 1}`}
            onClick={() => image.url && setOpenIndex(index)}
          />
        ))}
      </div>

      {isOpen && current && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 p-4 sm:p-6"
          onClick={() => setOpenIndex(null)}
        >
          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            aria-label="Close"
            className="absolute right-4 top-4 text-3xl text-white sm:right-6 sm:top-6"
          >
            ×
          </button>

          <p className="absolute top-4 left-1/2 -translate-x-1/2 text-sm text-white/70 sm:top-6">
            {openIndex + 1} of {images.length}
          </p>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              goPrev();
            }}
            disabled={!hasPrev}
            aria-label="Previous image"
            className={`absolute left-2 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition-opacity sm:left-4 ${
              hasPrev ? "hover:bg-white/20" : "cursor-not-allowed opacity-30"
            }`}
          >
            ‹
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              goNext();
            }}
            disabled={!hasNext}
            aria-label="Next image"
            className={`absolute right-2 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition-opacity sm:right-4 ${
              hasNext ? "hover:bg-white/20" : "cursor-not-allowed opacity-30"
            }`}
          >
            ›
          </button>

          <div
            className="flex max-h-full max-w-full flex-col items-center gap-3"
            onClick={(event) => event.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.url}
              alt={current.caption || altPrefix}
              className="max-h-[75vh] max-w-full rounded-lg object-contain"
            />
            {current.caption && (
              <p className="max-w-xl px-4 text-center text-sm text-white/90">
                {current.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
