import type { Metadata } from "next";
import PostItWall from "./PostItWall";
import messages from "@/content/post-its.json";

export const metadata: Metadata = { title: "The wall" };

/**
 * Notes live in component state only — closing the page clears the wall,
 * which is intentional. Nothing is saved anywhere.
 */
export default function PostItsPage() {
  return <PostItWall messages={messages} />;
}
