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
      <div className={styles.grid}>
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            className={styles.tile}
            style={{ animationDelay: `${i * 45}ms` }}
            onClick={() => setOpen(i)}
            aria-label={photo.caption || `Open photo ${i + 1}`}
          >
            <Image
              src={photo.src}
              alt={photo.caption ?? ""}
              fill
              sizes="(max-width: 560px) 50vw, 33vw"
              className={styles.thumb}
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
