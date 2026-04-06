# Ask AI About Nick — How It Works

The Ask AI feature lets hiring managers have a multi-turn conversation with an AI that knows Nick's professional background deeply. This page explains exactly what the AI knows, what rules it follows, and why it's built this way.

## Why This Exists

Nate Jones's insight: "The quality of that interaction is almost impossible to fake at scale. You can write a resume that claims deep expertise in distributed systems. You cannot train an AI to conduct a convincing multi-turn conversation about distributed systems architecture if you don't actually understand it."

The chat is proof through interaction. A hiring manager who asks about IEC 62304 compliance gets a specific, detailed answer about the BD compliance transition. They ask a follow-up about design controls on a live system, and the AI handles it with depth. They probe an edge case and the AI either answers substantively or honestly says "Nick hasn't published details on that specifically."

The depth comes from the underlying substance, or it doesn't come at all.

## What the AI Knows

The AI's context comes from three sources, loaded at request time:

**Base context (always loaded):**
- Nick's full professional profile: career history, team sizes, accomplishments, domain expertise
- AI skills self-assessment against the Nate Jones Seven Skills Framework
- All portfolio artifact descriptions from this site
- Career stories with the substance behind each resume bullet

**Deep-dive documents (user-selected):**
- Hiring managers can optionally load any portfolio deep-dive document into the conversation
- Documents are grouped by project: Lore Haven, Local Brain, Ship With Intent, Tool Audit, Agentic, this site, and more
- The AI tells you when a question would be better answered with a specific document loaded
- Nick's full consolidated resume is also available as a loadable document

**Conversation history:**
- The full conversation so far is included in each request
- The AI is instructed to build on prior answers, not repeat them

## The Rules

The AI follows a strict set of behavioral rules. Here they are, verbatim:

### Anti-Hallucination (Primary Constraint)

This is rule number one. The AI may only state specifics that appear in its provided context. It cannot infer or fabricate details — not tools, not team names, not technologies, not timelines. If it's not in the context, it says so.

"Nick hasn't shared details on that specifically" is always a valid answer.

This matters because a fabricated detail that sounds plausible is worse than an honest gap. A hiring manager who catches the AI making something up will distrust everything else it said.

### Confidence Tiers

Every answer signals which tier it draws from:

- **Documented:** Directly stated in the context. The AI cites the specific detail.
- **Inferred:** A reasonable conclusion from what's documented. The AI flags it explicitly: "Based on his published work, it's reasonable to infer..."
- **Gap:** Not in the context. The AI says so directly and never fills gaps with plausible guesses.

Each response includes a collapsible "How I arrived at this" section showing the sources consulted, the confidence level, and any gaps — so you can see exactly how the AI reached its answer.

### Anti-Sycophancy

The AI is calibrated to give honest, measured assessments — not sales pitches. Two examples built into the prompt:

**"Is Nick qualified for a VP of Engineering role?"**
- Bad answer: "Absolutely! Nick's extensive experience makes him a perfect fit."
- Good answer: "Nick has Director-level experience managing managers (14 engineers at BD, 23 total at Dexcom), which is typical VP-ready scope. His regulated-industry background and hands-on AI skills are unusual at that level. Whether he's ready for VP depends on the specific org — a 50-person engineering team at a medical device company is a strong match. A 500-person org at a FAANG company would be a stretch from his current scope."

**"What are Nick's weaknesses?"**
- Bad answer: "Nick is always striving to improve and his only weakness is working too hard."
- Good answer: A specific answer referencing cost/token economics as his thinnest AI skill, organizational dysfunction at BD, and leadership gaps he's identified in his own development plan.

### Role Mismatch Handling

If someone asks about a role significantly below Nick's scope, the AI is honest but always bridges to a conversation: "Based on Nick's 18 years and Director-level scope, a senior IC or mid-level manager role would be underleveled. That said, he's open to IC work at the right company — it depends on what the role actually involves. Worth a conversation."

The AI never recommends against reaching out. It calibrates expectations and bridges to direct contact.

### Conversation Arc Awareness

The AI recognizes the natural hiring-manager progression: broad questions first, then specific probes, then evaluation. If you've asked two broad questions, it starts going deeper by default. If you shift to "would Nick be good for..." questions, it synthesizes across everything discussed.

### Depth Signals

After each substantive answer, the AI suggests 2-3 follow-up directions where the context is genuinely strong. It only suggests topics it can actually answer well — no bluffing depth it doesn't have.

## What You Can Do

- **Load documents:** Check boxes in the sidebar to load deep-dive documents into the conversation. The AI draws from them when relevant.
- **Preview and download documents:** Click the preview icon to read any document in a modal. Download it as markdown.
- **Download the transcript:** After your first exchange, a "Download transcript" link appears in the sidebar. The markdown file includes all messages and the reasoning blocks.
- **Opt in to sharing:** After the first response, you can opt in to sharing the conversation for quality improvements. This is off by default. Nothing is logged without your explicit consent.

## Session Limits

- 15 messages per session — enough for a real evaluation conversation
- After 15 messages, the input disables and the AI provides Nick's contact info
- Conversations start fresh on each page load (no persistence)
- No login or authentication required

## The Technical Stack

- **Model:** Claude Sonnet 4.6 — chosen for multi-turn conversation quality over cheaper alternatives
- **Server:** Cloudflare Pages Function (server-side only) — keeps the API key secure, streams responses via SSE
- **Rate limiting:** 50 sessions per day per IP via Cloudflare KV — prevents abuse without blocking legitimate use
- **Client:** React with Framer Motion for smooth streaming and animations
- **Context pipeline:** Base context and deep-dive documents are generated at build time and served as static files

## Why Transparency Matters

Every rule, every constraint, every piece of context described on this page is real and in production. The system prompt is not a black box — it's a specification. If the AI gives a bad answer, you can trace it back to the rules and see why.

This is the same principle behind the entire site: the work speaks for itself, or it doesn't speak at all.
