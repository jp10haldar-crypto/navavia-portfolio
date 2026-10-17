// WHAT THIS FILE DOES: A row of filter buttons ("All", "Websites", ...)
// where exactly one is selected at a time — used above the Projects grid
// and the blog post list, so both filters look and behave the same. The
// selected one is filled; the rest are drawn as outlines. It only reports
// clicks — the page using it decides what each filter actually shows.
//
// `options` is a list of { label, value }.

export default function FilterChips({ options, active, onChange, label }) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isActive = active === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-pressed={isActive}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "bg-foreground text-background"
                : "text-muted ring-1 ring-inset ring-white/10 hover:text-foreground hover:ring-white/25"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
