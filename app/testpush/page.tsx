import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = { title: "Test push" };

/**
 * Started as a throwaway page to confirm that pushing to GitHub triggers a
 * Vercel rebuild. It did, and it stays: no NFC sticker points here, so it's
 * kept on purpose as an unlisted easter egg. The quote gets swapped now and
 * then — that's the whole point of it.
 */
export default function TestPushPage() {
  return (
    <PageShell title="Test push" subtitle="checking the deploy pipeline">
      <blockquote>
        <p>
          &ldquo;Sharing tea with a fascinating stranger is one of life&rsquo;s
          true delights.&rdquo;
        </p>
        <footer>
          — Uncle Iroh, <cite>Avatar: The Last Airbender</cite>
        </footer>
      </blockquote>
    </PageShell>
  );
}
