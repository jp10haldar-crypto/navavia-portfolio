// WHAT THIS FILE DOES: Temporary, made-up client review data so the
// reviews section has something real to display while we build it. Per a
// locked-in decision (see docs/DECISIONS.md), reviews are only ever added
// by the admin — visitors can't submit their own on this site. Later, this
// will likely be replaced by real reviews managed through the admin panel
// (Step 7 in the build plan). This file doesn't "run" by itself —
// pages/components import this list and loop over it.
//
// Field notes:
// - rating is a whole number from 1 to 5
// - clientPhoto is an image path, or "" to show the client's initials
//   instead (used below for Daniel's review, to test that fallback)
// - projectId links a review to one project's id from data/projects.js, or
//   "" if the review isn't tied to a specific project
// - featured controls whether a review shows in the homepage's
//   "What Our Clients Say" section

export const reviews = [
  {
    id: 1,
    clientName: "Sarah Mitchell",
    clientRole: "Owner",
    clientCompany: "Travel Agency",
    reviewText:
      "Working with Seller Backbone completely changed how we handle bookings. Before, we were juggling emails and spreadsheets just to keep track of who booked what. Now everything runs through one clean website, and our team can see live availability at a glance. Our customers constantly tell us how easy the booking process is, and we've seen a real increase in completed bookings since launch.",
    rating: 5,
    clientPhoto: "/images/placeholders/client-1.svg",
    projectId: 1,
    featured: true,
  },
  {
    id: 2,
    clientName: "James Carter",
    clientRole: "Founder",
    clientCompany: "E-Commerce Store",
    reviewText: "Fast, professional, and exactly what we needed. Highly recommend.",
    rating: 5,
    clientPhoto: "/images/placeholders/client-2.svg",
    projectId: 2,
    featured: true,
  },
  {
    id: 3,
    clientName: "Priya Nair",
    clientRole: "Operations Manager",
    clientCompany: "",
    reviewText:
      "The team delivered exactly what we asked for, on time and without any back-and-forth headaches. The admin panel makes day-to-day updates simple, even for someone who isn't technical.",
    rating: 4,
    clientPhoto: "/images/placeholders/client-3.svg",
    projectId: "",
    featured: true,
  },
  {
    id: 4,
    clientName: "Daniel Osei",
    clientRole: "Co-Founder",
    clientCompany: "Mobile App Startup",
    reviewText:
      "We needed a mobile app that felt as polished as the big players in our industry, and that's exactly what we got. The booking flow is smooth, push notifications keep our customers engaged, and managing everything from the backend has been refreshingly simple. It's rare to find a team that delivers this level of quality without endless revisions.",
    rating: 5,
    clientPhoto: "",
    projectId: 3,
    featured: false,
  },
];
