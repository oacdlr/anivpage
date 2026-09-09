/**
 * Evens out the album photos.
 *
 * The 52 pictures in public/photos arrived in two very different sizes: about
 * half are full phone resolution (~1280 pixels on the long edge) and the rest
 * are thumbnails, some as small as 143 pixels. Opened full screen, the small
 * ones sit tiny in the middle of the screen, because the viewer refuses to
 * stretch a photo past its real size.
 *
 * This enlarges the small ones so they display bigger. It cannot invent detail
 * that was never in the file — it doubles them at most, which stays close to
 * indistinguishable from the original, only larger.
 *
 * Run it with:   node scripts/upscale-photos.mjs
 *
 * It is safe to run again: every photo it touches is first copied, untouched,
 * into photos-originals/, and any photo that already has a copy there is left
 * alone. So a second run does nothing, and nothing is ever enlarged twice.
 *
 * IF YOU FIND THE FULL-SIZE ORIGINALS LATER: that beats anything this script
 * can do. Drop them into public/photos/ under the same names, delete their
 * copies from photos-originals/, and rebuild. No other file needs editing.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const PHOTOS = path.join(root, "public", "photos");
const BACKUPS = path.join(root, "photos-originals");

/** Photos already this big are left alone. */
const LEAVE_ALONE_ABOVE = 1000;
/** Nothing ends up larger than this — the size the good photos already are. */
const MAX_LONG_EDGE = 1280;
/** Never enlarge more than this. Past 2x, a small photo starts to look mushy. */
const MAX_FACTOR = 2;

const kb = (bytes) => `${Math.round(bytes / 1024)}KB`;

async function main() {
  fs.mkdirSync(BACKUPS, { recursive: true });

  const files = fs
    .readdirSync(PHOTOS)
    .filter((f) => /\.(jpe?g|png)$/i.test(f))
    .sort();

  let changed = 0;
  let skipped = 0;

  for (const file of files) {
    const source = path.join(PHOTOS, file);
    const backup = path.join(BACKUPS, file);

    // Already enlarged on an earlier run — leave it exactly as it is.
    if (fs.existsSync(backup)) {
      console.log(`  skip  ${file}  (already done)`);
      skipped++;
      continue;
    }

    // Read the bytes up front rather than letting sharp open the path: on
    // Windows the file stays locked while sharp holds it, and this script
    // writes back over that same path.
    const input = fs.readFileSync(source);
    const { width, height } = await sharp(input).metadata();
    const longEdge = Math.max(width, height);

    if (longEdge >= LEAVE_ALONE_ABOVE) {
      console.log(`  skip  ${file}  ${width}x${height}  (already big enough)`);
      skipped++;
      continue;
    }

    const factor = Math.min(MAX_FACTOR, MAX_LONG_EDGE / longEdge);
    const target = {
      width: Math.round(width * factor),
      height: Math.round(height * factor),
    };

    // lanczos3 is the sharpest of the standard ways of enlarging; the light
    // sharpen afterwards puts back the crispness any enlargement softens.
    // Full chroma (4:4:4) because these files are small and already once
    // compressed — there is no colour detail left to spare.
    const enlarged = await sharp(input)
      .resize({ ...target, kernel: "lanczos3" })
      .sharpen({ sigma: 0.6 })
      .jpeg({ quality: 86, mozjpeg: true, chromaSubsampling: "4:4:4" })
      .toBuffer();

    const before = input.length;

    // Copy first, overwrite second — so an interrupted run can never lose a
    // photo that has no copy yet.
    fs.writeFileSync(backup, input);
    fs.writeFileSync(source, enlarged);

    console.log(
      `  grew  ${file}  ${width}x${height} ${kb(before)}` +
        `  ->  ${target.width}x${target.height} ${kb(enlarged.length)}` +
        `  (${factor.toFixed(2)}x)`,
    );
    changed++;
  }

  console.log(`\n${changed} photo(s) enlarged, ${skipped} left alone.`);
  if (changed > 0) {
    console.log(`Untouched copies of the originals are in photos-originals/.`);
  }
}

main().catch((err) => {
  console.error("Something went wrong:", err.message);
  process.exit(1);
});
