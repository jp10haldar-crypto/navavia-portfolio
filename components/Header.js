// WHAT THIS FILE DOES: The navigation bar at the very top of every page.
// It's added once in app/(site)/layout.js (not copied onto each page by
// hand), and it stays stuck to the top of the screen as you scroll
// ("sticky") — see-through at the very top of the page, then gaining a
// soft frosted background once you scroll, so it never covers content
// awkwardly. It runs in the visitor's browser (not just once on the
// server) because it needs to react to clicks and scrolling — opening/
// closing the mobile menu, and highlighting whichever page link is
// currently active. The Blog and Services links disappear automatically if
// the admin turns that whole page off in Settings — checked against the
// same settings the pages themselves use to decide whether to show at all.
//
// On phones, the menu opens as a full-screen panel; Escape or tapping a
// link closes it, and the page behind can't scroll while it's open.

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getSiteSettings, DEFAULT_SITE_SETTINGS } from "@/lib/firestore";
import LogoMark from "@/components/LogoMark";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/reviews", label: "Reviews" },
  { href: "/blog", label: "Blog", settingsKey: "blogEnabled" },
  { href: "/services", label: "Services", settingsKey: "servicesEnabled" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname, href) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [settings, setSettings] = useState(DEFAULT_SITE_SETTINGS);

  useEffect(() => {
    getSiteSettings().then((result) => {
      setSettings(result.data);
    });
  }, []);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 8);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // While the mobile menu is open: Escape closes it, and the page behind
  // it can't be scrolled.
  useEffect(() => {
    if (!isMenuOpen) return undefined;

    function handleKeyDown(event) {
      if (event.key === "Escape") setIsMenuOpen(false);
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const visibleNavLinks = NAV_LINKS.filter(
    (link) => !link.settingsKey || settings[link.settingsKey]
  );
  // On wide screens "Contact" is shown as the button on the right instead
  // of as a plain link.
  const inlineLinks = visibleNavLinks.filter((link) => link.href !== "/contact");

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
          isScrolled || isMenuOpen
            ? "border-b border-white/6 bg-background/80 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-10">
          {/* LOGO IMAGE SPOT — the mark + "Navavia" below is drawn in code
              (components/LogoMark.js). When you have a logo file ready:
              1. Save it into public/images/ (e.g. public/images/logo.png).
              2. Add `import Image from "next/image";` near the top of THIS
                 file (components/Header.js), with the other imports.
              3. Replace the <LogoMark /> and the "Navavia" <span> with:
                 <Image src="/images/logo.png" alt="Navavia" width={40} height={40} />
              Everything else on this page stays exactly the same. */}
          <Link
            href="/"
            className="group flex items-center gap-2.5"
            onClick={() => setIsMenuOpen(false)}
          >
            <LogoMark />
            <span className="font-display text-[1.35rem] font-bold tracking-[-0.03em] text-foreground">
              Navavia
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
            {inlineLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative rounded-lg px-3.5 py-2 text-[0.95rem] transition-colors ${
                    active ? "text-foreground" : "text-muted hover:text-foreground"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute inset-x-3.5 -bottom-0.5 h-[2px] rounded-full bg-accent" />
                  )}
                </Link>
              );
            })}
            <Link
              href="/contact"
              aria-current={isActive(pathname, "/contact") ? "page" : undefined}
              className="btn-form ml-4 min-h-10 px-4 text-[0.9rem]"
            >
              Contact
            </Link>
          </nav>

          {/* Menu button — only visible on phones. The three lines fold into
              a cross while the menu is open. */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="relative -mr-2 flex h-11 w-11 items-center justify-center md:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <span
              className={`absolute h-[2px] w-6 rounded bg-foreground transition-transform duration-300 ${
                isMenuOpen ? "rotate-45" : "-translate-y-[7px]"
              }`}
            />
            <span
              className={`absolute h-[2px] w-6 rounded bg-foreground transition-opacity duration-200 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute h-[2px] w-6 rounded bg-foreground transition-transform duration-300 ${
                isMenuOpen ? "-rotate-45" : "translate-y-[7px]"
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu panel — fills the screen below the bar. Links slide in
          one after another when it opens. It sits beside the header rather
          than inside it: the header's frosted-glass effect would otherwise
          trap this full-screen panel inside the header's own 72px. */}
      <nav
        id="mobile-menu"
        aria-label="Main"
        className={`fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto bg-background px-6 pb-10 pt-6 transition-[opacity,visibility] duration-300 md:hidden ${
          isMenuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <ul className="flex flex-col">
          {visibleNavLinks.map((link, index) => {
            const active = isActive(pathname, link.href);
            return (
              <li
                key={link.href}
                className="border-b border-white/7 transition-[opacity,transform] duration-500"
                style={{
                  transitionDelay: isMenuOpen ? `${80 + index * 50}ms` : "0ms",
                  opacity: isMenuOpen ? 1 : 0,
                  transform: isMenuOpen ? "none" : "translateY(12px)",
                }}
              >
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={active ? "page" : undefined}
                  tabIndex={isMenuOpen ? 0 : -1}
                  className={`font-display flex items-center justify-between py-4 text-[2rem] font-semibold ${
                    active ? "text-accent" : "text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="mt-8 text-sm text-muted">Where Ideas Take Form</p>
      </nav>
    </>
  );
}
