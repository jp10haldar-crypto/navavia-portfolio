// WHAT THIS FILE DOES: Emails you every time a new enquiry arrives. The
// enquiry form (components/EnquiryForm.js) first saves the enquiry to the
// database as before, then calls this address (/api/enquiry-notification)
// with the same details; this runs on Vercel's server (never in the
// visitor's browser) and sends you an email through your own Gmail.
// Pressing "Reply" in that email replies straight to the client.
//
// It needs three settings in Vercel (Project → Settings → Environment
// Variables) — kept there, not in this code, because the password is
// secret:
//   GMAIL_USER          the Gmail address that sends the email
//   GMAIL_APP_PASSWORD  a 16-character Gmail "App password" (not your
//                       normal Gmail password)
//   ENQUIRY_NOTIFY_TO   where to send it (optional — defaults to
//                       GMAIL_USER; several addresses can be
//                       comma-separated)
// If they're missing, enquiries still save normally — only the email is
// skipped.
//
// The email always goes to YOUR address(es) above — never to an address
// a visitor typed — so this can't be used to send email to other people.
// Every field is length-limited and HTML-escaped, and each visitor is
// limited to a few emails per hour.

import nodemailer from "nodemailer";

const MAX_LENGTHS = {
  fullName: 120,
  email: 200,
  phone: 40,
  country: 80,
  needType: 60,
  budgetRange: 80,
  message: 5000,
};

const SOURCE_FIELDS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
  "referrer",
  "landingPage",
];

// Best-effort limit of emails per visitor (by IP) per hour. Vercel can run
// several copies of this server, each with its own count, so this is a
// speed bump against floods rather than an exact limit.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;
const recentByIp = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const recent = (recentByIp.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    recentByIp.set(ip, recent);
    return true;
  }
  recent.push(now);
  recentByIp.set(ip, recent);
  if (recentByIp.size > 5000) recentByIp.clear();
  return false;
}

function clean(value, maxLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Same rule the form itself uses, kept simple on purpose.
function looksLikeEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function describeSource(source) {
  if (source.gclid || (source.utm_source === "google" && /cpc|paid|ads?/i.test(source.utm_medium))) {
    return "Google Ads";
  }
  if (/cpc|paid|ads?/i.test(source.utm_medium) && /facebook|instagram|fb|ig|meta/i.test(source.utm_source)) {
    return "Meta Ads";
  }
  if (source.utm_source) return source.utm_source;
  if (source.referrer) return source.referrer;
  return "Direct / unknown";
}

export async function POST(request) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  const to = process.env.ENQUIRY_NOTIFY_TO || user;
  if (!user || !pass) {
    return Response.json(
      { ok: false, message: "Email notifications are not set up yet." },
      { status: 503 }
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (isRateLimited(ip)) {
    return Response.json({ ok: false, message: "Too many requests." }, { status: 429 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  const enquiry = {};
  for (const [field, maxLength] of Object.entries(MAX_LENGTHS)) {
    enquiry[field] = clean(body?.[field], maxLength);
  }
  const source = {};
  for (const field of SOURCE_FIELDS) {
    source[field] = clean(body?.source?.[field], 300);
  }

  if (
    !enquiry.fullName ||
    !looksLikeEmail(enquiry.email) ||
    enquiry.message.length < 20
  ) {
    return Response.json({ ok: false, message: "Invalid enquiry." }, { status: 400 });
  }

  const sourceLabel = describeSource(source);
  const rows = [
    ["Name", enquiry.fullName],
    ["Email", enquiry.email],
    ["Phone", enquiry.phone],
    ["Country", enquiry.country],
    ["Needs", enquiry.needType],
    ["Budget", enquiry.budgetRange],
    ["Came from", sourceLabel],
    ["Campaign", source.utm_campaign],
    ["Keyword / ad", [source.utm_term, source.utm_content].filter(Boolean).join(" · ")],
    ["First page visited", source.landingPage],
  ].filter(([, value]) => value);

  const text = [
    `New enquiry from ${enquiry.fullName}`,
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    enquiry.message,
    "",
    "Reply to this email to answer them directly.",
    "Manage it in the admin panel: https://navavia.in/admin/enquiries",
  ].join("\n");

  const html = `
<div style="font-family:Arial,sans-serif;font-size:15px;color:#111;max-width:600px">
  <h2 style="margin:0 0 16px">New enquiry from ${escapeHtml(enquiry.fullName)}</h2>
  <table style="border-collapse:collapse;width:100%">
    ${rows
      .map(
        ([label, value]) =>
          `<tr><td style="padding:6px 12px 6px 0;color:#666;white-space:nowrap;vertical-align:top">${escapeHtml(label)}</td><td style="padding:6px 0">${escapeHtml(value)}</td></tr>`
      )
      .join("")}
  </table>
  <p style="margin:20px 0 6px;color:#666">Message</p>
  <div style="white-space:pre-wrap;padding:12px;background:#f5f5f5;border-radius:8px">${escapeHtml(enquiry.message)}</div>
  <p style="margin-top:20px;color:#666;font-size:13px">
    Reply to this email to answer ${escapeHtml(enquiry.fullName)} directly.<br>
    <a href="https://navavia.in/admin/enquiries">Open Enquiries in the admin panel</a>
  </p>
</div>`;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });
    await transporter.sendMail({
      from: { name: "Navavia Enquiries", address: user },
      to,
      replyTo: { name: enquiry.fullName, address: enquiry.email },
      subject: `New enquiry: ${enquiry.fullName} (${enquiry.needType || "General"}) via ${sourceLabel}`,
      text,
      html,
    });
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Enquiry email failed:", error?.message);
    return Response.json({ ok: false, message: "Email could not be sent." }, { status: 502 });
  }
}
