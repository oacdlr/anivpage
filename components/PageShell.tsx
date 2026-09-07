import styles from "./PageShell.module.css";

/**
 * The frame every page sits in: centered column, page title, optional subtitle.
 * Deliberately has NO navigation links — each page is reached by tapping its
 * own NFC sticker, not by browsing from another page.
 */
export default function PageShell({
  title,
  subtitle,
  wide = false,
  children,
}: {
  title?: string;
  subtitle?: string;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <main className={`${styles.shell} ${wide ? styles.wide : ""}`}>
      {title && (
        <header className={styles.header}>
          <h1 className={styles.title}>{title}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </header>
      )}
      <div className={styles.body}>{children}</div>
    </main>
  );
}
