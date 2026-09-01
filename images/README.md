# Images

This folder holds the site's brand assets and photography.

- **`logo.png`** — the brand badge, circular. Installed and in use.
- **`apple-touch-icon.png`** — the same artwork, opaque and square, for iOS.
- **`hero-900.jpg` / `hero-1400.jpg` / `hero-1600.jpg`** — the hero background:
  the client's own crest artwork, cropped. Installed and in use.
- Photography — eleven Pexels placeholders of Indian and Odia celebrations,
  loaded over the network, so the site looks finished the moment you open
  `index.html`. The hero is the twelfth image slot and is *not* a placeholder.

One job left here: **replace the placeholder photography**.

---

## 1. The logo

### What is installed

`logo.png` is the client's crowned `11:11` monogram — the gold `M` with a crown
above it and the colon between the numerals — on near-black, cropped to a
**circle at 512 × 512** with transparent corners. It was cut from the client's
`logo.jpeg`, centred on the mark, at a crop that leaves the mark filling about
73% of the circle: tighter and the crown grazes the edge, looser and the mark
turns to a speck in a 34px header slot.

The circle is baked into the file *and* set in CSS (`border-radius: 50%` on
`.logo__badge`), so a square replacement file still comes out round. The gold
hairline ring and the soft navy halo around it are CSS, not part of the
artwork — see the `.logo__badge` block in section 05 of `css/style.css`.

Because the badge **carries its own background**, it needs none of the
light/dark pairing a flat single-colour mark would. The header is transparent
over the hero photograph on load and switches to ivory once you scroll, and the
badge reads correctly on both. One file covers every placement.

### Where it appears

| Placement            | Element                                    | Size |
|----------------------|--------------------------------------------|------|
| Header, top-left     | `.logo__badge`, beside the `11:11` wordmark | 42–52px |
| Mobile menu panel    | `.logo__badge--sm`                          | 38px |
| Footer               | `.logo__badge--footer`, above the wordmark  | 64–80px |
| Favicon              | `<link rel="icon">` in `<head>`             | 512px source |
| iOS home screen      | `<link rel="apple-touch-icon">` → `apple-touch-icon.png` | 512px source |

In every placement the badge is `alt=""` and `aria-hidden`, because the `11:11`
wordmark next to it already carries the name — without that, a screen reader
would announce the brand two or three times over.

### Two files, and they are not interchangeable

iOS ignores PNG transparency on a home-screen icon: it applies its own mask and
paints **black** behind whatever is left, so a circle with transparent corners
comes out as a circle inside a black square. `apple-touch-icon.png` is therefore
the same 512 × 512 crop left opaque and square, and `<head>` points the two
`<link>` tags at different files on purpose. Replace both together or neither.

### Replacing the artwork

Both PNGs are raster crops of `logo.jpeg`, at 512 × 512 — comfortably sharp for
every placement here, the largest of which is 80px. If the original **vector**
artwork (SVG/EPS) turns up it is still worth installing:

- Export a square, circular-cropped PNG over `images/logo.png` at 512 × 512 or
  more, and a square opaque one over `apple-touch-icon.png`. No markup or CSS
  change is needed — the badge is boxed with `object-fit: cover`, so even a
  non-square replacement sits correctly rather than distorting.
- **SVG** works for the badge itself: rename the `<img>` `src` to `logo.svg` in
  the three places it appears. Keep a PNG for the icon `<link>` tags.

### The social share image

`og:image` and `twitter:image` in `<head>` point at the hero crest artwork, as
an **absolute** URL on the site's own domain:

```html
<meta property="og:image"
      content="https://elevennelevenn.in/images/hero-1600.jpg">
```

Absolute because a share preview is fetched by WhatsApp's or LinkedIn's servers,
not by the visitor's browser — a relative path means nothing there. The same URL
appears four times in total: `og:image` and `twitter:image` in **both**
`index.html` and `book.html`, plus `image` in the JSON-LD. Move them together.

Worth doing eventually: a purpose-made 1200 × 630 landscape composition. The
crest is 1600 × 770, close enough that platforms crop it tidily, but a share
image can carry the name and the line as well as the mark.

---

## 1b. The UPI payment QR

`upi-qr.png` (610×610) is the code shown in step 04 of `book.html`. It is a crop
of the payment slip the client supplied on 1 September 2026 — the QR square
plus its white quiet zone, with the slip's own wording cut away because that
wording is re-set as real HTML text beside it (legible at any size, and the UPI
ID can be selected and copied, which a picture of it cannot).

**This file and the `UPI_ID` constant at the top of `js/booking.js` are the same
account** — `elevennelevenne-26@idfcbank`, IDFC FIRST Bank, Elevenn Elevenn
Archive Private Limited. If the account ever changes, change both in the same
commit, or the page will show a code and an ID that disagree and money will go
to the wrong place.

Two things to preserve if you ever re-crop it: the white margin around the code
(a scanner needs that quiet zone, and the page ground is cream, which is why the
CSS puts the image on a white plate), and all three corner squares.

---

## 1c. The NOXUS campaign posters

Four files, two designs, supplied by the client on 1 September 2026 and resized
here from their 1024x1536 originals:

| File | Where it appears |
|------|------------------|
| `noxus-teaser-640.jpg` / `-1024.jpg` | The `#debut` band on `index.html`, beside the announcement |
| `noxus-passes-640.jpg` / `-1024.jpg` | Under the three passes on `book.html` |

Both are **portrait, 2:3**. That is why neither is used as the `og:image`: a
share preview is cropped to landscape and a tall poster loses its own headline
in the crop. The 11:11 crest stays the share image on both pages.

Every word on both posters is also set as **real text** in the page around them,
so the images are reinforcement rather than the only carrier of the information
— which is why their `alt` text is unusually long. If you swap in a new poster,
rewrite the `alt` to describe what the new one actually says; a stale
description of an image nobody can see is worse than none.

One thing to know before editing them: both posters carry **"It Is Time"** under
the 11:11 crest. That is the retired tagline, deliberately cropped out of the
hero artwork (see the note in `index.html`). It stays on the posters because
they are the client's own current creative — do not retouch their artwork, but
do not reintroduce the line into the site's own copy either.

---

## 2. Replacing the photography

### Why placeholders live on Pexels for now

Pexels serves images over a fast CDN and resizes on the fly via URL parameters
(`w=`, `auto=compress`), which keeps the repository small while the design is
reviewed. (The hero no longer works this way: it is the client's own artwork,
committed to this folder in three widths.) Every one of the placeholders was
**opened and looked at** before being used —
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
| 1  | Hero       | **The client's crest artwork — local, not stock** | —        | `hero-1600.jpg` and its 900/1400 variants |
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

⚠️ **If you change the hero or CTA image, re-measure the text contrast.** The
overlay in `css/style.css` has been re-tuned twice already, most recently for
the crest artwork: its pale wing feathers sit directly behind the headline, and
the gold word LEGEND is gold type on them, which is the binding constraint at
4.1:1 against a 3:1 floor. A brighter replacement needs more overlay, not less.
The measured worst-pixel figures are recorded in the comment on
`.hero__media::after`, along with the method.

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
   `<head>` (including its `imagesrcset`) and the `og:image` / `twitter:image`
   meta tags — in `book.html` as well as `index.html`. Those are **absolute**
   URLs on `https://elevennelevenn.in`, because a share preview is fetched by
   someone else's server and a relative path means nothing there.

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
