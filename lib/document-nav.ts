export interface DocNavItem {
  title: string;
  href: string;
}

export interface ArtifactNav {
  artifactTitle: string;
  overviewHref: string;
  documents: DocNavItem[];
}

export const localBrainNav: ArtifactNav = {
  artifactTitle: "Local Brain",
  overviewHref: "/portfolio/local-brain",
  documents: [
    { title: "Architecture", href: "/portfolio/local-brain/architecture" },
    { title: "Security Review", href: "/portfolio/local-brain/security-review" },
    { title: "MCP Tools", href: "/portfolio/local-brain/mcp-tools" },
    { title: "Cost Tracking", href: "/portfolio/local-brain/cost-tracking" },
    { title: "Lessons Learned", href: "/portfolio/local-brain/lessons-learned" },
    { title: "How It Was Made", href: "/portfolio/local-brain/how-it-was-made" },
  ],
};

export const agenticNovelNav: ArtifactNav = {
  artifactTitle: "Agentic",
  overviewHref: "/portfolio/agentic-novel",
  documents: [
    { title: "The Drafting Skill", href: "/portfolio/agentic-novel/skill" },
    { title: "Style Guide", href: "/portfolio/agentic-novel/style-guide" },
    { title: "Ban List", href: "/portfolio/agentic-novel/ban-list" },
    { title: "Chapter Outline", href: "/portfolio/agentic-novel/chapter-outline" },
    { title: "Progress Tracking", href: "/portfolio/agentic-novel/remaining-work" },
    { title: "Sample Draft", href: "/portfolio/agentic-novel/sample-draft" },
    { title: "The Process", href: "/portfolio/agentic-novel/process" },
  ],
};

export const lorehavenNav: ArtifactNav = {
  artifactTitle: "Lore Haven",
  overviewHref: "/portfolio/lorehaven",
  documents: [
    { title: "Context Architecture", href: "/portfolio/lorehaven/context-architecture" },
    { title: "Product Design", href: "/portfolio/lorehaven/product-design" },
    { title: "Cloud Architecture", href: "/portfolio/lorehaven/cloud-architecture" },
    { title: "Lessons Learned", href: "/portfolio/lorehaven/lessons-learned" },
  ],
};

export const shipWithIntentNav: ArtifactNav = {
  artifactTitle: "Ship With Intent",
  overviewHref: "/portfolio/ship-with-intent",
  documents: [
    { title: "Content Threads", href: "/portfolio/ship-with-intent/content-threads" },
    { title: "Structure & Voice", href: "/portfolio/ship-with-intent/structure-and-voice" },
    { title: "Platform Strategy", href: "/portfolio/ship-with-intent/platform-strategy" },
    { title: "AI-Augmented Workflow", href: "/portfolio/ship-with-intent/workflow" },
  ],
};

export const untilTheDayIsOverNav: ArtifactNav = {
  artifactTitle: "Until The Day Is Over",
  overviewHref: "/portfolio/until-the-day-is-over",
  documents: [
    { title: "The Concept", href: "/portfolio/until-the-day-is-over/concept" },
    { title: "The Band", href: "/portfolio/until-the-day-is-over/band" },
    { title: "Track Listing", href: "/portfolio/until-the-day-is-over/tracks" },
    { title: "AI & Production", href: "/portfolio/until-the-day-is-over/production" },
  ],
};

export const toolAuditNav: ArtifactNav = {
  artifactTitle: "Tool Audit",
  overviewHref: "/portfolio/tool-audit",
  documents: [
    { title: "How It Works", href: "/portfolio/tool-audit/how-it-works" },
    { title: "The Research", href: "/portfolio/tool-audit/the-research" },
    { title: "MCP Spec Proposal", href: "/portfolio/tool-audit/mcp-spec-proposal" },
  ],
};

export const thisSiteNav: ArtifactNav = {
  artifactTitle: "nickcarter.ai",
  overviewHref: "/portfolio/this-site",
  documents: [
    { title: "Design Spec", href: "/portfolio/this-site/design-spec" },
    { title: "Implementation Plan", href: "/portfolio/this-site/implementation-plan" },
    { title: "Design Decisions", href: "/portfolio/this-site/design-decisions" },
    { title: "The Process", href: "/portfolio/this-site/process" },
    { title: "Lessons Learned", href: "/portfolio/this-site/lessons-learned" },
    { title: "Ask AI — How It Works", href: "/portfolio/this-site/ask-ai-chat" },
  ],
};
