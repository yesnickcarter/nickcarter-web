import type { Metadata } from "next";
import DocumentPage from "@/app/components/DocumentPage";
import { renderMarkdown } from "@/lib/markdown";
import { untilTheDayIsOverNav } from "@/lib/document-nav";

export const metadata: Metadata = {
  title: "The Concept — Until The Day Is Over — Nick Carter",
  description:
    "Joan and Margot: a daughter singing her mother's life through thirteen remembered songs and one invented from a single conversation. The story behind the album.",
};

export default function ConceptPage() {
  const html = renderMarkdown("until-the-day-is-over/concept.md");

  return (
    <DocumentPage
      title="The Concept"
      description="A daughter sings her mother's life — thirteen songs remembered, one invented from a conversation."
      backLink={{ href: "/portfolio/until-the-day-is-over", label: "Album Overview" }}
      nav={untilTheDayIsOverNav}
    >
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </DocumentPage>
  );
}
