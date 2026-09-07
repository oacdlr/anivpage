"use client";

import { useState } from "react";
import { pickDate, type DateIdea } from "@/lib/pickDate";
import styles from "./date.module.css";

const MOODS = ["cozy", "adventurous", "romantic", "silly", "calm"];
const LOCATIONS = ["indoor", "outdoor", "either"];
const BUDGETS = ["low", "medium", "treat ourselves"];

const LABELS: Record<string, string> = {
  cozy: "Cozy",
  adventurous: "Adventurous",
  romantic: "Romantic",
  silly: "Silly",
  calm: "Calm",
  indoor: "Indoors",
  outdoor: "Outdoors",
  either: "Surprise me",
  low: "Cheap and cheerful",
  medium: "Somewhere in between",
  "treat ourselves": "Treat ourselves",
};

type SendState = "idle" | "sending" | "sent" | "failed";

export default function DateForm({ ideas }: { ideas: DateIdea[] }) {
  const [mood, setMood] = useState(MOODS[0]);
  const [location, setLocation] = useState(LOCATIONS[0]);
  const [budget, setBudget] = useState(BUDGETS[0]);
  const [note, setNote] = useState("");
  const [result, setResult] = useState<DateIdea | null>(null);
  const [send, setSend] = useState<SendState>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (send === "sending") return;

    const idea = pickDate(ideas, { mood, location, budget });
    setResult(idea);
    setSend("sending");

    // The chosen idea is emailed straight to him — she never sees a history.
    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
    if (!endpoint) {
      setSend("failed");
      return;
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Date request: ${idea?.title ?? "(no idea matched)"}`,
          "Date idea": idea?.title ?? "(no idea matched)",
          Mood: mood,
          Where: location,
          Budget: budget,
          "Her note": note || "(none)",
          "Sent at": new Date().toLocaleString(),
        }),
      });
      setSend(res.ok ? "sent" : "failed");
    } catch {
      setSend("failed");
    }
  }

  if (ideas.length === 0) {
    return (
      <p className={styles.empty}>
        No date ideas yet — add some to <code>content/date-ideas.json</code>.
      </p>
    );
  }

  if (result) {
    return (
      <div className={styles.result}>
        <div className={styles.card}>
          <p className={styles.eyebrow}>Your date</p>
          <h2 className={styles.ideaTitle}>{result.title}</h2>
          {result.description && (
            <p className={styles.ideaDesc}>{result.description}</p>
          )}
          <div className={styles.tags}>
            <span className={styles.tag}>{LABELS[result.mood] ?? result.mood}</span>
            <span className={styles.tag}>
              {LABELS[result.location] ?? result.location}
            </span>
            <span className={styles.tag}>
              {LABELS[result.budget] ?? result.budget}
            </span>
          </div>
        </div>

        {send === "sending" && <p className={styles.status}>sending it to him…</p>}
        {send === "sent" && <p className={styles.status}>He knows. Consider it planned. ♥</p>}
        {send === "failed" && (
          <p className={`${styles.status} ${styles.statusWarn}`}>
            Your date is picked, but the message didn&apos;t send. Screenshot this
            and send it to him.
          </p>
        )}

        <button
          className="btn btn-soft"
          onClick={() => {
            setResult(null);
            setSend("idle");
            setNote("");
          }}
        >
          Plan another one
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Choices label="What mood are you in?" options={MOODS} value={mood} onChange={setMood} />
      <Choices label="Out, or in?" options={LOCATIONS} value={location} onChange={setLocation} />
      <Choices label="How fancy?" options={BUDGETS} value={budget} onChange={setBudget} />

      <fieldset className={styles.group}>
        <legend className={styles.legend}>Anything to add?</legend>
        <textarea
          className={styles.note}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Optional — a day that works, a craving, a request…"
          maxLength={600}
        />
      </fieldset>

      <button className={`btn ${styles.submit}`} type="submit">
        Pick our date
      </button>
    </form>
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
            {LABELS[option] ?? option}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
