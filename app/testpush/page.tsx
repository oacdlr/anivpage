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
        <p>
          &ldquo;When people are protecting something truly special to them,
          they truly can become&hellip; as strong as they can be.&rdquo;
        </p>
        <footer>— Naruto Uzumaki, <cite>Naruto</cite></footer>
      </blockquote>
    </PageShell>
  );
}
