import type { Metadata } from "next";
import DocumentPage from "@/app/components/DocumentPage";
import { renderMarkdown } from "@/lib/markdown";
import { claudeMdNav } from "@/lib/document-nav";

export const metadata: Metadata = {
  title: "Four-Layer Architecture — CLAUDE.md Systems — Nick Carter",
  description:
    "Global memory, repo-level CLAUDE.md, project memory, and custom commands — how four layers create AI continuity across sessions and repositories.",
};

export default function ArchitecturePage() {
  const html = renderMarkdown("claude-md-systems/architecture.md");

  return (
    <DocumentPage
      title="Four-Layer Architecture"
      description="Global memory, repo-level CLAUDE.md, project memory, and custom commands working together."
      backLink={{ href: "/portfolio/claude-md-systems", label: "CLAUDE.md Systems Overview" }}
      nav={claudeMdNav}
    >
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </DocumentPage>
  );
}
