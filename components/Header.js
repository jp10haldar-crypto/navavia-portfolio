// WHAT THIS FILE DOES: The navigation bar at the very top of every page.
// It's added once in app/layout.js (not copied onto each page by hand), and
// it stays stuck to the top of the screen as you scroll ("sticky"). It runs
// in the visitor's browser (not just once on the server) because it needs
// to react to clicks — opening/closing the mobile menu, and highlighting
// whichever page link is currently active.

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-6">
        {/* LOGO SPOT: shown as plain bold text for now. When a logo image is
            ready in public/images, swap the text below for an <Image> tag
            pointing at it (e.g. /images/logo.png) — everything else in the
            header stays the same. */}
        <Link href="/" className="text-lg font-bold text-foreground">
          Seller Backbone
        </Link>

        {/* Desktop navigation links — hidden on narrow screens, shown from
            the "md" breakpoint (tablet/laptop width) upward. */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                pathname === link.href
                  ? "text-accent font-medium"
                  : "text-foreground transition-colors hover:text-accent"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Hamburger button — only visible on mobile. Tapping it shows/hides
            the stacked menu below. */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="flex flex-col gap-1.5 p-2 md:hidden"
          aria-label="Toggle menu"
        >
          <span className="block h-0.5 w-6 bg-foreground" />
          <span className="block h-0.5 w-6 bg-foreground" />
          <span className="block h-0.5 w-6 bg-foreground" />
        </button>
      </div>

      {/* Mobile menu panel — only rendered while isMenuOpen is true. Tapping
          a link closes the menu and navigates to that page. */}
      {isMenuOpen && (
        <nav className="flex flex-col gap-4 border-t border-white/10 bg-background px-6 pb-6 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={
                pathname === link.href
                  ? "text-accent font-medium"
                  : "text-foreground transition-colors hover:text-accent"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
