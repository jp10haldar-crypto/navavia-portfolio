// WHAT THIS FILE DOES: Temporary, made-up project data so the site has
// something real to display while we build it. Later, this will likely be
// replaced by real data pulled from Firebase (see Step 6 in the build
// plan). This file doesn't "run" by itself — pages/components import this
// list and loop over it to show project cards.
//
// Field notes:
// - category is either "Website" or "Mobile App" (used by the filter buttons)
// - techUsed is a list of the tools/technologies used on that project
// - youtubeId is the part of a YouTube URL after "watch?v=". Leave it as ""
//   to show the "coming soon" placeholder instead of a real video.
// - customerScreenshots/adminScreenshots are lists of image paths. They
//   currently all point at the sample placeholder images generated in
//   public/images/placeholders/ so the screenshot grids and the
//   click-to-enlarge popup have something real to show. Replace these
//   paths with real screenshots (e.g. "/images/my-project-shot-1.png")
//   once they exist.
// - featured controls whether a project shows in the homepage's
//   "Featured Work" section

const SAMPLE_CUSTOMER_SCREENSHOTS = [
  "/images/placeholders/customer-1.svg",
  "/images/placeholders/customer-2.svg",
  "/images/placeholders/customer-3.svg",
];

const SAMPLE_ADMIN_SCREENSHOTS = [
  "/images/placeholders/admin-1.svg",
  "/images/placeholders/admin-2.svg",
  "/images/placeholders/admin-3.svg",
];

export const projects = [
  {
    id: 1,
    title: "Travel Agency Booking Website",
    category: "Website",
    shortDescription:
      "A booking website for a travel agency, letting customers search trips and book online.",
    longDescription:
      "A full booking website built for a travel agency. Customers can browse available trips, check live availability, and book directly online, while the agency manages listings and bookings from a private admin area.",
    techUsed: ["Next.js", "Tailwind CSS", "Firebase"],
    liveUrl: "https://example.com",
    // TEST VIDEO — this is a real, safe, public YouTube video used only to
    // confirm the video embed works. Replace the line below with your own
    // video's id (the part of its YouTube URL after "watch?v=") once you
    // have a real walkthrough recorded.
    youtubeId: "jNQXAC9IVRw",
    customerScreenshots: SAMPLE_CUSTOMER_SCREENSHOTS,
    adminScreenshots: SAMPLE_ADMIN_SCREENSHOTS,
    featured: true,
  },
  {
    id: 2,
    title: "E-Commerce Store",
    category: "Website",
    shortDescription:
      "An online store for browsing products, managing a cart, and checking out securely.",
    longDescription:
      "A complete e-commerce storefront with product listings, a shopping cart, and secure checkout, backed by an admin panel for managing products, orders, and inventory.",
    techUsed: ["Next.js", "Tailwind CSS", "Stripe"],
    liveUrl: "https://example.com",
    youtubeId: "",
    customerScreenshots: SAMPLE_CUSTOMER_SCREENSHOTS,
    adminScreenshots: SAMPLE_ADMIN_SCREENSHOTS,
    featured: true,
  },
  {
    id: 3,
    title: "Mobile App",
    category: "Mobile App",
    shortDescription:
      "A cross-platform mobile app for browsing services and managing bookings on the go.",
    longDescription:
      "A mobile app built for both iOS and Android, letting customers browse services, make bookings, and track their order history, with push notifications for updates.",
    techUsed: ["React Native", "Firebase"],
    liveUrl: "https://example.com",
    youtubeId: "",
    customerScreenshots: SAMPLE_CUSTOMER_SCREENSHOTS,
    adminScreenshots: SAMPLE_ADMIN_SCREENSHOTS,
    featured: false,
  },
];
