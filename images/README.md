# Images

This folder holds the site's brand assets and photography.

- **`logo.png`** — the brand badge. Installed and in use.
- Photography — still ten Unsplash placeholders loaded over the network, so the
  site looks finished the moment you open `index.html`.

One job left here: **replace the placeholder photography**. And one asset to
upgrade: see the resolution warning below.

---

## 1. The logo

### What is installed

`logo.png` is the crowned winged-lion badge — a square, deep-navy panel with a
gold art-deco frame and `11:11` set beneath the mark.

Because the badge **carries its own background**, it needs none of the
light/dark pairing a flat single-colour mark would. The header is transparent
over the hero photograph on load and switches to ivory once you scroll, and the
badge reads correctly on both. One file covers every placement.

### Where it appears

| Placement            | Element                                    | Size |
|----------------------|--------------------------------------------|------|
| Header, top-left     | `.logo__badge`, beside the `11:11` wordmark | 34–44px |
| Mobile menu panel    | `.logo__badge--sm`                          | 32px |
| Footer               | `.logo__badge--footer`, above the wordmark  | 52–64px |
| Favicon / touch icon | `<link rel="icon">` in `<head>`             | 100px |

In every placement the badge is `alt=""` and `aria-hidden`, because the `11:11`
wordmark next to it already carries the name — without that, a screen reader
would announce the brand two or three times over.

### ⚠ Replace this file when you can

`logo.png` is **100 × 100** — it was recovered from the Instagram profile
picture, which is the only size that endpoint serves. Two consequences:

1. **It will look soft on high-density screens.** A 44px slot on a 3× phone
   wants roughly 132px of real pixels; a retina desktop favicon wants 180px.
2. **It is already square-cropped.** Instagram cropped the original artwork to
   fit a circle, so anything that sat above or below the badge is gone — the
   line of small text under `11:11` is cut off mid-height.

Drop the original artwork in as `images/logo.png` and everything picks it up
with **no markup or CSS change** — the badge is boxed with `object-fit: cover`,
so even a non-square replacement will sit correctly rather than distort.

- **SVG** is ideal if the artwork exists as vector. Rename the `<img>` `src` to
  `logo.svg`; nothing else changes.
- **PNG** should be at least 400 × 400. Keep it square.

### Still to do: the social share image

`og:image` and `twitter:image` in `<head>` still point at an Unsplash wedding
photograph. They need an **absolute** URL on your own domain to work when the
link is shared, so they cannot be pointed at `images/logo.png` as a relative
path:

```html
<meta property="og:image" content="https://yourdomain.in/images/og-share.jpg">
```

A 1200 × 630 landscape composition works better here than the square badge —
most platforms crop a square awkwardly at that ratio.

---

## 2. Replacing the photography

### Why placeholders live on Unsplash for now

Unsplash serves images over a fast CDN and resizes on the fly via URL
parameters (`w=`, `q=`, `fit=crop`), which keeps the repository small while the
design is reviewed. Every one of the ten was visually checked — they are all
genuine wedding photography.

⚠️ These are **other people's weddings**, free under the
[Unsplash License](https://unsplash.com/license). Replace them with your own
work before using this site commercially, and make sure you have permission
from the couples pictured.

### Where the images are referenced

All ten are in `index.html`, each marked with a numbered comment
(`<!-- IMAGE 4 of 10 -->`). There are no image URLs in the CSS, so
`index.html` is the only file you need to edit.

| #  | Section   | Subject                          | Suggested filename          |
|----|-----------|----------------------------------|-----------------------------|
| 1  | Hero      | Couple at golden hour w/ bouquet | `hero.jpg`                  |
| 2  | About     | Couple walking, portrait crop    | `about-main.jpg`            |
| 3  | About     | Held hands, small inset image    | `about-inset.jpg`           |
| 4  | Portfolio | Ceremony aisle and florals       | `portfolio-ceremony.jpg`    |
| 5  | Portfolio | Bridal bouquet                   | `portfolio-florals.jpg`     |
| 6  | Portfolio | Couple portrait                  | `portfolio-couple.jpg`      |
| 7  | Portfolio | Banquet tablescape               | `portfolio-tablescape.jpg`  |
| 8  | Portfolio | Reception string lights          | `portfolio-reception.jpg`   |
| 9  | Portfolio | Wedding shoes detail             | `portfolio-details.jpg`     |
| 10 | CTA band  | Black-and-white veil portrait    | `cta.jpg`                   |

The hero, one portfolio image, and the CTA image also use `srcset` for
responsive loading. If you switch to local files you can either provide `-800`
and `-1600` variants, or delete the `srcset` and `sizes` attributes and keep
the single `src`.

### How to swap one in

1. Save your image into this folder, e.g. `images/hero.jpg`.
2. Find the matching `<!-- IMAGE n of 10 -->` comment in `index.html`.
3. Change the `src`. The path is **relative to `index.html`**, so it starts
   with `images/`, not `/images/`:

   ```html
   <!-- before -->
   <img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=80" ...>

   <!-- after -->
   <img src="images/hero.jpg" ...>
   ```

4. Delete the `srcset` and `sizes` attributes if you are not providing multiple
   sizes.
5. **Rewrite the `alt` text** to describe your actual photograph. The existing
   alt text describes the placeholder and would be wrong — and actively
   misleading to screen reader users — if left in place.
6. If you replace the hero image, also update the `<link rel="preload">` in
   `<head>` and the `og:image` / `twitter:image` meta tags, which still point
   at the old URL. Open Graph images need an **absolute** URL
   (`https://yourdomain.in/images/hero.jpg`) to work when shared on WhatsApp,
   Instagram, or Facebook.

### Recommended export settings

| Use        | Longest edge | Format      | Target size  |
|------------|--------------|-------------|--------------|
| Hero / CTA | 2000 px      | JPEG q75–80 | under 350 KB |
| Portfolio  | 1200 px      | JPEG q75–80 | under 200 KB |
| About      | 900 px       | JPEG q75–80 | under 150 KB |

WebP or AVIF roughly halves those numbers on modern browsers. Every image uses
`object-fit: cover`, so photos crop gracefully at any aspect ratio — but
portrait originals work best for the About and tall portfolio slots, and
landscape for the hero and CTA.

Watch the **focal point**: `object-position` is `center 42%` on the hero and
`center 40%` on the CTA so faces sit above the overlay text. Adjust those in
`css/style.css` if your crop needs it.

### A note on colour

Portfolio images get a light grade in CSS (`saturate(0.74) contrast(1.03)` plus
a warm wash that lifts on hover) so photos from different shoots read as one
set. If your own photography is already consistently graded, you may want to
dial this back — it's the `.shot__frame img` rule in `css/style.css`.
