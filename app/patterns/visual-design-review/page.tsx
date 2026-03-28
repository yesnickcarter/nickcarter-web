import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "../../components/ScrollReveal";
import PageTransition from "../../components/PageTransition";
import DesignReviewFlow from "./DesignReviewFlow";
import { renderMarkdown } from "@/lib/markdown";

export const metadata: Metadata = {
  title: "Visual Design Review — AI Patterns — Nick Carter",
  description:
    "Real-time browser mockups for design decisions. See it, click it, decide in seconds instead of paragraphs.",
};

export default function VisualDesignReviewPage() {
  const contentHtml = renderMarkdown("ai-patterns/visual-design-review.md");

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
            Visual Design Review
          </h1>
          <p className="mt-3 text-base text-[#6b6560] max-w-2xl">
            Real-time browser mockups for design decisions
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <DesignReviewFlow />
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div
            className="mt-12 prose"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </ScrollReveal>
      </div>
    </PageTransition>
  );
}
