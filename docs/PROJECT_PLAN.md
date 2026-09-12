# Seller Backbone Portfolio — Build Plan

This is the full plan for building the website, in plain English. Each step
builds on the one before it. This file doesn't change often — it's the map.
For day-to-day status, see PROGRESS_LOG.md instead.

## Step 1 — Project setup + homepage (DONE)
**What it gives you:** The website exists and runs on a computer.
**What you should see:** A homepage that runs locally.

## Step 2 — Layout, header, footer, branding (DONE)
**What it gives you:** Every page shares the same top bar (with the Seller
Backbone name/logo) and bottom bar, so the site feels like one connected site.
**What you should see:** A header at the top and a footer at the bottom on
every page, with consistent branding.

## Step 3 — Projects grid page
**What it gives you:** A page that lists all projects as cards in a grid,
with filter buttons, using placeholder (fake) project data for now.
**What you should see:** A page showing project cards (screenshot, title,
short description, tech tags), laid out in a grid, filterable by category.

## Step 4 — Project detail page
**What it gives you:** Clicking a project card opens a page with more detail
about that one project — a customer-facing section, a separate admin-panel
screenshot section, and an embedded video walkthrough of the project.
**What you should see:** A dedicated page per project with clearly labeled
sections: what the customer sees, what the admin panel looks like, and a
video you can watch right on the page.

## Step 5 — Client reviews section
**What it gives you:** A section showcasing feedback from past clients, to
build trust with new visitors.
**What you should see:** A row or grid of short client quotes/ratings,
likely shown on the homepage and/or projects page.

## Step 6 — Firebase connection + admin login
**What it gives you:** The site connects to Firebase (a database service),
and there's a login page so only you (the admin) can get into the admin area.
**What you should see:** A login page that accepts your admin credentials
and blocks anyone else from getting in.

## Step 7 — Admin panel (projects, reviews, blog posts)
**What it gives you:** A private control panel where you can add, edit, or
delete projects, client reviews, and blog posts — without touching code.
**What you should see:** A form-based dashboard (visible only when logged
in) where changes you make instantly show up on the public site.

## Step 8 — Blog section for SEO
**What it gives you:** A blog so the site has fresh, search-engine-friendly
content that can help it get found on Google over time.
**What you should see:** A list of blog posts, each with its own page.

## Step 9 — Contact and enquiry form
**What it gives you:** A way for visitors to reach out (e.g. potential
clients asking about Seller Backbone's services).
**What you should see:** A contact page with a form (name, email, message)
that sends you the enquiry.

## Step 10 — Social media links and embeds
**What it gives you:** Visible links to Seller Backbone's social media
presence, and possibly embedded posts, to build credibility and reach.
**What you should see:** Social icons/links (e.g. in the footer) and any
embedded social content on relevant pages.

## Step 11 — Deploy to Vercel
**What it gives you:** The website becomes publicly available on the
internet with a real, shareable link.
**What you should see:** A live URL (e.g. something.vercel.app) that anyone
can open in their browser to see the finished site.
