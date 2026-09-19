// WHAT THIS FILE DOES: Site-wide settings for Next.js itself. The
// `headers()` section below adds a handful of security headers to every
// single response — small instructions to the visitor's browser that
// close off some common attack angles, with no visible effect on how the
// site looks or works:
//   - X-Frame-Options: stops another website from embedding this one
//     inside an invisible frame to trick clicks (most relevant for the
//     admin login page).
//   - X-Content-Type-Options: stops the browser from guessing a file's
//     type from its content instead of trusting what the server says.
//   - Referrer-Policy: when a visitor clicks a link to leave this site,
//     only sends the destination the domain name, not the full page URL
//     they were on.
//   - Permissions-Policy: turns off browser features (camera, microphone,
//     location) this site never uses, so they can't be requested even by
//     mistake or by a compromised third-party script.
// A full Content-Security-Policy was deliberately left out — this site
// embeds YouTube videos, loads Cloudinary images, and talks to Firebase,
// and getting a CSP wrong in a way that's untestable without a real
// browser here risks silently breaking one of those rather than adding
// real protection. Worth adding later with real browser testing.

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
