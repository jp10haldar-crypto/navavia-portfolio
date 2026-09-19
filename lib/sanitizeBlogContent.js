// WHAT THIS FILE DOES: Cleans the HTML saved by the admin's rich-text blog
// editor before it's ever shown to a real visitor, stripping anything
// dangerous (script tags, event-handler attributes like onerror, embedded
// frames) while keeping normal formatting intact. Used by
// components/BlogPostView.js, which renders that HTML directly.
//
// Uses "sanitize-html" specifically because it never builds a real or
// simulated web page (a "DOM") to do its work — it just reads through the
// HTML as text and rebuilds only the safe parts. The first version of this
// used a different library ("isomorphic-dompurify") that does build a
// simulated page in the background on the server; that turned out to
// behave correctly everywhere it was actually tested (this computer, in
// both development and a real production build) but broke with a server
// error specifically once deployed live — the most likely explanation is
// that Vercel's live servers run each page in a smaller, more restricted
// environment than either of those, and building even a simulated page in
// there hit some limit or missing piece the simulator needed. Switching to
// a library that does the same job without ever needing a real or
// simulated page removes that whole category of problem.
//
// The list below only allows exactly what the admin's editor toolbar can
// actually produce (bold, italic, headings, lists, quotes, links) plus a
// few extra formats that same editor can create via typed shortcuts even
// without a toolbar button for them (e.g. typing "# " for a heading, or
// "```" for a code block) — nothing else gets through.

import sanitizeHtml from "sanitize-html";

const ALLOWED_TAGS = [
  "p",
  "br",
  "hr",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "strong",
  "b",
  "em",
  "i",
  "s",
  "strike",
  "del",
  "ul",
  "ol",
  "li",
  "blockquote",
  "a",
  "code",
  "pre",
];

const ALLOWED_ATTRIBUTES = {
  a: ["href", "target", "rel"],
};

export function sanitizeBlogContent(html) {
  if (!html) return "";
  return sanitizeHtml(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRIBUTES,
    // Only allow real web links — blocks "javascript:" and other schemes
    // someone could otherwise hide inside an href.
    allowedSchemes: ["http", "https", "mailto"],
  });
}
