import styles from "./home.module.css";

export default function NotFound() {
  return (
    <main className={styles.wrap}>
      <div className={styles.card}>
        <div className={styles.mark}>🌷</div>
        <h1>Oops aqui no hay nada</h1>
        <p className={styles.line}>
          intentaste acceder a una página que no existe. Intenta tocar el sticker de nuevo.
        </p>
      </div>
    </main>
  );
}
