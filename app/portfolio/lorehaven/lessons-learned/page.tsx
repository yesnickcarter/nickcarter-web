import type { Metadata } from "next";
import DocumentPage from "@/app/components/DocumentPage";
import { renderMarkdown } from "@/lib/markdown";
import { lorehavenNav } from "@/lib/document-nav";

export const metadata: Metadata = {
  title: "Lessons Learned — LoreHaven — Nick Carter",
  description:
    "What broke, what was redesigned, and what would be done differently in the LoreHaven MCP server project.",
};

export default function LessonsLearnedPage() {
  const html = renderMarkdown("lorehaven/lessons-learned.md");

  return (
    <DocumentPage
      title="Lessons Learned"
      description="What broke, what was redesigned, and what would be done differently."
      backLink={{ href: "/portfolio/lorehaven", label: "LoreHaven Overview" }}
      nav={lorehavenNav}
    >
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </DocumentPage>
  );
}
