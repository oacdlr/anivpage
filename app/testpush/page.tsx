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
          &ldquo;I&rsquo;m as human as anyone. I love, I get scared. I wake up
          every morning and, despite not knowing what to do, I put one foot in
          front of the other and I try to make the best choices I can.&rdquo;
        </p>
        <footer>
          — Superman, <cite>Superman</cite>
        </footer>
      </blockquote>
    </PageShell>
  );
}
