// WHAT THIS FILE DOES: A place for small helper functions that multiple
// pages/components can share (things like formatting text or dates).
// This is also where we'll add the Firebase connection code in a later step
// (Firebase is not installed yet — this file is just the placeholder home
// for that future code). Nothing here runs on its own; other files import
// and call these functions when they need them.

/**
 * Capitalizes the first letter of a string.
 * Example: capitalize("hello") -> "Hello"
 */
export function capitalize(text) {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}
