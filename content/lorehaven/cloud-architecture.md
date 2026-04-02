# Cloud Architecture: Web-First, Not Desktop

Lore Haven's architecture underwent a significant pivot during design. The original plan included an Electron desktop app that would manage a local file vault and run an MCP server as a subprocess. That plan was scrapped. The new architecture is cloud-first: a web app, S3 storage, and no desktop client at all.

## Why the Pivot

The original desktop architecture was designed around a constraint that disappeared. When the project started, Claude Desktop only supported local MCP servers — so a desktop app was the only way to serve context automatically. Then Claude Desktop added support for remote MCP servers with OAuth, eliminating the blocking constraint entirely.

With that constraint gone, the desktop app became pure liability:
- **Engineering surface area**: Electron + local MCP server + file watching + cloud sync = four systems to maintain instead of one
- **User friction**: Non-technical users don't install desktop apps from indie developers. The App Store trust signal doesn't exist for a side-loaded Electron app.
- **Cross-device**: A local vault only works on one machine. The target user (non-technical, uses multiple devices) needs their Lore everywhere.

The lesson: when a constraint that shaped your architecture disappears, you have to actually redesign — not just remove the constraint and keep the old plan.

## Current Architecture

The production architecture has three layers:

**Web App (lorehaven.ai)**
- Next.js static export on Cloudflare Pages
- Lore Builder wizard (guided questionnaire to structured document)
- Haven vault UI (Lore editor, Saved Prompts)
- Account management and Stripe billing

**API (api.lorehaven.ai)**
- Authentication (email/password + OAuth)
- Vault CRUD operations
- Stripe subscription management
- Version history endpoints

**Storage (S3-compatible)**
- All user data stored as plain text (Markdown)
- Every save creates a versioned snapshot
- Full export available at any time (download as zip)
- S3-compatible for provider flexibility (AWS S3, Backblaze B2, Cloudflare R2)

## Storage Design

The storage layer is deliberately simple. User vaults contain plain text files — no binary formats, no proprietary schemas, no databases. Markdown files in S3 buckets with versioning enabled.

This choice is load-bearing:
- **Durability**: Plain text survives any migration. S3 versioning means nothing is ever truly lost.
- **Cost**: Text files are cheap. Even at scale, storage costs are negligible.
- **Exit strategy**: Users can download their entire vault as a folder of .md files. No export transformation needed — the storage format IS the export format.
- **Simplicity**: No ORM, no schema migrations, no query optimization. Read a file, write a file, list files. The storage layer is boring by design.

## Phase 2: Remote MCP

The future architecture adds a cloud-hosted MCP server that AI tools connect to directly — no local installation required. Claude Desktop, Claude Code, and future MCP-compatible tools would authenticate via OAuth and access the user's Lore through the standard MCP protocol. The web app remains the primary interface; MCP becomes a transparent delivery channel that eliminates manual copy-paste for users who want automation.

This is why the Electron pivot was the right call: the same cloud infrastructure that serves the web app will serve MCP clients. One backend, two delivery channels.
