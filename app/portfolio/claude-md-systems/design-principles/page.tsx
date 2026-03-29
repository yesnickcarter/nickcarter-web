import type { Metadata } from "next";
import DocumentPage from "@/app/components/DocumentPage";
import { renderMarkdown } from "@/lib/markdown";
import { claudeMdNav } from "@/lib/document-nav";

export const metadata: Metadata = {
  title: "Design Principles — CLAUDE.md Systems — Nick Carter",
  description:
    "Omission over inclusion, self-review checklists as spec compliance, and why treating CLAUDE.md as an API specification changes how AI works with your code.",
};

export default function DesignPrinciplesPage() {
  const html = renderMarkdown("claude-md-systems/design-principles.md");

  return (
    <DocumentPage
      title="Design Principles"
      description="Omission over inclusion, self-review checklists, and CLAUDE.md as API specification."
      backLink={{ href: "/portfolio/claude-md-systems", label: "CLAUDE.md Systems Overview" }}
      nav={claudeMdNav}
    >
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </DocumentPage>
  );
}
