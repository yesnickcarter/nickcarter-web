# Custom Commands

The CLAUDE.md system includes 20+ custom slash commands spread across repositories. Each command is a markdown file in `.claude/commands/` that acts as a prompt template — when invoked, Claude Code loads the template and executes it with any provided arguments.

## The Lore Journal Commands

The most developed command set manages a structured journal system. Eleven commands handle capture, classification, querying, and review:

- **/lore-capture** — Takes raw, unstructured input and auto-classifies it into one of six types: task, idea, contact, journal entry, decision, or note. The AI determines the type from the content. If classification confidence is low, the entry goes to an inbox for manual review.
- **/lore-task** — Explicit task creation with an optional due date. Creates a structured file with status tracking (open, in-progress, done).
- **/lore-idea** — Captures a product or content idea with tags.
- **/lore-contact** — Creates or updates a contact file. The system deduplicates — if the person already exists, it appends new information rather than creating a duplicate.
- **/lore-journal** — Appends to today's daily journal entry. If an entry already exists for today, it adds to it rather than overwriting. This append-on-same-day pattern means you can journal throughout the day without losing earlier entries.
- **/lore-decision** — Records a decision with structured reasoning — the choice made, the alternatives considered, and why.
- **/lore-note** — Miscellaneous facts, references, anything that doesn't fit the other types.
- **/lore-query** — Searches the vault and synthesizes answers. "What tasks are overdue?" "What do I know about Sarah?" "What happened last week?"
- **/lore-review** — Generates weekly or monthly digests using ISO week numbering. A weekly review surfaces completed tasks, open items, new ideas, observed patterns, and follow-up items.
- **/lore-triage** — Reviews the inbox and classifies items that auto-capture couldn't confidently sort.
- **/lore-setup** — One-time machine setup that configures file permissions so subsequent journal operations run silently without prompts.

## Planning Commands

Three commands manage weekly planning and task lifecycle:

- **/weekly-setup** — Creates a weekly planning file from a template. Automatically calculates the ISO 8601 week number, scans the task list for items due in the current Monday-Sunday range, and pre-fills the "Due This Week" section. Recurring tasks from the template are included automatically.
- **/show-tasks** — Displays the task list with status, notes, and due dates. Supports filtering by status or keyword.
- **/update-task** — Updates a task's status, due date, or notes. Manages the full lifecycle from open to in-progress to done.

## Content Commands

The content repository has its own command set for the Ship With Intent publication:

- **/review-content** — Reviews a draft against four spec documents: brand voice, legal guidelines, content standards, and platform requirements. Flags naming violations, legal risks, structural issues, and quality problems.
- **/add-guild-note** — Adds a note to The Guild novel's notes file with auto-incrementing IDs.
- **/show-book-tasks** and **/update-book-task** — Task management for the novel writing process.
- **/show-guild-notes** — Displays novel notes with optional filtering by tag or keyword.
- **/show-ideas** — Displays the product and content idea backlog with status filtering.

## Skills vs. Commands

Commands handle single-step operations. Skills handle complex, multi-step processes that need their own embedded context:

- **nano-banana** — A skill that wraps an AI image generation CLI. It handles multi-resolution output (512px to 4K), aspect ratios, reference images, green screen workflows for transparent assets, and cost tracking. Used for landing pages, game assets, and marketing materials.
- **generate-instagram-photo** — A specialized image generation skill for the Until The Day Is Over band's social media, with pre-configured character references and scene constraints.

## Design Pattern

Every command follows the same pattern: a markdown file that describes the operation, its inputs, its constraints, and its expected output format. The AI reads the prompt template on invocation and executes it. This means commands are version-controlled, reviewable, and portable. They're specifications, not scripts.

The distinction matters. A script executes the same way every time. A command gives the AI structured intent and lets it handle the execution. The human specifies the what and the why. The AI figures out the how.
