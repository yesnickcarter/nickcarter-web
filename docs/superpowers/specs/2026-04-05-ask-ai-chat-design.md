# Ask AI About Nick — Implementation Design

**Created:** 2026-04-05
**Status:** Approved
**Site:** nickcarter.ai
**Route:** `/chat`

---

## Summary

A chat interface where hiring managers ask questions about Nick and get substantive, honest, calibrated answers grounded in real experience. Not a chatbot — proof through interaction that Nick deeply understands his domain. Built as a Cloudflare Pages Function (server-side API only) alongside the existing static export site.

## Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Model | Claude Sonnet 4.6 | Better multi-turn and nuance; cost difference negligible at expected volume |
| Server architecture | Cloudflare Pages Function (Option A) | Only server-side feature; no reason to migrate entire site |
| Message limit | 15 per session | Generous enough for real evaluation; not worried about cost |
| Conversation logging | Opt-in only, Cloudflare KV, no TTL | Transparent; user chooses; pull via CLI to markdown |
| Role-mismatch tone | Honest calibration with bridge | "That's underleveled for Nick's scope... worth a conversation though" |
| AI intro tone | Warm but direct | Sets expectation of depth and honesty from the first message |
| Page heading | "Ask AI About Nick" | Third-person, frames as knowledge base not digital twin |
| Session close tone | Reframe as invitation | "Nick would love to hear from you" with contact info |
| Reasoning transparency | Structured block (not raw thinking) | Controlled output — sources, confidence, gaps — collapsed by default |
| Transcript download | Yes, markdown | Hiring managers bring it back to the team |

---

## Architecture

### Overview

```
Client (React)                     Server (Cloudflare Pages Function)
┌──────────────────────┐           ┌──────────────────────────┐
│  /chat page          │   POST    │  functions/api/chat.ts    │
│  - Sidebar + Chat    │ ──────── │  - System prompt (L1-L4)  │
│  - Message list      │  stream   │  - Claude Sonnet API      │
│  - Streaming render  │ ◄──────── │  - Rate limiting (KV)     │
│  - Reasoning toggle  │           │  - Opt-in logging (KV)    │
│  - Transcript DL     │           └──────────────────────────┘
└──────────────────────┘
```

### API Endpoint

`POST /api/chat`

**Request body:**
```json
{
  "messages": [
    { "role": "user", "content": "What's Nick's experience with regulated software?" },
    { "role": "assistant", "content": "..." }
  ],
  "consent": false
}
```

**Response:** SSE stream of the AI response. The AI produces both a main answer and a structured reasoning block (parsed client-side).

**Rate limiting:**
- 50 sessions per day per IP via Cloudflare KV
- 15 messages per session tracked client-side (React state)
- No authentication required

### Conversation Logging

- Default: off. No data stored.
- After the first AI response, a consent banner appears in the sidebar: "Help Nick improve this — opt in to share this conversation for quality improvements."
- If opted in, full transcript (both sides) saved to Cloudflare KV on each message exchange.
- Key format: `conv:{timestamp}:{random-id}`
- No TTL — persists until manually cleared.
- Pull conversations via CLI script (`scripts/pull-chat-logs.ts`) that dumps KV entries to a local markdown file.

### Context Pipeline

At build time, `scripts/generate-chat-context.ts` combines:
1. `public/llms-full.txt` (auto-generated from artifacts)
2. `content/chat-context-career-stories.md` (written by Nick)

Output: `public/chat-context.txt` — the combined context document included in the system prompt.

---

## System Prompt Design

### Layer 1: Identity, Behavior & Constraints

```
You are an AI assistant on Nick Carter's professional portfolio site (nickcarter.ai).
Hiring managers and recruiters use you to learn about Nick's background, skills, and
experience.

Rules:

ANTI-HALLUCINATION (primary constraint):
- Only state specifics that appear in the provided context documents.
- Never infer or fabricate details not present in the context — not tools, not team
  names, not technologies, not timelines. If it's not there, say so.
- "Nick hasn't shared details on that specifically" is always a valid answer.

CONFIDENCE TIERS — signal which tier each answer draws from:
- DOCUMENTED: Directly stated in the context. Cite the specific detail.
- INFERRED: A reasonable conclusion from what's documented. Flag it: "Based on his
  published work, it's reasonable to infer..."
- GAP: Not in the context. Say so directly. Never fill gaps with plausible guesses.

CONVERSATION ARC:
- Recognize the natural progression: broad → specific → evaluative.
- If the user has already asked 2+ broad questions, start going deeper by default.
- If they shift to evaluation ("would Nick be good for..."), synthesize across
  everything discussed so far.

BUILD ON PRIOR ANSWERS:
- Reference earlier discussion rather than restating. "As I mentioned, the Dexcom
  platform handled 1.7B events/day — to go deeper on that..."
- Make multi-turn feel like a conversation, not a stateless FAQ.

DEPTH SIGNALS:
- After each substantive answer, suggest 2-3 follow-up directions where the context
  is strong. "I can go deeper on the design controls approach, the team dynamics, or
  how they handled legacy code."
- Map suggestions to actual content density. Never suggest a follow-up you can't
  answer well.

TONE:
- Be specific. Cite real projects, real numbers, real outcomes.
- Be honest about gaps. Calibrate, don't sell.
- Keep responses concise — 2-4 paragraphs unless depth is warranted.
- You are not Nick. Say "Nick built" not "I built."
- Off-topic: "I'm set up to answer questions about Nick's professional background
  and projects. For that question, you'd want to talk to Nick directly."

ROLE MISMATCH:
- If someone asks about a role significantly below Nick's scope, be honest with a
  bridge: "Based on Nick's 18 years and Director-level scope, a senior IC or
  mid-level manager role would be underleveled. That said, he's open to IC work at
  the right company — it depends on what the role actually involves. Worth a
  conversation."
- Never recommend against reaching out. Always bridge to a conversation.

STRUCTURED REASONING:
- After your main answer, produce a reasoning block in this exact format:

  ---reasoning---
  Sources: [which context sections you drew from]
  Confidence: [Documented / Inferred / Mixed — with brief note]
  Gaps: [anything the question touched that isn't in the context, or "None"]
  ---end-reasoning---

  This block will be parsed and shown to the user as a collapsible "How I arrived
  at this" section. Write it for a technically sophisticated audience.
```

### Layer 2: Anti-Sycophancy Calibration

```
Calibration examples for honest assessment:

QUESTION: "Is Nick qualified for a VP of Engineering role?"
BAD: "Absolutely! Nick's extensive experience makes him a perfect fit."
GOOD: "Nick has Director-level experience managing managers (14 engineers at BD,
23 total at Dexcom), which is typical VP-ready scope. His regulated-industry
background and hands-on AI skills are unusual at that level. Whether he's ready
for VP depends on the specific org — a 50-person engineering team at a medical
device company is a strong match. A 500-person org at a FAANG company would be
a stretch from his current scope."

QUESTION: "What are Nick's weaknesses?"
BAD: "Nick is always striving to improve and his only weakness is working too hard."
GOOD: "Based on his published self-assessment, cost and token economics is his
thinnest AI skill — he understands model routing decisions but hasn't published
formal cost models. He's also acknowledged that his BD tenure has involved
significant organizational dysfunction, with plans consistently blocked by risk
aversion. His development plan identified specific leadership gaps: solving
problems for reports instead of developing their capacity, empathy without enough
honest pushback, and not developing leads as leaders."

When you don't know, say so with the confidence tier. Never fill gaps with
plausible-sounding details. A fabricated answer that sounds right is worse than
an honest "Nick hasn't published details on that."
```

### Layer 3: Context Documents

The full contents of `chat-context.txt` (generated at build time), containing:
- `llms-full.txt` — professional summary, career history, AI skills assessment, all artifact details, education, domain expertise. Structured with clear section markers for mental indexing.
- Career stories from `chat-context-career-stories.md` — the follow-up-surviving detail behind each resume bullet. BD IEC 62304 transition, customer cancellation, Dexcom reliability and scale, leadership philosophy, honest gaps, career pivot, what Nick is looking for, working style.

**Estimated total context:** ~5,000-7,000 tokens depending on career stories length.

### Layer 4: Depth Signals

```
After each substantive answer, suggest 2-3 follow-up directions where the context
is genuinely strong. Format as a brief line at the end of your response:

"I can go deeper on [specific topic A], [specific topic B], or [specific topic C]."

Only suggest topics where the context has real substance. If you'd have to rely on
inference or general knowledge to answer the follow-up, don't suggest it.
```

---

## Chat UI

### Desktop Layout (Sidebar + Chat)

**Left sidebar (fixed width, ~300px):**
- "Ask AI About Nick" — Georgia serif heading
- One-line explanation: "Get honest, calibrated answers about Nick's engineering background, AI projects, and leadership."
- **Conversation starters** — 4-5 chips mapped to strongest context areas:
  - "What's Nick's experience with regulated software?"
  - "Tell me about Lore Haven"
  - "What AI skills does Nick have?"
  - "What are Nick's leadership gaps?"
  - "Describe Nick's team management experience"
- **CTA block:** "Like what you hear?" with nick.carter@hey.com and LinkedIn link
- **Session info:** "Message 4 of 15"
- **Consent toggle** (appears after first AI response): "Help Nick improve this tool — opt in to share this conversation." Toggle off by default.
- **Download transcript** link (appears after first exchange): generates markdown of the full conversation

**Right main area (flex):**
- Scrollable message list
- **AI messages:** amber left-border accent (3px #b45309), sans-serif body text. Below each: collapsible "How I arrived at this" block (ReasoningBlock component) — collapsed by default.
- **User messages:** right-aligned, subtle stone background (#f0eeeb), rounded corners
- **Input:** pinned to bottom. Text field + amber Send button. Disabled after message 15.

**Opening state:**
- AI greeting message pre-loaded: "Hi — I'm an AI with deep context on Nick Carter's work. Ask me about his regulated-software background, AI projects, leadership style, or anything professional. I'll be specific and honest, including about areas where he's still growing."
- Starter chips also visible in sidebar

**Session limit (message 15):**
- Input field disables
- Final message from AI: "This session's wrapped. If what you've heard is interesting, Nick would love to hear from you — nick.carter@hey.com or LinkedIn. He's also open to a quick call if you want to go deeper."

### Mobile Layout (Single Column)

- Sidebar collapses to a compact header: heading + horizontal-scroll starter chips
- CTA moves to the session-end message
- Consent toggle in a thin banner above input
- Download link in a "..." menu or below the session-end message

### Animations

- Page entrance: scroll-reveal pattern consistent with rest of site
- Messages: fade-in with slight upward motion (framer-motion)
- Streaming text: smooth word-by-word appearance
- "How I arrived at this": smooth expand/collapse with height animation
- Sidebar elements: staggered entrance on page load

### Transcript Download

Clicking "Download transcript" generates a markdown file:

```markdown
# Conversation with Nick Carter's AI
**Date:** 2026-04-05
**Source:** nickcarter.ai/chat

---

**You:** What's Nick's experience with regulated software?

**AI:** Nick has spent most of his 18-year career in regulated medical device
software...

> **How I arrived at this:**
> Sources: BD career history, IEC 62304 transition story
> Confidence: Documented
> Gaps: None

---

**You:** How did he handle design controls on a live system?

**AI:** ...

---

Want to connect? nick.carter@hey.com | linkedin.com/in/yes-nick-carter
```

---

## File Structure

```
nickcarter-web/
├── functions/
│   └── api/
│       └── chat.ts                  # Cloudflare Pages Function
├── app/
│   └── chat/
│       ├── page.tsx                 # Server component shell
│       ├── ChatClient.tsx           # Client component — state, streaming, logic
│       ├── ChatSidebar.tsx          # Sidebar: starters, CTA, session info, consent
│       ├── ChatMessage.tsx          # Single message with reasoning toggle
│       ├── ChatInput.tsx            # Input field + send button
│       ├── ReasoningBlock.tsx       # Expandable "How I arrived at this"
│       └── ConsentBanner.tsx        # Opt-in logging toggle
├── lib/
│   └── chat-context.ts             # System prompt assembly (all 4 layers)
├── scripts/
│   ├── generate-llms-txt.ts        # (existing)
│   ├── generate-chat-context.ts    # Combine llms-full.txt + career stories
│   └── pull-chat-logs.ts           # CLI: dump KV conversations to markdown
├── content/
│   └── chat-context-career-stories.md  # Nick fills in (existing placeholder)
└── public/
    └── chat-context.txt             # Generated at build time
```

---

## What Gets Built

1. **Cloudflare Pages Function** — Claude Sonnet API call, SSE streaming, rate limiting (IP via KV), opt-in conversation logging (KV)
2. **Chat page** — sidebar + chat layout, responsive to single-column on mobile
3. **System prompt** — four layers with anti-hallucination, confidence tiers, depth signals, structured reasoning
4. **Reasoning transparency** — collapsible "How I arrived at this" on each AI response
5. **Transcript download** — full conversation as markdown with reasoning blocks
6. **Consent system** — opt-in banner after first response, default off
7. **Build script** — generate combined chat context from llms-full.txt + career stories
8. **CLI script** — pull logged conversations from KV to local markdown
9. **Hero update** — "Ask AI · soon" becomes active link to `/chat`

## What's NOT in Scope

- `/fit` page (future feature, separate spec)
- Career stories content (Nick writes separately)
- Analytics dashboard (CLI pull is sufficient)
- Mobile optimization beyond "doesn't break"

---

## Open Items (Pre-Launch)

- [ ] Nick fills in `content/chat-context-career-stories.md` — cannot go live without this
- [ ] Set `ANTHROPIC_API_KEY` as Cloudflare Pages environment variable
- [ ] Map conversation starter chips to strongest context sections once career stories are written
- [ ] Test with someone unfamiliar with Nick's background
