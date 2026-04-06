import type { Metadata } from "next";
import DocumentPage from "@/app/components/DocumentPage";
import { renderMarkdown } from "@/lib/markdown";
import { thisSiteNav } from "@/lib/document-nav";

export const metadata: Metadata = {
  title: "Ask AI About Nick — How It Works — Nick Carter",
  description:
    "How the Ask AI chat feature works: what the AI knows, what rules it follows, and why transparency matters.",
};

export default function AskAiChatPage() {
  const html = renderMarkdown("this-site/ask-ai-chat.md");

  return (
    <DocumentPage
      title="Ask AI About Nick — How It Works"
      description="What the AI knows, what rules it follows, and why transparency matters."
      backLink={{ href: "/portfolio/this-site", label: "nickcarter.ai Overview" }}
      nav={thisSiteNav}
    >
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </DocumentPage>
  );
}
