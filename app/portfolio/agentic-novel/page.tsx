import type { Metadata } from "next";
import Link from "next/link";
import { artifacts } from "@/lib/artifacts";

export const metadata: Metadata = {
  title: "Agentic — AI-Assisted Novel Drafting System — Nick Carter",
  description:
    "A deep dive into the AI drafting system behind Agentic: a 35-chapter thriller with consistent voice, style rules, and continuity across plotlines.",
};

const documents = [
  {
    title: "The Drafting Skill",
    href: "/portfolio/agentic-novel/skill",
    description:
      "The SKILL.md specification — three-layer context loading, 12 prose rules, plotline siloing",
  },
  {
    title: "Style Guide",
    href: "/portfolio/agentic-novel/style-guide",
    description: "Narrative rules, POV system, what goes on the page",
  },
  {
    title: "Ban List",
    href: "/portfolio/agentic-novel/ban-list",
    description: "Words, phrases, and moves the prose must never use",
  },
  {
    title: "Chapter Outline",
    href: "/portfolio/agentic-novel/chapter-outline",
    description: "Sample chapter outline showing beat structure and hidden layer",
  },
  {
    title: "Progress Tracking",
    href: "/portfolio/agentic-novel/remaining-work",
    description:
      "How work was divided between human decisions and AI execution",
  },
  {
    title: "Sample Draft",
    href: "/portfolio/agentic-novel/sample-draft",
    description: "Chapter 1 — first output from the drafting system",
  },
  {
    title: "The Process",
    href: "/portfolio/agentic-novel/process",
    description:
      "How the system was built in one evening — summary, narrative, and full transcript",
  },
];

export default function AgenticNovelPage() {
  const artifact = artifacts.find((a) => a.id === "agentic-novel");
  if (!artifact) return null;

  const paragraphs = artifact.detail.split("\n\n");

  return (
    <div className="py-16">
      <Link
        href="/portfolio"
        className="text-xs uppercase tracking-[0.12em] text-[#999] hover:text-[#111] transition-colors"
      >
        &larr; Back to Portfolio
      </Link>

      <h1 className="mt-8 text-3xl md:text-4xl font-[family-name:var(--font-serif)] font-normal text-[#111] leading-tight">
        Agentic — AI-Assisted Novel Drafting System
      </h1>

      <p className="mt-4 text-[11px] uppercase tracking-[0.12em] text-[#999]">
        {artifact.skills.join(" \u00B7 ")}
      </p>

      <div className="mt-8 max-w-[65ch] space-y-4">
        {paragraphs.map((paragraph, i) => (
          <p key={i} className="text-base leading-[1.7] text-[#555]">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-20 border-t-2 border-[#111] pt-6">
        <h2 className="text-2xl font-[family-name:var(--font-serif)] font-normal text-[#111] mb-8">
          Documents
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {documents.map((doc) => (
            <Link
              key={doc.href}
              href={doc.href}
              className="group block border-t border-[#ddd] pt-5 hover:border-[#111] transition-colors"
            >
              <h3 className="text-base font-[family-name:var(--font-serif)] font-normal text-[#111] group-hover:text-[#555]">
                {doc.title}
              </h3>
              <p className="mt-2 text-sm text-[#777] leading-relaxed">
                {doc.description}
              </p>
              <p className="mt-3 text-sm font-medium text-[#111] group-hover:text-[#555] transition-colors">
                Read &rarr;
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
