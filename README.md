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
| Email          | concierge@1111events.in  (enquiry routing inbox: enquiries@1111events.in)                            |
| Phone & WhatsApp | +91 99381 20356 — the concierge desk line, one number for both                                      |
| Address        | Plot No. 30 & 30/982, Odyssa Business Centre, Bomikhal, Rasulgarh Square, Bhubaneswar, Odisha 751010 |
| Hours          | Monday – Saturday, 10:00 – 19:00 IST                                                                 |

---

## ⚠️ What still has to change before launch

The contact details are now real, which was the biggest of these. Four things
are still outstanding:

1. **Photography — all twelve images are Pexels stock.** They were chosen to
   match the register the company works in (heritage courtyards, candlelit
   chamber concerts, a lone artist under a spotlight), but they are other
   people's photographs of other people's events. Replace with your own work as
   it exists — see `images/README.md`.

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

Two smaller open items:

- **The site's own domain is unconfirmed**, so `url` is still omitted from the
  structured data and `og:image` / `twitter:image` still point at Pexels rather
  than at an absolute URL on your domain. `telephone` and `email` are now filled
  in with the real values.
- **The concierge line is the only number on the site now.** It is both the
  phone and the WhatsApp account, so the two contact rows were merged into one.
  The older `+91 95915 09910` is no longer published — say the word if it is
  still in use and should come back.

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
| Formats        | The three production tiers, the pricing floor and booking terms, and an explicit *what we do not do* block. |
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
├── index.html          All markup and the image URLs
├── css/
│   └── style.css       All styling, organised into numbered sections
├── js/
│   └── script.js       All behaviour, organised into 7 numbered sections
├── images/
│   ├── logo.png        The brand badge — header, menu, footer, favicon
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
are served from Pexels. See `images/README.md` to switch to local files.

---

## The logo

**Installed.** `images/logo.png` — the crowned winged-lion badge — now appears in
the header, the mobile menu, the footer, and as the favicon, paired with the
`11:11` wordmark still set in live text.

Because the badge carries its own dark background and gold frame, it needs none
of the light/dark pairing a flat single-colour mark would have: it reads
correctly both over the hero photograph and on the paper scrolled header. One
file covers every placement.

⚠️ The current file is **100 × 100**, recovered from the Instagram profile
picture — soft on high-density screens, and already square-cropped by Instagram
so the small line of text below `11:11` in the original artwork is cut off.
Replace it with the original artwork (SVG, or PNG ≥ 400 × 400) and every
placement updates with no markup or CSS change. Details in `images/README.md`.

---

## Customising

### Change the brand text

| What                                          | Where                                                                  |
|-----------------------------------------------|------------------------------------------------------------------------|
| Page title, meta description, OG/Twitter tags | `<head>` of `index.html`                                               |
| Structured data (legal name, address, slogan) | the JSON-LD `<script>` in `<head>`                                     |
| The visible `11:11` wordmark                  | 3 places — header, `.mobile-nav__head`, footer                         |
| Tagline *Where Rare Venues Meet Exceptional Talent* | hero `<h1>`, `#cta-title`, footer `.site-footer__tagline`, and `slogan` in the JSON-LD |
| Badge sub-text *Bespoke Occasions & Curation* | header `.logo__sub`, `.cta__eyebrow`                                   |
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
  --navy:       #0A1128;   /* headings, buttons, the process band (client) */
  --navy-deep:  #05080F;   /* the footer, one step deeper         (derived) */
  --white:      #FFFFFF;
}
```

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
- [x] Add the logo — installed as `images/logo.png`
- [x] Add a favicon — uses the badge
- [x] Testimonials removed rather than published invented
- [x] Portfolio relabelled as a reference board (pre-launch, no real work yet)
- [ ] Decide whether to stay on WhatsApp or add an email endpoint as well
- [ ] Send a test enquiry from a phone and confirm it arrives
- [ ] Replace the Pexels photography with your own (`images/README.md`)
- [ ] Rewrite every `alt` attribute to describe your actual images
- [ ] Swap `images/logo.png` for the confirmed vector artwork (SVG/EPS)
- [ ] Confirm the domain, then add `url` to the JSON-LD block
- [ ] Update `og:image` / `twitter:image` to absolute URLs on that domain
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
| Eyebrow       | 6.1:1 | | Eyebrow           | 9.3:1 |
| Headline      | 5.1:1 | | Heading           | 5.8:1 |
| Lede          | 4.8:1 | | Body              | 10.3:1 |
| Button        | 12.9:1| | Button            | 15.0:1|
| Link          | 16.1:1| |                   |       |

The hero overlay had to be darkened to get there. The photograph behind it is
now a chamber concert under pale stone, and at the alphas tuned for the previous
darker image the lede measured 3.2:1 — a real failure, not a marginal one. If
you change either photograph, re-measure all of these; the exact method is in
the comment on `.hero__media::after`.

---

## Licence and credits

Site code belongs to Elevenn Elevenn Archive Pvt Ltd. Reference photography
from [Pexels](https://pexels.com) under the
[Pexels License](https://pexels.com/license) — free for commercial use, no
attribution required, but replace them with real work before launch. Fonts are
[Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) and
[Montserrat](https://fonts.google.com/specimen/Montserrat), both SIL Open Font
License.
