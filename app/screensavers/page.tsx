import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import ScreensaverGrid from "./ScreensaverGrid";
import screensavers from "@/content/screensavers.json";

export const metadata: Metadata = { title: "Something calm" };

export default function ScreensaversPage() {
  const items = screensavers.map((entry) => ({
    src: `/screensavers/${entry.file}`,
    title: entry.title,
  }));

  return (
    <PageShell title="Something calm" subtitle="pick one and just look at it" wide>
      <ScreensaverGrid items={items} />
    </PageShell>
  );
}
