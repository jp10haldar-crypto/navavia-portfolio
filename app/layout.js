// WHAT THIS FILE DOES: This wraps every single page on the site (it's the
// shared "frame" — header, footer, and fonts that apply everywhere). It runs
// for every page load. The Header goes above {children} (the current page's
// own content) and the Footer goes below it, so every page automatically
// gets both without needing to add them individually.

import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
  title: "Seller Backbone — Portfolio",
  description: "Portfolio website for Seller Backbone.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
