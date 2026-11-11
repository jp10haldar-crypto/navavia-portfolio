# Google Ads — First Campaign: "Search – Websites & Apps"

Copy-paste guide for setting up the first Google Ads campaign for navavia.in.
Every headline and description below has been checked against Google's
character limits (headlines 30, descriptions 90, callouts 25, sitelink text 25).

---

## Step 0 — Before you start (important)

- When Google Ads first opens, it pushes a "Smart" campaign. Click
  **"Switch to Expert Mode"** (small link at the bottom). Smart campaigns give
  you almost no control over keywords and waste budget.
- If it suggests **Performance Max**, skip it for now. Start with **Search**:
  people actively typing "website developer" are the warmest leads.

---

## Step 1 — Set up the conversion (do this first)

This is what tells Google "this click became an enquiry", so it can find more
people like that.

1. Google Ads → **Goals → Conversions → Summary → + New conversion action**
2. Choose **Website** → enter `navavia.in` → Scan.
3. Choose **"+ Add a conversion action manually"**:
   - Goal category: **Submit lead form**
   - Conversion name: **Enquiry form**
   - Value: **Don't use a value** (or a fixed ₹ amount per lead, if you know it)
   - Count: **One** (one enquiry = one lead, even if they send two)
   - Click-through window: **30 days**
4. Save → on the tag screen choose **"Use Google tag" → "Install the tag yourself"**.
5. You'll see a snippet like `send_to: 'AW-123456789/AbCdEfGh123'`.
   - `AW-123456789` → paste into **navavia.in/admin/ads-tracking → Google Ads tag ID**
   - `AbCdEfGh123` (after the slash) → paste into **Conversion label — Enquiry form**
   - Press **Save** there.
6. (Optional) Repeat for a second conversion named **Contact tap**
   (category: **Contact**, Count: One) → paste its label into the
   **WhatsApp / email / phone** box. In Google Ads, set it as a **Secondary**
   action, so the campaign optimises for real enquiries, not taps.

---

## Step 2 — Campaign settings

| Setting | What to choose |
|---|---|
| Objective | **Leads** |
| Conversion goals | Keep only **Submit lead form** (remove Page views / others it adds) |
| Campaign type | **Search** |
| Campaign name | `Search – Websites & Apps` |
| Networks | **Untick** Search Partners and **untick** Display Network |
| Locations | Your city + radius (e.g. 40 km), or all of India. **Location options → "Presence: People in or regularly in"** (not "interest in") |
| Languages | English (add Hindi if you serve Hindi-speaking clients) |
| Budget | **₹600–₹800 / day** to start (~₹18,000–24,000 / month) |
| Bidding | Start with **Maximize clicks**, max CPC limit **₹50**. After ~15–20 enquiries, switch to **Maximize conversions** |
| Ad schedule | Mon–Sat, 9:00 am – 9:00 pm (when you can reply quickly) |
| Final URL suffix (Campaign → Additional settings → Campaign URL options) | `utm_source=google&utm_medium=cpc&utm_campaign=search-websites-apps` |
| Broad match | **Off**. Use phrase and exact match only (below) |
| AI Max / automatically created assets | **Off** for the first month |

---

## Step 3 — Ad groups & keywords

Type each keyword **exactly** as shown: quotes = phrase match, brackets = exact match.

### Ad group 1: Website Development  →  Final URL: `https://navavia.in/services`

```
"website development company"
"website design company"
"website designer"
"website developer"
"business website design"
"custom website development"
"small business website"
"website design services"
[website developer near me]
[website design near me]
[web development company]
```

### Ad group 2: App Development  →  Final URL: `https://navavia.in/services`

```
"mobile app development company"
"app development company"
"android app developer"
"ios app development"
"app developer for business"
"booking app development"
[app developer near me]
[mobile app developer]
```

### Negative keywords (Campaign level → Keywords → Negative keywords)

Stops you paying for people looking for jobs, courses, or free stuff:

```
free
jobs
job
salary
career
careers
hiring
internship
course
courses
training
tutorial
learn
how to
certification
college
student
students
project for
template
templates
download
apk
youtube
pdf
github
sample
```

---

## Step 4 — The ads (Responsive Search Ads)

Use the **same headlines and descriptions** in both ad groups, and change
**headline 1** to fit the group (see note). Don't pin anything.

### Headlines (add all 15)

| # | Headline | Chars |
|---|---|---|
| 1 | Website & App Development | 25 |
| 2 | Websites That Bring Enquiries | 29 |
| 3 | Custom Websites for Business | 28 |
| 4 | iOS & Android App Development | 29 |
| 5 | Own Your Site, No Lock-In | 25 |
| 6 | Includes Your Own Admin Panel | 29 |
| 7 | Update It Yourself, Anytime | 27 |
| 8 | Fast, Mobile-Friendly Sites | 27 |
| 9 | Website + App, One System | 25 |
| 10 | Reply Within 24 Hours | 21 |
| 11 | See Our Recent Work | 19 |
| 12 | Tell Us What You Need | 21 |
| 13 | Navavia Web & App Studio | 24 |
| 14 | Built for Growing Businesses | 28 |
| 15 | Get a Quote Today | 17 |

**For the App Development ad group,** swap headline 3 for
**"Custom Apps for Your Business"** (29) and headline 8 for
**"Bookings, Orders & Accounts"** (27).

### Descriptions (add all 4)

| # | Description | Chars |
|---|---|---|
| 1 | Custom websites and mobile apps built around your business, with an admin panel you run. | 88 |
| 2 | No lock-in. You own everything we build and can update it yourself, no developer needed. | 88 |
| 3 | We design, build, hand over with a walkthrough, and stay available for support after. | 85 |
| 4 | Tell us what you need and your budget. We reply within 24 hours, no jargon, no pressure. | 88 |

### Display path (the green URL)

`navavia.in / services / websites` (Ad group 1)
`navavia.in / services / apps` (Ad group 2)

---

## Step 5 — Assets (campaign level, all free and they raise click rate)

### Sitelinks

| Sitelink text | Description line 1 | Description line 2 | URL |
|---|---|---|---|
| Our Work | Websites and apps we've built | See real client projects | https://navavia.in/projects |
| Services | Websites, apps, full systems | Each with its own admin panel | https://navavia.in/services |
| Client Reviews | Feedback from our clients | Honest, unedited reviews | https://navavia.in/reviews |
| Send an Enquiry | Tell us about your project | We reply within 24 hours | https://navavia.in/contact |

### Callouts

```
Admin Panel Included
No Developer Lock-In
iOS & Android Apps
Reply Within 24 Hours
Mobile-Friendly Design
Support After Handover
```

### Structured snippet

Header: **Services** → `Websites`, `Mobile Apps`, `Business Systems`, `Admin Panels`

### Other assets

- **Business name:** Navavia
- **Logo:** square logo image (1:1, at least 128×128)
- **Call asset:** your business phone, if you'll answer it during the ad schedule
- **Lead form asset:** skip for now. Leads from the website form are better
  quality and show up in your admin Enquiries list with their source.

---

## Step 6 — After launch: what to check

**Day 1:** in `navavia.in/admin/ads-tracking`, confirm the IDs are saved. Send
yourself a test enquiry from the site. In Google Ads → Goals → Conversions,
the "Enquiry form" status should change from "Unverified" to "Recording
conversions" within about 24 hours.

**Every 2–3 days for the first 2 weeks:**
- Campaign → **Insights & reports → Search terms**. Add any irrelevant
  searches as **negative keywords**. This is the single biggest money-saver.
- Admin → **Enquiries**. Cards from ads show **Source: Google Ads**, so you can
  see which enquiries were real clients.

**After ~2 weeks / 15–20 enquiries:**
- Switch bidding to **Maximize conversions**.
- Pause keywords with lots of clicks and zero enquiries.
- Raise the budget on whichever ad group brings better enquiries.

**Benchmarks (rough, India, web/app services):** clicks often ₹20–60 each. A
healthy landing page converts 3–8% of clicks into enquiries, so expect about
1 enquiry per ₹500–1,500 spent once it's tuned.
