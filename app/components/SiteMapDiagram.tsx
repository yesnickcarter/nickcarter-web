"use client";

import { motion } from "framer-motion";
import Link from "next/link";

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function Node({ label, href, desc, accent = false }: { label: string; href?: string; desc?: string; accent?: boolean }) {
  const inner = (
    <div className={`border ${accent ? "border-[#b45309] bg-[#fffbf5]" : "border-[#e8e4df] bg-white"} rounded-md p-3 text-center transition-colors ${href ? "hover:border-[#b45309]" : ""}`}>
      <div className={`font-[family-name:var(--font-serif)] text-[13px] ${accent ? "text-[#b45309]" : "text-[#1a1a1a]"}`}>{label}</div>
      {desc && <div className="text-[10px] text-[#a69e95] mt-1 leading-tight">{desc}</div>}
    </div>
  );
  if (href) return <Link href={href}>{inner}</Link>;
  return inner;
}

export default function SiteMapDiagram() {
  return (
    <div className="my-12">
      <FadeIn>
        <h2 className="font-[family-name:var(--font-serif)] text-xl text-[#b45309] mb-1">
          What's on This Site
        </h2>
        <p className="text-sm text-[#6b6560] mb-8">
          Artifacts, patterns, and process documentation — click to explore
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        {/* Center: Home */}
        <div className="flex justify-center mb-4">
          <Node label="nickcarter.ai" accent desc="You are here" />
        </div>

        {/* Connector */}
        <div className="flex justify-center mb-4">
          <div className="flex gap-16 md:gap-24">
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-6 bg-[#b45309]" />
            </div>
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-6 bg-[#b45309]" />
            </div>
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-6 bg-[#b45309]" />
            </div>
          </div>
        </div>

        {/* Three branches */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Portfolio */}
          <div>
            <Node label="Portfolio" href="/portfolio" accent desc="All artifacts" />
            <div className="flex justify-center my-2">
              <div className="w-0.5 h-4 bg-[#e8e4df]" />
            </div>
            <div className="space-y-2">
              <Node label="LoreHaven" href="/portfolio/lorehaven" desc="MCP server · context vault" />
              <Node label="Local Brain" href="/portfolio/local-brain" desc="Self-hosted AI memory layer" />
              <Node label="CLAUDE.md Systems" href="/portfolio/claude-md-systems" desc="Persistent AI memory" />
              <Node label="Ship With Intent" href="/portfolio/ship-with-intent" desc="Content operation" />
              <Node label="Agentic Novel" href="/portfolio/agentic-novel" desc="35-chapter drafting system" />
              <Node label="This Site" href="/portfolio/this-site" desc="Built in one session" />
              <Node label="Album" href="/portfolio/until-the-day-is-over" desc="AI-augmented music" />
            </div>
          </div>

          {/* AI Patterns */}
          <div>
            <Node label="AI Patterns" href="/patterns" accent desc="How I work with AI" />
            <div className="flex justify-center my-2">
              <div className="w-0.5 h-4 bg-[#e8e4df]" />
            </div>
            <div className="space-y-2">
              <Node label="Visual Design Review" href="/patterns/visual-design-review" desc="Browser mockups for decisions" />
              <Node label="Whiteboard Verification" href="/patterns/whiteboard-verification" desc="AI draws before it builds" />
              <Node label="Intentional Obsolescence" href="/patterns/intentional-obsolescence" desc="Build to be replaced" />
              <Node label="Just Use AI" href="/patterns/just-use-ai" desc="The habit curve" />
              <Node label="Complete Code" href="/patterns/complete-code-is-the-new-epic" desc="Working software as feedback" />
            </div>
          </div>

          {/* Deep Dives */}
          <div>
            <Node label="Deep Dives" accent desc="Process documents inside" />
            <div className="flex justify-center my-2">
              <div className="w-0.5 h-4 bg-[#e8e4df]" />
            </div>
            <div className="space-y-2">
              <Node label="7 Agentic docs" href="/portfolio/agentic-novel" desc="Skill, style guide, ban list, drafts..." />
              <Node label="6 Local Brain docs" href="/portfolio/local-brain" desc="Architecture, security, cost tracking..." />
              <Node label="5 Site docs" href="/portfolio/this-site" desc="Spec, plan, design decisions..." />
              <Node label="4 LoreHaven docs" href="/portfolio/lorehaven" desc="Architecture, MCP, client..." />
              <Node label="4 CLAUDE.md docs" href="/portfolio/claude-md-systems" desc="Architecture, commands, journal..." />
              <Node label="4 Ship With Intent docs" href="/portfolio/ship-with-intent" desc="Threads, voice, platform, workflow..." />
              <Node label="4 Album docs" href="/portfolio/until-the-day-is-over" desc="Concept, band, tracks, production..." />
              <Node label="llms.txt" desc="AI-readable endpoints" />
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
