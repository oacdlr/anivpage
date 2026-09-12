# How to look after this website

This guide is for editing the site later without needing any help. You don't
need to understand the code — everything you'll normally want to change lives
in plain text files in one folder.

---

## 1. What's where

```
content/          <-- EVERYTHING YOU'LL NORMALLY EDIT IS IN HERE
  letter.md            the text of the letter
  album.json           which photos appear in the album
  post-its.json        the messages on the post-it wall
  date-ideas.json      the list of date ideas
  screensavers.json    which images appear as screensavers
  guide.json           the two shortcuts and the steps to set them up

public/           <-- THE ACTUAL IMAGE FILES GO IN HERE
  photos/              album photos
  screensavers/        screensaver images
  guide/               shortcut icons and the setup screenshots
  bouquet-studio.html  the whole bouquet page, in one file (see section 3)

app/              seven of the eight pages, plus the front door and one unlisted
                  easter egg (code — leave alone unless adding a page)
components/       shared pieces used by more than one page
lib/              the small bits of logic (date matching)
scripts/          one-off tools you run by hand (see section 3)
photos-originals/ untouched copies of the album photos that were enlarged —
                  not part of the website, kept only as a safety net
```

The bouquet page is the odd one out: it's a single self-contained file in
`public/`, not a folder in `app/`. Section 3 explains why and what you can
safely change in it.

The eight pages, and which sticker goes where:

| Address (what the sticker points at) | What it is |
|---|---|
| `/album` | photo album |
| `/letter` | the letter |
| `/date` | date generator |
| `/bouquet` | bouquet builder |
| `/postits` | post-it wall |
| `/surprise` | the flower animation |
| `/screensavers` | screensaver gallery |
| `/guide` | how to install the two iPhone shortcuts (no sticker) |

`/guide` is the odd one out: it's instructions rather than a gift, and no
sticker points at it — you hand her the address. See section 8.

---

## 2. A note about JSON files

Several files end in `.json`. They're just lists, but they're fussy about
punctuation. Two rules will keep you out of trouble:

- Every item except the **last** one ends with a comma.
- Text always sits inside `"double quotes"`.

If a page suddenly shows an error after you edit one, it's almost always a
missing comma, an extra comma after the last item, or a missing quote mark.
Paste the file into https://jsonlint.com and it will point at the line.

If your text needs to contain a double quote, write `\"` instead of `"`.

---

## 3. Editing the content

### The letter

Open `content/letter.md` and type. It's just text.

**Leave a blank line between paragraphs.** That blank line is what creates a new
paragraph on the page — without one, everything runs together as a single block.

```
My love,

This is the second paragraph, because there's an empty line above it.

And this is the third.
```

### Adding or removing photos

1. Put the photo file into `public/photos/`.
2. Open `content/album.json` and add a line for it:

```json
[
  { "file": "beach.jpg", "caption": "That trip in July" },
  { "file": "kitchen.jpg", "caption": "" }
]
```

- `file` must match the filename **exactly**, including capital letters and the
  `.jpg` or `.png` at the end.
- `caption` can be left as `""` for no caption. All 52 are empty right now —
  fill in the ones worth a line and leave the rest.

To remove a photo, delete its line (and mind the commas — see section 2).

**Any shape is fine.** The album lays photos out like a pinboard, in columns,
each one keeping its own proportions — tall, wide or square, nothing gets
cropped. You don't need to tell it how big a photo is; it works that out from
the file itself.

**Small photos stay small.** Opened full screen, a photo is never blown up past
its real size, because stretching a small one just makes it blocky. So a large
photo fills the screen and a small one sits in the middle of the dark
background. If one looks smaller than you'd like, the fix is a bigger original,
not a settings change.

**Photos 01–29 have already been enlarged once.** They came in as thumbnails,
some only 143 pixels across, so `scripts/upscale-photos.mjs` doubled them
(nothing was pushed past 1280 pixels, the size the other photos already are).
Their untouched copies are kept in `photos-originals/`, outside `public/`, so
they're never part of the website — they're only there in case something needs
undoing.

Enlarging cannot add detail that was never in the file, so **if you ever find
the full-size originals of those photos, they will beat this.** Swapping them in
takes no code:

1. Put the full-size files into `public/photos/`, keeping the same names.
2. Delete those same names from `photos-originals/`.
3. Commit and push (section 5). Nothing in `content/album.json` changes.

If you add new small photos later, run `node scripts/upscale-photos.mjs` and it
will do the same to them, leaving everything it has already handled alone.

### Adding or removing post-it messages

Open `content/post-its.json`. It's a plain list of messages:

```json
[
  "The way you laugh at your own jokes",
  "beso",
  "ti amo"
]
```

Add as many as you like. The wall shuffles them and won't repeat a message
until it has used all of them, so the more you add, the better it feels.

### Adding or removing date ideas

Open `content/date-ideas.json`. Each idea looks like this:

```json
{
  "title": "Rooftop picnic",
  "mood": "cozy",
  "location": "outdoor",
  "budget": "low",
  "description": "Blanket, snacks, and whatever the sky is doing."
}
```

`title` and `description` can say anything. The other three **must** be spelled
exactly as one of these, or the idea won't be matched properly:

- `mood`: `cozy`, `adventurous`, `romantic`, `silly`, `calm`, `lazy`
- `location`: `indoor`, `outdoor`, `either`
- `budget`: `low`, `medium`, `treat ourselves`

`description` is optional — leave the whole line out if you don't want one.

The form always finds something: if nothing matches all three answers, it picks
the closest thing it can. Ideas are allowed to come up more than once.

### Adding or removing screensavers

1. Put the image into `public/screensavers/`.
2. Add a line to `content/screensavers.json`:

```json
[
  { "file": "lake.jpg", "title": "The lake" }
]
```

**Write the filename exactly, including the `.jpg` on the end.** Leaving the
extension off, or writing `.jpeg` when the file is `.jpg`, gives you an empty
tile with no error message — it's the easiest mistake to make here.

These look best as **wide, landscape images** — the grid is laid out for
roughly 16:9, the same shape as a TV or a phone held sideways. A portrait
image still works, it just gets cropped down to a wide strip. Full screen,
they fill the whole display: nearly perfect if she turns the phone sideways,
cropped in a bit if she holds it upright.

### The shortcuts guide

`/guide` covers the parts a web page isn't allowed to set up by itself: it hands
her the two shortcuts to install, then walks her through building the **NFC
automation** that runs one when she taps a sticker. It's driven by
`content/guide.json`, which has two lists in it:

```json
{
  "shortcuts": [
    {
      "name": "Prender la lampara",
      "icon": "shortcut-1.png",
      "url": "https://www.icloud.com/shortcuts/abc123",
      "note": "lo que hace, en una linea"
    }
  ],
  "steps": [
    { "file": "step-01.jpeg", "caption": "Baja hasta NFC y escanea el sticker" }
  ]
}
```

**`shortcuts`** is the "Que descargar?" list — one card each:

- `name` is what she sees. `note` is the one-line explanation, and `""` hides it.
- `icon` is a file in `public/guide/`. Make it **square** — an off-square image
  gets cropped rather than squashed, but it'll lose an edge.
- `url` is the `https://www.icloud.com/shortcuts/...` link iCloud gives you when
  you share a shortcut.

**`steps`** is the numbered "Como configurar" list — one card each, in order:

- `file` is a screenshot in `public/guide/`. Straight off the iPhone is right;
  they're shown small and she taps one to see it full screen, where she can
  swipe through the whole tutorial.
- `caption` is the line of instructions above it. **Her phone is in English**,
  so these deliberately keep the button names in English (`Automation`,
  `Run Immediately`, `My Shortcuts`) inside Spanish sentences — they have to
  match what's actually on her screen. If she ever switches her phone to
  Spanish, these are the words to change.

Add or remove steps freely — the numbers are worked out from the order in the
list, so you never renumber anything by hand.

**Anything left as `""` shows a dashed placeholder instead of breaking.** An
empty `url` shows a greyed-out "link pendiente" that can't be tapped, and an
empty `file` shows an empty screenshot box. That's deliberate, so the page can
go live before you've finished gathering the screenshots — but it does mean a
**typo in a filename looks exactly like a finished card with a missing image**,
so check the spelling and the extension.

**Mind the extensions here especially: the icons are `.png` and the screenshots
are `.jpeg`.** They came from different places — the icons exported from the
Shortcuts app, the screenshots straight off the phone — so this is the one file
in the project where you can't assume every image ends the same way. Writing
`.jpg` or `.png` for a screenshot gives you an empty box and no error.

Screenshots off a phone are a couple of megabytes each. Run them through
https://squoosh.app first — see section 8.

### The bouquet page

This one works differently from the rest, so it gets a longer explanation.

It's a 3D flower studio: she picks how many of each flower she wants, gives each
one whatever colour she likes, and the bouquet is built in front of her. She can
spin it around by dragging, and if she leaves it alone for a few seconds the
camera starts drifting slowly on its own.

**It doesn't open the same way twice.** The bouquet that's already standing
there when the page loads is worked out from the date and the time, so it
changes on its own six times a day — at midnight, 4am, 8am, noon, 4pm and 8pm,
by her own clock. Morning and evening on the same day are different bouquets.
(It only re-reads the clock when the page is opened, so if she leaves the studio
sitting open past 4pm nothing rearranges itself under her hands.) A few seconds
in, a card asks whether she'll share roughly
where she is; if she says yes, her position is rounded to whole degrees, folded
into the same calculation, and thrown away. Nothing is sent anywhere and no
coordinates are stored — only her yes-or-no answer, so the card is asked once.
A no, a refusal, or a browser that can't do it leaves the day-only bouquet
standing; the question is never something the page waits on. Twelve stems across
seven varieties in every case — the clock and the place change *which* flowers
she gets, never how many, so it can't come up bare or overcrowded.

The whole thing — layout, colours, flowers and all — lives in **one file**:
`public/bouquet-studio.html`. There is no separate content file for it, because
the flowers aren't text: each one is drawn by a small piece of maths.

**What's safe to change.** Near the top of the code (search the file for
`const FLOWERS`) there's a list that looks like this:

```
{id:'rose', name:'Rose', color:'#c2455f', scale:1.00, filler:false},
```

- `name` is the label she sees in the list. Rename freely.
- `color` is the colour that flower starts as. She can change it herself with
  the little circle next to each name, so this is just the starting point.
- `scale` makes that flower bigger or smaller relative to the others.
- Deleting a whole line removes that flower from the list.

**What isn't.** *Adding* a new kind of flower is a real code change, not a
content edit — each flower has a function that draws its petals (`fRose`,
`fPeony`, `fTulip` and so on). Removing and recolouring is easy; inventing a new
species is not.

**The colours.** The top of the file has a block of colour settings that mirror
the shared theme in `app/globals.css`. They're deliberately duplicated, because
this page is a standalone file and can't read the site's stylesheet. If you
change a colour in `app/globals.css`, change its twin here too, or this page
will slowly drift away from the other six.

---

## 4. Running it on your own computer

You need Node.js installed (https://nodejs.org, the version marked "LTS").

Open a terminal in this folder and run:

```
npm install
```

You only need that the first time (and again if you ever pull down changes).
Then, every time you want to work on it:

```
npm run dev
```

Leave that running and open http://localhost:3000/album in your browser. Swap
`/album` for any of the other six addresses. Edits to the content files show up
as soon as you save — no need to restart anything.

To stop it, press `Ctrl + C` in the terminal.

---

## 5. Putting changes live

The site is hosted on Vercel. Once it's connected to a GitHub repository,
deploying is just pushing your changes:

```
git add .
git commit -m "Added new photos"
git push
```

Vercel notices the push and rebuilds the site by itself. In practice this takes
**ten to fifteen minutes**, which is slower than it feels like it should be — it
hasn't failed, it's just slow, so give it the quarter of an hour before assuming
something is wrong. You can watch it happen at https://vercel.com/dashboard.

If it isn't connected to GitHub yet, install the Vercel tool once with
`npm install -g vercel`, then run `vercel --prod` from this folder.

**If a deploy fails**, the most common cause is a broken JSON file (section 2)
or a photo filename that doesn't match what's written in the JSON — including
capital letters. Vercel's servers care about capitalisation even though your own
computer doesn't: to them, `Beach.JPG` and `beach.jpg` are two different files.

---

## 6. Changing where the date emails go

The date page sends its answers through a free service called **Formspree**.

1. Sign up at https://formspree.io and make a new form. It will ask which email
   address should receive the messages.
2. Formspree gives you a web address that looks like
   `https://formspree.io/f/abcdwxyz`.
3. Put it in the file named `.env.local` in this folder (create it by copying
   `.env.example` if it isn't there):

```
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/abcdwxyz
```

4. Put **the same line** into Vercel, or it will only work on your own computer:
   your project, then Settings, then Environment Variables. Add
   `NEXT_PUBLIC_FORMSPREE_ENDPOINT` with that value, then redeploy.

To change the destination address later, change it in the Formspree dashboard —
you don't need to touch the site at all.

**If this isn't set up yet**, the date page still works: it picks an idea and
shows it to her, and simply says the message couldn't be sent. Nothing crashes.

---

## 7. Adding a new page later

Say you want `/anniversary` next year.

1. Make a new folder: `app/anniversary/`
2. Inside it, make a file called `page.tsx` containing:

```tsx
import PageShell from "@/components/PageShell";

export default function AnniversaryPage() {
  return (
    <PageShell title="Happy anniversary" subtitle="year two">
      <p>Whatever you want to say here.</p>
    </PageShell>
  );
}
```

3. It's live at `/anniversary` straight away. Write that address to a new NFC
   sticker.

Using `PageShell` is what keeps a new page looking like the rest of the site.
The folder name **is** the web address, so name it carefully the first time.

(The bouquet page doesn't follow this pattern — it's a plain HTML file in
`public/`, pointed at `/bouquet` by a couple of lines in `next.config.ts`. That
was a one-off because it's a self-contained 3D program. Stick to the folder
recipe above for anything new. `/guide` was added this way and took about ten
minutes, most of it writing the words.)

---

## 8. Things that will bite you

**Don't rename the route folders.** `album`, `letter`, `date`, `postits`,
`surprise`, `screensavers` — the NFC stickers are written and in her hands, and
they are physically programmed to point at those exact addresses. This is no
longer a precaution: renaming a folder makes a real sticker lead to a dead page,
and you can't fix that from in here; you'd have to rewrite the sticker itself.
The same goes for `/bouquet`: don't rename `public/bouquet-studio.html` without
changing the matching line in `next.config.ts`, or that sticker dies too.

**`app/guide/` is the exception — for now.** No sticker points at `/guide`, so
it's the only route name still safe to change. The moment you write it to a
sticker, it joins the list above.

**Compress photos before adding them.** A photo straight off a phone can be
8 MB, which is painfully slow over mobile data. Aim for **under 300 KB each** —
around 1600 pixels on the long edge is plenty. https://squoosh.app does this in
the browser for free, and the difference is invisible on a phone screen.

**Keep filenames lowercase with no spaces.** `sunset-beach.jpg`, not
`Sunset Beach.JPG`. Spaces and capital letters are the single most common cause
of "it works on my computer but not on the real site."

**Don't delete `content/letter.md`.** An empty letter is fine; a missing file
stops the whole site from building.

**The post-it wall forgetting everything is intentional.** Notes vanish when the
page is closed. That's by design, not a bug.

**There's a ninth page, and it's meant to be there.** `/testpush` was built to
prove that pushing to GitHub really does rebuild the site. It does, and the page
was kept as an unlisted easter egg — no sticker points at it, nothing links to
it, and it holds a quote that gets swapped now and then. It isn't leftover
scaffolding; don't tidy it away.

**Everything is readable by anyone with the link.** There's no password. The
addresses aren't secret, they're just unlisted and hidden from Google. Don't put
anything in here you'd mind a stranger reading if they guessed an address.
