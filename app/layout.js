// WHAT THIS FILE DOES: The outermost wrapper around truly every page on the
// site, public and admin alike — it only sets up the fonts and the base
// page styling. It does NOT add the public Header/Footer anymore (those
// live in app/(site)/layout.js, applying to public pages only) and it does
// NOT add the admin sidebar (that lives in app/admin/(panel)/layout.js).
// This separation is what keeps the public site and the admin panel from
// ever bleeding into each other.
//
// Bricolage Grotesque (headlines) and Hanken Grotesk (body text) are the
// public site's typefaces — they're only switched on inside the
// ".site-theme" wrapper (see app/globals.css), so the admin panel keeps
// its own look. Bricolage is loaded with its extra "width" and "optical
// size" axes because the headline "taking form" animation moves along
// them, not just along weight.

import {
  Geist,
  Geist_Mono,
  Bricolage_Grotesque,
  Hanken_Grotesk,
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["wdth", "opsz"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  // Lets Next.js turn the relative image path from app/opengraph-image.js
  // into a full, correct link when the site is shared on WhatsApp/LinkedIn.
  metadataBase: new URL(SITE_URL),
  title: "Navavia — Where Ideas Take Form",
  description: "Portfolio website for Navavia — Where Ideas Take Form.",
  openGraph: {
    title: "Navavia — Where Ideas Take Form",
    description: "Portfolio website for Navavia — Where Ideas Take Form.",
    siteName: "Navavia",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Navavia — Where Ideas Take Form",
    description: "Portfolio website for Navavia — Where Ideas Take Form.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} ${hanken.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
