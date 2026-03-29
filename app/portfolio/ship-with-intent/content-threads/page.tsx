import type { Metadata } from "next";
import DocumentPage from "@/app/components/DocumentPage";
import { renderMarkdown } from "@/lib/markdown";
import { shipWithIntentNav } from "@/lib/document-nav";

export const metadata: Metadata = {
  title: "Content Threads — Ship With Intent — Nick Carter",
  description:
    "Five threads that organize every piece of content: Intent Engineering, Full-Spectrum Delivery, The Human Layer, Building a Game, and Writing a Novel.",
};

export default function ContentThreadsPage() {
  const html = renderMarkdown("ship-with-intent/content-threads.md");

  return (
    <DocumentPage
      title="Content Threads"
      description="Five threads that organize every piece of content across platforms."
      backLink={{ href: "/portfolio/ship-with-intent", label: "Ship With Intent Overview" }}
      nav={shipWithIntentNav}
    >
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </DocumentPage>
  );
}
