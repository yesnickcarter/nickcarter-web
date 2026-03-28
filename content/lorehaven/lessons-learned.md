# LoreHaven — Lessons Learned

## Context Architecture

- **Omission beats inclusion.** The vault was initially designed to hold everything. The breakthrough was realizing that the MCP server exposes full file contents with no retrieval filtering — so every file in the vault dilutes attention on every other file. A 5-file permanent vault is more useful than a 500-file archive. The design principle became: what you leave out matters more than what you put in.
- **The Lore document is the product, not the app.** Users who never install the desktop client still get value from a well-structured Lore document they copy-paste into AI tools. The app is infrastructure. The Lore is the artifact. Building the infrastructure first would have been the wrong sequence.
- **Language shapes adoption.** Calling the core document a "system prompt" would have lost the non-technical audience immediately. "Your Lore" created a mental model that users understood and cared about. The vocabulary decision was as important as any architectural decision.

## MCP Server

- **stdio transport eliminated an entire problem category.** Early prototypes used HTTP with port management. Users hit firewall issues, port conflicts, and TLS certificate problems. Switching to stdio (Claude Desktop spawns the process directly) removed all of those. The constraint (no network) was the feature.
- **The server bets on curation over retrieval.** No semantic search, no embedding, no ranking. Just serve what's there. This feels wrong to engineers who want to build smart systems — but for a vault of 5-10 files, curation IS the retrieval strategy. The user already decided what matters by putting it in the vault.
- **Session identity was harder than expected.** Same tool reconnecting on the same day, different tools on the same day, crashed sessions with incomplete artifacts — each scenario needed distinct handling. The UUID + date + tool-name triple was the solution, but it took three iterations to get the edge cases right.

## Client Architecture

- **The config merge strategy (ARCH-003) was the highest-risk implementation decision.** Modifying a JSON file that other tools also modify is inherently dangerous. The atomic key-level merge took longer to design than to code. Five edge cases, each with a different failure mode, each requiring a different recovery path. The lesson: shared state problems deserve 10x the design time of isolated-state problems.
- **Starting the MCP server before auth completes was a deliberate choice.** The obvious sequence is: authenticate → sync → start serving. But that means a user with no internet has no MCP server. Flipping the order (start MCP → then auth → then sync) means the local experience works regardless of cloud state. The principle: local-first means local-first, not local-after-we-check-the-cloud.
- **The IPC contract in the shared package caught bugs that would have been runtime crashes.** When the renderer calls `lore.get()` and the main process changes the return type, TypeScript catches it at compile time. Without the typed contract, this would be a silent failure or a crash in production. The shared package exists for this one reason and it's worth the overhead.

## Product Design

- **Tier 1 value (no MCP, no client, just web + copy-paste) was the right first milestone.** The temptation was to build the full desktop experience before launching anything. Shipping the web wizard first proved the Lore concept without infrastructure dependencies. Users who loved the Lore document were eager to install the client. Users who didn't love the Lore would never have installed the client anyway.
- **Architecture Decision Records (ADRs) prevented revisiting decided questions.** ARCH-001 (Electron + TypeScript), ARCH-002 (embedded subprocess), ARCH-003 (atomic config merge) — each was decided once, documented with rationale, and never relitigated. Without ADRs, the Tauri-vs-Electron question alone would have consumed weeks of repeated debate.
- **Non-technical users don't separate "product" from "onboarding."** The wizard IS the product for Tier 1 users. The vault structure, the MCP server, the desktop client — these are invisible infrastructure. The wizard that asks "What does a typical week look like?" and produces a Lore document — that's the thing users talk about. The lesson: for consumer AI products, the onboarding experience and the core value proposition are the same thing.
