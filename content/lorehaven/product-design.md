# Product Design: Solving the Cold Start Problem

Lore Haven exists because of a gap no AI company is incentivized to fill. Claude, ChatGPT, and Gemini all build memory — but each one's memory is siloed. Context built in Claude doesn't transfer to ChatGPT. Switch devices and you start over. Switch AI tools and you start from zero. The user's context is trapped inside products that compete with each other.

## The Lore Builder

The Lore Builder is the product's primary differentiator — a guided wizard that solves the "what do I tell AI?" problem for non-technical users.

The flow is deliberate:
1. User checks boxes for what matters (work, goals, family stories, preferences)
2. Answers plain-English follow-up questions — no jargon, no configuration
3. AI structures the answers into a clean, portable document
4. Result: a Lore document ready to use in 10 minutes

This is explicitly NOT a blank-page tool. Non-technical users don't know what to tell AI, and giving them a text editor doesn't solve that. The wizard is opinionated — it asks the right questions so the user doesn't have to figure out what matters. The onboarding IS the product.

## Starter Packs

Five curated starter packs target distinct user profiles:

- **Entrepreneur** — business context, decision-making style, communication preferences
- **Creative** — artistic process, inspiration sources, project types
- **Executive** — leadership style, team dynamics, strategic priorities
- **Parent** — family context, scheduling, values
- **Student** — learning style, coursework, goals

Each pack pre-populates the Lore Builder with category selections and follow-up questions tuned to that profile. A small business owner doesn't need to figure out which categories matter — the Entrepreneur pack already knows. Starter packs are the difference between a product that works in theory and one that works in practice.

## Cross-Vendor Portability

The Lore document works with ANY AI tool — Claude, ChatGPT, Gemini, whatever launches next. This is the core architectural bet: the user's context should be owned by the user, not the tool.

For MVP, portability is manual: copy the Lore, paste it into your AI tool's instructions. This sounds primitive, but it's the right first step. Manual copy-paste proves the Lore has value before building infrastructure around it. Phase 2 adds one-click connectors (browser extension, direct API). But the manual path never goes away — it's the escape hatch that guarantees the user is never locked in.

## What the Product Does NOT Do

Lore Haven doesn't search, rank, or filter your context with AI. It doesn't use embeddings or semantic retrieval. It stores and serves plain text that you explicitly chose to share with AI tools. This is a conscious limitation — for a document that's 300-600 words, curation IS the retrieval strategy. The user already decided what matters by going through the wizard. Adding "smart" features would add complexity without adding value at this scale.
