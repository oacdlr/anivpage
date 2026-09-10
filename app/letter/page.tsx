import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import LetterReveal from "./LetterReveal";

export const metadata: Metadata = { title: "Una cartita" };

/**
 * The letter text lives in content/letter.md so it can be edited without
 * touching any code. Blank lines separate paragraphs; nothing else is special.
 */
function readLetter(): string[] {
  const file = path.join(process.cwd(), "content", "letter.md");
  const raw = fs.readFileSync(file, "utf8");
  return raw
    .split(/\n\s*\n/)
    .map((block) => block.trim().replace(/\s*\n\s*/g, " "))
    .filter(Boolean);
}

export default function LetterPage() {
  const paragraphs = readLetter();

  return (
    <PageShell>
      <LetterReveal paragraphs={paragraphs} />
    </PageShell>
  );
}
