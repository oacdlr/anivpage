# Project Context: Anniversary NFC Gift Website

## Purpose
A set of custom digital gift experiences for my partner, each accessed by tapping a
physical NFC sticker (one sticker → one project, stickers already purchased). There is
no central homepage or navigation menu — each page is a standalone destination reached
by a physical tap, not by browsing.

**Timeline: must be functional within 2 days.** Prioritize getting all 7 pages working
end-to-end over polishing any single one. If time runs short, cut animation/visual
polish first — never core functionality.

---

## Architecture

- 7 independent static pages/routes, one per NFC sticker, deployed on **Vercel**
  (no custom domain yet — using the free `*.vercel.app` URL). Route names are locked
  in below since NFC tags will be written with these exact URLs — **do not rename
  routes after tags are written.**
- Mobile-first — every page opens directly from a phone browser tap. No scrolling
  confusion, fast load, no login/friction, no loading screens beyond the essentials.
- No shared navigation bar between pages (keeps each tap a self-contained surprise),
  but all pages **share one consistent visual theme** — same color palette, fonts,
  and general feel — so it reads as one cohesive gift.
- Normal, readable URL slugs are fine (no need to obscure them).
- All pages are **revisitable** — nothing is single-use or destructive on reload,
  except where noted below.
- Framework: keep it simple — plain React or Next.js (file-based routing matching
  the URLs below). Avoid heavy dependencies given the 2-day timeline.
- No user accounts, no database. Everything is either static content or one
  outgoing form (the date generator).
- Content (photos, letter text, post-it messages, date ideas, screensaver images)
  lives in separate data files under `/content`, so it can be edited later without
  touching logic/components.

---

## Routes & Behavior

1. **`/album`** — Photo Album
   Grid or carousel gallery, lightbox view on click. Revisitable anytime.

2. **`/letter`** — The Letter
   Envelope-open animation → reveals letter text. Revisitable/rereadable anytime.

3. **`/date`** — Date Generator (form)
   Form collects her preferences (mood, budget, indoor/outdoor, etc.) → generates
   a date idea → **on submit, sends the result to my email** (not shown to her as
   a history). She can reuse this sticker anytime to "schedule" a new date. Date
   ideas **can be reused/repeated** — no need to track which ones were shown before.
   Use a no-backend form service (**Formspree or EmailJS**, free tier) rather than
   custom email infrastructure.

4. **`/bouquet`** — Bouquet Generator ✅ **built**
   No longer a shell. A 3D flower studio: per-flower counts and colour pickers,
   density and stem-length sliders, an orbit camera that drifts when idle. Ten
   procedurally generated flower types, no images.
   Implemented as one self-contained HTML file at `public/bouquet-studio.html`
   (Three.js from a CDN), served at `/bouquet` by a rewrite in `next.config.ts`
   rather than as a route under `app/`. The old placeholder — `lib/bouquet.ts`
   and `content/bouquet-options.json` — has been removed.

5. **`/postits`** — Post-it Wall
   Clicking anywhere on the wall spawns a new post-it note at a random position,
   with slight random rotation and a random pastel color, showing a message from a
   preset list. Notes **do not persist** — the wall resets each time the page is
   closed/reopened. Component state only, no localStorage/backend needed.

6. **`/surprise`** — Animation Page
   A single click/tap target triggers a short celebratory animation (e.g. hearts,
   confetti — final choice TBD). Replayable on every visit.

7. **`/screensavers`** — Screensaver Gallery
   Grid of calming background images. Clicking one previews it full-screen, as a
   relaxing "screensaver." Revisitable — she can pick a different one each time.

---

## Dev Guide Requirement

In addition to the site itself, generate a **`DEV_GUIDE.md`** in the project root,
written in plain language for a non-expert who wants to hand-edit content later
without needing AI help each time. It must cover:

- **Project structure** — quick map of folders/files and what lives where
- **How to edit content** — exact file paths and formats for:
  - Adding/removing photos (album)
  - Editing the letter text
  - Adding/removing post-it messages
  - Adding/removing date ideas
  - Adding/removing screensaver images
- **How to run it locally** — exact commands (`npm install`, `npm run dev`, etc.)
  and what URL to open
- **How to deploy changes** — exact steps to push updates live on Vercel
- **How to change the email destination** for the date generator (where the
  Formspree/EmailJS config lives)
- **How to add a new page/route** later (e.g. for a future anniversary)
- **Common gotchas**, including:
  - "Don't rename these route files — NFC tags are physically written to point to
    these exact URLs."
  - "Compress images before adding them (recommend a target file size)."

Assume the reader is comfortable editing text/content files but not debugging
JavaScript — no unexplained code jargon.

---

## Still to Supply Before/During Build

- [ ] Photos for the album
- [ ] Full letter text
- [ ] Post-it message list
- [ ] Date idea list (with categories/tags for the form)
- [ ] Email address to receive date-generator submissions (for Formspree/EmailJS setup)
- [ ] Screensaver images
- [ ] Final animation choice for `/surprise`
- [ ] Color palette / fonts, or a reference site for the visual "vibe"

## Locked Decisions (do not change once building starts)

- Routes: `/album`, `/letter`, `/date`, `/bouquet`, `/postits`, `/surprise`, `/screensavers`
- Hosting: Vercel, free subdomain (no custom domain yet)
- NFC mapping: one sticker per route, already 1:1
- No shared nav bar; consistent shared theme across pages
- Post-it wall: no persistence (resets on close)
- Date generator: submissions email me directly; ideas are reusable
- 2-day build timeline — functionality over polish
