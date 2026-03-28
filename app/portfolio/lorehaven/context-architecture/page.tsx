import type { Metadata } from "next";
import DocumentPage from "@/app/components/DocumentPage";
import { renderMarkdown } from "@/lib/markdown";
import { lorehavenNav } from "@/lib/document-nav";
import ArchitectureDiagram from "../architecture-diagram";

export const metadata: Metadata = {
  title: "Context Architecture for Non-Technical Users — LoreHaven — Nick Carter",
  description:
    "Vault hierarchy, Lore document design, tier system, and language-as-architecture in the LoreHaven MCP server.",
};

export default function ContextArchitecturePage() {
  const html = renderMarkdown("lorehaven/context-architecture.md");

  return (
    <DocumentPage
      title="Context Architecture for Non-Technical Users"
      description="Vault hierarchy, Lore document design, tier system, and the language-as-architecture principle."
      backLink={{ href: "/portfolio/lorehaven", label: "LoreHaven Overview" }}
      nav={lorehavenNav}
    >
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <ArchitectureDiagram />
    </DocumentPage>
  );
}
