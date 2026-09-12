// WHAT THIS FILE DOES: Temporary, made-up project data so the site has
// something real to display while we build it. Later, this will likely be
// replaced by real data pulled from Firebase (see Step 6 in the build
// plan). This file doesn't "run" by itself — pages/components import this
// list and loop over it to show project cards.
//
// Field notes:
// - category is either "Website" or "Mobile App" (used by the filter buttons)
// - techUsed is a list of the tools/technologies used on that project
// - youtubeId is left empty ("") until a real walkthrough video exists
// - customerScreenshots/adminScreenshots are lists of image paths — the
//   files don't exist yet, so cards will show a placeholder box instead of
//   a broken image until real screenshots are added to public/images
// - featured controls whether a project shows in the homepage's
//   "Featured Work" section

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
    youtubeId: "",
    customerScreenshots: ["/images/travel-agency-customer-1.png"],
    adminScreenshots: ["/images/travel-agency-admin-1.png"],
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
    customerScreenshots: ["/images/ecommerce-store-customer-1.png"],
    adminScreenshots: ["/images/ecommerce-store-admin-1.png"],
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
    customerScreenshots: ["/images/mobile-app-customer-1.png"],
    adminScreenshots: ["/images/mobile-app-admin-1.png"],
    featured: false,
  },
];
