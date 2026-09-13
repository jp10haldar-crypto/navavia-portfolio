# Decisions

This is the record of choices that are already locked in for this project.
If a decision changes later, it gets added here (with the date) instead of
just being changed silently — so there's always a paper trail of "why is it
built this way."

- **Framework:** Next.js, using the App Router.
- **Language:** JavaScript — not TypeScript (kept simple, no type-checking layer).
- **Styling:** Tailwind CSS.
- **Database + admin login:** Firebase (to be connected in Step 5).
- **Hosting:** Vercel (to be set up in Step 8).
- **Brand name:** "Seller Backbone" — used across the homepage, header, and browser tab title.
- **Each project page shows:** a live link to the project, customer-facing screenshots, and admin-panel screenshots — all three, clearly separated.
- **Code style:** one function/component per file, with a plain-English comment at the top of every file explaining what it does and when it runs.
- **2026-09-12 — Project walkthrough videos:** hosted on YouTube as unlisted videos and embedded on the project detail pages, not uploaded directly to the site.
- **2026-09-12 — Geographic scope:** the business serves clients worldwide, not only locally. No city or region name should appear in site copy, headlines, or taglines.
- **2026-09-12 — Client reviews:** added by the admin only. Visitors cannot submit reviews on this site.
- **2026-09-12 — Admin login method:** Firebase Authentication with email + password. The admin account itself is created manually in the Firebase Console (Authentication → Users), not through the app — this app only checks sign-in, it doesn't create new admin accounts.
- **2026-09-12 — Database security rules:** anyone can read projects/reviews (so the public site works for visitors); only a signed-in admin can create, update, or delete them. Everything else is denied by default. Defined in `firestore.rules`, but only takes effect once published in the Firebase Console's Rules tab — the file alone does nothing.
- **2026-09-12 — How public pages load data:** the homepage, projects page, project detail pages, and reviews page all fetch from Firestore in the browser (not on the server) so each one can show a loading message, then either the real content or a clean error message if the database is unreachable — never a blank page or a crash. Trade-off: content isn't present in the page's initial HTML, which matters for search-engine visibility — worth revisiting when Step 8 (the SEO-focused blog) or Step 11 (deploy) come up.
- **2026-09-12 — Public site and admin panel are structurally separate:** public pages live under `app/(site)/` with their own layout (Header/Footer); the admin area lives entirely under `app/admin/` with its own sidebar layout. The root layout adds neither — this is what guarantees the public header/footer can never leak into the admin panel, or vice versa.
- **2026-09-12 — Image storage: Cloudinary, not Firebase Storage.** Firebase Storage now requires a paid ("Blaze") plan, so uploaded screenshots and client photos are hosted on Cloudinary's free plan instead, inside a "seller-backbone" folder (never the root). Firestore (the database) and Authentication (admin login) are unaffected and remain on Firebase's free "Spark" plan exactly as before. Uploads use an unsigned upload preset (no secret key exposed to the browser), and every image link is automatically served compressed and in a modern format (via Cloudinary's f_auto,q_auto).
- **2026-09-12 — Deleted images are not removed from Cloudinary automatically.** Cloudinary's free plan doesn't support deleting files from the browser side (that needs a secret key this app never exposes). Deleting a project or review, or removing a single image in a form, only removes its link from the database — the admin Dashboard has a note reminding you to clear unused files from the Cloudinary website directly if storage ever fills up.
- **2026-09-13 — Contact form spam protection is client-side only (localStorage), not a server-side limit.** The same browser can't submit more than 3 enquiries per hour — enforced by checking timestamps saved in that browser's own storage, not on Firebase's side. This is a deterrent against casual repeat submissions, not a hard security guarantee — someone could clear their browser data or use a different browser/device to get around it. Revisit if spam becomes a real problem (e.g. with a server-side check, or a CAPTCHA).
- **2026-09-13 — Enquiry status workflow:** New → Contacted → In Discussion → Won / Lost, set manually by the admin from the enquiries dashboard. Every new enquiry starts as "New" automatically; nothing else changes its status without the admin doing so.
