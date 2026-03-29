# Four-Layer Architecture

AI tools don't remember anything between sessions. Every conversation starts from zero — no knowledge of your projects, preferences, decisions, or progress. The more you rely on AI, the more time you spend re-explaining the same context. The architecture described here solves that problem across 12+ repositories.

## The Four Layers

The system uses a strict hierarchy where each layer has a different scope and lifetime:

**Layer 1 — Global User Memory.** A persistent memory directory that survives across all projects and conversations. This holds cross-project context: production statuses, project notes, patterns confirmed across multiple sessions. It loads automatically into every Claude Code session regardless of which repository is active. The rule is aggressive minimalism — the index file stays under 200 lines.

**Layer 2 — Repository-Level CLAUDE.md.** Every repository has a CLAUDE.md file in its root. This is the primary context document — it tells the AI what the project is, what constraints are non-negotiable, where the specifications live, and what self-review checks to run before declaring work complete. Each file is 20-80 lines, tailored specifically to its repo. A game engine repo describes singleton architecture and collision layers. A marketing site repo forbids technical jargon. A content repo enforces brand voice and legal rules.

**Layer 3 — Project-Level Memory.** Each project has a persistent memory directory that survives between sessions but is scoped to one repository. This is where session-to-session continuity lives — in-progress work, decisions made, patterns discovered while working in a specific codebase. It separates cleanly from global memory so that project-specific state doesn't pollute other projects.

**Layer 4 — Custom Commands and Skills.** Markdown prompt templates that live in each repository's `.claude/` directory. Commands handle repeatable tasks — journal capture, task management, weekly planning, content review. Skills handle complex, multi-step operations — image generation with specific tools, novel chapter drafting with layered context loading. Each command or skill is a self-contained prompt that can reference the repo's specification files.

## Why Four Layers

Each layer exists because a single flat context file doesn't scale. Global memory handles things that matter everywhere. Repo CLAUDE.md handles project-specific constraints. Project memory handles session continuity. Commands handle automation.

The layering also enforces separation of concerns. When a marketing site's CLAUDE.md says "never use the word repository," that constraint only applies to that repo. When global memory notes an album's production status, every project session can see it without each CLAUDE.md needing to duplicate the information.

## How They Load

When Claude Code starts a session in a repository, context loads in order:

1. Global memory (always present)
2. Repository CLAUDE.md (always present if the file exists)
3. Project memory (loaded from the per-project memory directory)
4. Commands and skills are available on demand via slash commands

No manual assembly required. You open a terminal in a repo and the right context is already there. The system doesn't ask you to remember what project you're in — it already knows.

## 12+ Repositories, One Pattern

Every repository follows the same CLAUDE.md structure:

1. What it is (1-2 lines)
2. Tech stack decisions with rationale
3. Key constraints — explicit, non-negotiable
4. Links to specification files (never duplicated)
5. Self-review checklist
6. Custom commands/skills (if any)

This consistency means onboarding to any project in the ecosystem is instant. The AI reads the CLAUDE.md, understands the constraints, knows where to find the specs, and knows what checks to run. The human equivalent would be a new developer who reads the team's contributing guide on their first day — except this one actually reads it every time.
