import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = { title: "Test push" };

/**
 * Throwaway page: exists only to confirm that pushing to GitHub triggers a
 * Vercel rebuild. No NFC sticker points here — delete it once the deploy
 * pipeline is confirmed working.
 */
export default function TestPushPage() {
  return (
    <PageShell title="Test push" subtitle="checking the deploy pipeline">
      <blockquote>
        <p>&ldquo;A heart&rsquo;s a heavy burden.&rdquo;</p>
        <footer>— Calcifer, <cite>Howl&rsquo;s Moving Castle</cite></footer>
      </blockquote>
    </PageShell>
  );
}
