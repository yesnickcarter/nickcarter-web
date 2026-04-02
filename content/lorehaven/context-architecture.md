# Context Architecture for Non-Technical Users

Lore Haven's central design problem is that most people aren't engineers — but they still need AI to know who they are. The product bridges that gap without asking users to learn about tokens, context windows, or system prompts.

## The Lore Document

The product's centerpiece is the Lore — a structured document that acts as the user's portable AI memory. It's built through a guided wizard, not a text editor. The wizard asks plain-English questions ("What does a typical week look like?") and assembles the answers into a document that any AI tool can consume.

The Lore is deliberately simple: plain text, 300-600 words. Readable anywhere, forever. Self-contained — you can copy it into Claude's Project Instructions, ChatGPT's Custom Instructions, or Gemini's context. The document IS the contract between user and AI tool, which eliminates platform lock-in entirely. If Lore Haven disappeared tomorrow, you'd still have a text file that works everywhere.

## The Haven

The Haven is a web-based personal vault that stores three things:

- **Your Lore** — the core AI memory document, built by the Lore Builder wizard
- **Saved Prompts** — AI instructions that work for you, organized and never lost

Storage is cloud-based (S3-compatible object storage), with every save creating a recoverable snapshot. Users can restore any version of any file and download their entire vault as plain text at any time. No lock-in, no proprietary formats.

The critical design decision: small, curated collections outperform archives. Every file you expose to AI dilutes attention on every other file. A well-structured 500-word Lore document is more useful than a 5,000-word dump. The design principle is "omission over inclusion" applied to a consumer product.

## Value Before Infrastructure

The product delivers value at three levels, and the first requires nothing but a browser:

- **Free:** Web wizard builds the Lore. User copies it into any AI tool manually. No installation, no configuration. This is where most users start and where the product proves itself.
- **Personal ($60/year):** Unlimited Lore Builder categories, all starter packs, unlimited Saved Prompts with full version history, complete export.
- **Phase 2:** One-click AI connectors — browser extension or direct API integration so the Lore loads automatically.

The restraint is deliberate: don't force infrastructure before proving value. A non-technical user evaluates the product entirely through the web, with nothing to install and nothing to configure. Users who love the Lore document will pay to keep it. Users who don't love the Lore would never have paid anyway.

## Language as Architecture

Every label, button, and description avoids technical language:
- "Your Lore" — never "memory file" or "system prompt"
- "Your Haven" — never "repository" or "database"
- "Saving" — never "committing" or "syncing"
- Never mention git, S3, API, tokens, or context windows

This isn't UX polish. It's an architectural decision — the language shapes how users think about their data, which shapes what features they'll adopt and what they'll ignore. Getting the vocabulary wrong means building features nobody uses.
