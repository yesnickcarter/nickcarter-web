import type { Metadata } from "next";
import DocumentPage from "@/app/components/DocumentPage";
import { renderMarkdown } from "@/lib/markdown";

export const metadata: Metadata = {
  title: "Sample Chapter Outline — Agentic — Nick Carter",
  description:
    "Chapter 5 outline showing beat structure, hidden layer, and character arc for the Agentic novel.",
};

export default function ChapterOutlinePage() {
  const html = renderMarkdown("agentic-novel/chapter-outline-sample.md");

  return (
    <DocumentPage
      title="Sample Chapter Outline — Chapter 5: Sloane Goes Home"
      description="A complete chapter outline showing beat structure, hidden layer, character arc, and Super Bowl texture notes."
      backLink={{ href: "/portfolio/agentic-novel", label: "Agentic Overview" }}
    >
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </DocumentPage>
  );
}
