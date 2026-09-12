# Progress Log

This file tracks exactly what's done, what's being worked on, and what's
left. It gets updated every time a task finishes — check here anytime to
see where things stand. For the full plan behind each step, see
PROJECT_PLAN.md.

## DONE

### 2026-09-12 — Step 1: Project setup + homepage
**What was built:** The Next.js project itself, using JavaScript and
Tailwind CSS, with a folder structure ready for the rest of the site, plus a
simple homepage.
**Files created:**
- `app/layout.js` — the shared frame around every page
- `app/page.js` — the homepage
- `app/globals.css` — site-wide default styling
- `components/Hero.js` — the centered "Seller Backbone — Portfolio" heading
- `lib/utils.js` — placeholder for helper functions and future Firebase code
- `data/projects.js` — temporary fake project data
- `public/images/` — empty folder ready for screenshots/logo
**What you should see in the browser:** Opening http://localhost:3000 shows
a black screen with "Seller Backbone — Portfolio" in white text, centered.

### 2026-09-12 — Tracking system set up
**What was built:** A `docs/` folder to track the plan, progress, and
locked-in decisions for the whole project going forward.
**Files created:**
- `docs/PROJECT_PLAN.md` — the full 8-step build plan
- `docs/PROGRESS_LOG.md` — this file
- `docs/DECISIONS.md` — record of choices already locked in
**What you should see:** Three new files inside a `docs` folder in the
project.

### 2026-09-12 — Version control + GitHub backup set up
**What was built:** Git tracking for the project (it was already initialised
by the project setup tool), a `.gitignore` confirmed to exclude
`node_modules`, `.next`, and `.env.local` (so Firebase keys never get
uploaded), a plain-English `README.md` at the project root, and the first
real commit of all the work so far.
**Files created/changed:**
- `.gitignore` — checked, already excludes the right things
- `README.md` — explains what the project is and how to run it
**What you should see:** Running `git log` in the project folder shows a
commit titled "Initial setup: Next.js portfolio project with docs and
tracking". The code is not yet on GitHub — that's a manual step (see the
instructions given alongside this update).

### 2026-09-12 — Step 2: Layout with header/footer and Seller Backbone branding
**What was built:** A site-wide color palette (5 brand colors, defined once
and reused everywhere), a sticky header with the Seller Backbone name, nav
links, and a mobile hamburger menu, a footer with description/contact
placeholders/auto-updating copyright, and a redesigned homepage that sits
between them with a headline, supporting text, and two buttons.
**Files created/changed:**
- `app/globals.css` — the 5 brand colors defined as reusable values
- `components/Header.js` — new. Sticky top nav, mobile hamburger menu, active-page highlighting
- `components/Footer.js` — new. Branding, description, placeholder LinkedIn/Email links, auto-updating copyright
- `components/Hero.js` — rebuilt. Homepage headline, supporting text, "View Our Work" and "Get in Touch" buttons
- `app/layout.js` — changed. Now wraps every page with Header above and Footer below automatically
- `app/page.js` — comment updated to reflect the header/footer wrapping
**What you should see in the browser:** Opening http://localhost:3000 now
shows a header at the top ("Seller Backbone" + Home/Projects/Services/Contact
links), a large headline in the middle with two buttons, and a footer at the
bottom. On a narrow/mobile-width screen, the nav links collapse into a
hamburger menu.

### 2026-09-12 — Step 3: Projects grid page
**What was built:** The full "Our Work" page listing every project as a
card, with filter buttons, plus a reusable project card used both there and
in a new "Featured Work" section on the homepage. The build plan was also
revised to 11 steps (reviews, blog, social links added), and two new
decisions were logged (YouTube for walkthrough videos; no city/region names
in site copy since clients are worldwide).
**Files created/changed:**
- `data/projects.js` — rewritten. 3 dummy projects (travel booking website,
  e-commerce store, mobile app) with full detail fields (tech used, live
  link, screenshot paths, featured flag, etc.)
- `components/ProjectCard.js` — new. One reusable card: screenshot (or
  placeholder box if the image is missing), category, title, description,
  tech tags, "View Details" link. Lifts and highlights on hover.
- `app/projects/page.js` — new. The "Our Work" page at /projects with
  All/Websites/Mobile Apps filter buttons and a responsive grid.
- `components/FeaturedWork.js` — new. Homepage section showing only
  projects marked featured, with a "See All Projects" link.
- `app/page.js` — changed. Now shows Hero followed by Featured Work.
- `docs/PROJECT_PLAN.md` — revised to the new 11-step build order.
- `docs/DECISIONS.md` — added YouTube-hosting and worldwide-clients decisions.
**What you should see in the browser:** http://localhost:3000 now has a
"Featured Work" section below the headline showing 2 project cards and a
"See All Projects" link. Opening http://localhost:3000/projects shows all 3
projects in a grid with working filter buttons. Since no real screenshots
exist yet, every card shows a dark box with the project's name instead of
an image — that's expected.

### 2026-09-12 — Step 4: Project detail page
**What was built:** A single page template that works for every project
(reading which one to show from the URL), with a top section, an
embeddable YouTube video section, a "what customers see" screenshot
section, a separately-shaded "admin panel" screenshot section, and a
closing call-to-action. Screenshots can be clicked to enlarge in a popup
(closable via the × button, clicking outside, or pressing Escape). Visiting
a project number that doesn't exist shows a clean "Project not found"
message instead of crashing.
**Files created:**
- `app/projects/[id]/page.js` — new. The project detail page template.
- `components/ScreenshotGallery.js` — new. Reusable screenshot grid with
  click-to-enlarge popup, used for both the customer and admin sections.
**What you should see in the browser:** Clicking any project card now opens
a real detail page — see the message below for exactly what's on it.

### 2026-09-12 — Step 4 addition: sample placeholder content
**What was built:** Real, working sample images and a test video so the
screenshot popup and video embed can actually be seen and clicked, instead
of just showing "coming soon" text. The video section was also changed to
always appear (a "coming soon" box with a play icon now shows instead of
hiding the section completely when a project has no video yet).
**Files created/changed:**
- `public/images/placeholders/customer-1.svg`, `customer-2.svg`, `customer-3.svg`
  — new. Rough website mockups (header, hero, 3 content boxes) labeled
  "Customer View - Sample".
- `public/images/placeholders/admin-1.svg`, `admin-2.svg`, `admin-3.svg`
  — new. Rough dashboard mockups (sidebar, top bar, table rows) labeled
  "Admin Panel - Sample".
- `data/projects.js` — changed. All 3 dummy projects now use the 6
  placeholder images above. Project 1 (Travel Agency) also got a real,
  safe YouTube video id for testing, with a comment marking exactly which
  line to replace later.
- `app/projects/[id]/page.js` — changed. The "See It In Action" section now
  always shows; a placeholder box with a play icon appears when a project
  has no video yet, instead of hiding the whole section.
**What you should see in the browser:** Every project detail page now shows
real (placeholder) screenshots you can click to enlarge, and a video
section that's never empty — project 1 plays a real test video, projects 2
and 3 show a "Walkthrough video coming soon" box instead.

### 2026-09-12 — Step 5: Client reviews section
**What was built:** A client reviews section showing star ratings, quotes,
and client photos (or initials if no photo exists), reused in three places:
a "What Our Clients Say" section on the homepage (featured reviews only), a
full "Client Reviews" page at /reviews (every review), and a "What This
Client Said" section on each project detail page (only reviews tied to that
specific project). "Reviews" was also added to the header navigation menu.
It was logged as a decision that reviews are added by the admin only —
visitors cannot submit their own.
**Files created:**
- `data/reviews.js` — new. 4 dummy reviews of varying length, one
  deliberately missing a photo to test the initials fallback.
- `public/images/placeholders/client-1.svg` to `client-4.svg` — new. Simple
  circular avatar placeholders with each client's initials.
- `components/ReviewCard.js` — new. One review card: star rating, quote,
  photo/initials, name, role and company.
- `components/ReviewsSection.js` — new. Reusable heading + subheading +
  review grid, reused on all three pages above with different settings.
- `app/reviews/page.js` — new. The full "Client Reviews" page.
**Files changed:**
- `app/page.js` — added the "What Our Clients Say" section and a
  "Read All Reviews" link, below Featured Work.
- `app/projects/[id]/page.js` — added the "What This Client Said" section
  between the admin panel section and the bottom call-to-action.
- `components/Header.js` — added a "Reviews" link between Projects and Services.
- `docs/DECISIONS.md` — logged that reviews are admin-added only.
**What you should see in the browser:** See the message given alongside
this update for exactly what's on each page.

### 2026-09-12 — Step 6: Firebase connection + admin login
**What was built:** The app is now genuinely connected to the real Seller
Backbone Firebase project (confirmed by testing the key against Firebase's
own servers — not just checking the text existed), plus a working admin
login page and a protected admin page with a working Sign Out button.
**Files created:**
- `.env.local` — holds the real Firebase keys. Never committed to git
  (confirmed: it does not appear in `git status` at all, because
  `.gitignore` already excludes it).
- `lib/firebase.js` — new. Connects the app to Firebase using the keys in
  `.env.local`.
- `app/admin/login/page.js` — new. Email/password sign-in form; shows an
  error message on a wrong password.
- `app/admin/page.js` — new. Private page that redirects to the login page
  if no one is signed in; shows a welcome message and a working Sign Out
  button if someone is.
- `docs/DECISIONS.md` — logged that admin login uses Firebase
  Authentication (email/password), with the admin account created manually
  in the Firebase Console rather than through the app.
**What you should see in the browser:** See the message given alongside
this update for the exact step-by-step test, including the one-time
Firebase Console step needed before logging in will work.

### 2026-09-12 — Step 7: Admin panel for managing projects and reviews
**What was built:** A full working admin panel — you can now add, edit,
and delete both projects and reviews yourself, with changes showing up on
the public site immediately, no code involved. Confirmed for real: a
genuine unauthenticated read straight to Firestore's API succeeded after
the rules were published, proving the security rules are actually live
(not just written in a file).
**Files created:**
- `firestore.rules` — the security rules: anyone can read projects/reviews,
  only a signed-in admin can change them. Published in the Firebase Console.
- `lib/firestore.js` — the 10 data functions (get all/get one/add/update/
  delete, for both projects and reviews), plus the one-time starter-data
  importer that refuses to run twice.
- `lib/utils.js` — added a function that pulls a video id out of any
  YouTube link you paste in, so you never need to know what a "video id" is.
- `app/admin/(panel)/layout.js` — the sidebar (Dashboard/Projects/Reviews +
  Sign Out), shown on every admin page except the login page. Collapses
  into a hamburger menu on mobile.
- `app/admin/(panel)/page.js` — the Dashboard: live counts of projects and
  reviews, and the "Import Starter Data" button.
- `components/admin/ProjectForm.js` and `components/admin/ReviewForm.js` —
  the shared add/edit forms, with required-field checks and a
  "Saving..." state.
- `app/admin/(panel)/projects/page.js`, `projects/new/page.js`,
  `projects/[projectId]/edit/page.js` — the projects list (with
  Edit/Delete, confirmed before deleting) and add/edit pages.
- `app/admin/(panel)/reviews/page.js`, `reviews/new/page.js`,
  `reviews/[reviewId]/edit/page.js` — the same, for reviews.
**Files changed:**
- `lib/firebase.js` — now also connects to Firestore (the database), not
  just sign-in.
- `app/page.js`, `app/projects/page.js`, `app/projects/[id]/page.js`,
  `app/reviews/page.js` — all four now load from the real database instead
  of the dummy files, each showing a loading message while fetching and a
  clean error message (never a crash or blank page) if it can't reach
  Firestore.
- `components/FeaturedWork.js` — now receives its project list as a prop
  instead of importing the dummy data itself.
- `data/projects.js`, `data/reviews.js` — kept, but their only remaining
  job is feeding the one-time "Import Starter Data" button; the public
  pages no longer read them directly.
- `docs/DECISIONS.md` — logged the security rules, and the decision to
  fetch data in the browser (for clean loading/error states) rather than
  on the server.
**What you should see in the browser:** See the message given alongside
this update for the exact order to test everything.

## IN PROGRESS

_Nothing in progress right now._

## NOT STARTED

- Step 8: Blog section for SEO
- Step 9: Contact and enquiry form
- Step 10: Social media links and embeds
- Step 11: Deploy to Vercel
