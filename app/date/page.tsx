import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import DateForm from "./DateForm";
import ideas from "@/content/date-ideas.json";
import type { DateIdea } from "@/lib/pickDate";

export const metadata: Metadata = { title: "Let's plan a date" };

export default function DatePage() {
  return (
    <PageShell
      title="Let's plan a date"
      subtitle="answer three things and it's booked"
    >
      <DateForm ideas={ideas as DateIdea[]} />
    </PageShell>
  );
}
