import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "../components/ScrollReveal";
import PageTransition from "../components/PageTransition";

export const metadata: Metadata = {
  title: "AI Patterns — Nick Carter",
  description:
    "How I work with AI — the specific tools, workflows, and interaction patterns that make the collaboration productive.",
};

const patterns = [
  {
    title: "Visual Design Review",
    description:
      "Real-time browser mockups for design decisions. See it, click it, decide in seconds instead of paragraphs.",
    href: "/patterns/visual-design-review",
  },
  {
    title: "Whiteboard Verification",
    description:
      "The AI draws what it understands before building. You verify the diagram, catch misunderstandings, and approve before a line of code is written.",
    href: "/patterns/whiteboard-verification",
  },
  {
    title: "Intentional Obsolescence",
    description:
      "Every spec, skill, and workflow is built to be replaced in 90 days. The artifacts are snapshots. The process that produces them is the skill.",
    href: "/patterns/intentional-obsolescence",
  },
  {
    title: "Just Use AI",
    description:
      "Sign up. Open it. Use it on something real. The adoption curve isn't a learning curve — it's a habit curve.",
    href: "/patterns/just-use-ai",
  },
  {
    title: "Complete Code Is the New Epic",
    description:
      "While teams spend weeks studying how to build something, people with AI agents are delivering entire systems in hours. Working software is the fastest feedback loop that exists.",
    href: "/patterns/complete-code-is-the-new-epic",
  },
];

export default function PatternsPage() {
  return (
    <PageTransition>
      <div className="py-16">
        <ScrollReveal>
          <h1 className="text-3xl md:text-4xl font-[family-name:var(--font-serif)] font-normal text-[#1a1a1a] leading-tight">
            AI Patterns
          </h1>
          <p className="mt-3 text-base text-[#6b6560] max-w-2xl">
            How I work with AI — the specific tools, workflows, and interaction
            patterns that make the collaboration productive.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-6">
          {patterns.map((pattern, i) => (
            <ScrollReveal key={pattern.href} delay={i * 0.1}>
              <Link href={pattern.href} className="block group">
                <div className="border-l-[3px] border-[#b45309] pl-5 py-4 hover:bg-[#f5f3f0] transition-colors">
                  <h2 className="text-xl font-[family-name:var(--font-serif)] font-normal text-[#1a1a1a] group-hover:text-[#b45309] transition-colors">
                    {pattern.title}
                  </h2>
                  <p className="mt-2 text-base text-[#6b6560] leading-relaxed">
                    {pattern.description}
                  </p>
                  <span className="mt-3 inline-block text-xs uppercase tracking-[0.12em] text-[#b45309]">
                    Read pattern &rarr;
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
