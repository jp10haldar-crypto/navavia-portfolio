# Seller Backbone Portfolio — Build Plan

This is the full plan for building the website, in plain English. Each step
builds on the one before it. This file doesn't change often — it's the map.
For day-to-day status, see PROGRESS_LOG.md instead.

## Step 1 — Project setup + homepage
**What it gives you:** The website exists and runs on a computer.
**What you should see:** A black screen with "Seller Backbone — Portfolio"
written in white text, centered on the page.

## Step 2 — Layout with header/footer and Seller Backbone branding
**What it gives you:** Every page shares the same top bar (with the Seller
Backbone name/logo) and bottom bar, so the site feels like one connected site.
**What you should see:** A header at the top and a footer at the bottom on
every page, with consistent branding.

## Step 3 — Projects grid page with dummy data
**What it gives you:** A page that lists all projects as cards in a grid,
using placeholder (fake) project data for now.
**What you should see:** A page showing several project cards (title +
short description), laid out in a grid.

## Step 4 — Project detail page with customer section and admin-panel screenshots
**What it gives you:** Clicking a project card opens a page with more detail
about that one project — including a section showing what the customer sees
and a separate section showing admin-panel screenshots.
**What you should see:** A dedicated page per project with two clearly
labeled screenshot sections (customer-facing vs. admin panel).

## Step 5 — Firebase connection + admin login
**What it gives you:** The site connects to Firebase (a database service),
and there's a login page so only you (the admin) can get into the admin area.
**What you should see:** A login page that accepts your admin credentials
and blocks anyone else from getting in.

## Step 6 — Admin panel to add/edit/delete projects and upload screenshots
**What it gives you:** A private control panel where you can add new
projects, edit or delete existing ones, and upload screenshot images —
without needing to touch any code.
**What you should see:** A form-based dashboard (visible only when logged
in) where changes you make instantly show up on the public projects pages.

## Step 7 — Contact and enquiry form
**What it gives you:** A way for visitors to reach out (e.g. potential
clients asking about Seller Backbone's services).
**What you should see:** A contact page with a form (name, email, message)
that sends you the enquiry.

## Step 8 — Deploy to Vercel
**What it gives you:** The website becomes publicly available on the
internet with a real, shareable link.
**What you should see:** A live URL (e.g. something.vercel.app) that anyone
can open in their browser to see the finished site.
