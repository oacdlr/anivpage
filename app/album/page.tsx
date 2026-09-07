import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import AlbumGrid from "./AlbumGrid";
import album from "@/content/album.json";

export const metadata: Metadata = { title: "Our album" };

export default function AlbumPage() {
  const photos = album.map((entry) => ({
    src: `/photos/${entry.file}`,
    caption: entry.caption || undefined,
  }));

  return (
    <PageShell title="Our album" subtitle="tap a photo to open it" wide>
      <AlbumGrid photos={photos} />
    </PageShell>
  );
}
