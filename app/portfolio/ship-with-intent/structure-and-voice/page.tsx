import type { Metadata } from "next";
import DocumentPage from "@/app/components/DocumentPage";
import { renderMarkdown } from "@/lib/markdown";
import { shipWithIntentNav } from "@/lib/document-nav";

export const metadata: Metadata = {
  title: "Structure & Voice — Ship With Intent — Nick Carter",
  description:
    "The seven-step structure arc, the hook test, peer-to-peer register, analogy placement rules, and the quality checklist that every post must pass.",
};

export default function StructureAndVoicePage() {
  const html = renderMarkdown("ship-with-intent/structure-and-voice.md");

  return (
    <DocumentPage
      title="Structure & Voice"
      description="The seven-step arc, the hook test, and the quality bar that every piece must clear."
      backLink={{ href: "/portfolio/ship-with-intent", label: "Ship With Intent Overview" }}
      nav={shipWithIntentNav}
    >
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </DocumentPage>
  );
}
