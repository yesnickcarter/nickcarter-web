import type { Metadata } from "next";
import DocumentPage from "@/app/components/DocumentPage";
import { renderMarkdown } from "@/lib/markdown";
import { claudeMdNav } from "@/lib/document-nav";

export const metadata: Metadata = {
  title: "Custom Commands — CLAUDE.md Systems — Nick Carter",
  description:
    "15+ slash commands for journal capture, task management, weekly planning, content review, and novel writing — all defined as markdown prompt templates.",
};

export default function CommandsPage() {
  const html = renderMarkdown("claude-md-systems/commands.md");

  return (
    <DocumentPage
      title="Custom Commands"
      description="15+ slash commands for journal capture, task management, weekly planning, and content review."
      backLink={{ href: "/portfolio/claude-md-systems", label: "CLAUDE.md Systems Overview" }}
      nav={claudeMdNav}
    >
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </DocumentPage>
  );
}
