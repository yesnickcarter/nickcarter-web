import type { Metadata } from "next";
import DocumentPage from "@/app/components/DocumentPage";
import { renderMarkdown } from "@/lib/markdown";
import { toolAuditNav } from "@/lib/document-nav";

export const metadata: Metadata = {
  title: "How It Works — Audit Process and Reactive Fix — Tool Audit — Nick Carter",
  description:
    "Six-step collision detection: enumerate tools, detect conflicts, score severity, report, recommend fixes, and apply routing rules. Plus the /wrong-tool reactive flow.",
};

export default function HowItWorksPage() {
  const html = renderMarkdown("tool-audit/how-it-works.md");

  return (
    <DocumentPage
      title="How It Works"
      description="The audit process: detection, scoring, and permanent fixes."
      backLink={{ href: "/portfolio/tool-audit", label: "Tool Audit Overview" }}
      nav={toolAuditNav}
    >
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </DocumentPage>
  );
}
