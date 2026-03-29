import type { Metadata } from "next";
import DocumentPage from "@/app/components/DocumentPage";
import { renderMarkdown } from "@/lib/markdown";
import { untilTheDayIsOverNav } from "@/lib/document-nav";

export const metadata: Metadata = {
  title: "AI & Production — Until The Day Is Over — Nick Carter",
  description:
    "Human-written songs with an AI production layer. What that means, what it doesn't, the disclosure philosophy, and why 'band that uses AI' is not 'AI band.'",
};

export default function ProductionPage() {
  const html = renderMarkdown("until-the-day-is-over/production.md");

  return (
    <DocumentPage
      title="AI & Production"
      description="Human-written songs, AI production layer, and a philosophy of transparency."
      backLink={{ href: "/portfolio/until-the-day-is-over", label: "Album Overview" }}
      nav={untilTheDayIsOverNav}
    >
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </DocumentPage>
  );
}
