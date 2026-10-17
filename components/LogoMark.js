// WHAT THIS FILE DOES: The small Navavia symbol shown next to the name in
// the header and footer. It's the brand line drawn as a picture: a dashed
// blueprint square (the idea) with a solid amber square (the form) built
// on top of it. When the logo link is hovered, the amber square slides
// into place over the outline.

export default function LogoMark({ className = "h-7 w-7" }) {
  return (
    <svg viewBox="0 0 28 28" className={className} aria-hidden="true">
      <rect
        x="1.5"
        y="1.5"
        width="17"
        height="17"
        rx="3"
        fill="none"
        stroke="var(--line)"
        strokeWidth="1.5"
        strokeDasharray="3 2.5"
      />
      <rect
        x="9.5"
        y="9.5"
        width="17"
        height="17"
        rx="3.5"
        fill="var(--accent)"
        className="transition-transform duration-500 [transition-timing-function:var(--ease-form)] group-hover:-translate-x-[8px] group-hover:-translate-y-[8px]"
      />
    </svg>
  );
}
