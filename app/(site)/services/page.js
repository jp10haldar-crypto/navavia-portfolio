// WHAT THIS FILE DOES: The "What We Build" services page, visible at
// /services. Unlike most other pages on this site, it has no database
// behind it at all — every word here is fixed content written directly
// into this file, so there's nothing to load and nothing that can fail.
// To change anything on this page later, edit the text directly in this
// file. Ends with the same "Ready to get started?" section used on the
// homepage.

import ClosingCTA from "@/components/ClosingCTA";

export const metadata = {
  title: "What We Build — Navavia",
  description:
    "Websites, mobile apps, and complete business systems — built once, handed over with a full admin panel, and run without needing a developer.",
  openGraph: {
    title: "What We Build — Navavia",
    description:
      "Websites, mobile apps, and complete business systems — built once, handed over with a full admin panel, and run without needing a developer.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "What We Build — Navavia",
    description:
      "Websites, mobile apps, and complete business systems — built once, handed over with a full admin panel, and run without needing a developer.",
  },
};

const SERVICES = [
  {
    name: "Websites",
    description:
      "A professional website that represents your business properly online — fast, mobile-friendly, and built to turn visitors into enquiries.",
    included: [
      "Custom design matched to your brand",
      "Fully responsive — looks right on every device",
      "Pages for your services, your work, and how to reach you",
      "Built with search engines in mind, so people can actually find you",
      "A private admin panel to update content yourself",
    ],
    suits:
      "Businesses that need a proper online presence and want to keep it current without calling a developer for every small change.",
  },
  {
    name: "Mobile Applications",
    description:
      "A dedicated app for iOS and Android that puts your business directly in your customers' hands — not just another tab in their browser.",
    included: [
      "A native-feeling app for both iOS and Android",
      "Accounts, bookings, or orders — built around what your business actually does",
      "Push notifications to bring customers back",
      "An admin panel to manage everything happening inside the app",
    ],
    suits:
      "Businesses that want an ongoing, direct relationship with customers — repeat bookings, loyalty, or regular transactions — beyond a one-off website visit.",
  },
  {
    name: "Complete Business Systems",
    description:
      "A website and a mobile app working together as one system, backed by a single admin panel that runs the whole operation.",
    included: [
      "A connected website and app sharing the same data",
      "One admin panel to manage both, not two separate logins",
      "Workflows built around how your business actually operates",
      "Room to grow — new features added to the same system over time",
    ],
    suits:
      "Businesses ready to run things end-to-end online — not just have a presence, but genuinely operate digitally.",
  },
];

const PROCESS_STEPS = [
  {
    title: "Enquiry",
    description: "You tell us what you need through the contact form.",
  },
  {
    title: "Discussion",
    description:
      "We talk through your goals and your customers — no jargon, no pressure.",
  },
  {
    title: "Build",
    description:
      "We design and build it, keeping you updated as it takes shape.",
  },
  {
    title: "Handover",
    description:
      "You get the finished product, working, with admin access and a walkthrough.",
  },
  {
    title: "Support",
    description: "We stay available if anything comes up after handover.",
  },
];

export default function ServicesPage() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          What We Build
        </h1>
        <p className="mt-3 max-w-xl text-muted">
          Three ways to work with us — each one handed over fully finished,
          with the tools to run it yourself.
        </p>

        <div className="mt-12 flex flex-col gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.name}
              className="rounded-xl border border-white/10 bg-card p-8"
            >
              <h2 className="text-2xl font-bold text-foreground">
                {service.name}
              </h2>
              <p className="mt-3 max-w-2xl text-muted">
                {service.description}
              </p>

              <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-accent">
                    What&apos;s Included
                  </p>
                  <ul className="mt-3 flex flex-col gap-2 text-sm text-foreground">
                    {service.included.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-accent">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-accent">
                    Who It Suits
                  </p>
                  <p className="mt-3 text-sm text-foreground">
                    {service.suits}
                  </p>
                </div>
              </div>

              <p className="mt-6 rounded-lg bg-background px-4 py-3 text-sm text-foreground">
                <span className="font-semibold text-accent">
                  You&apos;re in control:
                </span>{" "}
                every {service.name.toLowerCase()} project comes with a real
                admin panel, so you can run it yourself — no developer on
                call for routine changes.
              </p>
            </div>
          ))}
        </div>
      </div>

      <section className="bg-card">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            How It Works
          </h2>
          <p className="mt-3 max-w-xl text-muted">
            A straightforward process from first message to finished
            product.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {PROCESS_STEPS.map((step, index) => (
              <div key={step.title}>
                <span className="text-3xl font-bold text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 font-semibold text-foreground">
                  {step.title}
                </p>
                <p className="mt-2 text-sm text-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
          What Makes Us Different
        </h2>
        <p className="mt-4 text-muted">
          Most agencies hand you a finished product and disappear — or worse,
          quietly keep you dependent on them for every small change
          afterward. We build things the other way around: everything we
          deliver comes with a real admin panel, and by the time we hand it
          over, you own it completely and can run it yourself.
        </p>
        <p className="mt-4 text-muted">
          No lock-in. No waiting on a developer to fix a typo or add a
          product. The system is yours — we just make sure it works the way
          you need it to before we step back.
        </p>
      </div>

      <ClosingCTA />
    </div>
  );
}
