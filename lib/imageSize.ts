import fs from "node:fs";

export type Size = { width: number; height: number };

/**
 * Reads an image's pixel dimensions straight out of its file header.
 *
 * The album needs these at build time: a masonry layout has to know how tall
 * each photo is before it can lay the columns out, and the full-screen viewer
 * uses them to avoid blowing a small photo up past its real size.
 *
 * Doing it here means adding a photo stays a two-step job — drop the file in,
 * add a line to content/album.json — with no width/height to look up by hand.
 *
 * Handles the two formats the album uses, JPEG and PNG. Anything else (or a
 * truncated file) returns null, and the caller falls back to a default shape.
 */
export function imageSize(path: string): Size | null {
  let buf: Buffer;
  try {
    // The header is all we need; 64KB is far more than enough for both formats.
    const fd = fs.openSync(path, "r");
    buf = Buffer.alloc(65536);
    const read = fs.readSync(fd, buf, 0, 65536, 0);
    fs.closeSync(fd);
    buf = buf.subarray(0, read);
  } catch {
    return null;
  }

  // PNG: an 8-byte signature, then IHDR carries width and height as big-endian
  // 32-bit values at a fixed offset.
  if (buf.length > 24 && buf[0] === 0x89 && buf[1] === 0x50) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }

  // JPEG: walk the marker segments until a start-of-frame (SOFn) turns up.
  // C4, C8 and CC share that range but are Huffman/arithmetic tables, not frames.
  if (buf.length > 4 && buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i + 9 < buf.length) {
      if (buf[i] !== 0xff) {
        i++;
        continue;
      }
      const marker = buf[i + 1];
      if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
        return { width: buf.readUInt16BE(i + 7), height: buf.readUInt16BE(i + 5) };
      }
      const length = buf.readUInt16BE(i + 2);
      if (length < 2) return null;
      i += 2 + length;
    }
  }

  return null;
}
