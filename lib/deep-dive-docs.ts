// lib/deep-dive-docs.ts

export interface DeepDiveDoc {
  id: string;
  title: string;
  filePath: string; // relative to content/ directory
}

export interface DeepDiveGroup {
  artifact: string;
  docs: DeepDiveDoc[];
}

export const deepDiveGroups: DeepDiveGroup[] = [
  {
    artifact: "Resume & Background",
    docs: [
      { id: "resume", title: "Full Resume", filePath: "resume.md" },
    ],
  },
  {
    artifact: "IntentPad",
    docs: [
      { id: "intentpad-overview", title: "Overview", filePath: "intentpad/overview.md" },
      { id: "intentpad-ai-integration", title: "AI Integration", filePath: "intentpad/ai-integration.md" },
      { id: "intentpad-architecture", title: "Architecture", filePath: "intentpad/architecture.md" },
      { id: "intentpad-product-design", title: "Product Design", filePath: "intentpad/product-design.md" },
    ],
  },
  {
    artifact: "Lore Haven",
    docs: [
      { id: "lorehaven-context-architecture", title: "Context Architecture", filePath: "lorehaven/context-architecture.md" },
      { id: "lorehaven-product-design", title: "Product Design", filePath: "lorehaven/product-design.md" },
      { id: "lorehaven-cloud-architecture", title: "Cloud Architecture", filePath: "lorehaven/cloud-architecture.md" },
      { id: "lorehaven-lessons-learned", title: "Lessons Learned", filePath: "lorehaven/lessons-learned.md" },
    ],
  },
  {
    artifact: "Local Brain",
    docs: [
      { id: "local-brain-architecture", title: "Architecture", filePath: "local-brain/architecture.md" },
      { id: "local-brain-security-review", title: "Security Review", filePath: "local-brain/security-review.md" },
      { id: "local-brain-mcp-tools", title: "MCP Tools", filePath: "local-brain/mcp-tools.md" },
      { id: "local-brain-cost-tracking", title: "Cost Tracking", filePath: "local-brain/cost-tracking.md" },
      { id: "local-brain-how-it-was-made", title: "How It Was Made", filePath: "local-brain/how-it-was-made.md" },
      { id: "local-brain-lessons-learned", title: "Lessons Learned", filePath: "local-brain/lessons-learned.md" },
    ],
  },
  {
    artifact: "Ship With Intent",
    docs: [
      { id: "swi-platform-strategy", title: "Platform Strategy", filePath: "ship-with-intent/platform-strategy.md" },
      { id: "swi-workflow", title: "AI-Augmented Workflow", filePath: "ship-with-intent/workflow.md" },
      { id: "swi-structure-and-voice", title: "Structure & Voice", filePath: "ship-with-intent/structure-and-voice.md" },
      { id: "swi-content-threads", title: "Content Threads", filePath: "ship-with-intent/content-threads.md" },
    ],
  },
  {
    artifact: "Tool Audit",
    docs: [
      { id: "tool-audit-how-it-works", title: "How It Works", filePath: "tool-audit/how-it-works.md" },
      { id: "tool-audit-research", title: "The Research", filePath: "tool-audit/the-research.md" },
      { id: "tool-audit-mcp-spec-proposal", title: "MCP Spec Proposal", filePath: "tool-audit/mcp-spec-proposal.md" },
    ],
  },
  {
    artifact: "nickcarter.ai",
    docs: [
      { id: "this-site-design-spec", title: "Design Spec", filePath: "this-site/design-spec.md" },
      { id: "this-site-process-narrative", title: "Process Narrative", filePath: "this-site/process-narrative.md" },
      { id: "this-site-design-decisions", title: "Design Decisions", filePath: "this-site/design-decisions.md" },
      { id: "this-site-lessons-learned", title: "Lessons Learned", filePath: "this-site/lessons-learned.md" },
      { id: "this-site-ask-ai-chat", title: "Ask AI — How It Works", filePath: "this-site/ask-ai-chat.md" },
    ],
  },
  {
    artifact: "Agentic Novel",
    docs: [
      { id: "agentic-process", title: "Process Narrative", filePath: "agentic-novel/process-narrative.md" },
      { id: "agentic-style-guide", title: "Style Guide", filePath: "agentic-novel/style-guide.md" },
      { id: "agentic-skill", title: "The Drafting Skill", filePath: "agentic-novel/skill.md" },
      { id: "agentic-lessons-learned", title: "Lessons Learned", filePath: "agentic-novel/lessons-learned.md" },
    ],
  },
  {
    artifact: "Until The Day Is Over",
    docs: [
      { id: "utdio-concept", title: "Concept", filePath: "until-the-day-is-over/concept.md" },
      { id: "utdio-production", title: "AI & Production", filePath: "until-the-day-is-over/production.md" },
      { id: "utdio-band", title: "The Band", filePath: "until-the-day-is-over/band.md" },
      { id: "utdio-tracks", title: "Track Listing", filePath: "until-the-day-is-over/tracks.md" },
    ],
  },
];

// Flat lookup: docId → DeepDiveDoc
export const deepDiveDocMap = new Map<string, DeepDiveDoc>(
  deepDiveGroups.flatMap((g) => g.docs.map((d) => [d.id, d]))
);
