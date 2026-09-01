# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A marketing site for **11:11** (Elevenn Elevenn Archive Pvt Ltd, Bhubaneswar).
Static, and two pages: `index.html`, the marketing page, and `book.html`, the
reservation and payment page for the debut event. Shared `css/style.css` and
`js/script.js`; `js/booking.js` is loaded by `book.html` alone.

**What the business is (confirmed by the client, August 2026):** an
*experiential event agency* — premium and high-concept work only. It curates
bespoke private concerts and showcases, premium corporate and institutional
gatherings, and curated venue-and-artist matchmaking, pairing rare and
off-market venues across India with hand-picked artists. Its stated core
difference is scouting India's underground and breakout artists rather than
booking repeat mainstream headliners.

It is **not** a general event-management company and **not** a wedding
planner. The client named three categories of work it explicitly refuses, and
they are published on the page: mass-market wedding coordination or templated
social parties, dry venue-only rentals, and off-the-shelf low-budget talent
booking. Do not reintroduce any of them.

The site has been rewritten around that positioning twice now — first away from
wedding planning, then away from general event management. If a future
instruction seems to pull it back toward either, check the brief before acting.

### The client is pre-launch on this initiative

This is the single most important constraint on the copy. There is **no past
work to show, no client to quote, and no statistic to cite.** The section that
was a portfolio is now `#atmosphere`, a stated reference board of stock
photography, with a lede that says so in plain words. (The hero is the one
image that is not stock: since 22 Aug 2026 it is the client's own crest
artwork, `images/hero-*.jpg`, cropped above the baked-in "It is Time" and
event-management service list the original carries. Crop any new export the
same way.) Do not:

- reinstate portfolio captions naming a city, a date, or an event;
- add testimonials (see the removed-section comment in `index.html`);
- write "500+ events", "since 20XX", or any similar figure.

## This is client work — never invent business facts

Facts about 11:11 come from the client, not from inference. Never write a
plausible-looking email, phone number, address, price, testimonial, portfolio
entry, statistic, or founding date. A wrong phone number on a live site sends
real enquiries to a stranger, and invented reviews under a real registered
company are a genuine legal risk.

**Confirmed and safe to use:**

| Fact | Value |
|------|-------|
| Legal name | Elevenn Elevenn Archive Pvt Ltd |
| Tagline | Where Rare Venues Meet Exceptional Talent |
| Hero headline | *Where moments become legend.* — client copy, 22 Aug 2026 |
| Badge sub-text | Bespoke Occasions & Curation |
| Email | `connect@elevennelevenn.com` — displayed (client, 22 Aug 2026). Routing inbox unconfirmed |
| Phone & WhatsApp | `+91 99381 20356` — the concierge desk line, one number for both (client, 23 Aug 2026) |
| Second line | `+91 90195 26532` — also published with a WhatsApp link (client, 23 Aug 2026; replaced +91 95915 09910, now off the site) |
| Address | Plot No. 30 & 30/982, Odyssa Business Centre, Bomikhal, Rasulgarh Square, Bhubaneswar 751010 (publish; visits by appointment only) |
| Hours | Mon–Sat, 10:00–19:00 IST |
| Palette | Midnight Navy `#0A1128`, Champagne Gold `#D4AF37`, Metallic Gold `#C5A059`, Warm Cream `#FDFBF7` |
| Pricing floor | From ₹5,00,000 per project engagement — confirmed, but **published nowhere on the site** (see below) |

The client's own words replaced the hero on 22 Aug 2026: the eyebrow became
the registered name *Elevenn Elevenn Archive*, the `<h1>` became *Where
moments become legend.*, and the lede became the two-paragraph "architects of
the exceptional" statement. Later the same day the client carried that line
into the two other places it is set as display type — `#cta-title` and the
footer's `.site-footer__tagline` — and settled its treatment: capitals, with
*moments* lowercase and italic and LEGEND in gold. All three carry it. The
capitals are a CSS `text-transform`, never typed capitals, so a screen reader
does not spell the words out; if you add a fourth setting of the line, copy
`.hero__title` rather than typing it in caps.

So *Where Rare Venues Meet Exceptional Talent* is now **nowhere in the visible
page**. It survives only in the JSON-LD `slogan` and the OG/Twitter
descriptions, which the client has not asked to change; leave them unless
they do. Do not move it back into any heading.

On 22 Aug 2026 the client replaced the packages note that published the floor
with copy that begins *"Unbound by fixed pricing structures"*, then asked for
every remaining figure to go with it. So the enquiry form's budget hint and its
₹5L bands are gone — Projected Budget is now a free-text box, still required per
brief Q41 — and `priceRange` has been removed from the JSON-LD. **No rupee
figure appears anywhere on the site.** The floor above is still the confirmed
fact for quoting; it is simply not published. Do not re-add it to the copy, the
form or the structured data without the client asking.

Two things about that table are worth knowing before you touch them:

- **The published email has changed twice, and the routing inbox has not
  followed it.** `connect@elevennelevenn.com` is what the page shows, restored
  at the client's instruction on 22 Aug 2026. It had been published once before,
  then replaced by `concierge@1111events.in` (brief Q36) when the client
  confirmed the brief's answers — and now replaced again. Do not "correct" it
  back to the brief without asking; the brief is older than this instruction.
  The routing inbox for form submissions, `enquiries@1111events.in` (Q40), sits
  on a third domain — one the page has never shown — so it still needs
  re-confirming before any endpoint is wired. See the `DELIVERY` comment in
  `js/script.js`. **Confirming the site's domain did not confirm this**; they are
  separate questions and the site domain is not `1111events.in`.

  The site's own domain **is** now settled: **`elevennelevenn.in`**, confirmed by
  the client on 1 Sept 2026, live over HTTPS, with the old GitHub Pages URL
  301-redirecting to it. So `url` is filled in in the JSON-LD, both pages carry a
  `canonical` and an `og:url`, and every absolute image URL is on that host. Note
  that the site domain (`.in`) and the published email domain
  (`elevennelevenn.com`) are two different registrations — that is fine, and
  neither should be "corrected" to match the other.
- **Two numbers, both on WhatsApp, but only one is the enquiry route.** Each
  contact row pairs a `tel:` link with a `wa.me` link. Their visible text is
  identical — the `<dt>` beside them says which desk — so each carries an
  `aria-label` naming its desk; without those, a screen reader's link list shows
  two identical names pointing at different numbers. Keep the labels if you edit
  these rows.
  The **floating button and `DELIVERY.whatsapp` route to the concierge line
  only**, because brief Q37 makes that the desk that handles enquiries. So
  `919938120356` now appears **five** times — contact row, floating button,
  `DELIVERY`, plus `book.html`'s footer and `WHATSAPP` in `js/booking.js` — and
  `919019526532` once. Changing which desk takes enquiries means changing all
  five together. See the debut-event section below.

Still unconfirmed, and still listed in `CLIENT-BRIEF.md`: real past work and
photography (Q19–26), the form's routing inbox (Q40), the remaining hosting
and email items (Q45–51), and the legal and privacy items (Q52–56). The Pinterest link in the footer still points at `#`.

## NOXUS — the debut event, added 1 September 2026

The client's first event is **NOXUS**, on **Saturday 26 September 2026**. It is
advertised in the `#debut` band under the hero — the section id and the
`.debut*` class names predate the name and were left alone, but every visible
word says Noxus — and sold on `book.html`.

**Confirmed by the client: the two campaign posters supplied 1 Sept 2026, plus
their earlier message. All of it is safe to use verbatim.**

| Fact | Value |
|------|-------|
| Name | **NOXUS** |
| Strapline | *The secret is worth the wait.* |
| Positioning | *Odisha's Biggest Sundowner Drunch Party* — "drunch" is theirs, not a typo |
| Other lines | *The city is about to feel different.* / *The best sundowner gathering ever.* / *A State of Mind.* / *Miss it, regret it.* |
| Date | Saturday 26 September 2026 |
| **Venue** | **Deliberately secret.** Revealed **7 September 2026, 11:11 PM** |
| Passes | **Reserve** (elite families, corporates & groups — invitation only, DM to apply) · **Vogue** (powerful couples) · **Elite** (individual trendsetters) |
| Early bird | Live for Vogue & Elite, running **until the venue unveiling**; standard pricing after |
| **Elite** | individual — ₹5,499 → **₹2,499** |
| **Vogue** | couples, **priced per person** — ₹4,999 → **₹1,999 each**, minimum 2 |
| **Reserve** | invitation only, **minimum 3**, DM 9938120356 to apply |
| Inclusions | Rich culinary experience (no limits) · Global premium beverages (no limits) · An elegant sonic affair · A sundowner like never before · Elite gathering · Impeccable service & ambience |
| UPI ID | `elevennelevenne-26@idfcbank` — IDFC FIRST Bank, Elevenn Elevenn Archive Private Limited |
| Payment QR | `images/upi-qr.png`, a crop of the client's own payment slip |
| Posters | `images/noxus-teaser-*.jpg` (landing page), `images/noxus-passes-*.jpg` (booking page) |

### The one deadline that runs the whole campaign

`2026-09-07T23:11:00+05:30` does two jobs at once, because the poster says the
early-bird offers run "until the venue unveiling" and the unveiling is 7
September at 11:11 PM. That single instant closes the early-bird window and
opens the venue. It appears in **four** places and they must agree:

- the announcement bar's countdown (`index.html`)
- the venue-reveal panel's countdown (`index.html`)
- the booking page's countdown (`book.html`)
- `EARLY_BIRD_ENDS` in `js/booking.js` — the one that actually switches the
  price. It is a constant rather than a data attribute because a single deadline
  shared by both passes belongs in one place; the per-pass **prices** stay in
  the markup.

**The rate is not a choice the visitor makes.** `js/booking.js` compares the
clock against `EARLY_BIRD_ENDS` and reads whichever of `data-price-early` /
`data-price-standard` applies, repainting **every** pass card, the summary, the
pay panel and the UPI link together — every card, not just the selected one, or
a visitor comparing the two after the deadline would see one live figure beside
one stale advertisement. It re-checks once a minute, so a tab left open across
the evening of the 7th switches under the visitor rather than letting them pay
yesterday's rate. A malformed date falls back to the **standard** price, never
the cheap one.

**`data-min` is a pricing guard, not a preference.** Vogue is priced per person
below Elite's single-pass rate, so one Vogue pass would undercut one Elite pass
and nobody would ever buy Elite. Vogue's minimum of two is an inference from
"for powerful couples" and "each" — flagged, not buried. Selecting Vogue lifts
the quantity to 2 if it is lower, and the validator refuses less.

### Still not confirmed — do not invent

The **doors time**, the **lineup**, the **capacity**, and the **refund /
transfer policy**. Q62–Q66 in `CLIENT-BRIEF.md`; the refund policy is the urgent
one now that money is arriving.

- **Prices are settled** (client, evening of 1 Sept) and supersede the
  ₹2,999/₹5,999 given earlier that day, which predated the three-pass structure
  and were briefly live against Elite. If you find those two figures anywhere,
  they are wrong.
- Vogue's **minimum of two** is the one inferred number on the page. Confirm it.
- The **event** countdown still targets midnight opening the 26th, because
  "sundowner" implies an evening and implying is not confirming.
- The `Event` JSON-LD stays **commented out** in `index.html`: `location` would
  still be a guess, and the venue being secret is the point of the campaign.

Prices **do** now appear on the landing page's pass cards, because the client
published them in that struck-through form themselves. They still appear nowhere
else: the agency's own project pricing stays unpublished, and the posters
deliberately carry no figures at all.

### Where the event appears, and why it appears there

The client's first reaction to the band alone was that the event "is not getting
highlighted" — correctly, because the band sits below a 100vh hero. On the first
screen the event was a small button and a nav link, while the one loud thing on
the page pointed at the enquiry form. So it now appears in three places, in
descending permanence:

1. **The announcement bar** (`.announce`, top of `index.html`) — gold, the whole
   strip is one link, and it carries the **early-bird deadline** rather than the
   event date: the event is weeks away and nobody hurries for that, while the
   rate dies on 7 September. This is the real fix, and it is why the header's
   gold *Tickets* button was **removed**: it was a second gold thing doing a
   worse version of the same job.
2. **The hero strip** (`.hero__debut`) — name, date and the venue-reveal moment
   directly above the buttons, and for the length of the campaign the hero's
   gold goes to *Reserve Your Pass* while *Start a Brief* steps back to an
   outline.
3. **The `#debut` band** — the full pitch: the NOXUS wordmark, the client's
   poster, the event countdown, the venue-reveal panel, the six inclusions and
   the three passes.

**Reverting after the night** means deleting the `<a class="announce">`, the
`.hero__debut` paragraph, the `#debut` section and the nav item, and swapping
the two hero button classes back. The comments in `index.html` say so at each
site.

⚠️ **`--nav-h` and `--header-h` are not the same token, and must not be merged.**
`js/script.js` measures the whole `<header>` — bar included — into `--header-h`,
which the hero padding and every `scroll-margin-top` depend on. The nav row's
own `min-height` uses `--nav-h`. Point the row at `--header-h` and it grows by
the bar's height on every measurement pass, compounding on each resize.

Adding the bar and the strip cost about 110px of first screen, which pushed the
hero buttons off a 1440x900 viewport. That was paid back out of spacing and an
8% trim to the `--fs-h1` ceiling — **not** out of the client's hero copy, and
not by shrinking the reserve button, which would have defeated the point.

**Not confirmed, and written nowhere on the site. Do not invent any of them:**
the venue, the doors time, the lineup, the seat capacity, the date the
early-bird price closes, and the refund/transfer policy. They are Q61–Q66 in
`CLIENT-BRIEF.md`. Two consequences already built in:

- Both countdowns target **midnight opening the 26th**, not a start time,
  written as an ISO instant with an explicit `+05:30` offset. A bare
  `2026-09-26` parses as midnight *UTC* and would be five and a half hours out
  for everyone. When the doors time lands, change the `data-countdown`
  attribute in `index.html` **and** `book.html` — nothing in the JS.
- The `Event` JSON-LD is written out but **commented out** in `index.html`,
  because `startDate` and `location` would both be guesses and a guessed venue
  goes straight to Google. Same reasoning as the omitted `url`.

**`book.html` is the one place a rupee figure is published**, and it does not
reopen the pricing decision above: the *agency's* project pricing is still unpublished
everywhere, and a ticket nobody can buy without knowing its price is a different
thing. Do not take it as licence to re-add figures to the packages copy, the
enquiry form, the JSON-LD — or the landing page.

**There is no payment gateway, and the page must never imply one.** The visitor
pays the UPI ID by QR or `upi://` intent, enters the reference from their
receipt, and `js/booking.js` hands the reservation to the concierge desk on
WhatsApp exactly as the enquiry form does. A person then matches it against the
account. So the page says a reservation has been *sent* and will be *confirmed*,
never that a seat is "booked" on submit. Keep that wording, and keep the note
that confirmation comes from a human during desk hours.

Two more things that must move together:

- `images/upi-qr.png` and `UPI_ID` at the top of `js/booking.js` are **the same
  account**. Change one without the other and the page shows a code and an ID
  that disagree — money to the wrong place.
- The ticket **prices live in the markup**, as `data-price` on the tier radios in
  `book.html`, next to the figure the visitor reads. `booking.js` reads them and
  hardcodes no amount. Keep it that way; the saving line is computed from the
  two tiers rather than from a hardcoded ₹3,000, so it survives a price change.

The concierge number `919938120356` now appears in **five** places, not three:
the contact row, the floating button and `DELIVERY` in `js/script.js`, plus
`book.html`'s footer and `WHATSAPP` in `js/booking.js`. Changing which desk takes
enquiries means changing all five.

## Running and verifying

No build step, no `package.json`, nothing to install. Open `index.html`
directly — `file://` works, there are no modules or fetch calls at load.
`book.html` works the same way; its `upi://` button is the one thing that does
nothing on a desktop, because it needs a UPI app to resolve.

To check the booking page's arithmetic rather than its looks, drive it: load a
copy in headless Chrome with a script that flips the tier, sets a seat count,
writes the resulting total and the UPI `am=` into `document.title`, then read it
back with `--dump-dom`. Faster and far more certain than reading a screenshot,
and it is how the ₹59,990 Indian-grouping case was verified.

**The stylesheet and scripts are linked with a `?v=<date>` query, on both
pages.** Bump every one of them when you change `css/style.css`, `js/script.js`
or `js/booking.js` — in the same commit, and to the same string in both HTML
files. Without it a phone that has the old stylesheet cached shows the new copy
in the old styling and the change looks like it never deployed — this has already cost one
round of "I don't see the changes".

**Git is set up**, pushed to `origin/main` and deployed by GitHub Pages on the
client's own domain, **https://elevennelevenn.in** — a push to `main` goes live
in under a minute. Verify against that URL, not just locally.

The `CNAME` file in the repo root is what binds the domain, and GitHub rewrites
it whenever the custom domain is changed in the repository's Pages settings. It
has been removed and re-added once already, from the GitHub web UI rather than
from here, so **fetch before you push** — that is exactly how a rejected push
happened on 1 Sept 2026. Do not delete or hand-edit `CNAME`; change the domain
in the Pages settings and let GitHub write the file.

The old `https://amareshnayak2022.github.io/11-11EventManagement.github.io/`
address now returns **301** to the custom domain. A `curl` check that expects
`200` there will hang or fail — follow redirects, or just test the real host.

To actually see a change, render with headless Chrome:

```bash
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new \
  --disable-gpu --hide-scrollbars --no-sandbox \
  --user-data-dir="$TMP/cprof" --window-size=1440,900 \
  --screenshot="<absolute-path>.png" --virtual-time-budget=9000 \
  "file:///C:/jollymynah/event-management/index.html"
```

Five traps, all of which produce a blank, unchanged, or misleading screenshot:

- `--user-data-dir` and an **absolute** `--screenshot` path are both required,
  or the write is denied.
- Headless captures the viewport only and will not scroll. Anchors and
  `scrollIntoView` do not work — `scroll-behavior: smooth` outruns the capture.
  To see anything below the fold, copy the page to a scratch file, override
  `.hero { height: 720px }`, and use one very tall `--window-size`.
- Elements marked `data-reveal` start invisible until `IntersectionObserver`
  fires. In a scratch copy, force them visible:
  `[data-reveal],[data-reveal] *,.stagger>*{opacity:1!important;transform:none!important}`
- **On a very tall canvas the last few Pexels images silently fail to load**
  and render as empty boxes. This is a headless resource-loading limit, not a
  broken URL — replace `loading="lazy"` with `loading="eager"` in the scratch
  copy and raise `--virtual-time-budget` to ~40000 before concluding an image
  is dead. Verify a suspect URL with `curl -o /dev/null -w "%{http_code}"`.
- **Headless enforces a minimum window width of about 500px on Windows.** Ask
  for `--window-size=375` and you get a 375px-wide *screenshot* of a page laid
  out at 489px, which looks exactly like text being clipped by an overflow bug.
  To test narrow layouts, measure instead of looking: inject a script that
  writes `document.documentElement.scrollWidth` and `clientWidth` into
  `document.title`, then read it back with `--dump-dom`. Equal values mean no
  horizontal scroll.

Sanity checks worth running after edits: `node --check js/script.js`, a
brace-balance count on the CSS, and an HTML nesting check (Python's
`html.parser` with a tag stack is enough).

## Colour tokens and contrast

All colour lives in section **01. Design tokens** of `css/style.css`. The three
brand values are the client's own (brief Q29); everything else is derived from
them. Never hardcode a hex or an `rgba()` outside that block — the translucent
overlays elsewhere in the file use `rgb(var(--navy-rgb) / 0.5)` and friends, and
should keep doing so.

The champagne gold is **decorative only on light backgrounds** — rules, bullets,
the dashes in the boundaries list. It measures **2.0:1** on `--paper` and 1.8:1
on `--paper-alt`, which is worse than the gold it replaced, so the rule matters
more than it used to. Use `--gold-deep` (`#7F6220`, 5.5:1 on paper, 4.9:1 on
alt) wherever a gold must carry words *or* form a UI boundary — that is why the
required-field asterisk and the input underlines use it.

On the dark bands the plain gold is not merely safe but strong: **8.9:1** on
`--navy` and 9.5:1 on `--navy-deep`. A photograph is not a dark band: over the
hero and CTA images the plain gold measures only 2.75:1 and 2.83:1 against the
brightest pixel behind the word LEGEND, so that word uses `--gold-bright`
(`#E8C86A`, 3.55:1 and 3.66:1 — above the 3:1 floor for large text). That is why the process band's eyebrow,
its numerals, and the `.step__meta` labels are set in it.

If you change any colour, re-measure every ratio and update the table in
`README.md`. Those numbers are measured with the WCAG formula, not estimated,
and stale ones are worse than none.

## Enquiry delivery

Configured in one place — the `DELIVERY` object at the top of section
**07. Contact form** in `js/script.js`. Empty `endpoint` means WhatsApp mode
(active); setting it to a Formspree/Netlify/own URL switches to email and
bypasses WhatsApp entirely. Point it at `enquiries@1111events.in`, not at the
`concierge@` address shown on the page.

The WhatsApp message is built from the form's own `<label>` and `<legend>` text,
so it survives field renames. Keep it that way — do not hardcode field names
there. Note the one asymmetry: checkboxes are filtered on `checked`, not on
emptiness, because an unticked box still carries its `value`.

## Conventions

- `css/style.css`, `js/script.js` and `js/booking.js` are organised into
  numbered sections listed at the top of each file. Add to the right section and
  keep the contents list accurate.
- The booking page reuses site components rather than growing its own set:
  `.field` / `.field__input` / `.field__error` for inputs, `.check` for the
  confirmation tick, `.btn` throughout, and `.process` / `.step` for the "what
  happens next" band — `.book-next` is named alongside `.process` in section 11
  rather than restating the dark ground. Keep adding that way.
- Comments in this project explain *why*, especially where a value was measured
  or a trap avoided. Match that when adding code.
- Vanilla only — no framework, no build step, no npm. This is a hard constraint:
  the client must be able to open the files and edit them.
- JS is ES5-syntax and IIFE-scoped.
- Prefer reusing an existing component over inventing a fourth card style. The
  formats/tiers grid deliberately reuses `.event-grid` / `.event-type` rather
  than growing its own treatment.
- `README.md` (project overview, palette, form delivery), `DEPLOYMENT.md`
  (hosting, not yet chosen), `images/README.md` (logo and photography), and
  `CLIENT-BRIEF.md` (the open questions) describe current behaviour. When you
  change behaviour, update the matching doc in the same pass — these have gone
  stale repeatedly.
- `CLIENT-BRIEF.md` is the source for the PDF and `.docx` in the project root.
  Edit the Markdown, then regenerate; never hand-edit the generated files.
  **Both generated files are currently stale** — pandoc is not installed in this
  environment, so the Markdown moved ahead of them.
