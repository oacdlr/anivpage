"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "@/components/Lightbox";
import styles from "./screensavers.module.css";

type Screensaver = { src: string; title: string };

export default function ScreensaverGrid({ items }: { items: Screensaver[] }) {
  const [open, setOpen] = useState<number | null>(null);

  function openAt(index: number) {
    setOpen(index);
    // Go properly full-screen where the browser allows it. Silently ignored on
    // iOS Safari, where the overlay alone still fills the screen.
    document.documentElement.requestFullscreen?.().catch(() => {});
  }

  function close() {
    setOpen(null);
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
  }

  if (items.length === 0) {
    return (
      <p className={styles.empty}>
        No screensavers yet — add some to <code>content/screensavers.json</code>.
      </p>
    );
  }

  return (
    <>
      <div className={styles.grid}>
        {items.map((item, i) => (
          <button
            key={item.src}
            className={styles.tile}
            style={{ animationDelay: `${i * 45}ms` }}
            onClick={() => openAt(i)}
            aria-label={`Show ${item.title} full screen`}
          >
            <Image
              src={item.src}
              alt=""
              fill
              /* Must track the column counts in screensavers.module.css: one
                 tile per row on a phone, two from 560px, three from 820px
                 (inside a 900px-wide shell, so about 300px each). */
              sizes="(max-width: 560px) 100vw, (max-width: 820px) 50vw, 300px"
              className={styles.thumb}
            />
            <span className={styles.tileLabel}>{item.title}</span>
          </button>
        ))}
      </div>

      {open !== null && (
        <Lightbox items={items} index={open} onClose={close} quiet />
      )}
    </>
  );
}
