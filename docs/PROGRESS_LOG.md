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

### 2026-09-12 — Admin panel fixes: separation from public site + real image uploads
**What was built:** Two problems reported in the admin panel were fixed.

**Problem 1 — admin and public site were mixed up.** The actual cause: the
root layout was wrapping every page, including every admin page, in the
public Header and Footer — so the admin sidebar had the public nav bar
sitting right on top of it, and clicking the wrong "Projects" link (the
public one, not the admin one) would leave the admin area with no way
back. Every link inside the admin area itself was checked and was already
pointing to the correct `/admin/...` page — the shared layout was the only
real bug.
**Files created:**
- `app/(site)/layout.js` — new. The Header/Footer wrapper, now scoped to
  public pages only.
**Files moved:** `app/page.js`, `app/projects/`, `app/reviews/` all moved
into `app/(site)/` (a "route group" — it organizes files without changing
their URLs, so `/`, `/projects`, and `/reviews` all work exactly as before).
**Files changed:**
- `app/layout.js` — the Header/Footer removed; it now only sets up fonts
  and base styling for every page, admin and public alike.
- `app/admin/(panel)/layout.js` — added a "View Public Site" link at the
  bottom of the sidebar (opens in a new tab, so your admin session is
  never at risk).
- `app/admin/(panel)/projects/page.js` — added a "Preview" link per project
  row (also opens in a new tab).
- `components/Footer.js` — now checks live sign-in status and shows a
  small "Admin Panel" link only when you're actually signed in.
- `lib/firebase.js` — made "stay signed in between visits" an explicit,
  documented setting (it was already Firebase's default behavior, but
  wasn't written down anywhere before).
**Confirmed:** every link inside the admin area was checked; the only two
links leading outside `/admin/*` (View Public Site, Preview) both open in
a new tab on purpose — there's no remaining way to accidentally leave the
admin panel in the same tab.

**Problem 2 — no way to upload screenshots.** Real image uploads now work,
using Firebase Storage.
**Files created:**
- `storage.rules` — the security rules for uploaded files: anyone can view
  an image, only a signed-in admin can upload or delete one, and the 5MB /
  image-only limits are enforced on Firebase's side too, not just in the
  app. Needs to be published in the Firebase Console (see the message
  alongside this update) before uploads will work.
- `lib/storage.js` — the 3 functions for handling files: upload an image
  (with live progress and clear rejection messages), delete an image, get
  an image's link.
- `components/admin/ImageUploader.js` — new. One reusable uploader: click
  or drag to upload, shows a preview and progress, has a remove button,
  and an "...or paste a URL" fallback.
- `components/admin/ImageListUploader.js` — new. Manages a whole list of
  images (thumbnails, drag-to-reorder, remove-any-one), built on top of
  ImageUploader — used for screenshot lists.
**Files changed:**
- `lib/firebase.js` — now also connects to Firebase Storage.
- `components/admin/ProjectForm.js` — the Customer/Admin Screenshots fields
  are now real upload-and-reorder image lists instead of plain text boxes.
- `components/admin/ReviewForm.js` — the Client Photo field is now a real
  single-image uploader instead of a plain text box.
- `lib/firestore.js` — deleting a project now also deletes its screenshot
  images from storage; deleting a review now also deletes its client photo.
  A pasted external image URL is left alone, since it isn't ours to delete.
**What you should see:** See the message given alongside this update for
the exact order to test both fixes.

### 2026-09-12 — Switched image hosting from Firebase Storage to Cloudinary
**What was built:** Firebase Storage turned out to need a paid plan, so
image uploads now go through Cloudinary's free plan instead. Firestore
(the database) and Authentication (admin login) are completely unaffected
— confirmed by directly re-testing a real, unauthenticated read against
Firestore's API after the change, which still succeeded.
**Files created/changed:**
- `.env.local` — added the Cloudinary cloud name and upload preset.
- `lib/storage.js` — rewritten to upload to Cloudinary instead of Firebase.
  Every image goes into a "seller-backbone" folder (never the root), and
  the link returned is automatically compressed and served in a modern
  format. If the upload preset is missing or not set to unsigned, that's
  explained in plain English instead of showing Cloudinary's raw error.
- `lib/firebase.js` — the Firebase Storage connection removed; Firestore
  and Authentication setup untouched.
- `components/admin/ImageUploader.js`, `ImageListUploader.js` — the
  "Remove" button now only removes the link (Cloudinary's free plan can't
  delete files from the browser side); everything else — click/drag to
  upload, preview, progress, validation, paste-a-URL, drag-to-reorder —
  behaves exactly as before.
- `lib/firestore.js` — deleting a project or review no longer tries to
  delete its images from storage (that call doesn't exist for Cloudinary);
  it only removes the project/review record itself.
- `app/admin/(panel)/page.js` — added a note on the Dashboard explaining
  that unused images aren't deleted automatically, with a link to clear
  them manually from the Cloudinary website if storage ever fills up.
- `docs/DECISIONS.md` — updated to reflect Cloudinary (not Firebase
  Storage) as the image host, and that deleted images stay on Cloudinary.
**Files deleted:**
- `storage.rules` — no longer needed; Cloudinary's upload preset (not a
  rules file) controls who can upload.
**What you should see:** See the message given alongside this update for
exactly how to test an upload and confirm it landed in Cloudinary.

### 2026-09-12 — Fixed: "Import Starter Data" was silently failing
**What was wrong (confirmed by directly testing against Firestore, not
just reading the code):** `firestore.rules` only had rules for the
`projects` and `reviews` collections. The one-time import also needs to
read/write a small `setup` collection (just a marker recording "has this
already run?"), which had no rule of its own — so it fell under the
catch-all "deny everything else" safety net, blocking it for everyone,
including the signed-in admin. The import function's very first step
(checking that marker) failed immediately as a result, before a single
project or review was ever written — and the error was being swallowed
into a generic "The import failed partway through" message instead of
naming the real, permissions-related cause. `data/projects.js` and
`data/reviews.js` were never the problem — both were fully intact the
whole time, with exactly 3 projects and 4 reviews (3 linked to a project,
1 not), the placeholder screenshot paths, and the YouTube video on the
first project.
**Files changed:**
- `firestore.rules` — added a rule allowing the signed-in admin to
  read/write the `setup` collection. **Needs to be re-published in the
  Firebase Console** (same process as before) before this fix takes effect.
- `lib/firestore.js` — `seedInitialData` rewritten to check each stage
  separately, so any failure reports its real, specific cause — and calls
  out a Firestore permissions error by name — instead of one generic
  message hiding what actually happened.
**What you should see:** See the message given alongside this update for
the exact steps to re-publish the rules and verify the import for real.

### 2026-09-13 — Contact form and enquiries dashboard (Step 9 in the build plan)
**What was built:** A public contact form that saves straight to the real
database (confirmed for real: a genuine unauthenticated write to the
`enquiries` collection succeeded, and a genuine unauthenticated read was
correctly blocked — not just checking the code), plus a full admin
dashboard for managing every enquiry that comes in.
**Files created:**
- `data/countries.js` — the country list for the contact form's dropdown.
- `app/(site)/contact/page.js` — the public contact form: name, email,
  phone, country (defaults to India), what you need, budget range (shown
  in ₹ and $), and a message. No page reload — a button click handler
  saves straight to Firestore. Required fields are checked with a message
  under each one that's wrong; on success the form is replaced with a
  thank-you message; on failure everything typed stays exactly as it was.
  Also shows contact details and a "we work with clients worldwide" line.
- `app/admin/(panel)/enquiries/page.js` — the enquiries dashboard: every
  enquiry as a card (not a traditional table, so it reads well on a
  phone), newest first, with a colour-coded status badge, a status
  dropdown that saves immediately with a small "Saved ✓" confirmation,
  filter buttons (All/New/Contacted/In Discussion/Won/Lost), a search box
  (name or email), a clickable email (opens your email app), and a
  delete button with an "Are you sure?" confirmation. Clicking a card
  expands it to show the full message, phone, and budget.
**Files changed:**
- `firestore.rules` — added the `enquiries` collection rule (see the
  previous log entry) — now confirmed published and working for real.
- `lib/firestore.js` — added `addEnquiry`, `getAllEnquiries`,
  `updateEnquiryStatus`, `deleteEnquiry`.
- `lib/utils.js` — added an email-format checker, and the spam-protection
  functions: a browser that's already sent 3 enquiries in the last hour
  is blocked from sending another, using that browser's own storage to
  remember when it last sent one (see docs/DECISIONS.md for exactly how,
  and its limits).
- `app/admin/(panel)/layout.js` — added "Enquiries" near the top of the
  sidebar, with a small badge showing how many are still "New".
- `app/admin/(panel)/page.js` — added Total/New enquiry counts and a
  "Recent Enquiries" list (5 most recent) with a link to the full dashboard.
- `docs/DECISIONS.md` — logged the spam-protection approach and the
  enquiry status workflow.
**Note:** testing this for real created one genuine test enquiry named
"Automated Rules Test (safe to delete)" — delete it from the Enquiries
dashboard using the new Delete button (a good first real test of it).
**What you should see:** See the message given alongside this update for
the exact order to test everything.

### 2026-09-13 — Investigated: missing "See It In Action" video
**What was reported:** The video section appeared to have disappeared
from project detail pages after switching to Firestore.
**What was actually found (confirmed by reading the real data straight out
of Firestore, not just the code):** The database is correct — project 1
genuinely has `youtubeId: "jNQXAC9IVRw"` (the working test video) right
now, and the video section's code was never changed or removed; it was
still exactly as built (always shows the heading, iframe if there's a
video, placeholder if not). Every other field in every project and review
was also checked against `data/projects.js`/`data/reviews.js` one by one —
nothing else was lost in the Firestore switch, and the admin forms already
had a field for every one of them. The most likely explanation: this was
seen before the starter-data import actually succeeded (which was broken
until a few updates ago — see the "Import Starter Data was silently
failing" entry above), not a new, separate bug.
**Two real gaps fixed anyway, found while checking the video field:**
- The admin form's video field was labeled "Walkthrough Video" instead of
  the clearer "YouTube Video Link."
- Pasting something that isn't a recognizable YouTube link used to save
  silently as "no video," with no explanation. Now it's caught before
  saving, with a clear message naming the accepted link formats.
**Files changed:**
- `components/admin/ProjectForm.js` — relabeled the video field; added
  validation that blocks saving (with a clear message) if the pasted text
  isn't a recognizable YouTube link.
**What you should see:** See the message given alongside this update for
how to confirm the video is showing.

## IN PROGRESS

_Nothing in progress right now._

## NOT STARTED

- Step 8: Blog section for SEO
- Step 10: Social media links and embeds
- Step 11: Deploy to Vercel
