import type { Metadata } from "next";
import DocumentPage from "@/app/components/DocumentPage";
import { renderMarkdown } from "@/lib/markdown";
import { claudeMdNav } from "@/lib/document-nav";

export const metadata: Metadata = {
  title: "Lore Journal — CLAUDE.md Systems — Nick Carter",
  description:
    "A structured capture system with six entry types, auto-classification, ISO week reviews, and a three-phase roadmap from skill to MCP server to product.",
};

export default function LoreJournalPage() {
  const html = renderMarkdown("claude-md-systems/lore-journal.md");

  return (
    <DocumentPage
      title="Lore Journal"
      description="Structured capture, auto-classification, ISO week reviews, and a path from skill to product."
      backLink={{ href: "/portfolio/claude-md-systems", label: "CLAUDE.md Systems Overview" }}
      nav={claudeMdNav}
    >
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </DocumentPage>
  );
}
