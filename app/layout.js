// WHAT THIS FILE DOES: The outermost wrapper around truly every page on the
// site, public and admin alike — it only sets up the fonts and the base
// page styling. It does NOT add the public Header/Footer anymore (those
// live in app/(site)/layout.js, applying to public pages only) and it does
// NOT add the admin sidebar (that lives in app/admin/(panel)/layout.js).
// This separation is what keeps the public site and the admin panel from
// ever bleeding into each other.

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Navavia — Where Ideas Take Form",
  description: "Portfolio website for Navavia — Where Ideas Take Form.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
