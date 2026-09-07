"use client";

import { useEffect, useRef, useState } from "react";
import PetalCanvas from "./PetalCanvas";
import styles from "./surprise.module.css";

const PETAL_COUNT = 8;
/** ms from tap until the petals let go and scatter. */
const SCATTER_AT = 2100;
/** ms from tap until the replay button appears. */
const REPLAY_AT = 3200;

type Phase = "idle" | "blooming" | "scattering";

export default function Bloom() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [burst, setBurst] = useState(0);
  // Bumped once per tap. Used as the flower's React key so that replaying
  // rebuilds it from scratch — while a mere phase change does not, which would
  // restart the bloom exactly as the petals were meant to let go.
  const [runId, setRunId] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [showReplay, setShowReplay] = useState(false);

  // Clear any pending timers if she leaves the page mid-animation.
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function start() {
    if (phase === "blooming") return;

    timers.current.forEach(clearTimeout);
    timers.current = [];
    setShowReplay(false);
    setRunId((n) => n + 1);
    setPhase("blooming");

    timers.current.push(
      setTimeout(() => {
        setPhase("scattering");
        setBurst((n) => n + 1);
      }, SCATTER_AT),
      setTimeout(() => setShowReplay(true), REPLAY_AT),
    );
  }

  return (
    <div
      className={styles.stage}
      onClick={() => {
        if (phase !== "blooming") start();
      }}
    >
      <PetalCanvas burstKey={burst} />

      {phase === "idle" ? (
        <>
          <button className={styles.bud} onClick={start} aria-label="Open the surprise">
            <span className={styles.ring} />
            <span className={styles.budCircle}>🌱</span>
          </button>
          <p className={styles.label}>tap me</p>
        </>
      ) : (
        <div
          className={`${styles.flower} ${phase === "scattering" ? styles.scattering : ""}`}
          key={runId}
        >
          <div className={styles.stem} />
          <div className={`${styles.leaf} ${styles.leafRight}`} />
          <div className={`${styles.leaf} ${styles.leafLeft}`} />

          {Array.from({ length: PETAL_COUNT }).map((_, i) => {
            const angle = (360 / PETAL_COUNT) * i;
            return (
              <div
                key={i}
                className={styles.petal}
                style={
                  {
                    "--angle": `${angle}deg`,
                    "--flyX": `${Math.cos((angle * Math.PI) / 180) * 30}px`,
                    "--flyY": `${-140 - Math.random() * 60}px`,
                    animationDelay:
                      phase === "scattering" ? `${i * 40}ms` : `${700 + i * 90}ms`,
                  } as React.CSSProperties
                }
              />
            );
          })}

          <div
            className={styles.core}
            style={{ animationDelay: phase === "scattering" ? "0ms" : "1450ms" }}
          />
        </div>
      )}

      {showReplay && (
        <button
          className={`btn btn-soft ${styles.replay}`}
          onClick={(e) => {
            e.stopPropagation();
            start();
          }}
        >
          again
        </button>
      )}
    </div>
  );
}
