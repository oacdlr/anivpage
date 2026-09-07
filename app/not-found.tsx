import styles from "./home.module.css";

export default function NotFound() {
  return (
    <main className={styles.wrap}>
      <div className={styles.card}>
        <div className={styles.mark}>🌷</div>
        <h1>Wrong turn</h1>
        <p className={styles.line}>
          There&apos;s nothing at this address. Try tapping the sticker again.
        </p>
      </div>
    </main>
  );
}
