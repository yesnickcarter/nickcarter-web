import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "../../components/ScrollReveal";
import PageTransition from "../../components/PageTransition";
import DiagramTypes from "./DiagramTypes";
import { renderMarkdown } from "@/lib/markdown";

export const metadata: Metadata = {
  title: "Whiteboard Verification — AI Patterns — Nick Carter",
  description:
    "The AI draws what it understands. You verify before it builds.",
};

export default function WhiteboardVerificationPage() {
  const contentHtml = renderMarkdown("ai-patterns/whiteboard-verification.md");

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
            Whiteboard Verification
          </h1>
          <p className="mt-3 text-base text-[#6b6560] max-w-2xl">
            The AI draws what it understands. You verify before it builds.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <DiagramTypes />
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
