// WHAT THIS FILE DOES: This is the homepage — what visitors see when they
// open the website at the root URL ("/"). Next.js automatically treats any
// file named "page.js" inside the "app" folder as a visitable page. This
// one just displays the Hero component.

import Hero from "@/components/Hero";

export default function Home() {
  return <Hero />;
}
