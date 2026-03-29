import type { Metadata } from "next";
import DocumentPage from "@/app/components/DocumentPage";
import { renderMarkdown } from "@/lib/markdown";
import { untilTheDayIsOverNav } from "@/lib/document-nav";

export const metadata: Metadata = {
  title: "Track Listing — Until The Day Is Over — Nick Carter",
  description:
    "Fourteen tracks across four acts: the world opens, love and loss, the world closes in, and a reckoning with inherited identity.",
};

export default function TracksPage() {
  const html = renderMarkdown("until-the-day-is-over/tracks.md");

  return (
    <DocumentPage
      title="Track Listing"
      description="Fourteen tracks across four acts — from departure to reckoning."
      backLink={{ href: "/portfolio/until-the-day-is-over", label: "Album Overview" }}
      nav={untilTheDayIsOverNav}
    >
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </DocumentPage>
  );
}
