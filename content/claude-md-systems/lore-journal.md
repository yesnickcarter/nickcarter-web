# Lore Journal

The Lore Journal is the most developed subsystem within the CLAUDE.md architecture. It's a structured personal knowledge capture system that runs on plain markdown files — no database, no external service, no proprietary format. Just YAML frontmatter and markdown in an Obsidian-compatible vault.

## Six Entry Types

Every capture goes into one of six types, each with its own directory and schema:

- **Tasks** — One file per task. Status tracking (open, in-progress, done), optional due dates, notes. These feed into the weekly planning system.
- **Ideas** — Product concepts, content topics, feature possibilities. Tagged for retrieval, not structured for execution.
- **Contacts** — One file per person, updated over time rather than duplicated. The deduplication rule is absolute: if you mention someone who already has a file, the system appends new information to their existing entry.
- **Journal** — Daily entries using an append-on-same-day pattern. The first entry creates the day's file. Subsequent entries that same day are appended, not overwritten. This means you can journal from multiple contexts throughout the day — a morning note from your desk, a thought captured from your phone, an evening reflection — and they all end up in one coherent file.
- **Decisions** — Structured reasoning records. What was decided, what alternatives were considered, and why. These are the most underrated entry type — six months later, knowing *why* you made a decision matters far more than knowing *what* you decided.
- **Notes** — Everything else. Facts, references, observations, things that don't fit the other types but are worth keeping.

## Auto-Classification

The `/lore-capture` command takes raw, unstructured input and the AI determines which type it belongs to. You can say "remind me to call Sarah about the contract on Friday" and the system creates a task with a due date and a contact reference. You can say "the CI pipeline breaks when tests run in parallel because of shared database state" and it creates a note.

When classification confidence is low, the entry goes to an inbox directory for manual triage. The system doesn't guess when it isn't sure — it puts the item where a human can review it. This is a deliberate design choice: false confidence in classification is worse than admitting uncertainty.

## ISO Week Reviews

The review system uses ISO 8601 week numbering (YYYY-WNN format). Weekly reviews are generated automatically by scanning the vault for the week's activity:

- Tasks completed during the week
- Tasks still open with approaching due dates
- New ideas captured
- Patterns observed across entries
- Follow-up items for the next week

Monthly reviews aggregate weekly data into a higher-level summary. The ISO week format makes everything machine-queryable — you can ask "what happened in W12?" and get a precise answer.

## Vault Structure

```
LoreJournal/
├── inbox/           ← Low-confidence items for manual triage
├── journal/         ← Daily entries (YYYY-MM-DD.md)
├── tasks/           ← One file per task
├── ideas/           ← One file per idea
├── contacts/        ← One file per person (append, don't duplicate)
├── decisions/       ← Choice + reasoning
├── notes/           ← Facts and references
├── reviews/
│   ├── weekly/      ← YYYY-WNN.md
│   └── monthly/     ← YYYY-MM.md
└── templates/       ← Obsidian templates
```

Every file uses YAML frontmatter with type, created date, tags, and type-specific fields (status and due date for tasks). This makes the vault queryable by both AI and Obsidian's own search.

## Three-Phase Roadmap

The Lore Journal was designed with a deliberate productization path:

**Phase 1 — Claude Code Skill (current).** The journal operates as commands within Claude Code, reading and writing to a local Obsidian vault. This is the working prototype — functional, daily-driven, proving the concepts.

**Phase 2 — MCP Server.** Wrap the proven skill logic into a Model Context Protocol server. The same capture, query, and review operations become available as MCP tools that any compatible AI client can use. The vault format stays the same — plain markdown, portable, no lock-in.

**Phase 3 — LoreHaven Premium Feature.** Integrate the journal into the LoreHaven product as a paid tier. Capture from the Tauri desktop app, from Claudegram, from any MCP client. Free tier handles basic capture and retrieval. Paid tier adds unlimited entries, AI synthesis, weekly digests, and pattern recognition across your full history.

## Why Plain Markdown

The storage format is deliberately simple. YAML frontmatter plus markdown means:

- Files are readable in any text editor
- Obsidian provides a full UI for free
- No database to maintain or back up (beyond file system backups)
- No vendor lock-in — if the system disappears, your data is still yours
- AI can read and write the files directly, no adapter needed

The intelligence lives in the AI pipeline (classification, linking, synthesis), not in the storage format. This separation means the "database" is future-proof even as the tools that read it change every few months.
