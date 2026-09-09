"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox, { type LightboxItem } from "@/components/Lightbox";
import styles from "./album.module.css";

export default function AlbumGrid({ photos }: { photos: LightboxItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  if (photos.length === 0) {
    return (
      <p className={styles.empty}>
        No photos yet — add some to <code>content/album.json</code>.
      </p>
    );
  }

  return (
    <>
      {/* A masonry wall: CSS columns let every photo keep its own shape, so
          nothing is cropped. Reading order runs down each column rather than
          across the rows, which is the trade-off for not cutting anything off. */}
      <div className={styles.grid}>
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            className={styles.tile}
            style={{ animationDelay: `${Math.min(i, 12) * 45}ms` }}
            onClick={() => setOpen(i)}
            aria-label={photo.caption || `Open photo ${i + 1}`}
          >
            <Image
              src={photo.src}
              alt={photo.caption ?? ""}
              width={photo.width ?? 3}
              height={photo.height ?? 4}
              sizes="(max-width: 560px) 50vw, (max-width: 820px) 33vw, 290px"
              className={styles.thumb}
              /* The first handful fill the screen before any scrolling, so
                 they're fetched eagerly; the rest wait until she scrolls. */
              priority={i < 4}
            />
          </button>
        ))}
      </div>

      {open !== null && (
        <Lightbox
          items={photos}
          index={open}
          onIndexChange={setOpen}
          onClose={() => setOpen(null)}
        />
      )}
    </>
  );
}
