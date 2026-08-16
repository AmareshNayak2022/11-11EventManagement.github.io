# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page marketing site for **11:11** (Elevenn Elevenn Archive Pvt Ltd,
Bhubaneswar). Static: `index.html`, `css/style.css`, `js/script.js`.

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
photography, with a lede that says so in plain words. Do not:

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
| Badge sub-text | Bespoke Occasions & Curation |
| Email | `concierge@1111events.in` — displayed. Enquiries route to `enquiries@1111events.in` |
| Phone & WhatsApp | `+91 99381 20356` — the concierge desk line, one number for both |
| Second line | `+91 95915 09910` — published as a call-only number |
| Address | Plot No. 30 & 30/982, Odyssa Business Centre, Bomikhal, Rasulgarh Square, Bhubaneswar 751010 (publish; visits by appointment only) |
| Hours | Mon–Sat, 10:00–19:00 IST |
| Palette | Midnight Navy `#0A1128`, Champagne Gold `#D4AF37`, Metallic Gold `#C5A059`, Warm Cream `#FDFBF7` |
| Pricing floor | From ₹5,00,000 per project engagement |

Two things about that table are worth knowing before you touch them:

- **There are two addresses and they are not interchangeable.**
  `concierge@1111events.in` (brief Q36) is the public one and the only one on
  the page. `enquiries@1111events.in` (Q40) is the routing inbox — where form
  submissions should be delivered if the form is ever moved off WhatsApp, with
  the Lead Curator and Ops Head copied. An earlier `connect@elevennelevenn.com`
  was sent in conversation and briefly published; the client has since confirmed
  the `1111events.in` addresses are correct. The site's own *domain* is still
  unconfirmed — an email domain is not proof of where the site will live — which
  is why `url` stays omitted from the JSON-LD.
- **Two numbers are published, but only one is a WhatsApp route.** The client
  confirmed the concierge line `99381 20356` is also the WhatsApp account, so
  its call and chat links sit together in one Concierge row rather than in
  separate Phone and WhatsApp rows — the same digits printed twice would imply
  two channels. `95915 09910` is published beneath it as a call-only second
  line. It *is* on WhatsApp (it was the original WhatsApp contact), but giving
  it a second chat button would leave visitors guessing which desk they are
  reaching, and brief Q37 is explicit that the concierge line is the one that
  routes enquiries. If that ever changes, the WhatsApp number appears in three
  places and must move together: both `wa.me` links in `index.html` and
  `DELIVERY.whatsapp` in `js/script.js`.

Still unconfirmed, and still listed in `CLIENT-BRIEF.md`: real past work and
photography (Q19–26), the domain and hosting (Q44–51), and the legal and
privacy items (Q52–56). The Pinterest link in the footer still points at `#`.

## Running and verifying

No build step, no `package.json`, nothing to install. Open `index.html`
directly — `file://` works, there are no modules or fetch calls at load.

**Git is set up**, pushed to `origin/main` and deployed by GitHub Pages at
https://amareshnayak2022.github.io/11-11EventManagement.github.io/ — a push to
`main` goes live in under a minute. Verify against that URL, not just locally.

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
`--navy` and 9.5:1 on `--navy-deep`. That is why the process band's eyebrow,
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

- `css/style.css` and `js/script.js` are organised into numbered sections listed
  at the top of each file. Add to the right section and keep the contents list
  accurate.
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
