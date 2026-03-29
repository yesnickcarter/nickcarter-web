import type { Metadata } from "next";
import DocumentPage from "@/app/components/DocumentPage";
import { renderMarkdown } from "@/lib/markdown";
import { shipWithIntentNav } from "@/lib/document-nav";

export const metadata: Metadata = {
  title: "Platform Strategy — Ship With Intent — Nick Carter",
  description:
    "Each platform has a role: Substack free for ideas, paid for artifacts, YouTube for concepts, LinkedIn for leadership signal. Not 'write once, post everywhere.'",
};

export default function PlatformStrategyPage() {
  const html = renderMarkdown("ship-with-intent/platform-strategy.md");

  return (
    <DocumentPage
      title="Platform Strategy"
      description="Each platform has a specific role — not 'write once, post everywhere.'"
      backLink={{ href: "/portfolio/ship-with-intent", label: "Ship With Intent Overview" }}
      nav={shipWithIntentNav}
    >
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </DocumentPage>
  );
}
