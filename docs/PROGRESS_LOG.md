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

## IN PROGRESS

_Nothing in progress right now._

## NOT STARTED

- Step 5: Client reviews section
- Step 6: Firebase connection + admin login
- Step 7: Admin panel — manage projects, reviews and blog posts
- Step 8: Blog section for SEO
- Step 9: Contact and enquiry form
- Step 10: Social media links and embeds
- Step 11: Deploy to Vercel
