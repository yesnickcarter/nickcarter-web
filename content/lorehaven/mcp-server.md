# MCP Server: Exposing a Local-First Vault

The MCP server is the bridge between a user's local files and their AI tools. It runs as a subprocess on localhost:7891 and registers resources using the Anthropic MCP SDK — so any MCP-compatible tool (Claude Desktop, Claude Code) can discover and request the user's context automatically.

## Resource Architecture

The server registers 8 resource types, each with a standardized URI scheme:

```
lore://me                              — The core Lore document
vault://permanent/index                — Index of permanent files
vault://permanent/{path}               — Individual permanent file
vault://workspace/{project}/README     — Workspace project README
vault://workspace/{project}/{file}     — Workspace files
vault://temp/sessions/{date}-{id}/     — Temp session folder
vault://instructions                   — AI workspace instructions
docs://lorehaven/{topic}               — LoreHaven documentation
```

The URI scheme is deliberate. Connected AI tools don't need custom integrations — any MCP-compatible client can request `lore://me` and get the user's context. The protocol handles discovery: the server tells the tool what resources exist, and the tool requests what it needs.

## Session Identity

Every MCP session gets a UUID and a date stamp. This enables:

- Same-tool reconnections on the same day create separate session rows (not merged)
- Different tools on the same day create separate rows under the same date
- Incomplete sessions (crashes) are flagged for user review on next startup
- Session-level bulk actions (approve all temp files, discard all)

## Transport: stdio

The server uses stdio transport — Claude Desktop spawns the process directly and communicates over stdin/stdout. No HTTP, no WebSocket, no port management. This follows Claude Desktop's own pattern and eliminates an entire category of networking problems (firewall rules, port conflicts, TLS certificates).

## Security

Path-traversal guards check every file read before it executes. The server only serves files within the vault directory — a request for `vault://permanent/../../etc/passwd` gets rejected before it touches the filesystem. Auto-regenerating indexes mean the permanent vault's `index.md` stays accurate without manual maintenance, and stale entries can't point to files that no longer exist.

## What the Server Does NOT Do

The MCP server doesn't search, rank, or filter. It exposes full file contents for everything registered. This is a conscious limitation — semantic retrieval would add complexity and latency for a vault that's designed to be small. When you curate 5-10 permanent files, you don't need a search engine. You need a reliable file server. The architecture bets on curation over retrieval, and that bet is what makes the vault useful at the scale it's designed for.
