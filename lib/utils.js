// WHAT THIS FILE DOES: A place for small helper functions that multiple
// pages/components can share (things like formatting text, or pulling a
// video id out of a pasted YouTube link). The actual Firebase connection
// now lives in lib/firebase.js and lib/firestore.js. Nothing here runs on
// its own; other files import and call these functions when they need them.

/**
 * Capitalizes the first letter of a string.
 * Example: capitalize("hello") -> "Hello"
 */
export function capitalize(text) {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Pulls the video id out of any YouTube link someone might paste in
 * (a full watch link, a youtu.be short link, or an embed link). If what's
 * pasted is already just the bare id, it's returned as-is. If nothing
 * recognizable is found, returns an empty string.
 * Example: extractYouTubeId("https://youtu.be/dQw4w9WgXcQ") -> "dQw4w9WgXcQ"
 */
export function extractYouTubeId(input) {
  if (!input) return "";
  const trimmed = input.trim();

  const linkPattern =
    /(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const linkMatch = trimmed.match(linkPattern);
  if (linkMatch) return linkMatch[1];

  // Already looks like a bare 11-character video id.
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  return "";
}

/**
 * Turns a blog post title into a web-address-friendly "slug": all
 * lowercase, spaces and punctuation turned into single hyphens, no
 * leading/trailing hyphens.
 * Example: slugify("5 Tips for a Faster Website!") -> "5-tips-for-a-faster-website"
 */
export function slugify(title) {
  if (!title) return "";
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Estimates how many minutes an average reader would take to read a blog
 * post, based on its content. Strips any HTML tags first (the content is
 * stored as HTML from the rich text editor), counts words, and assumes
 * about 200 words per minute — a commonly used average reading speed.
 * Always returns at least 1.
 */
export function calculateReadingTime(htmlContent) {
  if (!htmlContent) return 1;
  const plainText = htmlContent.replace(/<[^>]*>/g, " ");
  const wordCount = plainText.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

/**
 * Checks whether some text looks like a real email address
 * (something@something.something). Not a perfect check — no check
 * actually is — just enough to catch obvious typos.
 */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

// ---- CONTACT FORM SPAM PROTECTION ----
//
// HOW THIS WORKS, IN PLAIN ENGLISH: every time someone successfully sends
// an enquiry, the current time gets saved in their own browser's storage
// (like a sticky note only that browser can read — nothing is sent to the
// server for this check). Before letting a new enquiry send, we look at
// how many of those sticky notes are less than an hour old. If there are
// already 3, we block the send and show a message instead. Old notes (over
// an hour) are ignored automatically. This isn't bulletproof — someone
// could clear their browser data or use a different browser to get around
// it — but it stops the common case of someone accidentally (or casually)
// mashing "Send" over and over.

const ENQUIRY_RATE_LIMIT_KEY = "sb_enquiry_submission_times";
const ENQUIRY_RATE_LIMIT_MAX = 3;
const ENQUIRY_RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function readRecentEnquiryTimestamps() {
  try {
    const raw = window.localStorage.getItem(ENQUIRY_RATE_LIMIT_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    const cutoff = Date.now() - ENQUIRY_RATE_LIMIT_WINDOW_MS;
    return Array.isArray(parsed) ? parsed.filter((time) => time > cutoff) : [];
  } catch {
    return [];
  }
}

/** True if this browser has already sent 3 enquiries in the last hour. */
export function hasReachedEnquiryLimit() {
  if (typeof window === "undefined") return false;
  return readRecentEnquiryTimestamps().length >= ENQUIRY_RATE_LIMIT_MAX;
}

/** Call this right after an enquiry sends successfully. */
export function recordEnquirySubmission() {
  if (typeof window === "undefined") return;
  const timestamps = readRecentEnquiryTimestamps();
  timestamps.push(Date.now());
  try {
    window.localStorage.setItem(
      ENQUIRY_RATE_LIMIT_KEY,
      JSON.stringify(timestamps)
    );
  } catch {
    // If this browser has localStorage disabled, the limit just can't be
    // remembered — the enquiry itself still goes through fine.
  }
}
