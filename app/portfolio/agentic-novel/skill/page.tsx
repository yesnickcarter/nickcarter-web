import type { Metadata } from "next";
import DocumentPage from "@/app/components/DocumentPage";
import { renderMarkdown } from "@/lib/markdown";

export const metadata: Metadata = {
  title: "The Drafting Skill (SKILL.md) — Agentic — Nick Carter",
  description:
    "The SKILL.md specification for Agentic: three-layer context loading, 12 prose rules, and plotline siloing for AI-assisted novel drafting.",
};

export default function SkillPage() {
  const html = renderMarkdown("agentic-novel/skill.md");

  return (
    <DocumentPage
      title="The Drafting Skill (SKILL.md)"
      description="The specification that drives every chapter draft — context loading protocol, prose rules, and quality gates."
      backLink={{ href: "/portfolio/agentic-novel", label: "Agentic Overview" }}
    >
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </DocumentPage>
  );
}
