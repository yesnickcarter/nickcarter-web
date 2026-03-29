# Design Principles

The CLAUDE.md system isn't just a collection of configuration files. It embodies specific design principles about how AI context should work. These principles emerged from building and maintaining the system across 12+ repositories over months of daily use.

## Omission Over Inclusion

Most people building AI context systems make them bigger over time. More files, more notes, more detail, more "just in case" information. The CLAUDE.md system works the opposite way: what you leave out matters more than what you put in.

Irrelevant context doesn't just waste tokens. It actively degrades AI performance by distributing attention across material that isn't relevant to the current task. A CLAUDE.md file that includes five paragraphs of project history before getting to the constraints is a file that makes every interaction slightly worse. Every addition has to earn its place.

In practice, this means:

- CLAUDE.md files are 20-80 lines, not 200
- Philosophy and motivation are absent — they don't help the AI write better code
- Historical context is absent — the AI doesn't need to know how the project got here
- Constraints are explicit and specific, not vague guidelines
- Specifications live in their own files and are linked, never duplicated

## CLAUDE.md as API Specification

The most useful mental model for a CLAUDE.md file is an API spec. It defines:

- **Input** — What information does the AI need to start working?
- **Output** — What behavior and quality do you expect?
- **Constraints** — What is absolutely non-negotiable?
- **Resources** — Where does the AI find the source of truth?

A game engine's CLAUDE.md defines 14 collision layers, the singleton architecture, and the event bus pattern. A marketing site's CLAUDE.md says "never use the word repository" and links to approved copy. A content repo's CLAUDE.md lists five naming rules and links to four specification documents.

None of these files explain *why* the constraints exist. The AI doesn't need the rationale to follow the rules. It needs the rules.

## Self-Review Checklists

Every CLAUDE.md includes a project-specific self-review checklist. These aren't suggestions — they're machine-executable compliance criteria that the AI checks before declaring work complete.

A marketing site's checklist:

- TypeScript compiles with zero errors
- ESLint passes with zero warnings
- Build produces a clean static export
- No technical jargon visible to users
- All copy matches approved text
- ARIA labels present, keyboard navigation works
- Tested at 375px and 768px breakpoints
- No runtime server features (static export only)

A content repo's checklist checks for naming violations, legal compliance, structural completeness, and voice consistency.

The pattern replaces a class of human review with AI-executable spec compliance. The AI reads the checklist, runs the checks, and reports results. Humans review the things checklists can't catch.

## Link, Don't Duplicate

Specifications live in their own files. CLAUDE.md references them — it never copies their content. This means:

- Specs are maintained in one place
- CLAUDE.md stays short
- Updates to a spec automatically flow to the AI's understanding on the next session
- There's no drift between what CLAUDE.md says and what the spec says

For example, the content repo's CLAUDE.md says "read these four files before writing or reviewing any content" and lists the paths. It doesn't summarize the brand voice rules — it points to the brand voice document. The AI reads the actual spec, not a paraphrase.

## Target the AI, Not the Human

CLAUDE.md is not documentation. It's not a README. It's not a contributing guide. It's instructions for an AI that's about to work in your codebase.

This distinction changes what goes in the file:

- Humans need motivation and context. AI needs constraints and resources.
- Humans benefit from examples and analogies. AI benefits from explicit rules.
- Humans skim long documents. AI reads every token and distributes attention across all of them — so every token costs something.

The README explains the project to a new contributor. CLAUDE.md configures the AI to work correctly in the project from the first interaction.

## Repo-Specific Constraints

No two repositories have the same CLAUDE.md because no two repositories have the same constraints. Examples from the ecosystem:

- **Game engine** — 14 collision layer definitions, singleton architecture, event bus for all signals, save system details
- **Marketing site (consumer)** — Static export only, forbidden terminology ("repository", "git", "commit", "sync"), approved copy in external file
- **Marketing site (game)** — Client-side only (photos never leave browser), age-appropriate content (13+), custom review skills
- **Content repo** — Brand voice rules, legal separation rules, five naming conventions with violation flagging
- **Agent spec repo** — Safety > Legal > Brand priority order, guardrail references, schema versioning rules
- **Band website** — Dark theme only (no light mode, ever), letters page is human-only (no AI involvement)
- **Internal admin tool** — Two auth methods, database schema reference, migration workflow

Each file is 20-80 lines. Each is complete for its repo. None duplicates another.
