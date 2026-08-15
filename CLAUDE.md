# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page marketing site for **11:11** (Elevenn Elevenn Archive Pvt Ltd,
Bhubaneswar). Static: `index.html`, `css/style.css`, `js/script.js`.

**The copy on the site is wrong and is being replaced.** It describes a wedding
coordination studio; the client has confirmed that is not the business. The real
one is not yet known — their Instagram (`@elevenn11_11elevenn`) is login-gated.
So do not extend, polish, or build on the wedding copy, and do not treat
"Wedding Coordination / Full-Service Planning / Event Design", the portfolio
captions, or the form's wedding-date and guest-count fields as settled. The
60 questions in `CLIENT-BRIEF.md` are what unblocks the rewrite; Part A is the
blocking part.

The **logo, palette, WhatsApp delivery, layout, and JS are current and correct.**
Only the words and photography are stale.

## This is client work — never invent business facts

Facts about 11:11 come from the client, not from inference. Never write a
plausible-looking email, phone number, address, price, testimonial, portfolio
entry, statistic, or founding date. A wrong phone number on a live site sends
real enquiries to a stranger, and invented reviews under a real registered
company are a genuine legal risk.

Existing placeholders are deliberate and obvious on purpose
(`hello@yourdomain.in`, `+91 XXXXX XXXXX`, carrying the `.is-placeholder`
class). Leave them visible until the client supplies the real value. The three
testimonials are invented and carry a disclaimer — they must be replaced with
permissioned quotes or deleted, never quietly kept.

Real and confirmed: the legal name, the Bomikhal address, and the WhatsApp
number `+91 95915 09910`.

## Running and verifying

No build step, no `package.json`, nothing to install. Open `index.html`
directly — `file://` works, there are no modules or fetch calls at load.

**This folder is not a git repository.** There is no history and no undo, so
read before overwriting and prefer edits over rewrites.

To actually see a change, render with headless Chrome:

```bash
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new \
  --disable-gpu --hide-scrollbars --no-sandbox \
  --user-data-dir="$TMP/cprof" --window-size=1440,900 \
  --screenshot="<absolute-path>.png" --virtual-time-budget=9000 \
  "file:///C:/jollymynah/event-management/index.html"
```

Three traps, all of which produce a blank or unchanged screenshot:

- `--user-data-dir` and an **absolute** `--screenshot` path are both required,
  or the write is denied.
- Headless captures the viewport only and will not scroll. Anchors and
  `scrollIntoView` do not work — `scroll-behavior: smooth` outruns the capture.
  To see anything below the fold, copy the page to a scratch file, override
  `.hero { height: 720px }`, and use one very tall `--window-size`.
- Elements marked `data-reveal` start invisible until `IntersectionObserver`
  fires. In a scratch copy, force them visible:
  `[data-reveal],[data-reveal] *,.stagger>*{opacity:1!important;transform:none!important}`

Sanity checks worth running after edits: `node --check js/script.js`, and a
brace-balance count on the CSS.

## Colour tokens and contrast

All colour lives in section **01. Design tokens** of `css/style.css`, sampled
from the logo. Never hardcode a hex outside that block.

The accent gold is **decorative only on light backgrounds** — rules, bullets,
quote marks. It measures 2.5:1 on `--paper-alt`. Use `--gold-deep` (4.8:1) if a
gold must carry words there. On the dark bands the plain gold is fine for text
(4.95:1 on `--navy`), which is why the process band's eyebrow and numerals use
it.

If you change any colour, re-measure the ratios and update the table in
`README.md`. Those numbers are measured, not estimated, and stale ones are
worse than none.

## Enquiry delivery

Configured in one place — the `DELIVERY` object at the top of section
**07. Contact form** in `js/script.js`. Empty `endpoint` means WhatsApp mode
(active); setting it to a Formspree/Netlify/own URL switches to email and
bypasses WhatsApp entirely.

The WhatsApp message is built from the form's own `<label>` text, so it survives
field renames. Keep it that way — do not hardcode field names there.

## Conventions

- `css/style.css` and `js/script.js` are organised into numbered sections listed
  at the top of each file. Add to the right section and keep the contents list
  accurate.
- Comments in this project explain *why*, especially where a value was measured
  or a trap avoided. Match that when adding code.
- Vanilla only — no framework, no build step, no npm. This is a hard constraint:
  the client must be able to open the files and edit them.
- JS is ES5-syntax and IIFE-scoped.
- `README.md` (project overview, palette, form delivery), `DEPLOYMENT.md`
  (hosting, not yet chosen), `images/README.md` (logo and photography), and
  `CLIENT-BRIEF.md` (the open questions) describe current behaviour. When you
  change behaviour, update the matching doc in the same pass — these have gone
  stale repeatedly.
- `CLIENT-BRIEF.md` is the source for the PDF and `.docx` in the project root.
  Edit the Markdown, then regenerate; never hand-edit the generated files.
