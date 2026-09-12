"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Lightbox.module.css";

export type LightboxItem = {
  src: string;
  caption?: string;
  /**
   * Real pixel size, when the caller knows it. Given both, the viewer will
   * never scale the image past its own resolution — a lot of the album photos
   * are small, and stretching those to fill a phone screen just makes them
   * blocky. Omit them (the screensavers do) to get the old fill behaviour.
   */
  width?: number;
  height?: number;
};

/**
 * Full-screen image viewer, shared by /album and /screensavers.
 *
 * - normal mode  : arrows, counter, caption, close button (photo album)
 * - "quiet" mode : image only, tap anywhere to exit (screensaver)
 */
export default function Lightbox({
  items,
  index,
  onClose,
  onIndexChange,
  quiet = false,
}: {
  items: LightboxItem[];
  index: number;
  onClose: () => void;
  onIndexChange?: (next: number) => void;
  quiet?: boolean;
}) {
  const touchStartX = useRef<number | null>(null);
  const [dismissable, setDismissable] = useState(false);

  // Ignore the tail end of the tap that opened this, so a screensaver doesn't
  // close itself the instant it appears.
  useEffect(() => {
    const t = setTimeout(() => setDismissable(true), 350);
    return () => clearTimeout(t);
  }, []);

  const go = useCallback(
    (delta: number) => {
      if (!onIndexChange || items.length < 2) return;
      onIndexChange((index + delta + items.length) % items.length);
    },
    [index, items.length, onIndexChange],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    // Stop the page behind from scrolling while the viewer is open.
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [go, onClose]);

  const item = items[index];
  if (!item) return null;

  return (
    <div
      className={`${styles.backdrop} ${quiet ? styles.quiet : ""}`}
      onClick={() => {
        if (dismissable) onClose();
      }}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        const start = touchStartX.current;
        touchStartX.current = null;
        if (start === null || quiet) return;
        const dx = e.changedTouches[0].clientX - start;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
      }}
      role="dialog"
      aria-modal="true"
      aria-label={item.caption ?? "Full screen image"}
    >
      {/* In quiet (screensaver) mode a tap anywhere exits, so clicks are
          allowed to reach the backdrop. In album mode they must not. */}
      <div
        className={`${styles.stage} ${!quiet && item.caption ? styles.withCaption : ""}`}
        onClick={(e) => {
          if (!quiet) e.stopPropagation();
        }}
      >
        <div
          className={`${styles.imageWrap} ${item.width && item.height ? styles.intrinsic : ""}`}
          key={item.src}
        >
          {item.width && item.height ? (
            <Image
              src={item.src}
              alt={item.caption ?? ""}
              width={item.width}
              height={item.height}
              className={styles.capped}
              priority
            />
          ) : (
            <Image
              src={item.src}
              alt={item.caption ?? ""}
              fill
              sizes="100vw"
              className={styles.image}
              priority
            />
          )}
        </div>

        {!quiet && (
          <>
            <button
              className={styles.close}
              onClick={onClose}
              aria-label="Close"
            >
              ✕
            </button>
            {items.length > 1 && (
              <>
                <button
                  className={`${styles.arrow} ${styles.prev}`}
                  onClick={() => go(-1)}
                  aria-label="Previous photo"
                >
                  ‹
                </button>
                <button
                  className={`${styles.arrow} ${styles.next}`}
                  onClick={() => go(1)}
                  aria-label="Next photo"
                >
                  ›
                </button>
                <div className={styles.counter}>
                  {index + 1} / {items.length}
                </div>
              </>
            )}
            {item.caption && <p className={styles.caption}>{item.caption}</p>}
          </>
        )}

        {quiet && <p className={styles.exitHint}>tap anywhere to go back</p>}
      </div>
    </div>
  );
}
