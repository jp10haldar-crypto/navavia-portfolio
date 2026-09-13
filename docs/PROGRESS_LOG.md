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
- `components/Hero.js` — the centered "Navavia — Portfolio" heading
- `lib/utils.js` — placeholder for helper functions and future Firebase code
- `data/projects.js` — temporary fake project data
- `public/images/` — empty folder ready for screenshots/logo
**What you should see in the browser:** Opening http://localhost:3000 shows
a black screen with "Navavia — Portfolio" in white text, centered.

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

### 2026-09-12 — Step 2: Layout with header/footer and Navavia branding
**What was built:** A site-wide color palette (5 brand colors, defined once
and reused everywhere), a sticky header with the Navavia name, nav
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
shows a header at the top ("Navavia" + Home/Projects/Services/Contact
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
**What was built:** The app is now genuinely connected to the real Navavia
Firebase project (confirmed by testing the key against Firebase's
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

### 2026-09-13 — Homepage "How We Work" videos + closing contact section
**What was built:** A new "How We Work" section on the homepage for
general business videos (separate from the per-project walkthrough
videos), fully manageable from a new admin page — and a closing
"Ready to get started?" section at the very bottom of the homepage.
Confirmed for real (not just by reading the code) that the new
`homepageVideos` collection is still blocked until its rule is
republished — same one-time step as every other collection so far.
**Files created:**
- `data/homepageVideos.js` — 3 starter draft videos ("What We Do",
  "How We Work", "Why Choose Us"), unpublished, with the video link left
  empty for you to fill in.
- `components/HomepageVideos.js` — new. The public "How We Work" section:
  first video large, the rest smaller in a row beneath (stacking on
  mobile); hides itself completely if there are no published videos.
- `components/ClosingCTA.js` — new. The "Ready to get started?" section,
  on a visibly different background shade, with a large "Get in Touch"
  button plus placeholder email and WhatsApp links — see the message
  alongside this update for exactly which lines to edit with your real
  details.
- `components/admin/HomepageVideoForm.js` — the shared add/edit form:
  title, description, YouTube link (same auto-extract + clear-error
  behavior as the project form), display order, and a published toggle.
- `app/admin/(panel)/homepage-videos/page.js`, `new/page.js`,
  `[videoId]/edit/page.js` — the video list (drag a row to reorder,
  Edit/Delete with confirmation) and add/edit pages, plus a one-time
  "Import Starter Videos" button.
**Files changed:**
- `firestore.rules` — added the `homepageVideos` collection rule: anyone
  can read them, only the signed-in admin can change them. **Needs to be
  republished in the Firebase Console** before any of this works.
- `lib/firestore.js` — added the 6 homepage-video functions (get all/get
  one/add/update/delete/reorder) plus the one-time starter-video importer.
- `app/(site)/page.js` — now also loads homepage videos, filters to
  published-only, and places the new sections: Hero → Featured Work →
  How We Work → What Our Clients Say → Ready to get started?
- `app/admin/(panel)/layout.js` — added "Homepage Videos" to the sidebar.
- `docs/DECISIONS.md` — logged the distinction between the two kinds of
  video and where each is managed.
**What you should see:** See the message given alongside this update for
exactly what's on the homepage now and how to add your first video.

### 2026-09-13 — Rebrand: Seller Backbone → Navavia
**What was built:** Every visible (and not-so-visible) mention of the old
business name, "Seller Backbone," was replaced with the new name,
"Navavia," plus its new tagline, "Where Ideas Take Form." Before changing
anything, the whole project was searched for every spelling/capitalization
of the old name — 35 occurrences across 18 files — and that full list was
reported before a single edit was made.
**Files changed (brand name swapped):**
- `components/Header.js` — logo text now "Navavia," with the tagline added
  underneath in small muted text (hidden on mobile so the header doesn't
  get crowded), and a clearly marked comment showing exactly where and how
  to drop in a real logo image later.
- `components/Footer.js` — name, new tagline line, and the copyright line.
- `components/Hero.js` — the homepage headline area's supporting sentence.
- `components/ClosingCTA.js`, `app/(site)/contact/page.js` — the LinkedIn
  placeholder slug.
- `app/layout.js` — browser tab title is now "Navavia — Where Ideas Take
  Form"; the search-engine description updated to match.
- `app/admin/login/page.js`, `app/admin/(panel)/layout.js` — the admin
  login subtext and the admin sidebar heading (now "Navavia Admin").
- `lib/firebase.js`, `app/globals.css`, `data/homepageVideos.js` — code
  comments.
- `data/reviews.js` — the dummy testimonial text.
- `README.md`, `docs/PROJECT_PLAN.md`, `docs/DECISIONS.md` — every mention.
- `package.json` — project name changed to `navavia-portfolio`;
  `package-lock.json` regenerated to match via `npm install`.
**Deliberately left unchanged (confirmed):** the Firebase project id, the
Cloudinary cloud name, the Cloudinary upload preset name, and the
Cloudinary folder name where images already live — all four still say
"seller-backbone" internally, exactly as instructed, since renaming any of
them would have broken the live site rather than just changed a label.
**One thing that needs a manual fix, not a code fix:** the dummy review
from "Sarah Mitchell" was already copied into the real database by the
one-time import, before this rename — so while its source text in
`data/reviews.js` now says "Navavia," the live copy in Firestore still says
"Seller Backbone" until you edit that one review yourself (Admin → Reviews
→ Edit → Sarah Mitchell → update the review text → Save). Editing a source
file never changes data that was already copied into the real database.
**Confirmed working after the rename:** homepage, /projects, /projects/1,
/reviews, /contact, /admin, and every admin page all loaded successfully
with no errors, and a final project-wide search turned up zero remaining
mentions of the old name outside the four protected identifiers above.
**What you should see:** See the message given alongside this update for
every place to check.

### 2026-09-13 — Blog for SEO (Step 8 in the build plan)
**What was built:** A full blog: a public listing page and individual post
pages with real search-engine titles/descriptions/social-share previews
per post, an automatically self-updating sitemap and a robots file
blocking the admin area from search engines, and a complete admin
management area including a point-and-click (no code/syntax) content
editor. Confirmed for real: with the new security rule not yet published,
the live `/blog` page correctly showed a permissions-error message rather
than crashing or silently showing an empty list — proof the error handling
actually works, not just that it compiles.
**Files created — data layer:**
- `lib/utils.js` — added `slugify()` (title → URL-friendly slug) and
  `calculateReadingTime()` (content length → minutes, min. 1).
- `lib/firestore.js` — added the 7 blog functions (get published/get all/
  get by slug/get by id/add/update/delete).
**Files created — public pages:**
- `app/(site)/blog/page.js` — the "Insights" listing page. Loads on the
  server (unlike the rest of the public site — see docs/DECISIONS.md for
  why) so it's properly crawlable by search engines.
- `components/BlogListClient.js` — the tag filter buttons + grid, as a
  small client-side piece nested inside that server-loaded page.
- `app/(site)/blog/[slug]/page.js` — the single post page. Sets each
  post's own title/description/Open Graph/Twitter preview automatically
  from its fields, includes Article structured data for Google, and shows
  a clean "Post not found" for a missing or (to a signed-out visitor)
  unpublished slug.
- `components/BlogPostView.js` — the shared post layout (cover image,
  title, meta, content, share buttons, related posts, closing CTA), reused
  by both the real post page and the admin's preview page.
- `components/BlogPostCard.js` — the grid card (cover image, title,
  excerpt, date, reading time, tags).
- `components/ShareButtons.js` — LinkedIn, Facebook, WhatsApp, and
  Copy Link.
- `app/sitemap.js`, `app/robots.js` — self-updating sitemap (every
  published post is included automatically) and the robots file
  (blocks /admin from search engines).
**Files created — admin:**
- `components/admin/RichTextEditor.js` — the point-and-click content
  editor (Bold, Italic, headings, lists, quote, link), built on TipTap.
- `components/admin/BlogPostForm.js` — the shared add/edit form: title
  (auto-generates the slug), slug override with a duplicate-URL warning,
  excerpt, the content editor, cover image upload, author, tags, SEO
  title/description, and three separate actions — Publish, Save as Draft,
  and Preview (which auto-saves your current changes as a draft first,
  then opens the real post layout in a new tab). Warns before closing the
  tab/browser with unsaved changes.
- `app/admin/(panel)/blog/page.js`, `blog/new/page.js`,
  `blog/[postId]/edit/page.js` — the post list (Edit/Preview/Delete with
  confirmation) and add/edit pages.
- `app/admin/blog-preview/[postId]/page.js` — the preview page; lives
  outside both the public layout and the admin sidebar on purpose (see
  docs/DECISIONS.md).
**Files changed:**
- `firestore.rules` — added the `blogPosts` rule: anyone can read a
  published post, only the signed-in admin can read a draft or
  create/update/delete any post. **Needs to be republished in the Firebase
  Console** before any of this works.
- `app/admin/(panel)/layout.js` — added "Blog" to the sidebar.
- `components/Header.js` — added "Blog" to the public navigation.
- `app/globals.css` — added `.blog-content` styling for headings,
  paragraphs, lists, links, and quotes.
- `package.json` — added `@tiptap/react`, `@tiptap/pm`,
  `@tiptap/starter-kit`, `@tiptap/extension-link`.
- `docs/DECISIONS.md` — logged why blog pages load server-side, how draft
  privacy and admin preview work together, why the editor is rich text
  (TipTap) rather than Markdown, and that reading time/slugs are automatic.
**What you should see:** See the message given alongside this update for
how to write and publish your first post.

### 2026-09-13 — Fixed: clicking a blog post said "Post not found"
**What was wrong (confirmed by directly reproducing it against the real
database, not just reading the code):** the single-post lookup searched
Firestore for a post matching the slug in the URL, but never mentioned
"published" in that search. Firestore's security rules say a post is
readable if it's published OR you're signed in — but for a *search*
(rather than "get this exact item"), Firestore has to be able to tell
from the search itself, before looking at any data, that every possible
result satisfies the rule. A search that only asked for a matching slug
couldn't prove that in advance, so Firestore refused it outright for a
signed-out visitor — even for a post that genuinely was published. I
proved this by running the exact same search by hand against the real
database: searching with "published" included in the search succeeded,
searching without it failed, on the very same post. The slug itself was
never the problem — it matched correctly the whole time.
**Files changed:**
- `lib/firestore.js` — added `getPublishedBlogPostBySlug()`, which
  includes "published == true" directly in the search (not just checked
  afterward) so Firestore can verify it upfront. The public post page now
  uses this instead of the old admin-only `getBlogPostBySlug()` (which is
  kept, unchanged, for the admin form's slug-uniqueness check — that one
  is always called while signed in, so it was never affected by this bug).
- `app/(site)/blog/[slug]/page.js` — now distinguishes "no such post"
  from "something actually went wrong" (e.g. a real database error) and
  shows an honest message for each, instead of collapsing every failure
  into "Post not found."
- `app/(site)/blog/[slug]/loading.js` — new. Shows "Loading post..." if
  the database is slow to respond, so there's never a gap where the wrong
  message could show.
**Confirmed after the fix:** the one currently-published post
("How Much Does It Cost to Build a Website...") now opens correctly, a
genuinely nonexistent slug still correctly shows "Post not found," and
/projects, every project detail page, /reviews, /blog, and /contact were
all re-checked and still work — this bug was isolated to the single blog
post page and nowhere else, since it's the only page whose security rule
depends on a field (published) that its own search wasn't checking for.
**What you should see:** See the message given alongside this update for
confirmation every post now opens.

### 2026-09-13 — Fixed: brand name duplicated in blog post tab titles
**What was wrong:** the page template always added "— Navavia" to the
browser tab title, even when the admin had already typed their own SEO
Title containing the brand name — producing things like "...2026 | NAVAVIA
— Navavia." The post's saved data was never wrong; only the template was
double-adding the brand name.
**Files changed:**
- `app/(site)/blog/[slug]/page.js` — the tab title and social-share
  preview title now use a custom SEO Title exactly as typed, with nothing
  added. "— Navavia" is only appended automatically when that field is
  left blank.
- `components/admin/BlogPostForm.js` — the SEO Title field's label and
  hint now say plainly that it's used exactly as typed, and that "—
  Navavia" is only added automatically if it's left empty.
- `docs/DECISIONS.md` — logged this rule, plus the general Firestore
  lesson from the previous bug fix: when a security rule depends on a
  field, any search on that collection must include that field in the
  search itself, or Firestore blocks it regardless of the real data.
**Confirmed:** the existing post's own saved SEO Title was already
correct — re-tested directly through the running site, and its tab title
now reads exactly what was typed, with no duplication, in both the
browser tab and the social-share preview. Checked /projects, every project
detail page, /reviews, and /contact — none of them have a per-item
editable title field, so this duplication had no equivalent there.

### 2026-09-13 — Deploy prep (Step 11, Part A)
**What was built:** Everything needed to make the site ready for a real,
public deployment — checked and fixed for real, not just assumed fine.
**What was found and fixed:**
- Ran a real production build (`npm run build`) — compiled cleanly, no
  errors. It never runs ESLint itself, so also ran `npm run lint`
  separately and found 6 real errors (a newer rule, `react-hooks/set-
  state-in-effect`, flagging the "fetch on mount" pattern used in every
  admin list page). Fixed all 6 by switching that pattern from an `async`/
  `await` function to a `.then()` chain — confirmed clean by re-running
  both the linter and the build afterward. See docs/DECISIONS.md for the
  exact pattern, since it's now the standard for this shape of code here.
- Confirmed `.env.local` is still ignored by git (`git check-ignore`
  confirms it), and searched every tracked file for hardcoded API keys or
  secrets — found none. Every config value reads from `process.env`.
- Confirmed `/sitemap.xml` and `/robots.txt` both work and `/admin` is
  correctly blocked — checked directly against the running site, not just
  the code.
**Files created:**
- `app/not-found.js` — a proper, branded "page not found" message (with
  Header/Footer) for any web address that doesn't match a real page,
  replacing Next.js's plain default.
- `app/opengraph-image.js` — automatically generates the image shown when
  the homepage is shared on WhatsApp/LinkedIn (brand colors, name, tagline)
  — confirmed by viewing the actual generated image.
**Files changed:**
- `app/layout.js` — added `metadataBase` (needed for the share image to
  resolve to a real link) and a fuller Open Graph/Twitter metadata block.
- `components/ProjectCard.js`, `BlogPostCard.js`, `ScreenshotGallery.js` —
  added `loading="lazy"` to below-the-fold images, so they only download
  as a visitor scrolls to them.
- `app/admin/(panel)/projects/page.js`, `reviews/page.js`,
  `enquiries/page.js`, `homepage-videos/page.js`, `blog/page.js`,
  `page.js` (Dashboard) — the lint fixes described above.
- `docs/DECISIONS.md` — logged the site-URL environment variable, the
  generated share image, the `.then()` data-loading pattern, and why
  `not-found.js` has to live at the top level.
**On loading speed:** the two largest pieces of JavaScript in the whole
app are Firebase (needed everywhere) and the rich text editor (needed only
for writing blog posts) — checked directly in the build output that the
editor's code is NOT included in the public site's files at all, only in
the two admin pages that actually use it, exactly as intended.
**What's next:** Part B — the actual Vercel deployment — needs you to act
in the Vercel website yourself. See the message given alongside this
update for the exact steps.

### 2026-09-13 — Fixed: Vercel build failing with "auth/invalid-api-key" on the sitemap
**What was wrong (confirmed by actually reproducing the crash locally, not
just reading the code):** `lib/firebase.js` set up Firebase Authentication
automatically the moment it was imported — even by files that only wanted
the database. The sitemap only needs the database, but it imports
`lib/firestore.js`, which imports `lib/firebase.js`, which was dragging in
Authentication setup regardless. That setup includes some browser-only
sign-in logic that has no business running on Vercel's build servers, and
doing so anyway is what surfaced as the confusing "invalid API key" crash
that took down the whole deployment.
**Confirmed by testing, not assuming:**
- Rebuilt locally with a genuinely invalid API key — after the fix, the
  build succeeded (before the fix, this is what would have reproduced the
  exact reported crash).
- Rebuilt locally with a completely non-existent Firebase project — the
  build still succeeded, and the sitemap correctly fell back to just its
  5 fixed pages (homepage, projects, reviews, blog, contact) instead of
  failing.
- Checked `robots.txt` and every other page for the same problem: only
  the sitemap and the blog pages ever touch the database on the server
  side, so those were the only ones that could have been affected — all
  now fixed by the same change, and all re-tested working.
**Files changed:**
- `lib/firebase.js` — the database (`db`) is still set up right away;
  Authentication is now set up only the first time something actually
  calls the new `getFirebaseAuth()` function. Reading the database can
  never touch Authentication again. Also wrapped the initial Firebase
  setup in a try/catch, so a broken key reports a clear error instead of
  crashing the app that's importing it.
- `app/admin/login/page.js`, `app/admin/(panel)/layout.js`,
  `components/Footer.js` — updated to call `getFirebaseAuth()` instead of
  importing an already-created `auth` value.
- `app/sitemap.js` — added every individual project page (previously only
  the "/projects" listing was included, not each project's own page — now
  it matches how blog posts already worked). Added its own try/catch
  around each database read, on top of `lib/firestore.js`'s own error
  handling, as a second safety net.
- `docs/DECISIONS.md` — logged why Authentication is lazy now, and the
  test results that confirm it.
**What you should see:** Push this and Vercel should rebuild
successfully — see the message given alongside this update for what to
check.

### 2026-09-13 — Step 11 confirmed live; fixed broken "Services" link
**What was built:** The site is now genuinely live on Vercel. A broken
link was reported — the header's "Services" link led to a page that never
existed. Every link on the entire site was checked (header, footer,
homepage, every page, every component) before touching anything: exactly
one was broken — that "Services" link. Everything else already pointed
somewhere real.
**Files created:**
- `app/(site)/services/page.js` — the new "What We Build" page: three
  service blocks (Websites, Mobile Applications, Complete Business
  Systems), each explaining what's included, who it suits, and that every
  one comes with a real admin panel so the client can run it themselves; a
  5-step "How It Works" section (Enquiry → Discussion → Build → Handover →
  Support); a "What Makes Us Different" section about the client owning
  the finished product; and the same closing call-to-action as the
  homepage. Real written content — no placeholder text, no prices, no
  city/region mentioned. Has no database behind it at all, so there's
  nothing on this page that can fail to load.
- `app/(site)/services/opengraph-image.js` — a dedicated social-share
  preview image for this page specifically. Discovered while testing that
  the homepage's own preview image does NOT automatically cover other
  pages (confirmed directly, not assumed) — see docs/DECISIONS.md.
**Files changed:**
- `app/sitemap.js` — added `/services`.
- `docs/DECISIONS.md` — logged that this page is static content with no
  data dependency, and the per-page nature of share-preview images.
**Checked for browser console errors:** crawled every real page plus a
genuinely nonexistent one directly through the running site — all returned
the correct status code, and the server log stayed completely clean (no
warnings, no errors) throughout. Being upfront about the limits of this:
this reliably catches server-side rendering problems, but a handful of
purely client-side issues (something that only goes wrong after a click,
for instance) can only be caught by opening the browser's own DevTools
console — worth a quick look there yourself after this deploys.
**What you should see:** See the message given alongside this update for
what to check on the live site.

### 2026-09-13 — Fixed: homepage stuck on "Loading our work..." forever
**What was reported:** on the live site, the homepage sometimes never
finishes loading — it's stuck showing "Loading our work..." with no way
out.
**What was found:** the homepage starts three database reads together
(projects, reviews, homepage videos) and waits for all three before
showing anything. Firebase's own library has no built-in "give up after a
while" — if even one of those three reads never gets an answer back from
Google's servers (a network hiccup, a connection that can't complete its
handshake, anything), it just waits forever, with no error and nothing
telling the page to stop waiting. Since the page waits for all three
together, one silently-stuck read was enough to freeze the whole homepage
permanently. This wasn't unique to the homepage — every page that reads
the database (admin pages included) had the same gap; the homepage just
happened to be where it was noticed.
**The fix:** every single database read and write in the entire app now
gives up after 15 seconds if Firestore hasn't answered, and reports a
clear "took too long, please try again" message instead of waiting
forever. This lives in one place (`lib/firestore.js`), so every page that
was already built to show a loading message and then either real content
or an error message automatically benefits — no other files needed to
change.
**Proved, not assumed:** tested the exact timeout logic against a promise
that deliberately never resolves (simulating the exact hang this bug
caused) — it was correctly given up on at exactly the configured time,
with a clean, catchable error, every time. Also rebuilt and re-linted the
whole app afterward — both clean — and re-tested the homepage and several
other pages to confirm normal, fast-loading behavior was unaffected when
the database responds normally (as it does almost all the time — this
fix only matters for the rare case when it doesn't).
**Files changed:**
- `lib/firestore.js` — added `runWithTimeout()`, and routed every one of
  its ~30 exported functions through it.
- `docs/DECISIONS.md` — logged why, and the proof that it works.
**What you should see:** if this happens again on the live site, the page
should now show a clear message within 15 seconds instead of loading
forever — but this should be rare in the first place, since Firestore
almost always answers in well under a second.

## IN PROGRESS

_Nothing in progress right now._

## NOT STARTED

- Step 10: Social media links and embeds
