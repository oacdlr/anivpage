# What's left to do

Last updated: 8 September 2026. Live at https://anivpage.vercel.app

All seven pages are built, deployed, and running on your real content. What is
left is the letter, the Formspree setup, and writing the stickers.

---

## Blockers

Things the gift genuinely doesn't work without.

### 1. Write the letter

`content/letter.md` still contains `lorem ipsum` and keyboard mash. `/letter` is
the one page that is nothing but text, so it's currently the weakest page on the
site by a wide margin.

Leave a blank line between paragraphs — that's what makes a new paragraph.

### 2. Set up Formspree so the date form actually sends

`.env.local` has an empty `NEXT_PUBLIC_FORMSPREE_ENDPOINT`. Right now `/date`
picks an idea, shows it to her, and quietly tells her it couldn't be sent. It
doesn't crash, but the email never arrives.

1. Make a free form at https://formspree.io, giving the email address that should
   receive them.
2. Paste the endpoint into `.env.local`.
3. Paste **the same value** into Vercel → your project → Settings → Environment
   Variables, then redeploy. This step is easy to forget: the value is baked in
   at build time, so setting it only on your own computer does nothing for the
   live site.

Full instructions are in `DEV_GUIDE.md` section 6.

### 3. Write the NFC stickers

Seven stickers, one address each:

| Sticker | Address |
|---|---|
| photo album | `https://anivpage.vercel.app/album` |
| the letter | `https://anivpage.vercel.app/letter` |
| date generator | `https://anivpage.vercel.app/date` |
| bouquet studio | `https://anivpage.vercel.app/bouquet` |
| post-it wall | `https://anivpage.vercel.app/postits` |
| the animation | `https://anivpage.vercel.app/surprise` |
| screensavers | `https://anivpage.vercel.app/screensavers` |

Do this **after** step 2, so you're not re-writing tags later. Once they're
written these addresses are locked — see the warnings in `DEV_GUIDE.md`
section 8.

### 4. Test all seven on a real phone

Nobody has tapped the real thing yet. `/bouquet` matters most: it's the only
page whose cost is the phone's graphics rather than a network download, and the
one page that couldn't be tested at phone size from a desktop.

Worth checking on `/screensavers` too: the pictures are wide, so they look best
with the phone turned sideways once one is open full screen.

### 5. Delete the test page

`/testpush` is still live. It has done its job — pushing to GitHub does trigger a
rebuild, and deploys take about **ten to fifteen minutes**, which is slower than
it feels like it should be. Delete `app/testpush/` before the stickers go out.

---

## Content — worth doing, won't stop the gift working

### 6. Captions for the album

All 52 photos are in and laid out, but every caption is blank. They're optional
— the album reads fine without them — but a line on the handful that have a
story is the difference between a gallery and an album.

Open `content/album.json` and fill in the `"caption"` for the ones worth it.

### 7. Optional: better originals for 29 of the photos

Photos `photo-01` to `photo-29` came in small — most under 500 pixels wide, some
as small as 143. They look fine as thumbnails, but opened full screen they can
only show at their real size, so they sit small in the middle of the screen
rather than filling it.

If you still have the full-size originals anywhere, replacing the files is all
it takes — same names, no JSON changes. The other 23 are full resolution
already.

### 8. Thin spots in the date ideas

The list is up to 20, but there are now 6 moods × 3 locations × 3 budgets, and
**21 of the 36 realistic combinations have no exact match**. The form never
fails — it relaxes to two-out-of-three, then one — but she can answer three
questions and get something that ignores them.

Adding `lazy` is most of the reason: it has exactly **one** idea in it (indoor,
cheap), so Lazy + Outdoors, or Lazy at any higher budget, can never match
properly. The other thin spots are `cozy` above `low`, and `treat ourselves`
generally.

Two or three more `lazy` ideas would fix the worst of it.

### 9. Optional: shrink the screensaver files

Seven of the nine are 700–900 KB (about 6.2 MB for the folder); `manzanas.jpg`
and `manzanas_noche.jpg` are already fine at 135–175 KB. They're inefficiently
encoded rather than too large — the same pictures should sit around 150–250 KB.

Not urgent: the site resizes and re-encodes what it actually sends, so she never
downloads the originals. Worth a pass through https://squoosh.app sometime.

---

## Done

- All seven pages built, styled to one shared theme, and deployed
- **Screensavers** — 9 real images in, grid reshaped to match their wide format,
  one per row on a phone
- **Album** — 52 photos in, laid out as a masonry wall so nothing is cropped
- **Post-it wall** — 34 messages, up from 4
- **Date ideas** — 20 ideas, and the new `lazy` mood now appears in the form
- **`/bouquet`** — the 3D flower studio, recoloured to the site's palette, and
  tuned to open fast on mobile data
- Vercel connected to GitHub: pushing to `main` deploys on its own
- `DEV_GUIDE.md` written, for editing content later without help
