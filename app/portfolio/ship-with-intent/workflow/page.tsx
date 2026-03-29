import type { Metadata } from "next";
import DocumentPage from "@/app/components/DocumentPage";
import { renderMarkdown } from "@/lib/markdown";
import { shipWithIntentNav } from "@/lib/document-nav";

export const metadata: Metadata = {
  title: "AI-Augmented Workflow — Ship With Intent — Nick Carter",
  description:
    "Claude-assisted interviews, script refinement, metadata generation, and the six-step production pipeline from topic research to multi-platform publish.",
};

export default function WorkflowPage() {
  const html = renderMarkdown("ship-with-intent/workflow.md");

  return (
    <DocumentPage
      title="AI-Augmented Workflow"
      description="The production pipeline from topic research to multi-platform publish."
      backLink={{ href: "/portfolio/ship-with-intent", label: "Ship With Intent Overview" }}
      nav={shipWithIntentNav}
    >
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </DocumentPage>
  );
}
