import type { Metadata } from "next";
import DocumentPage from "@/app/components/DocumentPage";
import { renderMarkdown } from "@/lib/markdown";

export const metadata: Metadata = {
  title: "Style Guide — Agentic — Nick Carter",
  description:
    "Narrative rules, POV system, and craft constraints for the Agentic novel drafting system.",
};

export default function StyleGuidePage() {
  const html = renderMarkdown("agentic-novel/style-guide.md");

  return (
    <DocumentPage
      title="Style Guide — Narrative Rules & POV System"
      description="What goes on the page, how the narrator works, and the rules every sentence must follow."
      backLink={{ href: "/portfolio/agentic-novel", label: "Agentic Overview" }}
    >
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </DocumentPage>
  );
}
