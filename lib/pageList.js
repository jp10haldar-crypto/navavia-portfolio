// WHAT THIS FILE DOES: The fixed list of public pages the admin "Pages"
// editor can manage. Each one's `slug` matches the `page` field stored on
// its sections in Firestore, and `publicPath` is where "Preview" opens.

export const MANAGED_PAGES = [
  { slug: "home", label: "Home", publicPath: "/" },
  { slug: "services", label: "Services", publicPath: "/services" },
  { slug: "projects", label: "Projects", publicPath: "/projects" },
  { slug: "reviews", label: "Reviews", publicPath: "/reviews" },
  { slug: "blog", label: "Blog", publicPath: "/blog" },
  { slug: "contact", label: "Contact", publicPath: "/contact" },
];
