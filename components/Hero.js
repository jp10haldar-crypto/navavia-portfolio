// WHAT THIS FILE DOES: The main introduction section on the homepage — the
// big headline (which "takes form" word by word as the page opens), a
// short supporting sentence, two buttons, and the interactive picture of a
// finished website + its admin panel (components/BuildStage.js). It sits
// between the Header and Footer (which come from app/(site)/layout.js,
// not from this file). It's kept as its own reusable piece separate from
// the homepage file itself.

import Link from "next/link";
import FormingText from "@/components/FormingText";
import BuildStage from "@/components/BuildStage";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="blueprint-grid pointer-events-none absolute inset-x-0 -top-24 h-[110%]"
      />

      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-12 sm:pt-16 lg:px-10 lg:pb-28">
        <FormingText
          text="Websites and mobile apps, built to run without a developer."
          className="font-display max-w-6xl text-balance text-[clamp(2.5rem,5.2vw,4.75rem)] leading-[1.02] tracking-[-0.022em] text-foreground"
          weight={640}
        />

        <div className="mt-10 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col lg:col-span-4 lg:pt-6">
            <p className="max-w-md text-lg leading-relaxed text-muted">
              Navavia designs and builds complete websites and apps for
              businesses, then hands them over with an admin panel you run
              yourself. A finished product, not a project that needs a
              developer on call.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/projects" className="btn-form">
                See our work
              </Link>
              <Link href="/contact" className="btn-idea">
                Start a project
              </Link>
            </div>

            <p className="mt-auto hidden max-w-xs border-t border-white/10 pt-6 text-sm leading-relaxed text-muted lg:block">
              Every project ships with both sides: the site your customers use
              and the panel you run it from. Drag the amber line to compare.
            </p>
          </div>

          <div className="lg:col-span-8">
            <BuildStage />
            <p className="mt-6 text-sm text-muted lg:hidden">
              Every project ships with both sides. Drag the amber line to
              compare the customer site with its admin panel.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
