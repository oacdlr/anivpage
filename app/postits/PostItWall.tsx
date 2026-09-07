"use client";

import { useRef, useState } from "react";
import styles from "./postits.module.css";

/** Pastel post-it colours, drawn from the site palette. */
const COLORS = ["#f7e6b8", "#f3c6d5", "#dbe7f6", "#d8cdea", "#cfe8d6", "#fbdcc4"];

type Note = {
  id: number;
  text: string;
  x: number;
  y: number;
  tilt: number;
  color: string;
};

function shuffle<T>(list: T[]): T[] {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function PostItWall({ messages }: { messages: string[] }) {
  const [notes, setNotes] = useState<Note[]>([]);
  // A shuffled queue, so messages don't repeat until the list is used up.
  const queue = useRef<string[]>([]);
  const nextId = useRef(0);

  function nextMessage(): string {
    if (queue.current.length === 0) queue.current = shuffle(messages);
    return queue.current.pop() ?? "";
  }

  function addNote(clientX: number, clientY: number) {
    if (messages.length === 0) return;

    // Keep the note fully on screen no matter where she taps.
    const halfW = 84;
    const halfH = 84;
    const x = Math.min(Math.max(clientX, halfW), window.innerWidth - halfW);
    const y = Math.min(Math.max(clientY, halfH), window.innerHeight - halfH);

    // Built here, outside the state updater: the updater must stay pure, or
    // React will run it twice and burn two messages on a single tap.
    const note: Note = {
      id: nextId.current++,
      text: nextMessage(),
      x,
      y,
      tilt: Math.random() * 16 - 8,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };

    setNotes((current) => [...current, note]);
  }

  return (
    <div
      className={styles.wall}
      onClick={(e) => addNote(e.clientX, e.clientY)}
      role="button"
      tabIndex={0}
      aria-label="Tap anywhere to add a note"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          addNote(window.innerWidth / 2, window.innerHeight / 2);
        }
      }}
    >
      {notes.length === 0 && (
        <div className={styles.hint}>
          <div className={styles.hintTitle}>Tap anywhere</div>
          <div>every tap leaves a note</div>
        </div>
      )}

      {notes.map((note) => (
        <div
          key={note.id}
          className={styles.note}
          style={
            {
              left: note.x,
              top: note.y,
              background: note.color,
              transform: `translate(-50%, -50%) rotate(${note.tilt}deg)`,
              "--tilt": `${note.tilt}deg`,
            } as React.CSSProperties
          }
        >
          <span className={styles.noteText}>{note.text}</span>
        </div>
      ))}

      {notes.length > 0 && (
        <button
          className={styles.clear}
          onClick={(e) => {
            e.stopPropagation();
            setNotes([]);
          }}
        >
          clear the wall
        </button>
      )}
    </div>
  );
}
