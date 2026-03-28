import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "../../components/ScrollReveal";
import PageTransition from "../../components/PageTransition";
import ObsolescenceTimeline from "./ObsolescenceTimeline";
import { renderMarkdown } from "@/lib/markdown";

export const metadata: Metadata = {
  title: "Intentional Obsolescence — AI Patterns — Nick Carter",
  description:
    "Build to be replaced. The artifacts expire. The process compounds.",
};

export default function IntentionalObsolescencePage() {
  const contentHtml = renderMarkdown("ai-patterns/intentional-obsolescence.md");

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
            Intentional Obsolescence
          </h1>
          <p className="mt-3 text-base text-[#6b6560] max-w-2xl">
            Build to be replaced. The artifacts expire. The process compounds.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <ObsolescenceTimeline />
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
