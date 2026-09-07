"use client";

import { useState } from "react";
import { generateBouquet, type BouquetResult } from "@/lib/bouquet";
import options from "@/content/bouquet-options.json";
import styles from "./bouquet.module.css";

export default function BouquetMaker() {
  const [flower, setFlower] = useState(options.flowers[0]);
  const [color, setColor] = useState(options.colors[0]);
  const [wrap, setWrap] = useState(options.wraps[0]);
  const [result, setResult] = useState<BouquetResult | null>(null);

  return (
    <>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          // The only call into the generator. See lib/bouquet.ts.
          setResult(generateBouquet({ flower, color, wrap }));
        }}
      >
        <Choices label="Which flowers?" options={options.flowers} value={flower} onChange={setFlower} />
        <Choices label="What colour?" options={options.colors} value={color} onChange={setColor} />
        <Choices label="Wrapped how?" options={options.wraps} value={wrap} onChange={setWrap} />

        <button className={`btn ${styles.submit}`} type="submit">
          Make my bouquet
        </button>
      </form>

      {result && (
        <div className={styles.result}>
          <div className={styles.stems}>
            {result.stems.map((stem, i) => (
              <span
                key={i}
                className={styles.stem}
                style={{ animationDelay: `${i * 160}ms` }}
              >
                {stem}
              </span>
            ))}
          </div>
          <h2 className={styles.name}>{result.name}</h2>
          <p className={styles.desc}>{result.description}</p>
          <p className={styles.placeholderNote}>
            (this one&apos;s still a sketch — the real thing is coming)
          </p>
        </div>
      )}
    </>
  );
}

function Choices({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset className={styles.group}>
      <legend className={styles.legend}>{label}</legend>
      <div className={styles.choices}>
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={`${styles.choice} ${value === option ? styles.choiceOn : ""}`}
            aria-pressed={value === option}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
