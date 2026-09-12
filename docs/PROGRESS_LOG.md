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

## IN PROGRESS

_Nothing in progress right now._

## NOT STARTED

- Step 2: Layout with header/footer and Seller Backbone branding
- Step 3: Projects grid page with dummy data
- Step 4: Project detail page with customer section and admin-panel screenshot section
- Step 5: Firebase connection + admin login
- Step 6: Admin panel to add/edit/delete projects and upload screenshots
- Step 7: Contact and enquiry form
- Step 8: Deploy to Vercel
