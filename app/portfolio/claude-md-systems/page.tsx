import type { Metadata } from "next";
import Link from "next/link";
import { artifacts } from "@/lib/artifacts";
import ScrollReveal from "@/app/components/ScrollReveal";
import PageTransition from "@/app/components/PageTransition";

export const metadata: Metadata = {
  title: "CLAUDE.md Systems — Persistent Context Architecture for AI — Nick Carter",
  description:
    "A four-layer context architecture spanning 12+ repositories: CLAUDE.md files, custom commands, the Lore Journal, and a design principle of omission over inclusion.",
};

const documents = [
  {
    title: "Four-Layer Architecture",
    href: "/portfolio/claude-md-systems/architecture",
    description:
      "Global memory, repo-level CLAUDE.md, project memory, and custom commands — how four layers create continuity across sessions",
  },
  {
    title: "Custom Commands",
    href: "/portfolio/claude-md-systems/commands",
    description:
      "15+ slash commands for journal capture, task management, weekly planning, and content review",
  },
  {
    title: "Lore Journal",
    href: "/portfolio/claude-md-systems/lore-journal",
    description:
      "A structured capture system with six entry types, auto-classification, ISO week reviews, and a path to productization",
  },
  {
    title: "Design Principles",
    href: "/portfolio/claude-md-systems/design-principles",
    description:
      "Omission over inclusion, self-review checklists, and why treating CLAUDE.md as an API spec changes everything",
  },
];

export default function ClaudeMdSystemsPage() {
  const artifact = artifacts.find((a) => a.id === "claude-md-systems");
  if (!artifact) return null;

  const paragraphs = artifact.detail.split("\n\n");

  return (
    <PageTransition>
      <div className="py-16">
        <Link
          href="/portfolio"
          className="text-xs uppercase tracking-[0.12em] text-[#a69e95] hover:text-[#1a1a1a] transition-colors"
        >
          &larr; Back to Portfolio
        </Link>

        <ScrollReveal>
          <h1 className="mt-8 text-3xl md:text-4xl font-[family-name:var(--font-serif)] font-normal text-[#1a1a1a] leading-tight">
            CLAUDE.md Systems — Persistent Context for AI
          </h1>

          <p className="mt-4 text-[11px] uppercase tracking-[0.12em] text-[#a69e95]">
            {artifact.skills.join(" \u00B7 ")}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mt-8 max-w-[65ch] space-y-4">
            {paragraphs.map((paragraph, i) => (
              <p key={i} className="text-base leading-[1.7] text-[#4a4540]">
                {paragraph}
              </p>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-20 border-t-2 border-[#1a1a1a] pt-6">
            <h2 className="text-2xl font-[family-name:var(--font-serif)] font-normal text-[#1a1a1a] mb-8">
              Documents
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {documents.map((doc, i) => (
                <ScrollReveal key={doc.href} delay={i * 0.08}>
                  <Link
                    href={doc.href}
                    className="group block border-t border-[#e8e4df] pt-5 hover:border-[#b45309] transition-colors"
                  >
                    <h3 className="text-base font-[family-name:var(--font-serif)] font-normal text-[#1a1a1a] group-hover:text-[#6b6560]">
                      {doc.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#6b6560] leading-relaxed">
                      {doc.description}
                    </p>
                    <p className="mt-3 text-sm font-medium text-[#b45309] group-hover:text-[#92400e] transition-colors view-details-link">
                      Read <span className="view-details-arrow">&rarr;</span>
                    </p>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </PageTransition>
  );
}
