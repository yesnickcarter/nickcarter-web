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
      "LoreHaven is a Model Context Protocol server that runs locally and automatically delivers a user's personal context to any connected AI tool. No copy-pasting — when Claude Desktop starts, the full context loads automatically on port 7891. The goal was to solve a real friction point: context that matters gets rebuilt from scratch every session, so AI tools keep losing the thread.\n\nThe vault has four layers. Lore is the master 300–600 word personal context document — the thing every session needs. Permanent holds 5–10 curated reference files. Workspace contains active project folders. Temp handles ephemeral session artifacts organized by date and session ID. That structure wasn't arbitrary: small, curated collections work better than archives because the MCP server exposes full file contents with no semantic retrieval. Every file you expose gets read. So what you include matters more than how much you store.\n\nThe protocol registers 8 resource types with standardized URI schemes — lore://, vault://, docs:// — so connected tools can request context at the right level of granularity. Built with TypeScript and Node.js using the Anthropic MCP SDK, stdio transport, path-traversal security guards, and auto-regenerating indexes. The hardest design problem was deciding what not to expose: irrelevant context doesn't just waste tokens, it actively degrades model performance.",
    links: [{ label: "LoreHaven", url: "https://lorehaven.ai" }],
  },
  {
    id: "iec-62304",
    title: "IEC 62304 Compliance Transition",
    oneLiner:
      "Led the compliance transition of a live medical device product without disrupting clinical operations.",
    skills: [
      "Trust Boundary Design",
      "Evaluation",
      "Failure Pattern Recognition",
    ],
    section: "build",
    detail:
      "At Becton Dickinson, Nick led a multi-level engineering org of 14 engineers and testers across 2–3 engineering leads — a manager-of-managers structure where his job was to set direction and develop the leads, not solve the problems directly. He defined and owned a 3-year software platform strategy that was adopted by executive leadership and aligned to a multi-product regulatory roadmap. That strategy directly enabled an on-time transition to FDA Class II Medical Device classification under IEC 62304.\n\nThe central constraint was that the product was live and serving clinical operations. There was no option to take it offline, freeze it, or run a parallel build and cut over. Every compliance change had to land in a system that was actively being used in healthcare settings, which meant the transition had to be staged carefully, tested against a moving target, and sequenced to avoid disrupting care delivery. The architecture decisions, the testing approach, and the team structure all had to account for that reality.\n\nAlongside the compliance work, Nick reversed a major customer cancellation by architecting a custom solution for an account that was heading out the door. That account became the second-largest in the company's portfolio. The two things aren't unrelated — the same instinct that drives good compliance work (understand the constraint, design to the edge of it) is what turns a cancellation call into a retained customer.",
  },
  {
    id: "dexcom-platform",
    title: "Platform Reliability at Scale",
    oneLiner:
      "Took a platform from ~90% to 99.9% uptime, processing 1.7B events/day across 60 microservices.",
    skills: ["Failure Pattern Recognition", "Cost Economics", "Decomposition"],
    section: "build",
    detail:
      "At Dexcom, Nick led a globally distributed engineering organization of 23 people — 8 direct plus 15 offshore contractors — running real-time platforms that supported more than 1 million connected diabetes management devices. The scale wasn't just large; it was high-stakes. A missed event or a degraded pipeline has direct implications for patients managing a chronic condition with continuous glucose monitoring data.\n\nWhen Nick took over, platform reliability was running around 90% uptime. He drove it to 99.9% through a combination of systematic reliability engineering, testing investment, and observability improvements that made failure modes visible before they became incidents. Production incidents dropped 95%. Cloud infrastructure spend fell 22% without sacrificing performance — the two outcomes aren't contradictory when you understand where the waste actually lives in a distributed system.\n\nEvery decision operated inside a regulated environment. HIPAA required audit trails for deployments, schema changes, and infrastructure modifications. Data residency rules constrained where computation could happen. Encryption requirements applied end to end. The combination — 1M+ devices, 1.7 billion events per day, 60 microservices, and healthcare compliance overhead — meant every architectural choice had to balance speed against safety. Shipping fast was the goal. Shipping correctly was the constraint.",
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
    id: "until-the-day-is-over",
    title: "Until The Day Is Over",
    oneLiner:
      "A concept album produced and released using AI-augmented music production.",
    skills: ["Evaluation", "Specification Precision"],
    section: "create",
    detail:
      "Until The Day Is Over is a 14-track concept album with a specific conceit: a daughter named Joan sings her mother Margot's life — not as covers, but as songs Joan absorbed growing up and made her own. Margot was a Bakersfield punk rocker who chased music in LA, never signed, and eventually moved to Ohio. She never stopped singing. She just stopped performing. The album takes her punk-rock songwriting and modernizes it through her daughter's generation's sound.\n\nThe arc moves chronologically through Margot's life — leaving home, love and loss, a mother's death, the grace of parenthood, and a final reckoning with borrowed anger and chosen freedom. The emotional through-line is inheritance: what gets passed down, what gets transformed, and what a daughter does with a story that was never hers to tell and always hers to carry.\n\nAI assisted with production design, arrangement exploration, and lyric refinement. The hardest creative problem wasn't the technology — it was using AI on emotionally specific material without flattening it into generic polish. The songs predate any AI tool; they came from real people and real stories. The system had to be useful without becoming the voice. That required a different kind of specification: not just what to do, but what not to do, and why.",
  },
];
