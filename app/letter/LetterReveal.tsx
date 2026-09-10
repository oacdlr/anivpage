"use client";

import { useState } from "react";
import styles from "./letter.module.css";

type Stage = "closed" | "opening" | "open";

export default function LetterReveal({ paragraphs }: { paragraphs: string[] }) {
  const [stage, setStage] = useState<Stage>("closed");

  const open = () => {
    if (stage !== "closed") return;
    setStage("opening");
    // Let the flap finish lifting before the paper appears.
    setTimeout(() => setStage("open"), 650);
  };

  if (stage === "open") {
    return (
      <div className={styles.wrap}>
        <article className={styles.paper}>
          <div className={styles.text}>
            {paragraphs.map((line, i) => (
              <p key={i} style={{ animationDelay: `${350 + i * 220}ms` }}>
                {line}
              </p>
            ))}
          </div>
          <div
            className={styles.flourish}
            style={{ animationDelay: `${350 + paragraphs.length * 220}ms` }}
          >
            ❦
          </div>
        </article>

        <button
          className={`btn btn-soft ${styles.again}`}
          onClick={() => setStage("closed")}
        >
          Cerrar Carta
        </button>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <button
        className={styles.envelopeBtn}
        onClick={open}
        aria-label="Abrir Carta"
      >
        <div
          className={`${styles.envelope} ${stage === "opening" ? styles.opening : ""}`}
        >
          <div className={styles.flap} />
          <div className={styles.seal}>♥</div>
        </div>
      </button>
      <p className={styles.tapHint}>click para abrir</p>
    </div>
  );
}
