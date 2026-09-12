"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "@/components/Lightbox";
import styles from "./guide.module.css";

export type Step = {
  /** Missing while the screenshot hasn't been taken yet. */
  src?: string;
  caption: string;
  width?: number;
  height?: number;
};

/**
 * The numbered setup steps. Screenshots open in the shared Lightbox in its
 * normal (non-quiet) mode, so she gets arrows and a counter and can walk the
 * whole tutorial full screen without coming back out between steps.
 */
export default function GuideSteps({ steps }: { steps: Step[] }) {
  const [open, setOpen] = useState<number | null>(null);

  // The viewer only knows about steps that actually have a screenshot, so each
  // row carries its index into that shorter list — otherwise an empty slot in
  // the middle would make every arrow after it land on the wrong step.
  let counted = 0;
  const rows = steps.map((step) => ({
    step,
    shotIndex: step.src ? counted++ : null,
  }));

  const shots = rows
    .filter((row) => row.step.src)
    .map((row) => ({
      src: row.step.src as string,
      caption: row.step.caption,
      width: row.step.width,
      height: row.step.height,
    }));

  if (steps.length === 0) {
    return (
      <p className={styles.empty}>
        No hay pasos todavia — agregalos en <code>content/guide.json</code>.
      </p>
    );
  }

  return (
    <>
      {shots.length > 0 && (
        <p className={styles.sectionNote}>toca una captura para verla en grande</p>
      )}

      <ol className={styles.steps}>
        {rows.map(({ step, shotIndex }, i) => (
          <li
            key={step.caption + i}
            className={styles.step}
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <div className={styles.stepHead}>
              <span className={styles.badge}>{i + 1}</span>
              <span className={styles.stepCaption}>{step.caption}</span>
            </div>

            {step.src && shotIndex !== null ? (
              <button
                className={styles.shot}
                onClick={() => setOpen(shotIndex)}
                aria-label={`Ver la captura del paso ${i + 1} en grande`}
              >
                <Image
                  src={step.src}
                  alt=""
                  width={step.width ?? 1170}
                  height={step.height ?? 2532}
                  /* Capped at 190px by the stylesheet, so on the densest phone
                     screens 400px of source is already more than enough. */
                  sizes="190px"
                  className={styles.shotImg}
                />
              </button>
            ) : (
              <div className={styles.shotEmpty}>captura {i + 1}</div>
            )}
          </li>
        ))}
      </ol>

      {open !== null && (
        <Lightbox
          items={shots}
          index={open}
          onClose={() => setOpen(null)}
          onIndexChange={setOpen}
        />
      )}
    </>
  );
}
