# What's left to do

Last updated: 12 September 2026. Live at https://anivpage.vercel.app

All eight pages are built, deployed, and running on your real content. The
letter is written, the album is captioned, the date list has been filled out,
the form emails for real, all eight stickers are written, and the site has been
tapped through on a phone.

**Nothing is blocking any more. The gift is done.** What's below is polish.

---

## Content — worth doing, won't stop the gift working

### 1. Five album captions

47 of the 52 photos have captions. These five don't, and may not need one:

`photo-22`, `photo-28`, `photo-29`, `photo-42`, `photo-45`

Open `content/album.json` and fill in the `"caption"` if they have a story.

### 2. Thin spots in the date ideas

The list is at **29 ideas** over 6 moods × 3 locations × 3 budgets, up from 20.
The form never fails — it relaxes to two-out-of-three, then one — but 19 of the
36 combinations she can actually answer still have no exact match, so she can
answer three questions and get something that ignores one of them.

Two moods are most of the reason, both sitting at **2 ideas**:

- `lazy` — both `indoor` + `low`, so **every** Lazy + Outdoors answer misses,
  and so does Lazy at any budget above cheap.
- `cozy` — one indoor, one outdoor, but both `low`.

`treat ourselves` is thin generally: 4 ideas across all six moods, and none at
all under `silly`, `calm` or `lazy`.

A couple of `lazy` outdoor ideas and a `cozy` one above `low` would fix the
worst of it.

### 3. Optional: better originals for 29 of the photos

Photos `photo-01` to `photo-29` came in as thumbnails — most under 500 pixels
wide, the smallest 143. They have since been **normalized**: doubled in size by
`scripts/upscale-photos.mjs`, with nothing pushed past 1280 pixels, which is the
size the other 23 already are. The originals are kept untouched in
`photos-originals/`, which is outside `public/` and so never part of the site.

That makes them open bigger on a phone, but enlarging cannot put back detail
that was never in the file. **If you ever find the full-size originals, they
still beat this.** Drop them into `public/photos/` under the same names, delete
those names from `photos-originals/`, and push — no JSON or code changes. See
`DEV_GUIDE.md` section 3.

### 4. Optional: shrink the screensaver files

Seven of the nine are 700–900 KB (about 6.2 MB for the folder); `manzanas.jpg`
and `manzanas_noche.jpg` are already fine at 135–175 KB. They're inefficiently
encoded rather than too large — the same pictures should sit around 150–250 KB.

Not urgent: the site resizes and re-encodes what it actually sends, so she never
downloads the originals. Worth a pass through https://squoosh.app sometime.

---

## Settled — don't undo these by accident

**The route names are permanent.** The stickers are written and can't be
rewritten from in here. Renaming `album`, `letter`, `date`, `postits`,
`surprise`, `screensavers`, `guide`, or moving `public/bouquet-studio.html`,
kills the sticker that points at it. See `DEV_GUIDE.md` section 8.

**All eight route names are now permanent.** `/guide` got its sticker too, so
it joins the other seven: renaming `app/guide/` now kills a real sticker
(`DEV_GUIDE.md` section 8).

**`/testpush` stays.** It was built to prove that pushing triggers a rebuild, it
did, and it's now kept on purpose as an unlisted easter egg — no sticker points
at it and nothing links to it. Earlier versions of this file said to delete it
before the stickers went out; that no longer applies.

---

## Done

- All eight pages built, styled to one shared theme, and deployed
- **`/guide`** — the page for the two iPhone shortcuts, **finished and filled
  in**: a download card each (Candle and Photo, with their real iCloud links and
  icons), then four numbered steps with screenshots walking her through building
  the NFC automation. The screenshots open full screen and swipe through as a
  set. Driven by `content/guide.json`; it still renders marked placeholders for
  anything left blank, so steps can be added later without code
- **Lightbox captions no longer sit on top of the picture.** An upright phone
  screenshot reaches the bottom of the screen, so the caption was landing on the
  part of the image it described. It now reserves its own space. This also fixes
  `/album` in advance, for whenever those captions get filled in
- **The stickers are written** — all seven, one address each
- **Tapped through on a phone**, on a device close to the target's, including
  `/bouquet`, the one page whose cost is the phone's graphics rather than a
  download
- **Titles and copy passed over**, with the shared `PageShell` wording settled
- **Screensavers** — 9 real images in, grid reshaped to match their wide format,
  one per row on a phone
- **Album** — 52 photos in, laid out as a masonry wall so nothing is cropped
- **Post-it wall** — 34 messages, up from 4
- **Date ideas** — 20 ideas, and the `lazy` mood now appears in the form
- **`/bouquet`** — the 3D flower studio, recoloured to the site's palette, tuned
  to open fast on mobile data, and now seeded from the day of the month plus
  (if she says yes) roughly where she is, so it opens differently each time
- **The date form sends for real** — Formspree endpoint set locally and on
  Vercel, and tested end to end
- **Album photos normalized** — the 29 small ones enlarged up to 2× so the
  album no longer opens half tiny, half full screen
- Vercel connected to GitHub: pushing to `main` deploys on its own
- `DEV_GUIDE.md` written, for editing content later without help
