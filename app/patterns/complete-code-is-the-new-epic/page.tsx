import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "../../components/ScrollReveal";
import PageTransition from "../../components/PageTransition";
import { renderMarkdown } from "@/lib/markdown";

export const metadata: Metadata = {
  title: "Complete Code Is the New Epic — AI Patterns — Nick Carter",
  description:
    "Working software is the fastest feedback loop that exists. While teams spend weeks studying how to build something, AI agents deliver entire systems in hours.",
};

export default function CompleteCodeIsTheNewEpicPage() {
  const contentHtml = renderMarkdown("ai-patterns/complete-code-is-the-new-epic.md");

  return (
    <PageTransition>
      <div className="py-16">
        <Link
          href="/patterns"
          className="text-xs uppercase tracking-[0.12em] text-[#a69e95] hover:text-[#1a1a1a] transition-colors"
        >
          &larr; Back to AI Patterns
        </Link>

        <ScrollReveal>
          <h1 className="mt-8 text-3xl md:text-4xl font-[family-name:var(--font-serif)] font-normal text-[#1a1a1a] leading-tight">
            Complete Code Is the New Epic
          </h1>
          <p className="mt-3 text-base text-[#6b6560] max-w-2xl">
            Working software is the fastest feedback loop that exists. Stop
            studying. Start shipping.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div
            className="mt-12 prose"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </ScrollReveal>
      </div>
    </PageTransition>
  );
}
