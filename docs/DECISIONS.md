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
