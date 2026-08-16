# Images

This folder holds the site's brand assets and photography.

- **`logo.png`** — the brand badge. Installed and in use.
- Photography — twelve Pexels placeholders of Indian and Odia celebrations, loaded
  over the network, so the site looks finished the moment you open
  `index.html`.

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

`og:image` and `twitter:image` in `<head>` now point at the Pexels hero
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

### Why placeholders live on Pexels for now

Pexels serves images over a fast CDN and resizes on the fly via URL parameters
(`w=`, `auto=compress`), which keeps the repository small while the design is
reviewed. Every one of the twelve was **opened and looked at** before being used —
none were chosen from a search result label alone.

The photography has been re-chosen twice, following the business. The first
build used Unsplash pictures of Western weddings; those were replaced with
Indian and Odia celebration photography — haldi, puja, marigold, dhol players.
When the client confirmed the business is a **premium experiential agency**, not
a general event company, that set became wrong too: marigolds, mehndi, students
and trophies all read as exactly the mass-market work the company turns down.

The current twelve are chosen for the register the brief describes — rare and
off-market venues, hand-picked artists, intimate audiences: a chamber concert
under stone arches, a candlelit performance in a historic church, heritage
courtyards in sandstone and marble, a lone artist under a spotlight, a sitar on
a velvet chair, a ballroom in candelabra light. Two are specifically Odia and
survive from the previous set: the Odissi dancer and the Konark Sun Temple
wheel. Every one was **opened and looked at** before being used, and every URL
was checked for a `200` — none were chosen from a search-result label alone.

⚠️ These are still **other people's events**, free under the
[Pexels License](https://pexels.com/license) — commercial use is allowed and no
attribution is required, which is more permissive than Unsplash. Replace them
with your own work anyway. That matters more than usual here: the client is
pre-launch, so the section holding most of them is labelled a reference board
rather than a portfolio. Strangers' events presented as your work is a claim you
cannot back up.

### Where the images are referenced

All twelve are in `index.html`, each marked with a numbered comment
(`<!-- IMAGE 4 of 12 -->`). There are no image URLs in the CSS, so
`index.html` is the only file you need to edit.

| #  | Section    | Subject                                        | Pexels ID  | Suggested filename        |
|----|------------|------------------------------------------------|------------|---------------------------|
| 1  | Hero       | Chamber concert under historic stone arches    | `15949379` | `hero.jpg`                |
| 2  | About      | Candlelit performance in a historic church     | `37443989` | `about-main.jpg`          |
| 3  | About      | Sitar resting on a blue velvet chair           | `31168773` | `about-inset.jpg`         |
| 4  | Atmosphere | Sandstone heritage courtyard                   | `33726143` | `atmos-venue-courtyard.jpg` |
| 5  | Atmosphere | Lone classical musician under a spotlight      | `33753145` | `atmos-artist.jpg`        |
| 6  | Atmosphere | Marble courtyard ringed with carved arches     | `6651933`  | `atmos-venue-marble.jpg`  |
| 7  | Atmosphere | Ballroom with crystal candelabras              | `12689009` | `atmos-gala.jpg`          |
| 8  | Atmosphere | Band on a small stage in a low-lit bar         | `9419405`  | `atmos-concert.jpg`       |
| 9  | Atmosphere | Long tables set with candles after dark        | `38446275` | `atmos-table.jpg`         |
| 10 | Atmosphere | Odissi dancer in full costume                  | `14090681` | `atmos-cultural.jpg`      |
| 11 | Atmosphere | Konark Sun Temple chariot wheel                | `1721747`  | `atmos-heritage.jpg`      |
| 12 | CTA band   | Saxophonist and singer in a dim room           | `9419371`  | `cta.jpg`                 |

⚠️ **If you change the hero or CTA photograph, re-measure the text contrast.**
The overlay in `css/style.css` was originally tuned against a bright, high-key
scene; the current hero is a much darker interior, so there is headroom to bring
the overlay down if you want more of the photograph to show. A brighter
replacement would need more overlay, not less. The measured worst-pixel figures
are recorded in the comment on `.hero__media::after`.

The hero, three of the Atmosphere images, and the CTA image also use `srcset`
for responsive loading. If you switch to local files you can either provide
`-800` and `-1600` variants, or delete the `srcset` and `sizes` attributes and
keep the single `src`.

### How to swap one in

1. Save your image into this folder, e.g. `images/hero.jpg`.
2. Find the matching `<!-- IMAGE n of 12 -->` comment in `index.html`.
3. Change the `src`. The path is **relative to `index.html`**, so it starts
   with `images/`, not `/images/`:

   ```html
   <!-- before -->
   <img src="https://images.pexels.com/photos/19346381/pexels-photo-19346381.jpeg?auto=compress&cs=tinysrgb&w=1800" ...>

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
