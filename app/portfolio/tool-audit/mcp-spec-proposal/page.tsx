import type { Metadata } from "next";
import DocumentPage from "@/app/components/DocumentPage";
import { renderMarkdown } from "@/lib/markdown";
import { toolAuditNav } from "@/lib/document-nav";

export const metadata: Metadata = {
  title: "MCP Spec Proposal — tools/listAll Client Capability — Tool Audit — Nick Carter",
  description:
    "A proposal for the MCP specification: a client capability that lets servers request the aggregated tool manifest for cross-server awareness, enabling audit and routing tools.",
};

export default function MCPSpecProposalPage() {
  const html = renderMarkdown("tool-audit/mcp-spec-proposal.md");

  return (
    <DocumentPage
      title="MCP Spec Proposal"
      description="A proposal for cross-server tool manifest sharing in the MCP specification."
      backLink={{ href: "/portfolio/tool-audit", label: "Tool Audit Overview" }}
      nav={toolAuditNav}
    >
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </DocumentPage>
  );
}
