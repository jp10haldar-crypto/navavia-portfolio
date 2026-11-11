// WHAT THIS FILE DOES: The small set of browser-only helpers that connect
// the public site to your ad accounts (Meta / Facebook-Instagram Ads and
// Google Ads). Three jobs:
//   1. Validating the tracking IDs typed into the admin "Ads & Tracking"
//      page, so only real-looking IDs are ever put into a script tag.
//   2. Reporting conversions — "Lead" (an enquiry form was sent) and
//      "Contact" (someone tapped WhatsApp / email / phone) — to whichever
//      ad platforms are switched on. If a platform's ID isn't set, its
//      script never loads and these calls quietly do nothing.
//   3. Remembering where a visitor came from (which ad, campaign, or
//      website) so that information is attached to their enquiry and you
//      can see in the admin Enquiries list which ads actually bring
//      clients — not just clicks.
// Everything here only runs in the visitor's browser.

const ATTRIBUTION_STORAGE_KEY = "navavia_attribution";
const ATTRIBUTION_MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000; // 90 days
const MAX_FIELD_LENGTH = 300;

// The URL parameters ad platforms (and hand-tagged links) add to a link.
// gclid = Google Ads click, fbclid = Meta (Facebook/Instagram) click.
const TRACKED_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
];

// ---- ID VALIDATION ----

// Meta Pixel IDs are 15–16 digits; allow a little slack either side.
export function isValidMetaPixelId(value) {
  return /^\d{10,20}$/.test(value || "");
}

// Google Ads tag IDs look like "AW-123456789".
export function isValidGoogleAdsId(value) {
  return /^AW-\d{6,15}$/.test(value || "");
}

// Google Ads conversion labels are short letter/number/dash/underscore codes.
export function isValidConversionLabel(value) {
  return /^[A-Za-z0-9_-]{4,40}$/.test(value || "");
}

// ---- CONVERSIONS ----

// The conversion labels are only known after the settings load, so the
// tracking component stores them here for the helpers below to use.
let googleAdsConfig = { id: "", leadLabel: "", contactLabel: "" };

export function setGoogleAdsConfig(config) {
  googleAdsConfig = config;
}

function sendToGoogleAds(label, extra = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  if (!googleAdsConfig.id || !label) return;
  window.gtag("event", "conversion", {
    send_to: `${googleAdsConfig.id}/${label}`,
    ...extra,
  });
}

function sendToMeta(eventName, extra = {}) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq("track", eventName, extra);
}

// Call after an enquiry has been saved successfully. This is the
// conversion the ad platforms should optimise for.
export function trackLead(details = {}) {
  sendToMeta("Lead", { content_category: details.needType || "" });
  sendToGoogleAds(googleAdsConfig.leadLabel);
}

// Call when someone taps a WhatsApp, email, or phone link — a softer
// signal than a form, but many clients prefer to message directly.
export function trackContact(method) {
  sendToMeta("Contact", { content_name: method });
  sendToGoogleAds(googleAdsConfig.contactLabel);
}

// Reports a page view after moving between pages inside the site (the
// very first page view is sent automatically when the scripts load).
export function trackPageView() {
  if (typeof window === "undefined") return;
  if (typeof window.fbq === "function") window.fbq("track", "PageView");
  if (typeof window.gtag === "function" && googleAdsConfig.id) {
    window.gtag("event", "page_view", {
      send_to: googleAdsConfig.id,
      page_location: window.location.href,
    });
  }
}

// ---- WHERE THE VISITOR CAME FROM ----

function clip(value) {
  return String(value || "").slice(0, MAX_FIELD_LENGTH);
}

function readStoredAttribution() {
  try {
    const raw = window.localStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (!raw) return null;
    const stored = JSON.parse(raw);
    if (!stored?.capturedAt || Date.now() - stored.capturedAt > ATTRIBUTION_MAX_AGE_MS) {
      window.localStorage.removeItem(ATTRIBUTION_STORAGE_KEY);
      return null;
    }
    return stored;
  } catch {
    return null;
  }
}

function writeStoredAttribution(data) {
  try {
    window.localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Storage blocked (private mode, etc.) — attribution is a nice-to-have.
  }
}

// Runs once when a visitor lands. A visit from an ad or a tagged link
// always replaces what was stored before (the most recent ad click is the
// one that brought them back). Otherwise, the first outside website they
// came from is kept, so organic visits are still labelled sensibly.
export function captureAttribution() {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const tagged = {};
  for (const key of TRACKED_PARAMS) {
    const value = params.get(key);
    if (value) tagged[key] = clip(value);
  }

  let externalReferrer = "";
  try {
    if (document.referrer) {
      const referrerUrl = new URL(document.referrer);
      if (referrerUrl.host !== window.location.host) {
        externalReferrer = referrerUrl.host;
      }
    }
  } catch {
    // Unreadable referrer — ignore.
  }

  const base = {
    referrer: clip(externalReferrer),
    landingPage: clip(window.location.pathname),
    capturedAt: Date.now(),
  };

  if (Object.keys(tagged).length > 0) {
    writeStoredAttribution({ ...base, ...tagged });
  } else if (!readStoredAttribution() && externalReferrer) {
    writeStoredAttribution(base);
  }
}

// What gets saved alongside an enquiry. Always returns the same set of
// plain string fields (empty when unknown), so nothing unexpected is ever
// written to the database.
export function getAttributionForEnquiry() {
  const empty = {
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: "",
    gclid: "",
    fbclid: "",
    referrer: "",
    landingPage: "",
  };
  if (typeof window === "undefined") return empty;

  const stored = readStoredAttribution() || {};
  const result = { ...empty };
  for (const key of Object.keys(empty)) {
    result[key] = clip(stored[key]);
  }
  return result;
}

// A short, human-readable label for the admin Enquiries list, worked out
// from the saved source details (e.g. "Google Ads", "Meta Ads",
// "google.com", "Direct").
export function describeEnquirySource(source) {
  // Note: Facebook adds "fbclid" to EVERY link clicked inside its apps —
  // ads and ordinary posts alike — so fbclid alone can't prove it was an
  // ad. Meta ads should carry utm_medium=paid (see the Ads & Tracking
  // admin page) to be labelled "Meta Ads".
  if (!source) return "Unknown";
  const utmSource = (source.utm_source || "").toLowerCase();
  const isPaid = /cpc|ppc|paid|ads?\b/i.test(source.utm_medium || "");

  if (source.gclid || (isPaid && utmSource === "google")) return "Google Ads";
  if (isPaid && ["facebook", "instagram", "fb", "ig", "meta"].includes(utmSource)) {
    return "Meta Ads";
  }
  if (source.fbclid) return "Facebook / Instagram";
  if (source.utm_source) return source.utm_source;
  if (source.referrer) return source.referrer;
  return "Direct";
}
