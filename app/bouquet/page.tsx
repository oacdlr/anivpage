import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import BouquetMaker from "./BouquetMaker";

export const metadata: Metadata = { title: "Build a bouquet" };

export default function BouquetPage() {
  return (
    <PageShell title="Build a bouquet" subtitle="pick your flowers">
      <BouquetMaker />
    </PageShell>
  );
}
