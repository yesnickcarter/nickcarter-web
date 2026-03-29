# How It Was Made

Local Brain was built entirely over the phone. No laptop. No IDE. No keyboard. Every line of code was written through Telegram, using Claudegram — a bridge between a Telegram chat and Claude Code running on a home server. The entire project, from first idea to open source release, happened while doing yard work and running errands on a Saturday.

## The Spark

That morning, at the lumber store, a video from Nate B Jones came up — talking about Open Brain, his open source project for giving AI tools persistent memory. The idea was immediately compelling. AI tools forget everything between sessions. A personal memory layer that stores your thoughts and lets AI search them semantically — that's the missing piece.

But Open Brain was built for a different set of trade-offs. It ran on Kubernetes. It was designed for cloud deployment. The question that formed while loading hard maple into the truck wasn't "how do I use this" — it was "how do I own this." More technical work in exchange for more ownership. Data on your own hardware. No cloud dependency. No one else's infrastructure between you and your memory.

## The First Hour

Standing in the driveway, phone in hand, the first message to Claude was something like: can you reverse-engineer what this does and build it on my local machine?

Claude could. The conversation moved fast — from understanding the core concept (PostgreSQL + pgvector for semantic search, an MCP server for tool integration) to standing up a Docker Compose stack, to writing the first MCP tools, to capturing the first thought and searching for it. Between messages, there was a table saw running. Hard maple doesn't cut itself. The rhythm was: send a prompt, make a cut, check the response, send the next prompt.

Within about an hour, the core functionality was working. Capture a thought. Generate an embedding. Store it. Search semantically. Retrieve it. The basic promise — AI that remembers what you've told it — was real.

That's where most people would stop. A working prototype, built from the phone, in an hour. Interesting. Fun. Fragile.

## The Next Four Hours

The next four hours were about everything that makes a system survive past the demo. Not features — defenses.

**Backups that scream when they aren't working.** Not backups that run silently and might be corrupt. Not backups you check once a month. Encrypted backups with cloud sync, retention policies, and a health check system that actively warns you when something is wrong. The admin panel shows backup status at a glance. The MCP health tool reports backup age. If your backups stop working, the system tells you before you need them.

**Security.** User isolation so multiple people can use the same instance without seeing each other's thoughts. JWT authentication. Password hashing. A Docker socket proxy that exposes only the specific API endpoints the admin panel needs, instead of mounting the raw socket and hoping for the best. Rate limiting. CORS configuration. Secure cookie attributes. Not because a personal tool running on your home network faces constant attack — but because security assumptions that are true today become false the moment you share access with one more person.

**Export.** Full data export in JSON, Markdown, and CSV. Not as a feature to check off — as a philosophical commitment. A self-hosted tool that traps your data is worse than a cloud tool that traps your data. If Local Brain stops being useful, your thoughts leave with you in a format any other system can read. The health check warns you if you haven't exported recently.

**An active plan against entropy.** Systems decay. Docker images get outdated. Database schemas drift. Backups silently fail. Configuration gets stale. Every part of Local Brain was built with the assumption that it would run unattended for months at a time on hardware in a closet. The update script takes a pre-migration backup before applying schema changes. Docker images are pinned to specific versions. The health tool checks database connectivity, backup recency, and service status in a single call.

**Cost visibility.** Every AI API call — embedding and chat — gets logged with token counts and estimated costs by model. The admin dashboard shows per-operation, per-model, and per-day breakdowns. For a system that makes API calls on every thought capture and search, knowing what it costs is the difference between a tool you trust and a tool you're afraid to use.

All of this — backups, security, export, entropy planning, cost tracking — was specified and built through Telegram messages while cutting hard maple in the front yard. Between rip cuts on the table saw, the prompts kept flowing and Claude kept building.

## The Interface

Claudegram is a Telegram bot connected to Claude Code running on a Mac Mini at home. You send a message. Claude reads it, has full access to the file system and terminal, writes code, runs commands, and responds. It's the same Claude Code you'd use in a terminal, but the input is your phone and the context window is a chat thread.

The constraint — no keyboard, no IDE, no ability to scan a file visually — changes how you work. You can't skim code. You can't cmd-click to a definition. You describe what you want at a higher level and trust the agent to handle implementation details. The prompts are closer to architectural decisions than line-by-line edits. "Add encrypted backup support with cloud sync" instead of "write a function that calls pg_dump."

This turns out to be a strength, not a limitation. When you can't micromanage, you focus on what matters: what the system should do, how it should fail, what trade-offs are acceptable. The implementation follows from the specification. That's Intent Engineering applied to the build process itself.

## From Prototype to Release

By the end of the afternoon, Local Brain wasn't a prototype anymore. It was a system with nine MCP tools, a full admin panel, encrypted backups, security hardening, cost tracking, multi-user support, and a health monitoring system. The README was written. The Docker Compose configuration was documented. The upgrade path was defined.

A few days later, a staff-level security review found 20 issues — two critical. Those were fixed in a subsequent session (also over Telegram, also over Claudegram). The final push to v1.0 included parameterized SQL throughout, SSRF protection on webhook delivery, AsyncLocalStorage for request-scoped user isolation, and Docker image version pinning.

From hearing a video at a lumber store to an open source release on GitHub. A few hours of elapsed time. Zero minutes at a keyboard.

## What This Actually Demonstrates

The point isn't that keyboards are obsolete. The point is that the bottleneck in building software has shifted. The bottleneck used to be typing — translating intent into syntax, character by character. With an AI agent that can write, test, and debug code autonomously, the bottleneck is now the specification. Knowing what to build. Knowing how it should fail. Knowing which trade-offs to make.

Those decisions don't require a keyboard. They require judgment. And judgment works fine from a phone, between cuts on a table saw, while the sawdust settles.
