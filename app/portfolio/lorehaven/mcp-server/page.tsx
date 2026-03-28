import type { Metadata } from "next";
import DocumentPage from "@/app/components/DocumentPage";
import { renderMarkdown } from "@/lib/markdown";
import { lorehavenNav } from "@/lib/document-nav";

export const metadata: Metadata = {
  title: "MCP Server — Exposing a Local-First Vault — LoreHaven — Nick Carter",
  description:
    "Resource URI scheme, session identity, stdio transport, and security model for the LoreHaven MCP server.",
};

export default function McpServerPage() {
  const html = renderMarkdown("lorehaven/mcp-server.md");

  return (
    <DocumentPage
      title="MCP Server — Exposing a Local-First Vault"
      description="Resource URI scheme, session identity, stdio transport, and the security model that keeps path traversal out."
      backLink={{ href: "/portfolio/lorehaven", label: "LoreHaven Overview" }}
      nav={lorehavenNav}
    >
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </DocumentPage>
  );
}
