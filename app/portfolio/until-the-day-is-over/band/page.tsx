import type { Metadata } from "next";
import DocumentPage from "@/app/components/DocumentPage";
import { renderMarkdown } from "@/lib/markdown";
import { untilTheDayIsOverNav } from "@/lib/document-nav";

export const metadata: Metadata = {
  title: "The Band — Until The Day Is Over — Nick Carter",
  description:
    "Four composite characters drawn from real people: Joan Sable, Arc, Leigh Sable, and Kid Fisto. How each brings something the others can't.",
};

export default function BandPage() {
  const html = renderMarkdown("until-the-day-is-over/band.md");

  return (
    <DocumentPage
      title="The Band"
      description="Four composite characters — each drawn from real people with real histories."
      backLink={{ href: "/portfolio/until-the-day-is-over", label: "Album Overview" }}
      nav={untilTheDayIsOverNav}
    >
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </DocumentPage>
  );
}
