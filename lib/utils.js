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
