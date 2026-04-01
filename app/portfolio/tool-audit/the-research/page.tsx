import type { Metadata } from "next";
import DocumentPage from "@/app/components/DocumentPage";
import { renderMarkdown } from "@/lib/markdown";
import { toolAuditNav } from "@/lib/document-nav";

export const metadata: Metadata = {
  title: "The Research — MCP Tool Collision Ecosystem Analysis — Tool Audit — Nick Carter",
  description:
    "The MCP protocol gap, how clients handle tool collisions today, model selection accuracy data, and why nobody else has built detection and resolution tooling.",
};

export default function TheResearchPage() {
  const html = renderMarkdown("tool-audit/the-research.md");

  return (
    <DocumentPage
      title="The Research"
      description="The MCP protocol gap and why this problem exists."
      backLink={{ href: "/portfolio/tool-audit", label: "Tool Audit Overview" }}
      nav={toolAuditNav}
    >
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </DocumentPage>
  );
}
