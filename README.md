# 11:11 — Experiential Events

The marketing website for **Elevenn Elevenn Archive Pvt Ltd**, trading as
**11:11**, an experiential event agency based in Bhubaneswar and working across
India. Bespoke private concerts and showcases, premium corporate and
institutional gatherings, and curated venue-and-artist matchmaking — pairing
rare, off-market venues with hand-picked artists.

Premium and high-concept work only. It is not a general event-management
company and not a wedding planner; the three categories of work the company
turns down are stated on the page.

Built as a static site: three files, no build step, no dependencies, no server.

| Detail         | Value                                                                                                |
|----------------|------------------------------------------------------------------------------------------------------|
| Legal name     | Elevenn Elevenn Archive Pvt Ltd                                                                      |
| Marketing name | 11:11 (styled *11:11 Experiential* or *11:11 Bespoke* in body copy)                                  |
| Tagline        | Where Rare Venues Meet Exceptional Talent                                                            |
| Badge sub-text | Bespoke Occasions & Curation                                                                         |
| Email          | connect@elevennelevenn.com  (routing inbox for forms: unconfirmed)                                   |
| Phone & WhatsApp | +91 99381 20356 — the concierge desk line, one number for both                                      |
| Second line    | +91 90195 26532 — also on WhatsApp                                                                    |
| Address        | Plot No. 30 & 30/982, Odyssa Business Centre, Bomikhal, Rasulgarh Square, Bhubaneswar, Odisha 751010 |
| Hours          | Monday – Saturday, 10:00 – 19:00 IST                                                                 |

---

## ⚠️ What still has to change before launch

The contact details are now real, which was the biggest of these. Four things
are still outstanding:

1. **Photography — eleven of the twelve images are Pexels stock.** They were
   chosen to match the register the company works in (heritage courtyards,
   candlelit chamber concerts, a lone artist under a spotlight), but they are
   other people's photographs of other people's events. Replace with your own
   work as it exists — see `images/README.md`. The exception is the hero, which
   is the client's own crest artwork and stays.

2. **The Atmosphere section is not a portfolio, and must not become one by
   accident.** 11:11 is pre-launch on this initiative, so the section is
   explicitly labelled a reference board and its captions name no city, date, or
   event. Turning it back into a portfolio needs real, permissioned photographs
   of real events — nothing less.

3. **Testimonials — section removed.** It held three invented client quotes.
   Publishing fabricated reviews under a real registered company is a genuine
   legal and reputational risk, so the section was deleted rather than left
   behind a disclaimer. There is also nobody to quote yet. To restore it,
   recover the markup from git history and fill it with real, permissioned
   quotes; the CSS is still in place. See the comment where the section used to
   sit in `index.html`.

4. **The Pinterest link in the footer still points at `#`.** Give it a real
   profile URL or delete the whole `<li>`.

### The debut event (added 1 September 2026)

The landing page now carries an advert for the company's first signature event
on **Saturday 26 September 2026**, and `book.html` takes the reservation and the
payment. Five things about it are **still unconfirmed and deliberately unwritten
anywhere on the site** — do not fill them in from guesswork:

| Missing | Why it matters |
|---------|----------------|
| The venue | Named nowhere. The summary rail says "announced to confirmed guests", and the `Event` structured data in `index.html` stays commented out until there is a real address to put in it. |
| The doors time | Both countdowns target **midnight opening the 26th**, not a start time. When the real time is confirmed, change the `data-countdown` attribute in `index.html` **and** `book.html` — the same ISO string with the `+05:30` offset — and nothing else. |
| The early-bird closing date | The cards say "limited allocation" and name no date, because there is not one yet. A second countdown to that deadline would sell harder; it needs a date first. |
| The seat capacity | The form caps a self-service booking at ten seats. That is a sanity limit, not a stated capacity. |
| **The refund and transfer policy** | Nothing on the page states one, because nothing has been agreed. This should exist in writing before real money arrives. |

Payment is **UPI, reconciled by hand** — there is no gateway. The visitor pays
`elevennelevenne-26@idfcbank` (IDFC FIRST Bank), enters the UPI reference from
their receipt, and the reservation reaches the concierge desk on WhatsApp. A
person then matches the reference against the account and confirms the seat.
That is why nothing on the page says a seat is "booked" on submit — it says the
reservation has been *sent*, and will be *confirmed*. Keep that wording.

Note also that `book.html` is the only place on the site where a **rupee figure
is published**. That is not a reversal of the pricing decision: the agency's own
project pricing is still unpublished everywhere, and a ticket that cannot be
bought without its price is a different thing.

Two smaller open items:

- **The domain is settled — this one is done.** The site lives at
  **https://elevennelevenn.in** (confirmed 1 September 2026), served by GitHub
  Pages, with the old `github.io` address 301-redirecting to it. `url` is in the
  structured data, both pages carry a `canonical` and an `og:url`, and every
  absolute image URL is on that host. One thing not to trip over: the site
  domain is `.in` and the published email is on `elevennelevenn.com` — two
  separate registrations, both correct, neither to be "fixed" to match.
- **Both numbers are tappable on WhatsApp**, each paired with its own
  tap-to-call link. The floating button and the enquiry form still go to the
  concierge line, since that is the desk meant to handle enquiries.

---

## What's in it

| Section        | Notes                                                                          |
|----------------|--------------------------------------------------------------------------------|
| Header         | Transparent over the hero, cream once you scroll. Sticky at all sizes.         |
| Hero           | Full-height photograph, layered overlay, animated scroll cue. Headline is the tagline. |
| About          | The client's own profile, vision and USP copy, beside a two-image composition. |
| Services       | The three core services, three inclusions each, entry point and flagship marked. |
| Experiences    | The five categories of work, stated plainly.                                   |
| Process        | Deep navy band. Four phases, each with its timeline and what you must supply.  |
| Packages       | The three production tiers, the pricing floor and booking terms, and an explicit *what we do not do* block. |
| Atmosphere     | Eight reference photographs on an asymmetric 12-col grid. **Not a portfolio** — see above. |
| Call to action | Full-bleed image band, led by the badge sub-text and the tagline.              |
| Contact        | Nine-field enquiry form built to the client's field list, validated client-side, delivered via WhatsApp. |
| Footer         | Four-column layout on the deepest navy, legal entity in the copyright bar.     |

Plus: hamburger menu with a focus trap, scroll-reveal via `IntersectionObserver`,
active-link scroll spy, `prefers-reduced-motion` support, skip link, JSON-LD
structured data, and Open Graph tags.

---

## Technologies

- **HTML5** — semantic sectioning, ARIA where the semantics fall short
- **CSS3** — custom properties, Grid, Flexbox, `clamp()`, `aspect-ratio`
- **Vanilla JavaScript** (ES5-compatible syntax, IIFE-scoped) — no libraries
- **Google Fonts** — Cormorant Garamond + Montserrat, loaded via `<link>`

Deliberately **not** used: React, Vue, Angular, TypeScript, Tailwind, Bootstrap,
jQuery, npm, Maven, Java, Spring Boot, or any bundler. There is no
`package.json` and nothing to install.

---

## Project structure

```
event-management/
├── .idea/              IntelliJ project settings (untouched)
├── index.html          The marketing page — all markup and the image URLs
├── book.html           The debut event's reservation and UPI payment page
├── css/
│   └── style.css       All styling, organised into numbered sections
├── js/
│   ├── script.js       Site-wide behaviour, in 8 numbered sections
│   └── booking.js      The reservation form on book.html, in 6 sections
├── images/
│   ├── logo.png        The circular brand badge — header, menu, footer, favicon
│   ├── apple-touch-icon.png  The same mark, opaque and square, for iOS
│   ├── upi-qr.png      The company's UPI payment QR, shown on book.html
│   └── README.md       Logo notes and how to swap in real photography
├── CLAUDE.md           Instructions for Claude Code
├── CLIENT-BRIEF.md     The 60 open questions — source for the PDF and .docx
├── DEPLOYMENT.md       Hosting, domain, and go-live guide
└── README.md           This file
```

The PDF and `.docx` in the root are generated from `CLIENT-BRIEF.md`. Edit the
Markdown, not them.

---

## Running it in IntelliJ IDEA

1. Open the `event-management` project.
2. Right-click `index.html` in the Project pane.
3. **Open In → Browser → Chrome** (or your browser of choice).

IntelliJ serves it on `http://localhost:63342/…` with live reload on save.

**Or** just double-click `index.html`. Everything works over `file://` too —
there are no fetch calls, modules, or cross-origin requests to trip over.

### If images don't appear

You need an internet connection on first load — all twelve reference photographs
are served from Pexels; the hero is a local file. See `images/README.md`.

---

## The logo

**Installed.** `images/logo.png` — the client's crowned `11:11` monogram, gold on
near-black, cropped to a **circle at 512 × 512** — appears in the header, the
mobile menu, the footer, and as the favicon, paired with the `11:11` wordmark
still set in live text.

Because the badge carries its own dark ground, it needs none of the light/dark
pairing a flat single-colour mark would have: it reads correctly both over the
hero photograph and on the paper scrolled header. One file covers every
placement on the page.

The circle is baked into the PNG and also set in CSS, and the gold hairline ring
and navy halo around it are CSS rather than artwork — so the ring can be tuned
per placement (it is stronger in the footer, where the halo has no cream to sit
against). iOS is the one exception to "one file": it paints black behind PNG
transparency, so the home-screen icon is a separate opaque square,
`images/apple-touch-icon.png`. Details in `images/README.md`.

---

## Customising

### Change the brand text

| What                                          | Where                                                                  |
|-----------------------------------------------|------------------------------------------------------------------------|
| Page title, meta description, OG/Twitter tags | `<head>` of `index.html`                                               |
| Structured data (legal name, address, slogan) | the JSON-LD `<script>` in `<head>`                                     |
| The visible `11:11` wordmark                  | 3 places — header, `.mobile-nav__head`, footer                         |
| The line *Where moments become legend* | hero `<h1>`, `#cta-title`, footer `.site-footer__tagline` — plus the hero eyebrow and the two `.hero__lede` paragraphs around it |
| Tagline *Where Rare Venues Meet Exceptional Talent* | `slogan` in the JSON-LD and the OG/Twitter descriptions only — it no longer appears in the visible page |
| Badge sub-text *Bespoke Occasions & Curation* | header `.logo__sub`, `.cta__eyebrow`                                   |
| Registered name under the footer wordmark     | `.site-footer__name`                                                   |
| The footer's "OMG! moments" paragraph         | `.site-footer__note--brand`                                            |
| Contact details, address and hours            | `.contact__details` block — and `telephone` / `email` in the JSON-LD   |
| Legal entity in the copyright line            | `.site-footer__bar`                                                    |

### Change the colours

Three of these are **the client's own brand values**, confirmed in the brief:
Midnight Navy, Champagne Gold (with Metallic Gold as its secondary), and Warm
Cream. Everything else is derived from them. All of it lives as custom
properties at the top of `css/style.css`, section **01. Design tokens**:

```css
:root {
  --paper:      #FDFBF7;   /* page background — warm cream        (client) */
  --paper-alt:  #F2ECE0;   /* alternating section background      (derived) */
  --gold:       #D4AF37;   /* accent: rules, bullets, numerals    (client) */
  --gold-metal: #C5A059;   /* secondary metallic gold             (client) */
  --gold-deep:  #7F6220;   /* the one gold dark enough for light  (derived) */
  --gold-bright:#E8C86A;   /* the one gold light enough for photos (derived) */
  --navy:       #0A1128;   /* headings, buttons, the process band (client) */
  --navy-deep:  #05080F;   /* the footer, one step deeper         (derived) */
  --white:      #FFFFFF;
}
```

Two shadow tokens sit alongside them — `--shadow-soft` and `--shadow-lift` —
both cast in navy rather than black, because a grey shadow on warm cream reads
as dirt while a navy one reads as depth. Soft is the resting state for anything
raised off the page (the service cards, the framed photographs); lift is the
same shadow opened up, so a hover is one shadow growing rather than a second
effect arriving.

Alongside them sit three channel triplets — `--navy-rgb`, `--paper-rgb`,
`--gold-rgb` — so that every translucent overlay and hairline further down the
file can be written `rgb(var(--navy-rgb) / 0.45)` instead of restating a brand
colour by hand. **Nothing outside this block hardcodes a colour.** If you change
a hex, change its triplet too.

Below these sit *semantic* roles. Text uses a deliberate three-step scale, and
**every step clears WCAG AA (4.5:1) on both light backgrounds** — measured with
the WCAG formula, not estimated:

| Role        | On paper | On alt |
|-------------|----------|--------|
| `--heading` | 18.1:1   | 15.9:1 |
| `--text`    | 8.5:1    | 7.5:1  |
| `--muted`   | 6.1:1    | 5.3:1  |

⚠️ `--accent` (the champagne gold) is **decorative only on light backgrounds** —
rules, bullets, the dashes in the boundaries list. It measures **2.0:1** on
paper and 1.8:1 on the alt band, both unreadable. This is a step *worse* than
the gold it replaced, so the rule bites more often than it used to. Use
`--gold-deep` (5.5:1 on paper, 4.9:1 on alt) wherever a gold has to carry words
**or** form a UI boundary — which is why the required-field asterisk and the
form input underlines are set in it rather than the brand gold.

On the **dark** bands the champagne gold is not just safe but strong: **8.9:1**
on `--navy` and 9.5:1 on `--navy-deep`; the process numerals, drawn at 85%
opacity, still measure 6.6:1. That band is the one place the brand colour gets
to be a colour rather than a hairline, which is why the eyebrow, the numerals
and the `.step__meta` labels all use it. If you change the palette, re-measure
every ratio above.

**The gold button.** One action on the site is gold: *start a brief*, wherever
it appears — hero, mobile menu, closing band, and the form's own submit.
`.btn--gold` fills with a 135° gradient across all three brand golds under navy
type, which measures 7.6:1 at the darkest stop, 8.9:1 at the brand gold and
11.5:1 at `--gold-bright`. Everything else stays an outline; a page where every
button is gold has no primary action at all.

A *photograph* is not a dark band, though, and that is what `--gold-bright` is
for. The word **LEGEND** in the hero and closing headings is gold over the two
hero/CTA images, where the champagne gold measures only **2.75:1** (hero) and
2.83:1 (CTA) against the brightest pixel behind the word — under the 3:1 floor
large text has to clear. Lifted toward paper, `--gold-bright` measures **3.55:1**
and **3.66:1** in the same two places. It sets the same word in the footer too,
where on `--navy-deep` it measures 12.3:1 — the brand gold would also have been
safe there (9.5:1), but one word should not be two different golds on one page.

So: `--gold-bright` for gold *words* over imagery, `--gold-deep` for gold words
on cream, and the brand gold itself for dark solids and hairlines.

**The debut band and the booking page** added a fourth context: solid navy with
no photograph behind it, which is the most forgiving ground on the site.
`--gold-bright` is used there as an ordinary text colour — the countdown
numerals, the eyebrows, the early-bird price, the amount to pay — because it
measures **11.5:1** on `--navy`. Every ratio those two additions rely on,
measured with the same formula:

| Where | Colours | Ratio |
|-------|---------|-------|
| Countdown numerals, debut/booking eyebrows, pay amount | `--gold-bright` on `--navy` | 11.5:1 |
| Debut band and booking-head body copy | paper at 78% on `--navy` | 11.2:1 |
| Early-bird card ground (gold at 16% over navy, `#2A2A2A`) | `--paper` on it | 13.9:1 |
| …the same ground | `--gold-bright` on it | 8.8:1 |
| "Save ₹3,000" pill, both pages | `--navy` on `--gold` | 8.9:1 |
| Tier cards, step numerals, summary rail | `--heading` on `--surface` | 18.7:1 |
| Tier card notes | `--text` on `--surface` | 8.8:1 |
| Tier flags, summary labels, QR caption | `--muted` on `--surface` | 6.3:1 |
| The payment caution, the saving line, the step numerals | `--gold-deep` on `--surface` | 5.7:1 |

The debut event is deliberately loud in three places: the gold **announcement
bar** pinned above the header on every screen (the whole strip is one link, and
navy on its gradient measures 7.6:1 at the darkest stop), the **hero strip**
above the buttons (`#0B1226` ground so its date and price never depend on the
photograph behind them — `--paper` 18.0:1, `--gold-bright` 11.4:1), and the
`#debut` band itself. The header's gold *Tickets* button was removed when the
bar arrived; two gold things in 90px of screen is no primary action at all.

The one trap worth naming: the header rule `.site-header .btn { color: var(--paper) }`
is more specific than `.btn--gold`'s own foreground, so the gold *Tickets*
button in the header would have been repainted cream on gold — about **1.6:1**,
unreadable. Section 06 carries an explicit override putting it back to navy in
every header state. Any future gold button in the header needs the same.

### Change the typography

1. Swap the Google Fonts `<link>` in `index.html`.
2. Update these tokens in `css/style.css`:

```css
--font-display: "Cormorant Garamond", "Times New Roman", Times, serif;
--font-body:    "Montserrat", "Segoe UI", system-ui, -apple-system, sans-serif;
```

Sizes are `clamp()`-based tokens (`--fs-h1`, `--fs-h2`, `--fs-body`, …) in the
same block, so type scales fluidly between mobile and desktop without a single
media query.

Note that the `11:11` wordmark forces **lining figures**
(`font-variant-numeric: lining-nums`). Cormorant defaults to old-style figures,
which drop the `1`s to x-height and make the mark look like a typo. If you
change the display font, keep that declaration.

### Change the spacing rhythm

`--section-y` controls vertical section padding site-wide, `--container` the
maximum content width (1320px), `--container-pad` the side gutters.

---

## How you receive an enquiry

A static site cannot send email by itself — there is no server to do the
sending, so something has to receive the submission. There are two modes, and
which one runs depends entirely on one line in `js/script.js`, section
**07. Contact form**:

```js
var DELIVERY = {
  endpoint: '',                 // empty  → WhatsApp mode
  whatsapp: '919938120356'      // international format, digits only
};
```

### Mode 1 — WhatsApp (active now, nothing to sign up for)

`endpoint` is empty, so on submit the answers are formatted into a message and
WhatsApp opens with it already typed, addressed to the number above. The
visitor presses send and it arrives as an ordinary WhatsApp message.

The message is built from the form's own `<label>` and `<legend>` text, so it
stays correct when the fields are renamed or replaced — nothing hard-codes
today's field names. A submission looks like this:

```
New enquiry from the 11:11 website

Full Name & Organisation: Amaresh Nayak, Nayak Trust
Email: amaresh@example.com
Phone: +91 90000 11111
Client Type: Trust
Projected Budget: ₹15L+
Target Date: 2027-02-14
Preferred Location: Konark, Odisha
Estimated Guest Count: 80
Event Intent: Private concert, Cultural showcase

Artist or Venue Vision:
A classical set at dusk, ideally somewhere with old stone.
```

Note the `Event Intent` line: the checkbox group is gathered into one line keyed
by its `<legend>`, and boxes are filtered on `checked` rather than on emptiness,
because an unticked checkbox still carries its `value`.

Two things to know. The visitor **must press send** in WhatsApp — if they stop
there, you never see the enquiry. And if a popup blocker stops WhatsApp from
opening, the success panel shows an "Open WhatsApp" button carrying the same
message, with the form left filled in behind it.

### Mode 2 — Email, via a form service

Paste a URL into `endpoint` and this takes over automatically; the WhatsApp
path is bypassed.

- **Formspree** — create a form at [formspree.io](https://formspree.io), copy
  the endpoint, paste it in. Submissions are forwarded to whatever inbox you
  registered. The free tier covers roughly 50 a month.
- **Netlify Forms** — deploy to Netlify and add `netlify` and `name="inquiry"`
  to the `<form>` element in `index.html`; Netlify captures the POST itself.
- **Your own API** — same as Formspree, pointing at your URL.

### Worth knowing either way

Both modes put the enquiry in front of you; **neither stores it**. If you want
a searchable record rather than a message you might lose, use a service that
keeps submissions.

Whichever you choose, **validate on the server as well** — the checks in
`js/script.js` are a convenience for the visitor, never a security boundary.

**Whichever you use, validate on the server as well.** Client-side validation is
a convenience for the visitor, not a security boundary — anyone can bypass it.
You'll also want spam protection, and since you're collecting personal data from
Indian residents you'll need a privacy notice covering what you collect, why,
how long you keep it, and how someone asks for deletion (DPDP Act 2023).

---

## Deploying

Fully static, so any host works. Nothing to build, nothing to configure.

- **Netlify** — drag the folder onto [app.netlify.com/drop](https://app.netlify.com/drop).
- **GitHub Pages** — push, then Settings → Pages → deploy from `main` / root.
- **Vercel** — `vercel` in the project directory. Framework preset: "Other".
- **Cloudflare Pages** — connect the repo, empty build command, output `/`.
- **Traditional hosting** — upload `index.html`, `css/`, `js/`, `images/` over FTP.

### Pre-launch checklist

- [x] Real email and phone published — `.is-placeholder` spans all removed
- [x] Enquiry delivery connected — WhatsApp mode, `+91 99381 20356`
- [x] `telephone` and `email` added to the JSON-LD block
- [x] Add the logo — the client's monogram, circular, as `images/logo.png`
- [x] Add a favicon — uses the badge
- [x] Testimonials removed rather than published invented
- [x] Portfolio relabelled as a reference board (pre-launch, no real work yet)
- [ ] Decide whether to stay on WhatsApp or add an email endpoint as well
- [ ] Send a test enquiry from a phone and confirm it arrives
- [ ] Replace the Pexels photography with your own (`images/README.md`)
- [ ] Rewrite every `alt` attribute to describe your actual images
- [ ] Swap `images/logo.png` for the vector artwork (SVG/EPS) if it turns up
- [x] ~~Confirm the domain, then add `url` to the JSON-LD block~~ — done, `elevennelevenn.in`
- [x] ~~Update `og:image` / `twitter:image` to absolute URLs on that domain~~ — done
- [ ] Confirm which inbox the enquiry form should route to — `enquiries@1111events.in`
      is on a third domain the site has never used
- [ ] Point the Pinterest link at a real profile, or delete it (currently `#`)
- [ ] Add a privacy notice before the contact form goes live
- [ ] Confirm the copyright year in the footer

---

## Browser support

Modern evergreen browsers — Chrome, Edge, Firefox, Safari, and their mobile
counterparts. The layout uses CSS Grid, `clamp()`, `aspect-ratio`, and custom
properties, all broadly available since 2021.

Graceful degradation is built in:

- No JavaScript → all content is visible (the `no-js` / `js` class swap); only
  the reveal animations and mobile menu are lost.
- No `IntersectionObserver` → everything reveals immediately.
- No `100svh` support → falls back to `100vh`.
- `prefers-reduced-motion: reduce` → animations and smooth scrolling disabled.

Verified at 320, 375, 768, 1024, and 1440px — `scrollWidth` equals `clientWidth`
at every one, so there is no horizontal scroll anywhere.

Text over both photographs clears WCAG AA by **worst-pixel** measurement, taken
by hiding the text, screenshotting the bare background, and finding the least
favourable pixel inside each element's box:

| Over the hero | Ratio | | Over the CTA band | Ratio |
|---------------|-------|-|-------------------|-------|
| Eyebrow       | 10.3:1| | Eyebrow           | 9.3:1 |
| Headline      | 6.4:1 | | Heading           | 5.8:1 |
| "LEGEND", gold| 4.1:1 | | "LEGEND", gold    | 3.7:1 |
| Lede          | 5.9:1 | | Body              | 10.3:1 |
| Second lede   | 6.5:1 | |                   |       |
| Button        | 11.4:1| | Button            | 15.0:1|
| Link          | 8.8:1 | |                   |       |

The hero overlay has been re-tuned twice for its image. Against the chamber
concert it replaced, the lede once measured 3.2:1 at the alphas from the crowd
shot before it — a real failure, not a marginal one. The client's crest artwork
that now sits there is brighter still behind the headline, so the alphas went up
another two points; the gold word LEGEND is the binding constraint, since it is
gold type on gold feathers. If you change either image, re-measure all of these;
the exact method, including how to composite translucent text before measuring
it, is in the comment on `.hero__media::after`.

---

## Licence and credits

Site code belongs to Elevenn Elevenn Archive Pvt Ltd. Reference photography
from [Pexels](https://pexels.com) under the
[Pexels License](https://pexels.com/license) — free for commercial use, no
attribution required, but replace them with real work before launch. Fonts are
[Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) and
[Montserrat](https://fonts.google.com/specimen/Montserrat), both SIL Open Font
License.
