# What's left to do

Last updated: 10 September 2026. Live at https://anivpage.vercel.app

All seven pages are built, deployed, and running on your real content. The date
form emails for real, the stickers are written, and the site has been tapped
through on a phone. **The letter is the only thing standing between this and
finished.**

---

## Blockers

Things the gift genuinely doesn't work without.

### 1. Write the letter

`content/letter.md` still contains `lorem ipsum` and keyboard mash. `/letter` is
the one page that is nothing but text, so it's currently the weakest page on the
site by a wide margin — and now the only unfinished one.

Leave a blank line between paragraphs — that's what makes a new paragraph.

---

## Content — worth doing, won't stop the gift working

### 2. Captions for the album

All 52 photos are in and laid out, but every caption is still blank. They're
optional — the album reads fine without them — but a line on the handful that
have a story is the difference between a gallery and an album.

Open `content/album.json` and fill in the `"caption"` for the ones worth it.

### 3. Thin spots in the date ideas

The list is at 20 ideas over 6 moods × 3 locations × 3 budgets, so most exact
combinations still have no match. The form never fails — it relaxes to
two-out-of-three, then one — but she can answer three questions and get
something that ignores them.

`lazy` is most of the reason: it still has exactly **one** idea in it (indoor,
cheap), so Lazy + Outdoors, or Lazy at any higher budget, can never match
properly. `cozy` has two, and both are `low`. `treat ourselves` is thin
generally.

Two or three more `lazy` ideas would fix the worst of it.

### 4. Optional: better originals for 29 of the photos

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

### 5. Optional: shrink the screensaver files

Seven of the nine are 700–900 KB (about 6.2 MB for the folder); `manzanas.jpg`
and `manzanas_noche.jpg` are already fine at 135–175 KB. They're inefficiently
encoded rather than too large — the same pictures should sit around 150–250 KB.

Not urgent: the site resizes and re-encodes what it actually sends, so she never
downloads the originals. Worth a pass through https://squoosh.app sometime.

---

## Settled — don't undo these by accident

**The seven route names are now permanent.** The stickers are written and can't
be rewritten from in here. Renaming `album`, `letter`, `date`, `postits`,
`surprise`, `screensavers`, or moving `public/bouquet-studio.html`, kills the
sticker that points at it. See `DEV_GUIDE.md` section 8.

**`/testpush` stays.** It was built to prove that pushing triggers a rebuild, it
did, and it's now kept on purpose as an unlisted easter egg — no sticker points
at it and nothing links to it. Earlier versions of this file said to delete it
before the stickers went out; that no longer applies.

---

## Done

- All seven pages built, styled to one shared theme, and deployed
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
