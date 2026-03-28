import type { Metadata } from "next";
import DocumentPage from "@/app/components/DocumentPage";
import { renderMarkdown } from "@/lib/markdown";
import { lorehavenNav } from "@/lib/document-nav";

export const metadata: Metadata = {
  title: "Client Architecture — Desktop App as Service Host — LoreHaven — Nick Carter",
  description:
    "Electron service layer, config merge strategy, browser OAuth, and monorepo structure for the LoreHaven desktop client.",
};

export default function ClientArchitecturePage() {
  const html = renderMarkdown("lorehaven/client-architecture.md");

  return (
    <DocumentPage
      title="Client Architecture — Desktop App as Service Host"
      description="Electron service layer, config merge strategy, browser OAuth, and monorepo structure."
      backLink={{ href: "/portfolio/lorehaven", label: "LoreHaven Overview" }}
      nav={lorehavenNav}
    >
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </DocumentPage>
  );
}
