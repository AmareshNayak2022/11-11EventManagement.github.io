# Hosting &amp; Deployment Guide

**11:11 — Elevenn Elevenn Archive Pvt Ltd**

How to get this site online, what it costs, and which platform to pick.

> **Prices below are indicative and were accurate as of early 2026.** Domain and
> mail pricing changes often. Verify on the vendor's own pricing page before you
> pay — especially the *renewal* price, which is where the traps are.

---

## The short answer

**Host on Cloudflare Pages. It is both the best option and the free one.**

Your site is pure HTML, CSS, and JavaScript with no build step and no server
code. That means it can be served entirely from a CDN edge — which is the
fastest and cheapest way anything can be hosted. You do not need, and should
not pay for, a traditional web host (cPanel, shared hosting, a VPS). Those
solve problems you do not have.

### Total realistic cost

| Item                        | Cost                        | Notes                                     |
|-----------------------------|-----------------------------|-------------------------------------------|
| Hosting (Cloudflare Pages)  | **₹0**                      | Unlimited bandwidth, free SSL             |
| Domain (`.in` or `.com`)    | **₹800 – ₹1,400 / year**    | Your only mandatory cost                  |
| Business email (Zoho Mail)  | **₹0**                      | Free tier, up to 5 users on your domain   |
| Contact form (Web3Forms)    | **₹0**                      | Free tier covers a small business easily  |
| SSL certificate             | **₹0**                      | Automatic — never pay for this            |
| **Total year one**          | **≈ ₹1,000 / year**         | Essentially just the domain               |

If a hosting company quotes you ₹3,000–₹10,000/year for "business hosting" for
this site, you are being sold capacity you will never use.

---

## Platform comparison

| Platform             | Cost | Bandwidth  | India speed | Built-in forms | Verdict |
|----------------------|------|------------|-------------|----------------|---------|
| **Cloudflare Pages** | Free | Unlimited  | Excellent   | No             | **Best overall** |
| **Netlify**          | Free | 100 GB/mo  | Good        | **Yes**        | Easiest end-to-end |
| GitHub Pages         | Free | ~100 GB/mo | Fair        | No             | Fine, fewer features |
| Vercel               | Free\* | 100 GB/mo | Good        | No             | ⚠️ See warning |
| Shared hosting       | ₹2k–8k/yr | Varies | Varies      | Sometimes      | Don't — no benefit here |

### Why Cloudflare Pages

- **Unlimited bandwidth on the free plan.** Netlify and GitHub cap at ~100 GB/month.
  You are unlikely to hit that, but "unlimited" means a viral Instagram post
  can never produce a surprise bill.
- **Best edge presence in India.** Cloudflare has points of presence in Mumbai,
  Delhi, Chennai, Bengaluru, Hyderabad, Kolkata and more. Your visitors are in
  Odisha and the surrounding states — pages will be served from within India
  rather than from Singapore or the US. On an image-heavy site like this one —
  twelve full-bleed photographs — that is a very noticeable difference.
- **Free SSL, free DDoS protection, free analytics.**
- You will probably want Cloudflare for DNS anyway, so it keeps everything in
  one dashboard.

### ⚠️ The Vercel warning

Vercel's free **Hobby** plan is licensed for *non-commercial, personal* use.
A marketing site for a Pvt Ltd company is commercial. Using Hobby for this
would put you outside their terms, and the fix is the Pro plan at roughly
US$20/user/month (≈ ₹1,700/month, ≈ ₹20,000/year). Cloudflare Pages and Netlify
both permit commercial use on their free tiers. **Read the current terms
yourself before relying on any free tier commercially** — this is exactly the
kind of clause that changes.

### When to pick Netlify instead

Pick Netlify if you want the **simplest possible path** and are happy to trade
a little speed for convenience. Its killer feature here is **Netlify Forms**:
your contact form starts working with a two-attribute change to the HTML and no
third-party service at all (100 submissions/month free). If you would rather
not wire up a separate form service, that alone justifies choosing Netlify.

---

## Step 1 — Buy the domain

### Which domain

| Option              | Good for                                        |
|---------------------|-------------------------------------------------|
| `.in`               | Strong local signal in India, usually cheapest  |
| `.co.in`            | Same, if the `.in` is taken                     |
| `.com`              | Most familiar and trusted; good if you may expand |

For a Bhubaneswar business working nationally, **`.in` or `.com`** are both
sound; `.com` has the edge if the work really is pan-India and destination.
If both are available and affordable, buy both and redirect one to the other —
it stops a competitor taking the near-identical name.

⚠️ **This may already be settled.** The published email is
`connect@elevennelevenn.com`, which implies `elevennelevenn.com` is registered
and in use. Confirm that before buying anything — and if it is, the site's
canonical URL and share image should point at it.

Given the brand is `11:11`, be aware that domains starting with digits are fine
technically, but spell-ability matters when a CXO reads it aloud down a phone.
`elevennelevenn.com` travels better by word of mouth than a pure numeral
string. Test it by saying it out loud.

### Where to buy

| Registrar               | Notes |
|-------------------------|-------|
| **Cloudflare Registrar**| Sells at wholesale cost with **no markup** and free WHOIS privacy. Cheapest long-run. Supports a **limited TLD list** — check `.in` is on it before planning around this. Billed in USD, no GST invoice. |
| **Namecheap / Porkbun** | Honest pricing, free WHOIS privacy, good UI. USD billing. |
| **BigRock / Hostinger India / Zoho** | INR billing and a **GST invoice** — which matters if your Pvt Ltd wants to claim input tax credit. Watch renewal rates. |

**Avoid the ₹99 first-year offers.** GoDaddy and similar advertise a very cheap
first year, then renew at several times that. Always look at the **renewal**
price, not the promo price. Also decline the upsells: you do not need their
SSL (free from Cloudflare), their site builder, or their "web security" add-on.

**Do enable WHOIS/domain privacy** (free at most good registrars). Without it
your registered address and phone number are published in a public database and
will be scraped by spammers.

Finally: **turn on auto-renew and keep the payment card current.** The single
most common way a small business loses its website is a lapsed domain.

---

## Step 2 — Deploy to Cloudflare Pages

Two routes. Route B is better long-term; Route A gets you live in five minutes.

### Route A — Direct upload (no Git needed)

1. Create a free account at [dash.cloudflare.com](https://dash.cloudflare.com).
2. Go to **Workers &amp; Pages → Create → Pages → Upload assets**.
3. Name the project, e.g. `eleven-eleven`.
4. Drag the **contents** of `event-management/` into the upload box —
   `index.html`, `css/`, `js/`, `images/`. Do **not** include `.idea/`.
5. Click **Deploy**.

You will get a live URL like `eleven-eleven.pages.dev` immediately.

To update the site later, repeat the upload. That is the downside of this
route — there is no history and no rollback.

### Route B — Connect Git (recommended)

This gives you version history, one-click rollback, and automatic deploys when
you push. Worth the extra 15 minutes.

1. Create a **private** repository on GitHub.
2. In the project folder, add a `.gitignore` first so IntelliJ's local settings
   don't get committed:

   ```gitignore
   .idea/
   .DS_Store
   Thumbs.db
   *.log
   ```

3. Then:

   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```

4. In Cloudflare: **Workers &amp; Pages → Create → Pages → Connect to Git**,
   authorise GitHub, pick the repo.
5. **Build settings — this is the step people get wrong:**

   | Field                  | Value            |
   |------------------------|------------------|
   | Framework preset       | **None**         |
   | Build command          | **leave empty**  |
   | Build output directory | **`/`**          |

   There is no build step. If you set a framework preset, Cloudflare will try to
   run a build that does not exist and the deploy will fail.

6. **Save and Deploy.**

From now on, `git push` publishes automatically.

---

## Step 3 — Connect your domain

1. In Cloudflare Pages: your project → **Custom domains → Set up a domain**.
2. Enter your domain, e.g. `yourdomain.in`.
3. If the domain's nameservers already point at Cloudflare, the DNS record is
   created for you. If not, Cloudflare will show you the nameservers to set at
   your registrar — this propagates in anywhere from a few minutes to 24 hours.
4. Add **both** `yourdomain.in` and `www.yourdomain.in`, and pick one as
   canonical. Redirect the other to it so you never split your SEO across two
   addresses.

HTTPS is provisioned automatically and usually completes within minutes. You
never need to buy or install a certificate.

---

## Step 4 — Set up business email

You need `connect@elevennelevenn.com` to actually receive mail. Domain
registration does **not** include email — this is a separate thing to set up,
and the address is already published on the site.

| Option                       | Cost                     | Notes |
|------------------------------|--------------------------|-------|
| **Zoho Mail free tier**      | **₹0** — up to 5 users   | Indian company (Chennai), INR billing, GST invoice. Free plan is web/mobile-app access only (no desktop IMAP). Best value by a distance. |
| Google Workspace             | ~₹150–250/user/month     | Familiar, full Gmail, desktop clients. Worth it if you live in Gmail. |
| Cloudflare Email Routing     | **₹0**                   | **Forwarding only** — receives at your domain, delivers to an existing inbox. You cannot easily *send* as `hello@` without extra SMTP setup. Fine as a stopgap, not as a real business mailbox. |

**Recommendation: start with Zoho Mail's free tier.** Verify the current plan
limits when you sign up, as free-tier terms do change. Move to Google Workspace
later if the team grows or you need desktop mail clients.

Setup is the same in all cases: add the MX (and SPF/DKIM) records the provider
gives you into Cloudflare DNS. Configure **SPF, DKIM and DMARC** — without
them your enquiry replies will land in spam folders. For a business whose
enquiries come from corporate and institutional inboxes — the strictest filters
there are — that is a direct loss of revenue.

---

## Step 5 — Check how enquiries reach you ⚠️

**Connected — but read this before you rely on it.**

The form now delivers in **WhatsApp mode**: on submit it formats the answers
into a message and opens WhatsApp addressed to `+91 95915 09910`, pre-typed.
Nothing is silently discarded any more.

The catch is that **the visitor has to press send in WhatsApp**. If they hesitate
at that point, the enquiry never reaches you and you have no record that anyone
tried. That is the trade-off for needing no account and no server.

So: **send a real test enquiry from your own phone before you announce the
site**, and decide whether you also want an email endpoint as a second net.
Adding one is a single line — set `DELIVERY.endpoint` in `js/script.js`, which
switches delivery to email and bypasses the WhatsApp path entirely.

To add email delivery, pick one:

### Option A — Web3Forms (works on any host, recommended with Cloudflare)

1. Get a free access key at [web3forms.com](https://web3forms.com) — just give
   the email address where enquiries should land.
2. In `index.html`, add a hidden field inside the form:
   ```html
   <input type="hidden" name="access_key" value="YOUR-ACCESS-KEY-HERE">
   ```
3. In `js/script.js`, set `DELIVERY.endpoint` to
   `https://api.web3forms.com/submit`. The existing `sendToEndpoint()` posts
   the form there; nothing else needs changing.

### Option B — Netlify Forms (only if you host on Netlify)

Add `netlify` and `name="inquiry"` to the `<form>` tag, then set
`DELIVERY.endpoint` to `/` so submissions post back to your own site for
Netlify to capture. No third-party service, no API key. This is the reason to
consider Netlify.

### Option C — Formspree

Same shape as Option A — paste the endpoint into `DELIVERY.endpoint`. Free
tier is around 50 submissions a month.

Whichever you choose:

- **Send a real test enquiry from your phone before you announce the site.**
  Then check the inbox *and* the spam folder.
- Whichever mode you use, neither one *stores* anything. If you want a
  searchable record rather than a message you might lose, pick a service that
  keeps submissions.
- Since you are collecting personal data from Indian residents, you need a
  **privacy notice** before this form goes live (DPDP Act 2023): what you
  collect, why, how long you keep it, and how someone requests deletion.

---

## Step 6 — Analytics (optional, free)

Use **Cloudflare Web Analytics** — free, and privacy-preserving because it sets
no cookies. That matters practically: a cookie-based tool like Google Analytics
would oblige you to add a consent banner, which is friction on a site whose
whole job is to feel calm.

Enable it in the Cloudflare dashboard and paste the one-line snippet before
`</body>` in `index.html`.

---

## Pre-launch checklist

Content and credibility:

- [ ] Real email and phone in the contact block; delete the `is-placeholder` spans
- [ ] Invented testimonials replaced with permissioned real quotes, or removed
- [ ] Pexels photography replaced with your own work
- [ ] Every `alt` attribute rewritten to describe your actual images
- [ ] Portfolio labels changed to real events
- [ ] Marketing / Core Brand logo files added
- [ ] Instagram and Pinterest links pointed at real profiles (currently `#`)
- [ ] Favicon added

Technical:

- [ ] `telephone`, `email`, `url` added to the JSON-LD block
- [ ] `og:image` / `twitter:image` changed to absolute URLs on your domain
- [x] **Contact form connected** — WhatsApp mode
- [ ] **Tested with a real submission from a phone**
- [ ] Privacy notice published and linked
- [ ] `www` and apex both resolve, one redirecting to the other
- [ ] HTTPS active, HTTP redirecting to HTTPS
- [ ] Tested on a real phone on mobile data, not just desktop
- [ ] Domain auto-renew enabled

Post-launch:

- [ ] Submit to [Google Search Console](https://search.google.com/search-console)
- [ ] Create a **Google Business Profile** with the Bomikhal address. Its hours
      and address must match the site exactly (Mon–Sat 10:00–19:00, visits by
      prior appointment) or local search rankings suffer
- [ ] Add the site link to your Instagram bio

---

## What you do *not* need to buy

- **An SSL certificate** — free and automatic everywhere above.
- **Shared or "business" hosting, cPanel, or a VPS** — there is no server-side
  code to run. You would be paying for an idle Linux box.
- **A CDN add-on** — Cloudflare Pages *is* a CDN.
- **"Website backup" services** — the whole site is five files. Keep it in Git.
- **SEO packages sold by hosting companies** — the on-page SEO is already done.
  Spend that money on a Google Business Profile and real photography instead.

---

## Ongoing costs and renewals

| Item     | Renewal            | Watch for |
|----------|--------------------|-----------|
| Domain   | Yearly, ₹800–1,400 | Renewal price ≠ first-year promo price |
| Hosting  | ₹0                 | Free-tier terms can change; re-read yearly |
| Email    | ₹0 on Zoho free    | Upgrade only when you outgrow 5 users |

Set a calendar reminder **one month before** the domain expires, independent of
auto-renew. Cards expire; auto-renew silently fails.

---

## If something breaks

- **Site shows a 404 after deploy** — build output directory is probably wrong.
  It must be `/`, with an empty build command.
- **CSS or JS not loading** — check the browser console. Paths are relative
  (`css/style.css`, not `/css/style.css`) and are case-sensitive on Linux
  servers even though they worked on Windows.
- **Images missing** — they still load from Pexels until you replace them.
  A blocked network or ad-blocker will hide them.
- **Domain not resolving** — DNS can take up to 24 hours. Check at
  [dnschecker.org](https://dnschecker.org).
- **Form submits but no email arrives** — check spam, then confirm SPF/DKIM are
  set on your sending domain.
