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
    id: "lorehaven-mcp",
    title: "LoreHaven MCP Server",
    oneLiner:
      "A context architecture system that gives AI structured access to a personal knowledge vault.",
    skills: ["Context Architecture", "Decomposition", "Specification Precision"],
    section: "build",
    detail:
      "Every conversation with AI starts the same way: you explain who you are, what you're working on, and how you like to work. Then the session ends and the AI forgets everything. Next conversation, you start over. The more you use AI, the more time you spend re-introducing yourself. The tool that's supposed to save you time is wasting it on the same onboarding loop, every single session.\n\nLoreHaven exists because that problem annoyed me enough to solve it. The idea is simple: write down who you are once — your role, your projects, your preferences, how you think — and have that context load automatically into every AI conversation. No copy-pasting. No re-explaining. You open Claude and it already knows you.\n\nThe implementation is a local MCP server that runs on your machine and serves your personal context to any connected AI tool. The vault has four layers: your Lore (the core document, 300-600 words), permanent reference files (5-10 curated documents the AI can see), active project workspaces, and temporary session artifacts. The architecture bets on curation over volume — every file you expose gets read, so what you include matters more than how much you store. Irrelevant context doesn't just waste tokens, it actively degrades the AI's performance.\n\nBuilt with TypeScript, the Anthropic MCP SDK, and stdio transport. The hardest design problem wasn't the protocol or the server — it was deciding what not to expose.",
    links: [{ label: "LoreHaven", url: "https://lorehaven.ai" }],
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
    id: "claude-md-systems",
    title: "CLAUDE.md & Memory System Design",
    oneLiner:
      "A persistent context architecture for AI-assisted workflows across multiple projects.",
    skills: ["Context Architecture", "Specification Precision"],
    section: "build",
    detail:
      "Nick designed and maintains a multi-layered AI context system spanning two major repositories — a personal career management workspace and a company content operation. The system is built around a core insight: AI tools don't have memory between sessions, so the architecture has to supply continuity that the tool itself can't.\n\nThe system has four components that work together. Project-specific persistent memory carries task lists, project facts, and in-progress status across sessions. A custom commands library — 15+ commands — handles journal integration, task management, weekly planning, and content drafting. Structured skills embed system prompts and protocols directly, so the right context loads for the right task without manual assembly. And the memory organization separates persistent context (stable facts) from per-session context (active drafts, temporary exploration), so sessions start clean without losing state that actually matters.\n\nThe design principle driving all of it is omission over inclusion. Most people building context systems make them bigger over time — more files, more notes, more detail. Nick's system works the other way: what you leave out matters more than what you put in. Irrelevant context doesn't just waste space, it actively degrades AI performance by distributing attention across material that isn't relevant to the task at hand. Every addition to the system has to earn its place.",
    deepDivePath: "/portfolio/claude-md-systems",
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
      "This site was designed, spec'd, planned, and built in a single AI-assisted session — approximately three hours from first brainstorm to running deployment. The process used the same skills the site describes: a design spec was written and automatically reviewed (catching four issues before any code was written), an eight-task implementation plan was created, and each task was dispatched to a fresh AI subagent with curated context.\n\nThe editorial design direction was chosen through interactive visual comparison — three directions shown side-by-side in a browser, refined through two more rounds (hero style, card style), then executed. The signature left-border accent bar emerged from the Bold Editorial hero choice and carries through every card and section on the site. Six animation packages (scroll reveal, hero entrance, accent bar draw, hover micro-interactions, page transitions, subtle parallax) were added to give the site the feel of a premium build.\n\nThe site also serves markdown versions of its content at /llms.txt and /llms-full.txt — structured for AI agent consumption. When a recruiter pastes the URL into Claude, the response is substantive instead of garbled HTML. Building for the world where agents consume the web, not just humans.",
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
