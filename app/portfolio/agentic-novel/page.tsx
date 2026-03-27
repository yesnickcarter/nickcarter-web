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
    <div className="py-16 px-6 md:px-0">
      <Link
        href="/portfolio"
        className="text-sm font-medium text-zinc-500 hover:text-zinc-700 transition-colors"
      >
        &larr; Back to Portfolio
      </Link>

      <h1 className="mt-6 text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight">
        Agentic — AI-Assisted Novel Drafting System
      </h1>

      <div className="mt-4 flex flex-wrap gap-2">
        {artifact.skills.map((skill) => (
          <span
            key={skill}
            className="inline-block rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-8 max-w-3xl space-y-4">
        {paragraphs.map((paragraph, i) => (
          <p key={i} className="text-base leading-relaxed text-zinc-700">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="text-xl font-semibold text-zinc-900 mb-6">Documents</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {documents.map((doc) => (
            <Link
              key={doc.href}
              href={doc.href}
              className="group block rounded-lg border border-zinc-200 p-6 hover:border-zinc-400 hover:shadow-sm transition-all"
            >
              <h3 className="text-lg font-semibold text-zinc-900 group-hover:text-zinc-700">
                {doc.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
                {doc.description}
              </p>
              <p className="mt-4 text-sm font-medium text-zinc-500 group-hover:text-zinc-700 transition-colors">
                Read &rarr;
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
