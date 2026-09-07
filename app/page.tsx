import styles from "./home.module.css";

/**
 * There is deliberately no navigation here. Each of the seven pages is reached
 * by tapping its own NFC sticker — this exists only so that landing on the bare
 * address shows something nice instead of a "page not found".
 */
export default function Home() {
  return (
    <main className={styles.wrap}>
      <div className={styles.card}>
        <div className={styles.mark}>🌸</div>
        <h1>Nothing to see here</h1>
        <p className={styles.line}>
          This one only opens when you tap it. Go find a sticker.
        </p>
      </div>
    </main>
  );
}
