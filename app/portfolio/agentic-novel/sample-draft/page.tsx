import type { Metadata } from "next";
import DocumentPage from "@/app/components/DocumentPage";
import { renderMarkdown } from "@/lib/markdown";

export const metadata: Metadata = {
  title: "Sample Draft — Chapter 1 — Agentic — Nick Carter",
  description:
    "Chapter 1: Vigilantes Visit The Senator. The first output from the Agentic AI-assisted novel drafting system.",
};

export default function SampleDraftPage() {
  const html = renderMarkdown("agentic-novel/sample-draft.md");

  return (
    <DocumentPage
      title="Sample Draft — Chapter 1: Vigilantes Visit The Senator"
      description="The first chapter produced by the drafting system. Sloane's voice, the full cast introduction, and a senator held at gunpoint."
      backLink={{ href: "/portfolio/agentic-novel", label: "Agentic Overview" }}
    >
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </DocumentPage>
  );
}
