import type { Metadata } from "next";
import Link from "next/link";
import { artifacts } from "@/lib/artifacts";
import ScrollReveal from "@/app/components/ScrollReveal";
import PageTransition from "@/app/components/PageTransition";

export const metadata: Metadata = {
  title: "nickcarter.ai — Built With AI in One Session — Nick Carter",
  description:
    "A deep dive into how nickcarter.ai was designed, spec'd, planned, and built in a single AI-assisted session — approximately three hours from brainstorm to deployment.",
};

const documents = [
  {
    title: "Design Spec",
    href: "/portfolio/this-site/design-spec",
    description:
      "The full specification — audience, content structure, technical architecture, success criteria",
  },
  {
    title: "Implementation Plan",
    href: "/portfolio/this-site/implementation-plan",
    description:
      "Eight tasks from scaffolding to deploy, each dispatched to a fresh AI subagent",
  },
  {
    title: "Design Decisions",
    href: "/portfolio/this-site/design-decisions",
    description:
      "Every visual choice — editorial direction, hero style, card style, animations — with rationale",
  },
  {
    title: "The Process",
    href: "/portfolio/this-site/process",
    description:
      "How an afternoon article became a deployed website — summary, full narrative",
  },
  {
    title: "Lessons Learned",
    href: "/portfolio/this-site/lessons-learned",
    description:
      "What went wrong, what was corrected, what would be done differently",
  },
  {
    title: "Ask AI — How It Works",
    href: "/portfolio/this-site/ask-ai-chat",
    description:
      "What the AI knows, what rules it follows, confidence tiers, anti-hallucination constraints, and why transparency matters",
  },
];

export default function ThisSitePage() {
  const artifact = artifacts.find((a) => a.id === "this-site");
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
            nickcarter.ai — Built With AI in One Session
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
