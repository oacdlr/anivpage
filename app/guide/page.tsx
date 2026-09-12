import path from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import PageShell from "@/components/PageShell";
import GuideSteps from "./GuideSteps";
import guide from "@/content/guide.json";
import { imageSize } from "@/lib/imageSize";
import styles from "./guide.module.css";

export const metadata: Metadata = { title: "Guia" };

/**
 * Shape used when a screenshot's header can't be read, or when the slot is
 * still empty — an upright modern iPhone, which is what these will all be.
 */
const FALLBACK = { width: 1170, height: 2532 };

/**
 * The two iPhone shortcuts, and how to set them up.
 *
 * Unlike the other pages this one is instructions rather than a gift: iOS
 * won't let a web page create an NFC automation, so those two bits have to be
 * installed by hand. Everything shown here comes out of content/guide.json —
 * an empty icon, link or filename in there renders a marked placeholder
 * instead of breaking, so the page is safe to deploy half-finished.
 */
export default function GuidePage() {
  const steps = guide.steps.map((step) => {
    if (!step.file) return { caption: step.caption };
    const size =
      imageSize(path.join(process.cwd(), "public", "guide", step.file)) ?? FALLBACK;
    return {
      src: `/guide/${step.file}`,
      caption: step.caption,
      width: size.width,
      height: size.height,
    };
  });

  return (
    <PageShell title="Guia" subtitle="hubo cosas que no podia configurar desde aqui">
      <section className={styles.section}>
        <h2 className={styles.heading}>Que descargar?</h2>
        <div className={styles.downloads}>
          {guide.shortcuts.map((shortcut, i) => (
            <ShortcutCard key={shortcut.name} shortcut={shortcut} index={i} />
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Como configurar</h2>
        <GuideSteps steps={steps} />
      </section>
    </PageShell>
  );
}

type Shortcut = { name: string; icon: string; url: string; note: string };

/**
 * One row in "Que descargar?": icon, name, and a tap target covering the whole
 * card. Without a `url` yet it stays a plain div — a card that looks tappable
 * but goes nowhere is worse than one that says it isn't ready.
 */
function ShortcutCard({ shortcut, index }: { shortcut: Shortcut; index: number }) {
  const body = (
    <>
      {shortcut.icon ? (
        <Image
          src={`/guide/${shortcut.icon}`}
          alt=""
          width={64}
          height={64}
          className={styles.icon}
        />
      ) : (
        <div className={`${styles.icon} ${styles.iconEmpty}`}>icono</div>
      )}

      <div className={styles.cardText}>
        <span className={styles.cardName}>{shortcut.name}</span>
        {shortcut.note && <span className={styles.cardNote}>{shortcut.note}</span>}
      </div>

      {shortcut.url ? (
        <span className={styles.pill}>Descargar</span>
      ) : (
        <span className={`${styles.pill} ${styles.pillEmpty}`}>link pendiente</span>
      )}
    </>
  );

  const style = { animationDelay: `${index * 70}ms` };

  if (!shortcut.url) {
    return (
      <div className={`${styles.card} ${styles.cardIdle}`} style={style}>
        {body}
      </div>
    );
  }

  return (
    <a
      className={styles.card}
      style={style}
      href={shortcut.url}
      /* Opens in a new tab so the guide is still there behind Shortcuts. */
      target="_blank"
      rel="noopener noreferrer"
    >
      {body}
    </a>
  );
}
