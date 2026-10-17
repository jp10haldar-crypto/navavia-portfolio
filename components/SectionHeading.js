// WHAT THIS FILE DOES: The heading + optional supporting line at the top
// of a section (Featured Work, client reviews, videos, admin-editable page
// sections...). Keeping it in one place means every section title on the
// public site has exactly the same size, weight, and spacing.
//
// `as` lets a page use it for its main title (h1) instead of a section
// title (h2) — page titles are set larger and "take form" as the page
// opens (components/FormingText.js). `action` is an optional link shown on
// the right on wide screens (e.g. "All projects").

import FormingText from "@/components/FormingText";

export default function SectionHeading({
  heading,
  subheading,
  as = "h2",
  action = null,
  className = "",
}) {
  if (!heading && !subheading && !action) return null;

  const isPageTitle = as === "h1";

  return (
    <div
      className={`flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between ${className}`}
    >
      <div className="max-w-3xl">
        {heading &&
          (isPageTitle ? (
            <FormingText
              text={heading}
              as="h1"
              weight={640}
              className="font-display text-[clamp(2.5rem,6vw,4.75rem)] leading-[1.02] tracking-[-0.024em] text-foreground"
            />
          ) : (
            <h2 className="font-display text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.04] text-foreground">
              {heading}
            </h2>
          ))}
        {subheading && (
          <p
            className={`max-w-2xl text-muted ${
              isPageTitle ? "mt-6 text-lg sm:text-xl" : "mt-4 text-lg"
            }`}
          >
            {subheading}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
