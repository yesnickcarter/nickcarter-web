# How It Works

Tool Audit runs entirely inside your Claude Code session. It doesn't call any external APIs, doesn't transmit your tool list anywhere, and doesn't require protocol extensions. The tool manifest — the full list of every MCP server, tool, and skill in your environment — is already in Claude's context. The skills ask Claude to reflect on what it sees.

## The Audit Skill: `/audit-tools`

The audit runs in six steps.

### Step 1: Enumerate

Claude scans every tool visible in the current session — MCP tools (prefixed as `mcp__server__tool`), built-in tools, and skills. For each tool, it captures the name, server/source, description, and parameter schema.

### Step 2: Detect Collisions

Every tool pair across different servers is compared for four types of conflict:

- **Name collisions** — identical or near-identical tool names from different servers. Two servers both exposing `search` or `get_tasks`.
- **Vocabulary overlap** — different names but shared natural-language triggers. `capture_thought` and `capture_note` both respond to "remember this."
- **Functional overlap** — similar parameter schemas that accept the same kind of input and produce the same kind of output. Both take a string and store it somewhere.
- **Shadows** — one tool effectively hiding another because its name or description is a better match for common prompts. The shadowed tool exists but never gets called.

### Step 3: Score Severity

Each detected conflict gets a severity level:

- **Hard** — identical names from different servers. Guaranteed misrouting or API errors. Immediate action required.
- **Soft** — overlapping vocabulary or function. Probabilistic misrouting — the model picks one, maybe the right one, maybe not.
- **Shadow** — one tool renders another invisible. The shadowed tool works fine if called directly, but the model never reaches for it.

### Step 4: Report

For each conflict, the report includes which tools conflict (names, servers, descriptions), example natural-language prompts that would be ambiguous, the model's likely routing behavior, and the severity score.

### Step 5: Recommend Fixes

Each conflict gets one or more actionable recommendations:

- **CLAUDE.md routing rule** — a line the user can add to project or global instructions: "When I say 'remember this,' use `mcp__intentpad__capture_note`, not `mcp__localbrain__capture_thought`."
- **Description improvement** — more specific description text to help the model disambiguate without external routing rules.
- **Tool rename** — if the user controls one of the servers, a more distinctive name.
- **Disable** — if one tool fully supersedes the other, disable the redundant one.

### Step 6: Apply

If the user approves, the skill writes routing rules directly to CLAUDE.md — either the project-level file or the global one. The fix becomes permanent and survives across sessions.

---

## The Reactive Skill: `/wrong-tool`

The second skill handles the moment it goes wrong. You say "remember this," the AI sends it to Local Brain, and you meant IntentPad. Instead of manually figuring out what happened, you run `/wrong-tool`.

The skill works in five steps:

- **Identify** — looks at the last tool call and asks which tool you intended.
- **Explain** — tells you why the model picked the wrong one (vocabulary overlap, description similarity, name match).
- **Draft** — writes a routing rule that prevents recurrence.
- **Ask** — offers to apply it to project CLAUDE.md or global CLAUDE.md.
- **Scan** — checks for related collisions that the same fix might address.

The reactive flow is often more valuable than the proactive audit. You don't need to imagine every possible collision in advance — you wait until one happens, fix it permanently, and move on. Over time, your routing rules accumulate and the misrouting rate drops to zero.

---

## Why Skills, Not an MCP Server

A skill runs inside the user's session. The tool manifest — the full list of every MCP server and tool installed — never leaves the local environment. An MCP server would need the manifest sent to it for analysis.

Users don't want their installed tools inventoried by an external service. The audit is a private operation. Skills keep it that way.

There's also a technical advantage: skills have direct access to the full tool manifest because it's already in the model's context. An MCP server can't see sibling servers' tools — the MCP protocol has no server-to-server communication. A skill doesn't need protocol extensions because the model already knows everything.
