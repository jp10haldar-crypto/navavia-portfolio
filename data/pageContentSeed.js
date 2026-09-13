// WHAT THIS FILE DOES: Starter content for the admin "Pages" section
// editor — the exact words already on the live site today, copied in here
// so importing them creates a fully editable starting point instead of a
// blank page. This file doesn't run by itself — it's only the source for
// the admin Pages screen's one-time "Import Starter Content" button, which
// copies it into the real database once.
//
// Every section has: page (which public page it belongs to), type, a
// heading, a subheading, body text, an image, a button label/link, a
// display order, and whether it's visible. Not every type uses every
// field — e.g. a "heading" section ignores body/image/button.
//
// "list" and "cards" sections also carry an `items` array: a plain list of
// point strings for "list", or {title, description} objects for "cards".
//
// A few types are "automatic" (featuredWork, homepageVideos, reviewsFeed,
// projectsGrid, blogFeed) — their repeating content still comes from the
// real projects/reviews/homepageVideos/blogPosts collections, exactly as
// before. Only their heading, subheading, order, and visibility live here.

export const pageContentSections = [
  // ---- HOME ----
  {
    page: "home",
    type: "featuredWork",
    heading: "Featured Work",
    subheading: "",
    body: "",
    image: "",
    buttonLabel: "",
    buttonLink: "",
    items: [],
    displayOrder: 1,
    visible: true,
  },
  {
    page: "home",
    type: "homepageVideos",
    heading: "How We Work",
    subheading: "A closer look at what we build and how we build it.",
    body: "",
    image: "",
    buttonLabel: "",
    buttonLink: "",
    items: [],
    displayOrder: 2,
    visible: true,
  },
  {
    page: "home",
    type: "reviewsFeed",
    heading: "What Our Clients Say",
    subheading:
      "Real feedback from businesses running the websites we built.",
    body: "",
    image: "",
    buttonLabel: "",
    buttonLink: "",
    items: [],
    displayOrder: 3,
    visible: true,
  },

  // ---- SERVICES ----
  {
    page: "services",
    type: "heading",
    heading: "What We Build",
    subheading:
      "Three ways to work with us — each one handed over fully finished, with the tools to run it yourself.",
    body: "",
    image: "",
    buttonLabel: "",
    buttonLink: "",
    items: [],
    displayOrder: 1,
    visible: true,
  },
  {
    page: "services",
    type: "text",
    heading: "Websites",
    subheading: "",
    body:
      "A professional website that represents your business properly online — fast, mobile-friendly, and built to turn visitors into enquiries.\n\nWho it suits: Businesses that need a proper online presence and want to keep it current without calling a developer for every small change.\n\nYou're in control: every website project comes with a real admin panel, so you can run it yourself — no developer on call for routine changes.",
    image: "",
    buttonLabel: "",
    buttonLink: "",
    items: [],
    displayOrder: 2,
    visible: true,
  },
  {
    page: "services",
    type: "list",
    heading: "What's Included — Websites",
    subheading: "",
    body: "",
    image: "",
    buttonLabel: "",
    buttonLink: "",
    items: [
      "Custom design matched to your brand",
      "Fully responsive — looks right on every device",
      "Pages for your services, your work, and how to reach you",
      "Built with search engines in mind, so people can actually find you",
      "A private admin panel to update content yourself",
    ],
    displayOrder: 3,
    visible: true,
  },
  {
    page: "services",
    type: "text",
    heading: "Mobile Applications",
    subheading: "",
    body:
      "A dedicated app for iOS and Android that puts your business directly in your customers' hands — not just another tab in their browser.\n\nWho it suits: Businesses that want an ongoing, direct relationship with customers — repeat bookings, loyalty, or regular transactions — beyond a one-off website visit.\n\nYou're in control: every mobile application project comes with a real admin panel, so you can run it yourself — no developer on call for routine changes.",
    image: "",
    buttonLabel: "",
    buttonLink: "",
    items: [],
    displayOrder: 4,
    visible: true,
  },
  {
    page: "services",
    type: "list",
    heading: "What's Included — Mobile Applications",
    subheading: "",
    body: "",
    image: "",
    buttonLabel: "",
    buttonLink: "",
    items: [
      "A native-feeling app for both iOS and Android",
      "Accounts, bookings, or orders — built around what your business actually does",
      "Push notifications to bring customers back",
      "An admin panel to manage everything happening inside the app",
    ],
    displayOrder: 5,
    visible: true,
  },
  {
    page: "services",
    type: "text",
    heading: "Complete Business Systems",
    subheading: "",
    body:
      "A website and a mobile app working together as one system, backed by a single admin panel that runs the whole operation.\n\nWho it suits: Businesses ready to run things end-to-end online — not just have a presence, but genuinely operate digitally.\n\nYou're in control: every complete business systems project comes with a real admin panel, so you can run it yourself — no developer on call for routine changes.",
    image: "",
    buttonLabel: "",
    buttonLink: "",
    items: [],
    displayOrder: 6,
    visible: true,
  },
  {
    page: "services",
    type: "list",
    heading: "What's Included — Complete Business Systems",
    subheading: "",
    body: "",
    image: "",
    buttonLabel: "",
    buttonLink: "",
    items: [
      "A connected website and app sharing the same data",
      "One admin panel to manage both, not two separate logins",
      "Workflows built around how your business actually operates",
      "Room to grow — new features added to the same system over time",
    ],
    displayOrder: 7,
    visible: true,
  },
  {
    page: "services",
    type: "cards",
    heading: "How It Works",
    subheading: "A straightforward process from first message to finished product.",
    body: "",
    image: "",
    buttonLabel: "",
    buttonLink: "",
    items: [
      { title: "Enquiry", description: "You tell us what you need through the contact form." },
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
      { title: "Support", description: "We stay available if anything comes up after handover." },
    ],
    displayOrder: 8,
    visible: true,
  },
  {
    page: "services",
    type: "text",
    heading: "What Makes Us Different",
    subheading: "",
    body:
      "Most agencies hand you a finished product and disappear — or worse, quietly keep you dependent on them for every small change afterward. We build things the other way around: everything we deliver comes with a real admin panel, and by the time we hand it over, you own it completely and can run it yourself.\n\nNo lock-in. No waiting on a developer to fix a typo or add a product. The system is yours — we just make sure it works the way you need it to before we step back.",
    image: "",
    buttonLabel: "",
    buttonLink: "",
    items: [],
    displayOrder: 9,
    visible: true,
  },

  // ---- PROJECTS ----
  {
    page: "projects",
    type: "heading",
    heading: "Our Work",
    subheading: "Websites and mobile applications we have built and delivered.",
    body: "",
    image: "",
    buttonLabel: "",
    buttonLink: "",
    items: [],
    displayOrder: 1,
    visible: true,
  },
  {
    page: "projects",
    type: "projectsGrid",
    heading: "",
    subheading: "",
    body: "",
    image: "",
    buttonLabel: "",
    buttonLink: "",
    items: [],
    displayOrder: 2,
    visible: true,
  },

  // ---- REVIEWS ----
  {
    page: "reviews",
    type: "reviewsFeed",
    heading: "Client Reviews",
    subheading: "Honest feedback from the businesses we work with.",
    body: "",
    image: "",
    buttonLabel: "",
    buttonLink: "",
    items: [],
    displayOrder: 1,
    visible: true,
  },
  {
    page: "reviews",
    type: "cta",
    heading: "Want results like these for your business?",
    subheading: "",
    body: "",
    image: "",
    buttonLabel: "Get in Touch",
    buttonLink: "/contact",
    items: [],
    displayOrder: 2,
    visible: true,
  },

  // ---- BLOG ----
  {
    page: "blog",
    type: "heading",
    heading: "Insights",
    subheading: "Articles and ideas from the Navavia team.",
    body: "",
    image: "",
    buttonLabel: "",
    buttonLink: "",
    items: [],
    displayOrder: 1,
    visible: true,
  },
  {
    page: "blog",
    type: "blogFeed",
    heading: "",
    subheading: "",
    body: "",
    image: "",
    buttonLabel: "",
    buttonLink: "",
    items: [],
    displayOrder: 2,
    visible: true,
  },

  // ---- CONTACT ----
  {
    page: "contact",
    type: "heading",
    heading: "Get in Touch",
    subheading: "Tell us a bit about what you need, and we'll get back to you.",
    body: "",
    image: "",
    buttonLabel: "",
    buttonLink: "",
    items: [],
    displayOrder: 1,
    visible: true,
  },
];
