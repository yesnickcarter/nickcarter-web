import type { Metadata } from "next";
import DocumentPage from "@/app/components/DocumentPage";
import { renderMarkdown } from "@/lib/markdown";
import { localBrainNav } from "@/lib/document-nav";

export const metadata: Metadata = {
  title: "How It Was Made — Built Over Telegram Without a Keyboard — Local Brain — Nick Carter",
  description:
    "Local Brain was built entirely over Telegram using Claudegram. From inspiration at a lumber store to open source release — while cutting hard maple in the front yard.",
};

export default function HowItWasMadePage() {
  const html = renderMarkdown("local-brain/how-it-was-made.md");

  return (
    <DocumentPage
      title="How It Was Made"
      description="From inspiration to open source release, without touching a keyboard."
      backLink={{ href: "/portfolio/local-brain", label: "Local Brain Overview" }}
      nav={localBrainNav}
    >
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </DocumentPage>
  );
}
