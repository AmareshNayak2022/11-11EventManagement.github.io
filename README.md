# 11:11 — Wedding Coordination &amp; Planning

The marketing website for **Elevenn Elevenn Archive Pvt Ltd**, trading as **11:11**,
a wedding coordination, planning, and event design studio based in Bhubaneswar,
Odisha.

Built as a static site: three files, no build step, no dependencies, no server.

| Detail         | Value                                                                                                |
|----------------|------------------------------------------------------------------------------------------------------|
| Legal name     | Elevenn Elevenn Archive Pvt Ltd                                                                      |
| Marketing name | 11:11                                                                                                |
| Tagline        | It Is Time                                                                                           |
| Address        | Plot No. 30 & 30/982, Odyssa Business Centre, Bomikhal, Rasulgarh Square, Bhubaneswar, Odisha 751010 |

---

## ⚠️ Placeholders that must be replaced before launch

This is a real company, so the demo content left in the build is a liability,
not a harmless stand-in. Four things need your attention:

1. **Contact details.** WhatsApp is real (`+91 95915 09910`). The email and the
   phone are still visible placeholders (`hello@yourdomain.in`,
   `+91 XXXXX XXXXX`) carrying a dotted underline via the `.is-placeholder`
   class. They were **not** filled with plausible-looking invented values,
   because a wrong number on a live site sends real enquiries to a stranger.
   Replace them in the `.contact__details` block in `index.html`, then delete
   the `is-placeholder` spans. If the WhatsApp number is also the number to
   call, point the Phone row at it with a `tel:` link.

2. **Testimonials.** All three are invented. Publishing fabricated reviews under
   a real company name is a genuine legal and reputational risk under both
   consumer-protection rules and platform policies. Either replace them with
   real, permissioned quotes from actual couples, or delete the whole
   `#testimonials` section. A visible disclaimer sits under them until you do.

3. **Photography.** All ten images are Unsplash placeholders of other people's
   weddings. Replace with your own work — see `images/README.md`.

4. **Portfolio labels.** "Bhubaneswar / Winter", "Puri / Spring" and the rest
   are illustrative, not real events.

Also still open: the structured data omits `telephone`, `email`, and `url`
rather than publishing invented values to Google. Add them once confirmed —
the exact lines are commented in the `<head>` of `index.html`.

---

## What's in it

| Section        | Notes                                                                        |
|----------------|------------------------------------------------------------------------------|
| Header         | Transparent over the hero, paper once you scroll. Sticky at all sizes.       |
| Hero           | Full-height photograph, layered overlay, animated scroll cue.                |
| About          | Two-image editorial composition with an overlapping inset.                   |
| Services       | Three hairline-divided columns with a rule that draws in on hover.           |
| Process        | Deep navy band, four steps numbered in the brand gold.       |
| Portfolio      | Six photographs on an asymmetric 12-column grid, staggered vertically.       |
| Testimonials   | Three placeholder quotes — see the warning above.                            |
| Call to action | Full-bleed image band, led by the *It Is Time* tagline.                      |
| Contact        | Eight-field inquiry form, validated client-side, delivered via WhatsApp.                   |
| Footer         | Four-column layout on the deepest navy, legal entity in the copyright bar.  |

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

You need an internet connection on first load — the ten placeholder photographs
are served from Unsplash. See `images/README.md` to switch to local files.

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
| Tagline *It Is Time*                          | header `.logo__sub`, `.cta__eyebrow`, footer `.site-footer__tagline`   |
| Address and hours                             | `.contact__details` block                                              |
| Legal entity in the copyright line            | `.site-footer__bar`                                                    |

### Change the colours

The palette is **sampled from the brand badge** in `images/logo.png` — a
gold-on-navy mark — rather than invented alongside it. Every colour is a custom
property at the top of `css/style.css`, section **01. Design tokens**:

```css
:root {
  --paper:     #F7F5F0;   /* page background — warm off-white */
  --paper-alt: #EBE6DB;   /* alternating section background */
  --gold:      #B08D4B;   /* accent: rules, bullets, quote marks */
  --gold-deep: #86682C;   /* the one gold dark enough for text on paper */
  --navy:      #16253C;   /* headings, buttons, the process band */
  --navy-deep: #0C1524;   /* the footer, one step deeper */
  --white:     #FFFFFF;
}
```

The gold is warm and low-chroma — a leafed, aged gold rather than a bright
yellow — because that is what the logo actually uses.

Below these sit *semantic* roles. Text uses a deliberate three-step scale, and
**every step clears WCAG AA (4.5:1) on both light backgrounds** — measured, not
estimated:

| Role        | On paper | On alt |
|-------------|----------|--------|
| `--heading` | 14.1:1   | 12.4:1 |
| `--text`    | 8.1:1    | 7.1:1  |
| `--muted`   | 5.8:1    | 5.1:1  |

⚠️ `--accent` (the gold) is **decorative only on light backgrounds** — rules,
bullets, quote marks. It measures **2.5:1** on the alt band, which is
unreadable. Use `--gold-deep` (4.8:1 on paper) if a gold has to carry words
there.

On the **dark** bands the plain gold is fine for text: 4.95:1 on `--navy` and
5.9:1 on `--navy-deep`. That is why the process band's eyebrow and its large
numerals are gold — it is the one place the brand colour can be used as a
colour rather than a hairline. If you change the palette, re-check every ratio
above.

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
  whatsapp: '919591509910'      // international format, digits only
};
```

### Mode 1 — WhatsApp (active now, nothing to sign up for)

`endpoint` is empty, so on submit the answers are formatted into a message and
WhatsApp opens with it already typed, addressed to the number above. The
visitor presses send and it arrives as an ordinary WhatsApp message.

The message is built from the form's own `<label>` text, so it stays correct
when the fields are renamed or replaced — nothing hard-codes today's
wedding-specific field names. A submission looks like this:

```
New enquiry from the 11:11 website

Name: Amaresh Nayak
Email: amaresh@example.com
Phone: +91 90000 11111
Services Interested In: Event Design

We are planning a launch night and want it to feel premium.
```

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

- [ ] Replace the placeholder email and phone, remove `.is-placeholder` spans
- [x] Enquiry delivery connected — WhatsApp mode, `+91 95915 09910`
- [ ] Decide whether to stay on WhatsApp or add an email endpoint as well
- [ ] Send a test enquiry from a phone and confirm it arrives
- [ ] Replace or delete the invented testimonials
- [ ] Replace the Unsplash photography with your own (`images/README.md`)
- [ ] Rewrite every `alt` attribute to describe your actual images
- [x] Add the logo — installed as `images/logo.png`
- [ ] Swap `images/logo.png` for the full-resolution original artwork
- [ ] Add `telephone`, `email`, and `url` to the JSON-LD block
- [ ] Update `og:image` / `twitter:image` to absolute URLs on your domain
- [ ] Replace the illustrative portfolio labels with real events
- [ ] Point the Instagram and Pinterest links at real profiles (currently `#`)
- [x] Add a favicon — uses the badge
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

Verified at 320, 375, 425, 768, 1024, and 1440px. No horizontal scroll at any
width, and text over both photographs clears WCAG AA by worst-pixel measurement.

---

## Licence and credits

Site code belongs to Elevenn Elevenn Archive Pvt Ltd. Placeholder photography
from [Unsplash](https://unsplash.com) under the
[Unsplash License](https://unsplash.com/license) — replace before commercial
use. Fonts are
[Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) and
[Montserrat](https://fonts.google.com/specimen/Montserrat), both SIL Open Font
License.
