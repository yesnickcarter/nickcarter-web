# The Research

The MCP tool collision problem isn't theoretical. It shows up the moment you have more than two or three servers running, and nobody in the ecosystem has built a solution for it.

## The Protocol Gap

The MCP specification has no tool namespacing requirement. Tool names are plain strings. There's no uniqueness constraint across servers, no collision detection, and no routing rules. The spec's only guidance — merged in PR #701 — suggests that clients disambiguate with prefix conventions, but provides no mechanism for detection or resolution.

## How Clients Handle It Today

**Claude Code** prefixes tools as `mcp__<server-key>__<tool-name>` — the most robust deployed solution. But the AI still has to choose between `mcp__localbrain__capture_thought` and `mcp__intentpad__capture_note` when a user says "remember this." The prefix solves name collisions but not semantic collisions.

**Claude Desktop** serializes all tools into a flat list in the system prompt. The model reads names and descriptions and picks one. No structured routing. Duplicate names may cause API-level errors.

**No client** supports tool priority, routing rules, aliasing, or enable/disable toggles.

## Model Selection Accuracy

Research from MCP Issue #2470 shows tool selection accuracy at 80-88% with 80 tools for models in the 9-35B parameter range. Claude Sonnet and Opus class models handle large tool lists well. But the problem isn't raw accuracy — it's semantic overlap. Two tools that do similar things with different scope are exactly the kind of ambiguity where even strong models guess wrong.

## What People Actually Do

The workarounds are all manual, fragile, and invisible to other tools:

- Server-side prefixing — ad hoc naming like `gdrive_search` instead of `search`
- CLAUDE.md routing rules — "when I say X, use tool Y"
- Disabling servers they aren't currently using
- Prompt-level specification — "use the localbrain tool to..."
- MCP proxy gateways like MetaMCP and MCPJungle that add namespace prefixes

None of these detect problems. They prevent specific known collisions after the user has already experienced them. Nobody has built a tool that scans the environment, identifies where the ambiguity exists, scores it, and generates fixes.

## Why Nobody Has Built This

The protocol makes it hard. MCP servers can't see sibling servers. There's no `tools/listAll` request. There's no server-to-server communication. An MCP server that wants to audit the environment would need the client to provide the full tool manifest — and no client exposes that API.

The proxy approach (MetaMCP, MCPJungle) could theoretically add detection because they sit between the client and all servers. But they're infrastructure projects focused on routing and configuration management, not conflict analysis.

Claude Code skills bypass the protocol limitation entirely. The model already has the full tool manifest in context — it can see every MCP tool, built-in tool, and skill. A skill just asks it to reflect on what it sees.

## Related Work in the MCP Spec

- **Discussion #128** — reports of duplicate tool names across servers
- **Discussion #1198** — tool disambiguation challenges
- **RFC #334** — proposes a namespace field on tools (helps with name uniqueness, doesn't address vocabulary overlap)
- **PR #701** — recommends prefix conventions (no enforcement mechanism)
- **Issue #2470** — tool selection accuracy research

Tool Audit's MCP spec proposal (see the companion document) proposes adding a `tools/listAll` client capability that would let servers request the aggregated tool manifest from the client. This would make it possible to build the audit functionality as a proper MCP server, working across all MCP clients instead of only Claude Code.
