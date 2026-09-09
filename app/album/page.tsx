import path from "node:path";
import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import AlbumGrid from "./AlbumGrid";
import album from "@/content/album.json";
import { imageSize } from "@/lib/imageSize";

export const metadata: Metadata = { title: "Our album" };

/** Shape used when a file's header can't be read — a plain portrait photo. */
const FALLBACK = { width: 3, height: 4 };

export default function AlbumPage() {
  const photos = album.map((entry) => {
    const size = imageSize(path.join(process.cwd(), "public", "photos", entry.file)) ?? FALLBACK;
    return {
      src: `/photos/${entry.file}`,
      caption: entry.caption || undefined,
      width: size.width,
      height: size.height,
    };
  });

  return (
    <PageShell title="Our album" subtitle="tap a photo to open it" wide>
      <AlbumGrid photos={photos} />
    </PageShell>
  );
}
