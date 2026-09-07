import type { Metadata } from "next";
import Bloom from "./Bloom";

export const metadata: Metadata = { title: "A surprise" };

export default function SurprisePage() {
  return <Bloom />;
}
