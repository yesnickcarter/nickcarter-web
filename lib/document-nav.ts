export interface DocNavItem {
  title: string;
  href: string;
}

export interface ArtifactNav {
  artifactTitle: string;
  overviewHref: string;
  documents: DocNavItem[];
}

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
  artifactTitle: "LoreHaven",
  overviewHref: "/portfolio/lorehaven",
  documents: [
    { title: "Context Architecture", href: "/portfolio/lorehaven/context-architecture" },
    { title: "MCP Server", href: "/portfolio/lorehaven/mcp-server" },
    { title: "Client Architecture", href: "/portfolio/lorehaven/client-architecture" },
    { title: "Lessons Learned", href: "/portfolio/lorehaven/lessons-learned" },
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
  ],
};
