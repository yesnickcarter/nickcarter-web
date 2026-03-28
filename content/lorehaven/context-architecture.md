# Context Architecture for Non-Technical Users

LoreHaven's central design problem is that most people aren't engineers — but they still need AI to know who they are. The product had to bridge that gap without asking users to learn about tokens, context windows, or system prompts.

## The Lore Document

The product's centerpiece is the Lore — a structured markdown file that acts as the user's AI memory. It's built through a wizard, not a text editor. The wizard asks plain-English questions ("What does a typical week look like?") and assembles the answers into a document that any AI tool can consume.

The Lore is deliberately simple: plain text markdown with YAML frontmatter. Readable in any editor forever. Version-controlled with explicit schema versioning so migrations are never implicit. Self-contained — you can copy it into Claude, ChatGPT, or Gemini without any infrastructure. The document IS the contract between user and AI tool, which eliminates platform lock-in entirely.

## The Haven Vault

The vault organizes files into layers that map to both user mental models and AI consumption patterns:

- **Lore** — the core document. Always loaded.
- **Permanent** — 5-10 curated reference files the AI can see. An auto-maintained index keeps it current.
- **Workspace** — active project folders with READMEs and working files.
- **Temp** — ephemeral session artifacts, organized by date and session ID. Users review after each session and migrate keepers to permanent or workspace.

The critical design decision: small, curated collections outperform archives. The MCP server exposes full file contents with no semantic retrieval — every file you expose gets read. So what you include matters more than how much you store. This is the "omission over inclusion" principle applied to a consumer product.

## Tier 1: Value Before Infrastructure

The product delivers value at three levels, and the first requires zero installation:

- **Tier 1:** Web only. Wizard builds the Lore. User copies it into any AI tool manually. No client, no MCP, no configuration. This is where most users start and where the product proves itself.
- **Tier 2:** Desktop client installed. MCP server runs locally. Lore loads into Claude automatically — no copy-paste needed.
- **Tier 3:** Skills, preferences, the Lore Updater. The system grows with the user.

The restraint here is deliberate: don't force infrastructure before proving value. A non-technical user can evaluate the product entirely through the web, with nothing to install and nothing to configure.

## Language as Architecture

Every label, button, and description avoids technical language:
- "Your Lore" — never "memory file" or "system prompt"
- "Your Haven" — never "repository" or "database"
- "Saving" — never "committing"
- Never mention git, S3, API, tokens, or context windows

This isn't just UX polish. It's an architectural decision — the language shapes how users think about their data, which shapes what features they'll adopt and what they'll ignore. Getting the vocabulary wrong means building features nobody uses.
