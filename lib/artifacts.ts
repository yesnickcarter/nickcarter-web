export interface Artifact {
  id: string;
  title: string;
  oneLiner: string;
  skills: string[];
  section: "build" | "create";
  detail: string;
  links?: { label: string; url: string }[];
  deepDivePath?: string;
}

export const artifacts: Artifact[] = [
  {
    id: "intentpad",
    title: "IntentPad",
    oneLiner:
      "An AI-powered productivity system — capture thoughts in one field, let AI classify them, plan your week with two goals per day, and learn how you work through AI-generated weekly reviews.",
    skills: ["Full-Stack Product Development", "AI Integration", "Product Design", "Custom Auth", "Design Systems"],
    section: "build",
    detail:
      "Most productivity apps give you a list. Lists don't work — they grow faster than you can check things off, and the important stuff drowns in the noise. IntentPad takes a different approach: capture anything in a single text field, let AI classify it (note, task, or event), then plan your week with just two commitments per day — a Primary Goal and a Secondary Goal.\n\nThe constraint is the feature. When you can only pick two things, you have to decide what actually matters. The weekly planner is a negotiation with your future self — you set three outcomes for the week (Big 3), fill your daily slots, and at the end of the week, AI analyzes what happened. Not to judge, but to help you see patterns: 'You completed everything Monday through Wednesday. Nothing after Wednesday got done.' Week after week, you learn your rhythm.\n\nBuilt end-to-end in a single session: custom JWT auth with refresh token rotation (no third-party auth providers), AI classification with confidence-based graduation (high confidence auto-promotes notes to tasks, medium suggests, low stays as note), the Pulp & Ink comic book design system with halftone textures and inky shadows, a three-column desktop planner cockpit, responsive mobile views, Stripe billing, GDPR-compliant account deletion with an external ledger, and Resend email integration.\n\nThe tech stack: Hono API on Node.js, Drizzle ORM with PostgreSQL, Next.js frontend, OpenAI GPT-4o-mini for classification, Tailwind CSS with a custom comic book design system. Deployed on Cloudflare Pages and Railway.",
    links: [{ label: "IntentPad", url: "https://intentpad.com" }],
  },
  {
    id: "lorehaven",
    title: "Lore Haven",
    oneLiner:
      "A consumer web app that solves the AI cold start problem — portable context for non-technical users.",
    skills: ["Product Design", "Context Architecture", "Specification Precision"],
    section: "build",
    detail:
      "Every conversation with AI starts the same way: you explain who you are, what you're working on, and how you like to work. Then the session ends and the AI forgets everything. Next conversation, you start over. Worse — context you build in Claude doesn't transfer to ChatGPT. Switch devices and you start from zero. The tool that's supposed to save you time is wasting it on the same onboarding loop, trapped inside products that compete with each other.\n\nLore Haven exists because that problem is solvable and nobody is solving it. The idea: write down who you are once — your role, your projects, your preferences, how you think — in a portable document that works with any AI tool. Not locked to Claude, not locked to ChatGPT. Yours.\n\nThe product is a web app with a guided wizard called the Lore Builder. It asks plain-English questions (\"What does a typical week look like?\") and assembles the answers into a structured Lore document — 300-600 words, ready to paste into any AI tool's instructions. Five starter packs (Entrepreneur, Creative, Executive, Parent, Student) solve the blank-page problem for non-technical users who don't know what to tell AI. The Haven vault stores the Lore and saved prompts — all versioned, all exportable as plain text, all owned by the user.\n\nThe architecture pivoted significantly during design. The original plan was an Electron desktop app with a local MCP server. When Claude Desktop added remote MCP support, the blocking constraint disappeared — and with it, the entire desktop architecture. The current stack is cloud-first: Next.js on Cloudflare Pages, S3-compatible storage, Stripe billing. Simpler to build, better for cross-device access, and the only realistic entry point for non-technical users who won't install a side-loaded desktop app.",
    links: [{ label: "Lore Haven", url: "https://lorehaven.ai" }],
    deepDivePath: "/portfolio/lorehaven",
  },
  {
    id: "local-brain",
    title: "Local Brain",
    oneLiner:
      "A self-hosted MCP memory layer — nine tools, an admin panel, and a full security hardening pass. All data stays on your hardware.",
    skills: ["Trust Boundary Design", "Decomposition", "Specification Precision", "Cost & Token Economics"],
    section: "build",
    detail:
      "AI tools don't remember anything. Every session starts from zero. LoreHaven solves context — it tells the AI who you are. Local Brain solves memory — it lets the AI remember what you've thought about, worked on, and decided. Capture a thought in one conversation, search for it six months later in a different tool. The AI handles the MCP calls transparently. You just talk.\n\nThe implementation is a PostgreSQL + pgvector server running in Docker Compose on your own machine. Five services: database, MCP server, Cloudflare Tunnel for secure remote access, encrypted backup system with cloud sync, and a Docker socket proxy for safe admin operations. Nine MCP tools handle capture, semantic search, listing, stats, connections, archiving, export, usage tracking, and system health. The admin panel is a full server-rendered UI — thought browser, graph visualization, digest configuration, cost tracking, backup inventory, user management, and a config editor. No build step. No node_modules. Deno + Hono + JSX.\n\nThe security work was the most instructive part. A staff-level code review found 20 issues across the codebase — from a critical race condition in per-request user isolation (global mutable state under concurrent requests) to SQL interpolation in INTERVAL clauses, SSRF vectors in webhook delivery, and a JWT secret that defaulted to a hardcoded string. Sixteen of twenty findings were fixed in a single pass. The fixes touched every layer: AsyncLocalStorage for request scoping, discriminated unions replacing unsafe type coercion, parameterized queries throughout, webhook URL validation blocking private IPs and cloud metadata endpoints, rate limiter IP trust based on access mode, and Docker image version pinning.\n\nThe cost tracking system logs every AI API call — embedding and chat — with token counts and estimated costs by model. The usage_stats MCP tool and admin dashboard give you per-operation, per-model, and per-day breakdowns. You know exactly what your memory layer costs to run. For a system that makes API calls on every thought capture and search, that visibility is the difference between a tool you trust and a tool you're afraid to use.",
    links: [{ label: "GitHub", url: "https://github.com/Chapworks/local-brain" }],
    deepDivePath: "/portfolio/local-brain",
  },
  {
    id: "ship-with-intent",
    title: "Ship With Intent",
    oneLiner:
      "A content operation run through AI-augmented workflows — Substack, YouTube, LinkedIn.",
    skills: ["Specification Precision", "Evaluation", "Decomposition"],
    section: "build",
    detail:
      "Ship With Intent is a multi-platform publication documenting the practice of Intent Engineering — using AI as a structured thinking partner across software leadership, game development, and novel writing. The core thesis: most technical teams fail not because of engineering, but because of misalignment between people and mission. AI accelerates failure when organizations can't align humans first.\n\nThe workflow is deliberate and repeatable. Each piece starts with topic research, then a Claude-assisted interview to find the real point (not the obvious one), then collaborative script refinement. From there: camera recording, AI-assisted editing in Descript, metadata generation, thumbnail design in Affinity Designer, and multi-platform publication. YouTube carries free concept videos. Substack holds written ideas at the free tier and detailed process documentation behind the paid tier. LinkedIn amplifies the leadership angle to an audience of engineering managers and directors.\n\nRunning the operation as an AI-augmented system is itself a demonstration of the thesis. The tools handle the repeatable parts — transcription, editing passes, metadata, formatting — so the creative work can stay human. What Ship With Intent is actually documenting is what happens when you apply that principle deliberately, at every step, instead of using AI as a faster autocomplete.",
    links: [
      { label: "Substack", url: "https://shipwithintent.substack.com" },
      { label: "YouTube", url: "https://www.youtube.com/@ShipWithIntent" },
    ],
    deepDivePath: "/portfolio/ship-with-intent",
  },
  {
    id: "agentic-novel",
    title: "Agentic",
    oneLiner:
      "AI drafting a 35-chapter thriller with consistent voice, style rules, and continuity across plotlines.",
    skills: [
      "Specification Precision",
      "Decomposition",
      "Evaluation",
      "Context Architecture",
    ],
    section: "create",
    deepDivePath: "/portfolio/agentic-novel",
    detail:
      "Agentic is a novel-drafting system built as a Claude Code skill. The system treats chapter drafting as a repeatable, auditable process — not a conversation with a blank page. Before writing any chapter, the system loads context in three mandatory layers. Layer 1 loads the prose style analysis, a banned-words list, and 12 craft rules that apply every time. Layer 2 loads character voice guides only for characters physically present in the chapter — not the full cast. Layer 3 loads the chapter outline plus the last 2–3 drafted chapters from the same plotline.\n\nThat last rule is the critical one. The novel runs two independent tracks — Sloane's story and Graham's — that converge at chapter 17. Loading Graham chapters while drafting Sloane causes what the system calls plot bleed: characters reference information they don't have, tone bleeds across narrative lines, and the two stories start to collapse into each other. The siloing rule is absolute. Each plotline loads only its own history.\n\nThe craft constraints are equally specific: show interior through exterior (never name emotions directly), use \"said\" or nothing for dialogue tags, build similes from the extraordinary down to the mundane, make objects carry meaning, withhold the important thing. Every chapter ends on an unresolved question. Every beat in the outline must appear — no additions, no skips. After each draft, the system reports word count, beats hit, and flags continuity issues. 35 chapters, two plotlines, one consistent voice. The specification runs the machine. The author runs the voice.",
  },
  {
    id: "this-site",
    title: "nickcarter.ai",
    oneLiner:
      "This site. Designed and built with AI in a single session. Itself a portfolio piece.",
    skills: [
      "Specification Precision",
      "Decomposition",
      "Evaluation",
      "Context Architecture",
    ],
    section: "create",
    deepDivePath: "/portfolio/this-site",
    detail:
      "This site was designed, spec'd, planned, and built in a single AI-assisted session — approximately three hours from first brainstorm to running deployment. The process used the same skills the site describes: a design spec was written and automatically reviewed (catching four issues before any code was written), an eight-task implementation plan was created, and each task was dispatched to a fresh AI subagent with curated context.\n\nThe editorial design direction was chosen through interactive visual comparison — three directions shown side-by-side in a browser, refined through two more rounds (hero style, card style), then executed. The signature left-border accent bar emerged from the Bold Editorial hero choice and carries through every card and section on the site. Six animation packages (scroll reveal, hero entrance, accent bar draw, hover micro-interactions, page transitions, subtle parallax) were added to give the site the feel of a premium build.\n\nThe site includes an Ask AI feature — a chat interface where hiring managers can have multi-turn conversations with an AI that knows Nick's work deeply. The AI follows strict anti-hallucination rules, signals confidence tiers (documented, inferred, gap) on every answer, and includes a collapsible reasoning block showing exactly which sources it drew from. Hiring managers can load deep-dive portfolio documents into the conversation context and download the full transcript as markdown. Every rule the AI follows is published transparently on the site.\n\nThe site also serves markdown versions of its content at /llms.txt and /llms-full.txt — structured for AI agent consumption. When a recruiter pastes the URL into Claude, the response is substantive instead of garbled HTML. Building for the world where agents consume the web, not just humans.",
  },
  {
    id: "tool-audit",
    title: "Tool Audit",
    oneLiner:
      "Two Claude Code skills that detect and fix tool conflicts across MCP servers. Open source.",
    skills: ["Trust Boundary Design", "Decomposition", "Context Architecture"],
    section: "build",
    detail:
      "When you have multiple MCP servers installed, their tools overlap. \"Remember this\" might hit Local Brain or IntentPad. \"Search my notes\" might go to the wrong system entirely. The AI picks one — and you may never know it picked wrong. The MCP spec has no namespacing requirement, no collision detection, and no routing rules. Claude Code's mcp__server__tool prefix prevents name collisions but not semantic collisions — two tools with different names that respond to the same intent.\n\nTool Audit is two Claude Code skills that solve this. The first, /audit-tools, scans every tool in the session across all MCP servers and skills. It detects naming collisions, vocabulary overlap, functional duplication, and shadowed tools, then generates a severity-scored report with actionable fixes — routing rules, description improvements, tool renames, or disabling redundant tools. The second, /wrong-tool, handles the moment it goes wrong. When the AI uses the wrong tool, the skill identifies the collision, explains why it happened, drafts a routing rule, and offers to apply it to CLAUDE.md. One bad routing event becomes a permanent fix.\n\nThe key design decision was privacy. A skill runs entirely inside the user's session. The tool manifest — the full list of every MCP server and tool installed — never leaves the local environment. An MCP server approach would require sending that inventory to a third party for analysis. Skills keep the audit private. They also bypass the MCP protocol's fundamental limitation: servers can't see sibling servers' tools, but skills can, because the manifest is already in the model's context.",
    links: [{ label: "GitHub", url: "https://github.com/Chapworks/tool-audit" }],
    deepDivePath: "/portfolio/tool-audit",
  },
  {
    id: "until-the-day-is-over",
    title: "Until The Day Is Over",
    oneLiner:
      "A concept album produced and released using AI-augmented music production.",
    skills: ["Evaluation", "Specification Precision"],
    section: "create",
    detail:
      "Until The Day Is Over is a 14-track concept album with a specific conceit: a daughter named Joan sings her mother Margot's life — not as covers, but as songs Joan absorbed growing up and made her own. Margot was a Bakersfield punk rocker who chased music in LA, never signed, and eventually moved to Ohio. She never stopped singing. She just stopped performing. The album takes her punk-rock songwriting and modernizes it through her daughter's generation's sound.\n\nThe arc moves chronologically through Margot's life — leaving home, love and loss, a mother's death, the grace of parenthood, and a final reckoning with borrowed anger and chosen freedom. The emotional through-line is inheritance: what gets passed down, what gets transformed, and what a daughter does with a story that was never hers to tell and always hers to carry.\n\nAI assisted with production design, arrangement exploration, and lyric refinement. The hardest creative problem wasn't the technology — it was using AI on emotionally specific material without flattening it into generic polish. The songs predate any AI tool; they came from real people and real stories. The system had to be useful without becoming the voice. That required a different kind of specification: not just what to do, but what not to do, and why.",
    deepDivePath: "/portfolio/until-the-day-is-over",
  },
];
