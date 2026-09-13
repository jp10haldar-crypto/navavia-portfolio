# Navavia — Portfolio

This is the portfolio website for **Navavia** ("Where Ideas Take Form"). It
showcases the web and mobile applications Navavia has built for clients,
with a dedicated page per project that includes a live link, customer-facing
screenshots, and admin-panel screenshots.

The site also has a private admin panel (built later in the project) that
lets Navavia add, edit, and delete projects — and upload screenshots —
without touching any code.

## Project tracking

For anyone picking this project up, the `docs/` folder is the source of
truth for where things stand:

- `docs/PROJECT_PLAN.md` — the full build plan, step by step
- `docs/PROGRESS_LOG.md` — what's done, in progress, and not started
- `docs/DECISIONS.md` — choices already locked in for this project

## Tech stack

- [Next.js](https://nextjs.org) (App Router) with JavaScript
- [Tailwind CSS](https://tailwindcss.com) for styling
- [Firebase](https://firebase.google.com) for the database and admin login (added in a later step)
- [Vercel](https://vercel.com) for hosting (added in a later step)

## Running it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000 in your browser.
