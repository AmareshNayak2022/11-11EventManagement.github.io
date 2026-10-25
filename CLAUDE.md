# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A marketing site for **11:11** (Elevenn Elevenn Archive Pvt Ltd, Bhubaneswar).
Static, one page: `index.html`, with `css/style.css` and `js/script.js`.
`book.html` was the NOXUS ticket page; since 25 Oct 2026 it is only a
`noindex` meta-refresh to `/#past-events`, kept so the link handed out during
the campaign does not 404. It loads no stylesheet and no script.

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

### The client has exactly one piece of real work to show

This is the single most important constraint on the copy. There is **one
past event on the site — the film in `#past-events` — and no client to quote
and no statistic to cite.** See the past-events section below for what may and
may not be said about that film. The section that
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
  `919938120356` appears **three** times — contact row, floating button and
  `DELIVERY` — and `919019526532` once. Changing which desk takes enquiries
  means changing all three together.

Still unconfirmed, and still listed in `CLIENT-BRIEF.md`: real past work and
photography (Q19–26), the form's routing inbox (Q40), the remaining hosting
and email items (Q45–51), and the legal and privacy items (Q52–56). The Pinterest link in the footer still points at `#`.

## Past events — the showreel, added 25 October 2026

**NOXUS** (Saturday 26 September 2026) was the client's debut event, and it has
happened. On 25 Oct 2026 the client asked for every NOXUS detail to come off
the site, and it has: the announcement bar, the hero strip, the countdowns, the
venue-reveal panel, the inclusions, the pass cards, the whole booking page with
its UPI / QR / Razorpay payment flow, `js/booking.js`, `js/qr.js`, the posters,
the payment QR and the teaser film. **Git history has all of it** (last commit
with it: `73941cc`) — recover from there if a future ticketed event needs the
same machinery, rather than rebuilding it. Do not reintroduce NOXUS copy.

In its place, directly under the hero, is the `#past-events` band
(`.showreel`, section 08b of the stylesheet; section 08 of `js/script.js`): the
client's own **32-second vertical film** of a night 11:11 produced, there "for
audiences to see how you conduct events".

**Only what the film itself shows is written beside it**:

| Fact | Source |
|------|--------|
| Venue: **Vivanta Bhubaneswar, DN Square** | the film's end card and the stage backdrop |
| Credit: **Film by Zenvy Studios** | the film's end card |

The film does **not** name the event, its date, its artists or its headcount,
so none of those is on the page — not even "NOXUS", although it may well be
that night. Q70–Q74 in `CLIENT-BRIEF.md` ask the client. Until they answer, do
not caption it with an event name, a date, an artist (a DJ's name is visible on
a screen in it) or a crowd figure.

The film's files:

- `videos/vivanta-night.mp4` — a 720x1280 re-encode (H.264 CRF 30, AAC 112k,
  `+faststart`, ~6.4 MB) of the client's 48 MB master. The command is in
  `images/README.md`. **Never commit the master**; Pages would serve all of it.
- `images/vivanta-film-poster.jpg` — the poster frame *and* the `<img>`
  fallback, decoded from the film at 20.5 s (frame one is a white flash).

The player rules carried over from the NOXUS film and still hold:

- **`.film-play` covers the frame whenever the film is not running.** A paused
  film shows only a still, and a still looks like a photograph — the client
  once could not find the old film for exactly this reason. Do not remove it.
- **It does not load or autoplay on page load** (`preload="none"`). An
  IntersectionObserver starts it when it scrolls into view and pauses it when
  it leaves. It declines to autoplay under `prefers-reduced-motion` or Data
  Saver, and swallows the autoplay-policy rejection.
- **`controls` sits in the markup and JavaScript removes it**, never the
  reverse, so a dead script leaves native controls.
- **The pause button is a WCAG 2.2.2 requirement**: the film loops and runs
  past five seconds. *Sound on* exists because this film has a soundtrack;
  it starts muted.
- On phones the film leads the band (`order: -1`).

The hero's gold button is **Start a Brief** again, with *Watch the Film* beside
it as the outline button, and the scroll cue points at `#past-events`.

⚠️ **`--nav-h` and `--header-h` are still not the same token, and must not be
merged**, even though without the announcement bar they now measure the same.
`js/script.js` measures the whole `<header>` into `--header-h`; the nav row's
own `min-height` uses `--nav-h`. Point the row at `--header-h` and it grows on
every measurement pass the moment anything else is added to the header.

## Running and verifying

No build step, no `package.json`, nothing to install. Open `index.html`
directly — `file://` works, there are no modules or fetch calls at load.

**The stylesheet and script are linked with a `?v=<date>` query.** Bump both
when you change `css/style.css` or `js/script.js` — in the same commit, and to
the same string. Without it a phone that has the old stylesheet cached shows the new copy
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

- `css/style.css` and `js/script.js` are organised
  into numbered sections listed at the top of each file. Add to the right section and
  keep the contents list accurate.
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
