# Check Fit — Design Spec

**Feature:** /fit page on nickcarter.ai
**Date:** 2026-04-05
**Status:** Approved

## Concept

A page where hiring managers paste a job description and get an honest, calibrated assessment of Nick Carter's fit for the role. The differentiator is anti-sycophancy — willingness to say "not a match" is what makes "strong fit" credible.

After the initial assessment, the conversation stays open for follow-up questions. A CTA recommends /chat for a broader guided tour of Nick's background.

## Interaction Model: Two-Phase

### Phase 1 — Input

A clean, focused page:

- Headline and one-liner explaining the tool
- Textarea with guiding placeholder: "Paste the full job description — the more detail, the better the assessment"
- 50-character minimum before submit is enabled
- "Assess Fit" button

No sidebar, no extra fields (company name, role title — the AI extracts these from the JD).

### Phase 2 — Assessment + Conversation

After submit, the page transitions to a chat-like view:

- The first AI message is the structured assessment (see below)
- The input field stays active for follow-up questions
- A CTA banner recommends /chat: "Want to explore Nick's full background? Chat with AI →"
- Same session message limit as /chat (15 user messages; the initial JD submission counts as message 1)
- No deep-dive document browser — /fit stays focused on the JD

## Assessment Structure

The AI's first response is a structured assessment with four sections:

### 1. Overall Fit

One of four labels with a one-line summary:

| Label | When to use |
|-------|-------------|
| **Strong Fit** | Core requirements align well with Nick's experience; gaps are minor or growth areas |
| **Good Fit** | Solid overlap with meaningful transferable experience; some gaps but addressable |
| **Partial Fit** | Some alignment but significant gaps in key requirements |
| **Not a Match** | JD requires fundamentally different experience or domain expertise |

### 2. Where Nick Shines

2-3 bullets mapping Nick's specific experience directly to JD requirements. Cite concrete examples (team sizes, technologies, accomplishments) rather than generic claims.

### 3. Gaps & Honest Caveats

What the JD asks for that Nick doesn't have or is light on. No hedging, no "but he could learn" — state the gap plainly. This section may be empty for strong fits, but should never be omitted (say "No significant gaps identified" if truly none).

### 4. What You'd Actually Get

Hidden value Nick brings that the JD doesn't explicitly ask for but would matter in the role. Examples: IEC 62304 compliance experience for a medtech role that doesn't mention it, or platform reliability track record for a role focused on feature delivery.

## Follow-up Conversation

After the assessment, the user can ask follow-up questions:

- Questions draw from the same base context as /chat (resume + career stories via chat-context.txt)
- The AI responds conversationally, not in structured format
- The JD is retained in conversation context so follow-ups can reference specific requirements
- A CTA to /chat is shown for users who want to explore beyond fit assessment

## Backend: Shared Endpoint with Mode Flag

### Request Format

```
POST /api/chat
{
  "messages": [...],
  "consent": true/false,
  "mode": "fit"        // NEW — optional, defaults to "chat"
}
```

### Endpoint Behavior

- `mode: "fit"` or `mode: "chat"` (default if omitted)
- Mode selects which system prompt builder to use
- All other behavior is identical: SSE streaming, rate limiting (50/day per IP), optional KV logging, message validation
- Rate limit is shared across modes (a user who hits /chat 30 times and /fit 20 times hits the 50/day cap)

### System Prompt (Fit Mode)

Three-layer architecture mirroring /chat:

**Layer 1 — Role & Rules:**
- Role: fit assessor for Nick Carter
- Anti-hallucination rules: only assess against documented experience
- Confidence tiers: same DOCUMENTED/INFERRED/GAP framework as /chat
- Structured output format for the first response (the four sections above)
- Tone: direct, professional, calibrated — not salesy

**Layer 2 — Calibration:**
- Examples of how to rate honestly at each tier
- Edge case handling:
  - Vague JD (few requirements) → note the limitation, assess what's available
  - Completely unrelated domain → "Not a Match" with brief explanation
  - JD that's clearly not a real job posting → polite deflection
- How to weigh requirements (explicit "must have" vs "nice to have" vs inferred)

**Layer 3 — Follow-up Behavior:**
- After the assessment, respond conversationally to follow-up questions
- Stay grounded in the JD context — reference specific requirements when relevant
- Recommend /chat when questions drift beyond fit assessment ("For a deeper look at Nick's approach to X, try Chat with AI →")

### Context

- Same base context as /chat: `chat-context.txt` (resume + career stories)
- The user's JD is included as the first user message
- No deep-dive documents loaded (no `selectedDocs` parameter in fit mode)

## Frontend

### New Files

| File | Purpose |
|------|---------|
| `app/fit/page.tsx` | Route entry point, wraps FitClient in PageTransition |
| `app/fit/FitClient.tsx` | Main component — manages two-phase state (input → conversation) |
| `app/fit/FitInput.tsx` | Phase 1: textarea + submit button + placeholder guidance |

### Reused from /chat

| Component | Usage |
|-----------|-------|
| `ChatMessage.tsx` | Renders assessment and follow-up messages |
| `ChatInput.tsx` | Follow-up input field in Phase 2 |
| `ReasoningBlock.tsx` | Reasoning display (if reasoning is enabled for fit mode) |

### Modified Files

| File | Change |
|------|--------|
| `functions/api/chat.ts` | Add mode detection, fit-specific system prompt builder (`buildFitSystemPrompt()`) |
| `app/components/HeroAnimated.tsx` | Activate "Check Fit" hero button (currently placeholder) |

### Phase Transition

1. User lands on /fit → sees FitInput (Phase 1)
2. User pastes JD, hits "Assess Fit"
3. FitClient wraps the JD as the first user message, sends to `/api/chat` with `mode: "fit"`
4. Page transitions to conversation view (Phase 2) with streaming assessment
5. After assessment completes, CTA banner appears + input field stays active for follow-ups
6. Follow-up messages sent as normal chat messages with `mode: "fit"` to maintain the fit system prompt

## Not In Scope

- Separate `/api/fit` endpoint — shared endpoint with mode flag
- Deep-dive document browser on /fit
- Guided wizard / multi-step input flow
- Percentage-based or numerical scoring
- Structured input fields (company name, role title as separate fields)
- Saving/sharing assessment results (future consideration)
