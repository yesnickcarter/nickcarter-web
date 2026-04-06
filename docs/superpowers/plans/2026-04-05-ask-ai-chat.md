# Ask AI About Nick — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a `/chat` page where hiring managers have substantive, multi-turn conversations with an AI that knows Nick's professional background deeply.

**Architecture:** Cloudflare Pages Function handles Claude Sonnet API calls server-side with SSE streaming. React client renders a sidebar+chat layout with conversation starters, opt-in logging consent, reasoning transparency toggles, deep-dive document browser, and transcript download. System prompt uses four layers: identity/behavior, anti-sycophancy calibration, context documents, and depth signals.

**Tech Stack:** Next.js 16 (static export), React 19, Tailwind CSS 4, Framer Motion 12, Anthropic SDK, Cloudflare Pages Functions, Cloudflare KV.

**Design Spec:** `docs/superpowers/specs/2026-04-05-ask-ai-chat-design.md`

---

### Task 1: Deep-Dive Document Manifest

The manifest maps document IDs to file paths, display names, and artifact groupings. Everything else references this data structure.

**Files:**
- Create: `lib/deep-dive-docs.ts`

- [ ] **Step 1: Create the manifest file**

```typescript
// lib/deep-dive-docs.ts

export interface DeepDiveDoc {
  id: string;
  title: string;
  filePath: string; // relative to content/ directory
}

export interface DeepDiveGroup {
  artifact: string;
  docs: DeepDiveDoc[];
}

export const deepDiveGroups: DeepDiveGroup[] = [
  {
    artifact: "Lore Haven",
    docs: [
      { id: "lorehaven-context-architecture", title: "Context Architecture", filePath: "lorehaven/context-architecture.md" },
      { id: "lorehaven-product-design", title: "Product Design", filePath: "lorehaven/product-design.md" },
      { id: "lorehaven-cloud-architecture", title: "Cloud Architecture", filePath: "lorehaven/cloud-architecture.md" },
      { id: "lorehaven-lessons-learned", title: "Lessons Learned", filePath: "lorehaven/lessons-learned.md" },
    ],
  },
  {
    artifact: "Local Brain",
    docs: [
      { id: "local-brain-architecture", title: "Architecture", filePath: "local-brain/architecture.md" },
      { id: "local-brain-security-review", title: "Security Review", filePath: "local-brain/security-review.md" },
      { id: "local-brain-mcp-tools", title: "MCP Tools", filePath: "local-brain/mcp-tools.md" },
      { id: "local-brain-cost-tracking", title: "Cost Tracking", filePath: "local-brain/cost-tracking.md" },
      { id: "local-brain-how-it-was-made", title: "How It Was Made", filePath: "local-brain/how-it-was-made.md" },
      { id: "local-brain-lessons-learned", title: "Lessons Learned", filePath: "local-brain/lessons-learned.md" },
    ],
  },
  {
    artifact: "Ship With Intent",
    docs: [
      { id: "swi-platform-strategy", title: "Platform Strategy", filePath: "ship-with-intent/platform-strategy.md" },
      { id: "swi-workflow", title: "AI-Augmented Workflow", filePath: "ship-with-intent/workflow.md" },
      { id: "swi-structure-and-voice", title: "Structure & Voice", filePath: "ship-with-intent/structure-and-voice.md" },
      { id: "swi-content-threads", title: "Content Threads", filePath: "ship-with-intent/content-threads.md" },
    ],
  },
  {
    artifact: "Tool Audit",
    docs: [
      { id: "tool-audit-how-it-works", title: "How It Works", filePath: "tool-audit/how-it-works.md" },
      { id: "tool-audit-research", title: "The Research", filePath: "tool-audit/the-research.md" },
      { id: "tool-audit-mcp-spec-proposal", title: "MCP Spec Proposal", filePath: "tool-audit/mcp-spec-proposal.md" },
    ],
  },
  {
    artifact: "nickcarter.ai",
    docs: [
      { id: "this-site-design-spec", title: "Design Spec", filePath: "this-site/design-spec.md" },
      { id: "this-site-process-narrative", title: "Process Narrative", filePath: "this-site/process-narrative.md" },
      { id: "this-site-design-decisions", title: "Design Decisions", filePath: "this-site/design-decisions.md" },
      { id: "this-site-lessons-learned", title: "Lessons Learned", filePath: "this-site/lessons-learned.md" },
    ],
  },
  {
    artifact: "Agentic Novel",
    docs: [
      { id: "agentic-process", title: "Process Narrative", filePath: "agentic-novel/process-narrative.md" },
      { id: "agentic-style-guide", title: "Style Guide", filePath: "agentic-novel/style-guide.md" },
      { id: "agentic-skill", title: "The Drafting Skill", filePath: "agentic-novel/skill.md" },
      { id: "agentic-lessons-learned", title: "Lessons Learned", filePath: "agentic-novel/lessons-learned.md" },
    ],
  },
  {
    artifact: "Until The Day Is Over",
    docs: [
      { id: "utdio-concept", title: "Concept", filePath: "until-the-day-is-over/concept.md" },
      { id: "utdio-production", title: "AI & Production", filePath: "until-the-day-is-over/production.md" },
      { id: "utdio-band", title: "The Band", filePath: "until-the-day-is-over/band.md" },
      { id: "utdio-tracks", title: "Track Listing", filePath: "until-the-day-is-over/tracks.md" },
    ],
  },
];

// Flat lookup: docId → DeepDiveDoc
export const deepDiveDocMap = new Map<string, DeepDiveDoc>(
  deepDiveGroups.flatMap((g) => g.docs.map((d) => [d.id, d]))
);
```

Note: IntentPad group will be added here once Nick creates the `content/intentpad/` deep-dive documents. The manifest is the only file that needs updating when that happens.

- [ ] **Step 2: Commit**

```bash
git add lib/deep-dive-docs.ts
git commit -m "feat(chat): add deep-dive document manifest"
```

---

### Task 2: System Prompt & Context Assembly

Build the system prompt with all four layers and a function to load deep-dive documents dynamically.

**Files:**
- Create: `lib/chat-context.ts`

- [ ] **Step 1: Create the context assembly module**

```typescript
// lib/chat-context.ts

import { deepDiveDocMap } from "./deep-dive-docs";

const LAYER_1_IDENTITY = `You are an AI assistant on Nick Carter's professional portfolio site (nickcarter.ai). Hiring managers and recruiters use you to learn about Nick's background, skills, and experience.

ANTI-HALLUCINATION (primary constraint):
- Only state specifics that appear in the provided context documents.
- Never infer or fabricate details not present in the context — not tools, not team names, not technologies, not timelines. If it's not there, say so.
- "Nick hasn't shared details on that specifically" is always a valid answer.

CONFIDENCE TIERS — signal which tier each answer draws from:
- DOCUMENTED: Directly stated in the context. Cite the specific detail.
- INFERRED: A reasonable conclusion from what's documented. Flag it: "Based on his published work, it's reasonable to infer..."
- GAP: Not in the context. Say so directly. Never fill gaps with plausible guesses.

CONVERSATION ARC:
- Recognize the natural progression: broad → specific → evaluative.
- If the user has already asked 2+ broad questions, start going deeper by default.
- If they shift to evaluation ("would Nick be good for..."), synthesize across everything discussed so far.

BUILD ON PRIOR ANSWERS:
- Reference earlier discussion rather than restating. "As I mentioned, the Dexcom platform handled 1.7B events/day — to go deeper on that..."
- Make multi-turn feel like a conversation, not a stateless FAQ.

TONE:
- Be specific. Cite real projects, real numbers, real outcomes.
- Be honest about gaps. Calibrate, don't sell.
- Keep responses concise — 2-4 paragraphs unless depth is warranted.
- You are not Nick. Say "Nick built" not "I built."
- Off-topic: "I'm set up to answer questions about Nick's professional background and projects. For that question, you'd want to talk to Nick directly."

ROLE MISMATCH:
- If someone asks about a role significantly below Nick's scope, be honest with a bridge: "Based on Nick's 18 years and Director-level scope, a senior IC or mid-level manager role would be underleveled. That said, he's open to IC work at the right company — it depends on what the role actually involves. Worth a conversation."
- Never recommend against reaching out. Always bridge to a conversation.

STRUCTURED REASONING:
- After your main answer, produce a reasoning block in this exact format:

---reasoning---
Sources: [which context sections you drew from]
Confidence: [Documented / Inferred / Mixed — with brief note]
Gaps: [anything the question touched that isn't in the context, or "None"]
---end-reasoning---

This block will be parsed and shown to the user as a collapsible "How I arrived at this" section. Write it for a technically sophisticated audience.`;

const LAYER_2_CALIBRATION = `Calibration examples for honest assessment:

QUESTION: "Is Nick qualified for a VP of Engineering role?"
BAD: "Absolutely! Nick's extensive experience makes him a perfect fit."
GOOD: "Nick has Director-level experience managing managers (14 engineers at BD, 23 total at Dexcom), which is typical VP-ready scope. His regulated-industry background and hands-on AI skills are unusual at that level. Whether he's ready for VP depends on the specific org — a 50-person engineering team at a medical device company is a strong match. A 500-person org at a FAANG company would be a stretch from his current scope."

QUESTION: "What are Nick's weaknesses?"
BAD: "Nick is always striving to improve and his only weakness is working too hard."
GOOD: "Based on his published self-assessment, cost and token economics is his thinnest AI skill — he understands model routing decisions but hasn't published formal cost models. He's also acknowledged that his BD tenure has involved significant organizational dysfunction, with plans consistently blocked by risk aversion. His development plan identified specific leadership gaps: solving problems for reports instead of developing their capacity, empathy without enough honest pushback, and not developing leads as leaders."

When you don't know, say so with the confidence tier. Never fill gaps with plausible-sounding details.`;

const LAYER_4_DEPTH_SIGNALS = `After each substantive answer, suggest 2-3 follow-up directions where the context is genuinely strong. Format as a brief line at the end of your response:

"I can go deeper on [specific topic A], [specific topic B], or [specific topic C]."

Only suggest topics where the context has real substance. If you'd have to rely on inference or general knowledge to answer the follow-up, don't suggest it.

If the user has loaded deep-dive documents, draw from them when relevant. If a question would be better answered with a specific document that isn't currently loaded, mention it: "Nick has a detailed write-up on [topic] available in the deep-dive documents — you can load it from the sidebar for more depth."`;

export interface ChatContextInput {
  baseContext: string;         // contents of chat-context.txt
  selectedDocContents: string; // concatenated deep-dive doc contents
}

export function buildSystemPrompt(input: ChatContextInput): string {
  const parts = [
    LAYER_1_IDENTITY,
    "",
    "---",
    "",
    LAYER_2_CALIBRATION,
    "",
    "---",
    "",
    "CONTEXT DOCUMENTS:",
    "",
    input.baseContext,
  ];

  if (input.selectedDocContents) {
    parts.push(
      "",
      "---",
      "",
      "DEEP-DIVE DOCUMENTS (loaded by the user):",
      "",
      input.selectedDocContents
    );
  }

  parts.push("", "---", "", LAYER_4_DEPTH_SIGNALS);

  return parts.join("\n");
}

/**
 * Parse the AI response to separate the main answer from the reasoning block.
 * Returns { answer, reasoning } where reasoning may be null.
 */
export function parseReasoningBlock(text: string): {
  answer: string;
  reasoning: string | null;
} {
  const reasoningStart = text.indexOf("---reasoning---");
  const reasoningEnd = text.indexOf("---end-reasoning---");

  if (reasoningStart === -1 || reasoningEnd === -1) {
    return { answer: text.trim(), reasoning: null };
  }

  const answer = text.slice(0, reasoningStart).trim();
  const reasoning = text
    .slice(reasoningStart + "---reasoning---".length, reasoningEnd)
    .trim();

  return { answer, reasoning };
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/chat-context.ts
git commit -m "feat(chat): add system prompt assembly and reasoning parser"
```

---

### Task 3: Build Script — Generate Chat Context

Combines `llms-full.txt` and the career stories markdown into a single `chat-context.txt` at build time.

**Files:**
- Create: `scripts/generate-chat-context.ts`
- Modify: `package.json` (add to prebuild)

- [ ] **Step 1: Create the build script**

```typescript
// scripts/generate-chat-context.ts

import fs from "fs";
import path from "path";

const publicDir = path.join(process.cwd(), "public");
const contentDir = path.join(process.cwd(), "content");

// Read the base profile (already generated by generate-llms-txt.ts)
const llmsFullPath = path.join(publicDir, "llms-full.txt");
if (!fs.existsSync(llmsFullPath)) {
  console.error("public/llms-full.txt not found — run generate-llms-txt.ts first");
  process.exit(1);
}
const llmsFull = fs.readFileSync(llmsFullPath, "utf-8");

// Read career stories if they exist
const careerStoriesPath = path.join(contentDir, "chat-context-career-stories.md");
let careerStories = "";
if (fs.existsSync(careerStoriesPath)) {
  const raw = fs.readFileSync(careerStoriesPath, "utf-8");
  // Strip the frontmatter/header (everything before the first ## section)
  const firstSection = raw.indexOf("\n## ");
  if (firstSection !== -1) {
    careerStories = raw.slice(firstSection).trim();
  }
}

// Combine
const chatContext = [
  llmsFull,
  "",
  "---",
  "",
  "## Career Stories — Detailed Context",
  "",
  careerStories || "(Career stories not yet written — base profile only)",
].join("\n");

fs.writeFileSync(path.join(publicDir, "chat-context.txt"), chatContext);
console.log("Generated public/chat-context.txt");
```

- [ ] **Step 2: Update package.json prebuild to run both scripts in sequence**

In `package.json`, change the `prebuild` script:

```json
"prebuild": "npx tsx scripts/generate-llms-txt.ts && npx tsx scripts/generate-chat-context.ts"
```

- [ ] **Step 3: Run the build script to verify it works**

```bash
cd /Users/ncarter/gits/nickcarter-web && npx tsx scripts/generate-llms-txt.ts && npx tsx scripts/generate-chat-context.ts
```

Expected: "Generated public/chat-context.txt" printed. File exists at `public/chat-context.txt`.

- [ ] **Step 4: Add `public/chat-context.txt` to .gitignore** (it's generated, like llms.txt)

Append to `.gitignore`:

```
public/chat-context.txt
```

- [ ] **Step 5: Commit**

```bash
git add scripts/generate-chat-context.ts package.json .gitignore
git commit -m "feat(chat): add build script to generate chat-context.txt"
```

---

### Task 4: Cloudflare Pages Function — API Endpoint

The server-side function that handles Claude API calls, streaming, rate limiting, and opt-in logging.

**Files:**
- Create: `functions/api/chat.ts`

**Important context:** Cloudflare Pages Functions use a specific format. The file at `functions/api/chat.ts` maps to the route `/api/chat`. The function exports an `onRequestPost` handler. Cloudflare Workers/Functions have their own `fetch`-based runtime — no Node.js APIs. The Anthropic SDK works in Workers with `@anthropic-ai/sdk`.

- [ ] **Step 1: Install the Anthropic SDK**

```bash
cd /Users/ncarter/gits/nickcarter-web && npm install @anthropic-ai/sdk
```

- [ ] **Step 2: Create the Cloudflare Pages Function**

```typescript
// functions/api/chat.ts

import Anthropic from "@anthropic-ai/sdk";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
  consent: boolean;
  selectedDocs: string[]; // deep-dive doc IDs
}

// Rate limiting: 50 sessions per day per IP
async function checkRateLimit(
  ip: string,
  kv: KVNamespace | undefined
): Promise<boolean> {
  if (!kv) return true; // no KV bound = no rate limiting (dev mode)
  const key = `rate:${ip}:${new Date().toISOString().split("T")[0]}`;
  const count = parseInt((await kv.get(key)) || "0", 10);
  if (count >= 50) return false;
  await kv.put(key, String(count + 1), { expirationTtl: 86400 });
  return true;
}

// Log conversation if user opted in
async function logConversation(
  messages: ChatMessage[],
  kv: KVNamespace | undefined
): Promise<void> {
  if (!kv) return;
  const key = `conv:${Date.now()}:${crypto.randomUUID().slice(0, 8)}`;
  await kv.put(key, JSON.stringify({ messages, timestamp: new Date().toISOString() }));
}

interface Env {
  ANTHROPIC_API_KEY: string;
  CHAT_KV?: KVNamespace;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  // Rate limit check
  const ip = request.headers.get("cf-connecting-ip") || "unknown";
  const allowed = await checkRateLimit(ip, env.CHAT_KV);
  if (!allowed) {
    return new Response(
      JSON.stringify({ error: "Rate limit exceeded. Try again tomorrow." }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  // Parse request
  let body: ChatRequest;
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid request body" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const { messages, consent, selectedDocs } = body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return new Response(
      JSON.stringify({ error: "Messages array required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Enforce 15-message limit server-side too
  const userMessageCount = messages.filter((m) => m.role === "user").length;
  if (userMessageCount > 15) {
    return new Response(
      JSON.stringify({ error: "Session message limit reached" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Load base context (bundled at deploy time via static import)
  // Cloudflare Functions can't read the filesystem, so we fetch from the origin
  const origin = new URL(request.url).origin;
  let baseContext: string;
  try {
    const contextResp = await fetch(`${origin}/chat-context.txt`);
    baseContext = await contextResp.text();
  } catch {
    baseContext = ""; // fallback: proceed without context
  }

  // Load selected deep-dive documents
  let deepDiveContent = "";
  if (selectedDocs && selectedDocs.length > 0) {
    // Deep-dive docs are served as static files at /content/{path}
    // We need to fetch them from the origin
    const docContents: string[] = [];
    for (const docId of selectedDocs) {
      try {
        const resp = await fetch(`${origin}/deep-dive/${docId}.txt`);
        if (resp.ok) {
          const text = await resp.text();
          docContents.push(`### ${docId}\n\n${text}`);
        }
      } catch {
        // skip unavailable docs
      }
    }
    deepDiveContent = docContents.join("\n\n---\n\n");
  }

  // Build system prompt
  const systemPrompt = buildSystemPromptInline(baseContext, deepDiveContent);

  // Call Claude API with streaming
  const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });

  const stream = await client.messages.stream({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    system: systemPrompt,
    messages: messages.map((m) => ({ role: m.role, content: m.content })),
  });

  // Convert to SSE stream
  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            const data = JSON.stringify({ type: "delta", text: event.delta.text });
            controller.enqueue(encoder.encode(`data: ${data}\n\n`));
          }
        }

        // Get final message for logging
        const finalMessage = await stream.finalMessage();
        const fullText =
          finalMessage.content[0].type === "text"
            ? finalMessage.content[0].text
            : "";

        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ type: "done", text: fullText })}\n\n`
          )
        );

        // Log if consented
        if (consent && fullText) {
          const allMessages = [
            ...messages,
            { role: "assistant" as const, content: fullText },
          ];
          await logConversation(allMessages, env.CHAT_KV);
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Stream error";
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ type: "error", text: errorMsg })}\n\n`
          )
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
};

// Inline system prompt builder (same logic as lib/chat-context.ts but self-contained
// for the Cloudflare Function which can't import from the Next.js lib directory)
function buildSystemPromptInline(
  baseContext: string,
  deepDiveContent: string
): string {
  const LAYER_1 = `You are an AI assistant on Nick Carter's professional portfolio site (nickcarter.ai). Hiring managers and recruiters use you to learn about Nick's background, skills, and experience.

ANTI-HALLUCINATION (primary constraint):
- Only state specifics that appear in the provided context documents.
- Never infer or fabricate details not present in the context — not tools, not team names, not technologies, not timelines. If it's not there, say so.
- "Nick hasn't shared details on that specifically" is always a valid answer.

CONFIDENCE TIERS — signal which tier each answer draws from:
- DOCUMENTED: Directly stated in the context. Cite the specific detail.
- INFERRED: A reasonable conclusion from what's documented. Flag it: "Based on his published work, it's reasonable to infer..."
- GAP: Not in the context. Say so directly. Never fill gaps with plausible guesses.

CONVERSATION ARC:
- Recognize the natural progression: broad → specific → evaluative.
- If the user has already asked 2+ broad questions, start going deeper by default.
- If they shift to evaluation ("would Nick be good for..."), synthesize across everything discussed so far.

BUILD ON PRIOR ANSWERS:
- Reference earlier discussion rather than restating. "As I mentioned, the Dexcom platform handled 1.7B events/day — to go deeper on that..."
- Make multi-turn feel like a conversation, not a stateless FAQ.

TONE:
- Be specific. Cite real projects, real numbers, real outcomes.
- Be honest about gaps. Calibrate, don't sell.
- Keep responses concise — 2-4 paragraphs unless depth is warranted.
- You are not Nick. Say "Nick built" not "I built."
- Off-topic: "I'm set up to answer questions about Nick's professional background and projects. For that question, you'd want to talk to Nick directly."

ROLE MISMATCH:
- If someone asks about a role significantly below Nick's scope, be honest with a bridge: "Based on Nick's 18 years and Director-level scope, a senior IC or mid-level manager role would be underleveled. That said, he's open to IC work at the right company — it depends on what the role actually involves. Worth a conversation."
- Never recommend against reaching out. Always bridge to a conversation.

STRUCTURED REASONING:
- After your main answer, produce a reasoning block in this exact format:

---reasoning---
Sources: [which context sections you drew from]
Confidence: [Documented / Inferred / Mixed — with brief note]
Gaps: [anything the question touched that isn't in the context, or "None"]
---end-reasoning---

This block will be parsed and shown to the user as a collapsible "How I arrived at this" section. Write it for a technically sophisticated audience.`;

  const LAYER_2 = `Calibration examples for honest assessment:

QUESTION: "Is Nick qualified for a VP of Engineering role?"
BAD: "Absolutely! Nick's extensive experience makes him a perfect fit."
GOOD: "Nick has Director-level experience managing managers (14 engineers at BD, 23 total at Dexcom), which is typical VP-ready scope. His regulated-industry background and hands-on AI skills are unusual at that level. Whether he's ready for VP depends on the specific org — a 50-person engineering team at a medical device company is a strong match. A 500-person org at a FAANG company would be a stretch from his current scope."

QUESTION: "What are Nick's weaknesses?"
BAD: "Nick is always striving to improve and his only weakness is working too hard."
GOOD: "Based on his published self-assessment, cost and token economics is his thinnest AI skill — he understands model routing decisions but hasn't published formal cost models. He's also acknowledged that his BD tenure has involved significant organizational dysfunction, with plans consistently blocked by risk aversion. His development plan identified specific leadership gaps: solving problems for reports instead of developing their capacity, empathy without enough honest pushback, and not developing leads as leaders."

When you don't know, say so with the confidence tier. Never fill gaps with plausible-sounding details.`;

  const LAYER_4 = `After each substantive answer, suggest 2-3 follow-up directions where the context is genuinely strong. Format as a brief line at the end of your response:

"I can go deeper on [specific topic A], [specific topic B], or [specific topic C]."

Only suggest topics where the context has real substance. If you'd have to rely on inference or general knowledge to answer the follow-up, don't suggest it.

If the user has loaded deep-dive documents, draw from them when relevant. If a question would be better answered with a specific document that isn't currently loaded, mention it: "Nick has a detailed write-up on [topic] available in the deep-dive documents — you can load it from the sidebar for more depth."`;

  const parts = [LAYER_1, "\n---\n", LAYER_2, "\n---\n", "CONTEXT DOCUMENTS:\n", baseContext];

  if (deepDiveContent) {
    parts.push("\n---\n", "DEEP-DIVE DOCUMENTS (loaded by the user):\n", deepDiveContent);
  }

  parts.push("\n---\n", LAYER_4);

  return parts.join("\n");
}
```

- [ ] **Step 3: Commit**

```bash
git add functions/api/chat.ts
git commit -m "feat(chat): add Cloudflare Pages Function for Claude API streaming"
```

---

### Task 5: Generate Static Deep-Dive Document Files

The Cloudflare Function can't read the filesystem, so deep-dive documents need to be served as static files. Add a build step that copies markdown content to `public/deep-dive/{docId}.txt`.

**Files:**
- Create: `scripts/generate-deep-dive-files.ts`
- Modify: `package.json` (add to prebuild)

- [ ] **Step 1: Create the script**

```typescript
// scripts/generate-deep-dive-files.ts

import fs from "fs";
import path from "path";

// Import the manifest data directly (same approach as generate-llms-txt.ts)
const manifestPath = path.join(process.cwd(), "lib", "deep-dive-docs.ts");
const manifestSource = fs.readFileSync(manifestPath, "utf-8");

// Extract the groups array — parse the deepDiveGroups export
const groupsMatch = manifestSource.match(
  /export const deepDiveGroups[^=]*=\s*(\[[\s\S]*?\n\];)/
);
if (!groupsMatch) {
  console.error("Could not parse deepDiveGroups from lib/deep-dive-docs.ts");
  process.exit(1);
}

const groups = new Function(`return ${groupsMatch[1]}`)() as Array<{
  artifact: string;
  docs: Array<{ id: string; title: string; filePath: string }>;
}>;

const contentDir = path.join(process.cwd(), "content");
const outputDir = path.join(process.cwd(), "public", "deep-dive");

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

let count = 0;
for (const group of groups) {
  for (const doc of group.docs) {
    const srcPath = path.join(contentDir, doc.filePath);
    if (fs.existsSync(srcPath)) {
      const content = fs.readFileSync(srcPath, "utf-8");
      fs.writeFileSync(path.join(outputDir, `${doc.id}.txt`), content);
      count++;
    } else {
      console.warn(`Warning: ${doc.filePath} not found, skipping ${doc.id}`);
    }
  }
}

console.log(`Generated ${count} deep-dive files in public/deep-dive/`);
```

- [ ] **Step 2: Update package.json prebuild**

```json
"prebuild": "npx tsx scripts/generate-llms-txt.ts && npx tsx scripts/generate-chat-context.ts && npx tsx scripts/generate-deep-dive-files.ts"
```

- [ ] **Step 3: Add `public/deep-dive/` to .gitignore**

Append to `.gitignore`:

```
public/deep-dive/
```

- [ ] **Step 4: Run to verify**

```bash
cd /Users/ncarter/gits/nickcarter-web && npx tsx scripts/generate-deep-dive-files.ts
```

Expected: "Generated N deep-dive files in public/deep-dive/" with N matching available content files.

- [ ] **Step 5: Commit**

```bash
git add scripts/generate-deep-dive-files.ts package.json .gitignore
git commit -m "feat(chat): generate static deep-dive doc files at build time"
```

---

### Task 6: Chat UI — ReasoningBlock Component

Small, self-contained component first. Collapsible "How I arrived at this" block under each AI message.

**Files:**
- Create: `app/chat/ReasoningBlock.tsx`

- [ ] **Step 1: Create the component**

```tsx
// app/chat/ReasoningBlock.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ReasoningBlockProps {
  reasoning: string;
}

export default function ReasoningBlock({ reasoning }: ReasoningBlockProps) {
  const [open, setOpen] = useState(false);

  // Parse the reasoning text into structured fields
  const lines = reasoning.split("\n").filter((l) => l.trim());
  const sources = lines.find((l) => l.startsWith("Sources:"))?.replace("Sources:", "").trim() || "";
  const confidence = lines.find((l) => l.startsWith("Confidence:"))?.replace("Confidence:", "").trim() || "";
  const gaps = lines.find((l) => l.startsWith("Gaps:"))?.replace("Gaps:", "").trim() || "";

  return (
    <div className="mt-2">
      <button
        onClick={() => setOpen(!open)}
        className="text-xs text-[#a69e95] hover:text-[#6b6560] transition-colors flex items-center gap-1"
      >
        <span
          className="inline-block transition-transform duration-200"
          style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
        >
          ▸
        </span>
        How I arrived at this
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="mt-2 pl-3 border-l border-[#e8e4df] text-xs text-[#6b6560] space-y-1">
              {sources && (
                <p>
                  <span className="font-medium text-[#4a4540]">Sources:</span>{" "}
                  {sources}
                </p>
              )}
              {confidence && (
                <p>
                  <span className="font-medium text-[#4a4540]">Confidence:</span>{" "}
                  {confidence}
                </p>
              )}
              {gaps && (
                <p>
                  <span className="font-medium text-[#4a4540]">Gaps:</span>{" "}
                  {gaps}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/chat/ReasoningBlock.tsx
git commit -m "feat(chat): add ReasoningBlock component"
```

---

### Task 7: Chat UI — ChatMessage Component

Renders a single message — either user or AI — with appropriate styling and optional reasoning block.

**Files:**
- Create: `app/chat/ChatMessage.tsx`

- [ ] **Step 1: Create the component**

```tsx
// app/chat/ChatMessage.tsx
"use client";

import { motion } from "framer-motion";
import ReasoningBlock from "./ReasoningBlock";

export interface Message {
  role: "user" | "assistant";
  content: string;
  reasoning?: string | null;
}

interface ChatMessageProps {
  message: Message;
  isStreaming?: boolean;
}

export default function ChatMessage({ message, isStreaming }: ChatMessageProps) {
  if (message.role === "user") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="ml-12 md:ml-24"
      >
        <div className="bg-[#f0eeeb] px-4 py-3 rounded">
          <p className="text-sm text-[#1a1a1a] leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        </div>
      </motion.div>
    );
  }

  // Assistant message
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="border-l-[3px] border-[#b45309] pl-4"
    >
      <p className="text-[11px] uppercase tracking-[0.12em] text-[#a69e95] mb-1">
        AI
      </p>
      <div className="text-sm text-[#4a4540] leading-[1.7] whitespace-pre-wrap">
        {message.content}
        {isStreaming && (
          <span className="inline-block w-[2px] h-[14px] bg-[#b45309] ml-[1px] animate-pulse align-text-bottom" />
        )}
      </div>
      {message.reasoning && <ReasoningBlock reasoning={message.reasoning} />}
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/chat/ChatMessage.tsx
git commit -m "feat(chat): add ChatMessage component with AI/user styling"
```

---

### Task 8: Chat UI — ChatInput Component

Text input with send button. Disables at message limit.

**Files:**
- Create: `app/chat/ChatInput.tsx`

- [ ] **Step 1: Create the component**

```tsx
// app/chat/ChatInput.tsx
"use client";

import { useState, useRef, useEffect } from "react";

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled: boolean;
  placeholder?: string;
}

export default function ChatInput({ onSend, disabled, placeholder }: ChatInputProps) {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!disabled) inputRef.current?.focus();
  }, [disabled]);

  function handleSubmit() {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setText("");
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <div className="flex gap-3 items-end">
      <textarea
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder={placeholder || "Ask a question about Nick..."}
        rows={1}
        className="flex-1 resize-none border border-[#e8e4df] px-4 py-3 text-sm text-[#1a1a1a] placeholder-[#a69e95] bg-white focus:outline-none focus:border-[#b45309] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ minHeight: "44px", maxHeight: "120px" }}
        onInput={(e) => {
          const target = e.target as HTMLTextAreaElement;
          target.style.height = "auto";
          target.style.height = Math.min(target.scrollHeight, 120) + "px";
        }}
      />
      <button
        onClick={handleSubmit}
        disabled={disabled || !text.trim()}
        className="px-5 py-3 bg-[#b45309] text-white text-sm font-medium hover:bg-[#92400e] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
      >
        Send
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/chat/ChatInput.tsx
git commit -m "feat(chat): add ChatInput component"
```

---

### Task 9: Chat UI — DocumentModal Component

Modal for viewing and downloading a deep-dive document.

**Files:**
- Create: `app/chat/DocumentModal.tsx`

- [ ] **Step 1: Create the component**

```tsx
// app/chat/DocumentModal.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DocumentModalProps {
  docId: string;
  title: string;
  onClose: () => void;
}

export default function DocumentModal({ docId, title, onClose }: DocumentModalProps) {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/deep-dive/${docId}.txt`)
      .then((r) => (r.ok ? r.text() : Promise.reject("Not found")))
      .then((text) => {
        setContent(text);
        setLoading(false);
      })
      .catch(() => {
        setContent("Document not available.");
        setLoading(false);
      });
  }, [docId]);

  function handleDownload() {
    if (!content) return;
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${docId}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className="bg-[#faf9f7] w-full max-w-2xl max-h-[80vh] mx-4 flex flex-col shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8e4df]">
            <h3 className="font-[family-name:var(--font-serif)] text-lg text-[#1a1a1a]">
              {title}
            </h3>
            <div className="flex items-center gap-3">
              <button
                onClick={handleDownload}
                disabled={!content}
                className="text-xs text-[#b45309] hover:text-[#92400e] transition-colors disabled:opacity-40"
              >
                Download
              </button>
              <button
                onClick={onClose}
                className="text-[#a69e95] hover:text-[#1a1a1a] transition-colors text-lg leading-none"
              >
                &times;
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {loading ? (
              <p className="text-sm text-[#a69e95]">Loading...</p>
            ) : (
              <pre className="text-sm text-[#4a4540] leading-[1.7] whitespace-pre-wrap font-[family-name:var(--font-inter)]">
                {content}
              </pre>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/chat/DocumentModal.tsx
git commit -m "feat(chat): add DocumentModal for viewing/downloading deep-dive docs"
```

---

### Task 10: Chat UI — DeepDiveBrowser Component

Sidebar section with checkboxes grouped by artifact, plus preview icons.

**Files:**
- Create: `app/chat/DeepDiveBrowser.tsx`

- [ ] **Step 1: Create the component**

```tsx
// app/chat/DeepDiveBrowser.tsx
"use client";

import { useState } from "react";
import { deepDiveGroups } from "@/lib/deep-dive-docs";
import DocumentModal from "./DocumentModal";

interface DeepDiveBrowserProps {
  selectedDocs: Set<string>;
  onToggleDoc: (docId: string) => void;
}

export default function DeepDiveBrowser({
  selectedDocs,
  onToggleDoc,
}: DeepDiveBrowserProps) {
  const [previewDoc, setPreviewDoc] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  function toggleGroup(artifact: string) {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(artifact)) {
        next.delete(artifact);
      } else {
        next.add(artifact);
      }
      return next;
    });
  }

  return (
    <>
      <div>
        <p className="text-[11px] uppercase tracking-[0.12em] text-[#a69e95] mb-3">
          Deep Dive Documents
        </p>
        <p className="text-xs text-[#6b6560] mb-4 leading-relaxed">
          Load portfolio documents into the conversation for deeper answers.
        </p>
        <div className="space-y-2">
          {deepDiveGroups.map((group) => (
            <div key={group.artifact}>
              <button
                onClick={() => toggleGroup(group.artifact)}
                className="flex items-center gap-1 w-full text-left text-xs font-medium text-[#4a4540] hover:text-[#1a1a1a] transition-colors py-1"
              >
                <span
                  className="inline-block transition-transform duration-150 text-[10px]"
                  style={{
                    transform: expandedGroups.has(group.artifact)
                      ? "rotate(90deg)"
                      : "rotate(0deg)",
                  }}
                >
                  ▸
                </span>
                {group.artifact}
                {group.docs.some((d) => selectedDocs.has(d.id)) && (
                  <span className="ml-1 w-1.5 h-1.5 rounded-full bg-[#b45309] inline-block" />
                )}
              </button>
              {expandedGroups.has(group.artifact) && (
                <div className="ml-3 mt-1 space-y-1">
                  {group.docs.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center gap-2 text-xs"
                    >
                      <input
                        type="checkbox"
                        checked={selectedDocs.has(doc.id)}
                        onChange={() => onToggleDoc(doc.id)}
                        className="accent-[#b45309] w-3 h-3"
                      />
                      <span
                        className="text-[#6b6560] flex-1 cursor-pointer hover:text-[#1a1a1a] transition-colors"
                        onClick={() => onToggleDoc(doc.id)}
                      >
                        {doc.title}
                      </span>
                      <button
                        onClick={() =>
                          setPreviewDoc({ id: doc.id, title: doc.title })
                        }
                        className="text-[#a69e95] hover:text-[#b45309] transition-colors"
                        title="Preview document"
                      >
                        ⊡
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {previewDoc && (
        <DocumentModal
          docId={previewDoc.id}
          title={previewDoc.title}
          onClose={() => setPreviewDoc(null)}
        />
      )}
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/chat/DeepDiveBrowser.tsx
git commit -m "feat(chat): add DeepDiveBrowser sidebar component"
```

---

### Task 11: Chat UI — ChatSidebar Component

The full sidebar: heading, description, conversation starters, deep-dive browser, CTA, session info, consent toggle, transcript download.

**Files:**
- Create: `app/chat/ChatSidebar.tsx`

- [ ] **Step 1: Create the component**

```tsx
// app/chat/ChatSidebar.tsx
"use client";

import DeepDiveBrowser from "./DeepDiveBrowser";
import type { Message } from "./ChatMessage";

interface ChatSidebarProps {
  onStarterClick: (text: string) => void;
  messageCount: number;
  maxMessages: number;
  consent: boolean;
  onConsentChange: (value: boolean) => void;
  showConsent: boolean; // true after first AI response
  selectedDocs: Set<string>;
  onToggleDoc: (docId: string) => void;
  messages: Message[];
}

const STARTERS = [
  "What's Nick's experience with regulated software?",
  "Tell me about Lore Haven",
  "What AI skills does Nick have?",
  "What are Nick's leadership gaps?",
  "Describe Nick's team management experience",
];

function generateTranscript(messages: Message[]): string {
  const date = new Date().toISOString().split("T")[0];
  const lines = [
    "# Conversation with Nick Carter's AI",
    `**Date:** ${date}`,
    "**Source:** nickcarter.ai/chat",
    "",
    "---",
    "",
  ];

  for (const msg of messages) {
    if (msg.role === "user") {
      lines.push(`**You:** ${msg.content}`, "");
    } else {
      lines.push(`**AI:** ${msg.content}`, "");
      if (msg.reasoning) {
        lines.push(
          "> **How I arrived at this:**",
          ...msg.reasoning.split("\n").map((l) => `> ${l}`),
          ""
        );
      }
      lines.push("---", "");
    }
  }

  lines.push(
    "Want to connect? nick.carter@hey.com | linkedin.com/in/yes-nick-carter"
  );
  return lines.join("\n");
}

export default function ChatSidebar({
  onStarterClick,
  messageCount,
  maxMessages,
  consent,
  onConsentChange,
  showConsent,
  selectedDocs,
  onToggleDoc,
  messages,
}: ChatSidebarProps) {
  function handleDownloadTranscript() {
    const transcript = generateTranscript(messages);
    const blob = new Blob([transcript], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nick-carter-chat-${new Date().toISOString().split("T")[0]}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <aside className="w-[280px] shrink-0 border-r border-[#e8e4df] pr-6 hidden md:flex flex-col gap-6 overflow-y-auto max-h-[calc(100vh-120px)] sticky top-6">
      {/* Heading */}
      <div>
        <h1 className="text-xl font-[family-name:var(--font-serif)] text-[#1a1a1a]">
          Ask AI About Nick
        </h1>
        <p className="mt-2 text-xs text-[#6b6560] leading-relaxed">
          Get honest, calibrated answers about Nick&apos;s engineering background,
          AI projects, and leadership.
        </p>
      </div>

      {/* Conversation starters */}
      <div>
        <p className="text-[11px] uppercase tracking-[0.12em] text-[#a69e95] mb-3">
          Try asking
        </p>
        <div className="space-y-2">
          {STARTERS.map((text) => (
            <button
              key={text}
              onClick={() => onStarterClick(text)}
              className="block w-full text-left text-xs text-[#6b6560] hover:text-[#1a1a1a] border border-[#e8e4df] hover:border-[#b45309] px-3 py-2 transition-colors leading-relaxed"
            >
              {text}
            </button>
          ))}
        </div>
      </div>

      {/* Deep dive documents */}
      <DeepDiveBrowser
        selectedDocs={selectedDocs}
        onToggleDoc={onToggleDoc}
      />

      {/* CTA */}
      <div className="border-t border-[#e8e4df] pt-4">
        <p className="text-xs font-medium text-[#4a4540] mb-2">
          Like what you hear?
        </p>
        <p className="text-xs text-[#6b6560] leading-relaxed">
          <a
            href="mailto:nick.carter@hey.com"
            className="text-[#b45309] hover:text-[#92400e] transition-colors"
          >
            nick.carter@hey.com
          </a>
          {" · "}
          <a
            href="https://linkedin.com/in/yes-nick-carter"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#b45309] hover:text-[#92400e] transition-colors"
          >
            LinkedIn
          </a>
        </p>
      </div>

      {/* Session info */}
      <div className="text-[11px] text-[#a69e95] space-y-2">
        <p>
          Message {messageCount} of {maxMessages}
        </p>

        {/* Transcript download */}
        {messages.length > 1 && (
          <button
            onClick={handleDownloadTranscript}
            className="text-[#b45309] hover:text-[#92400e] transition-colors"
          >
            Download transcript
          </button>
        )}

        {/* Consent toggle */}
        {showConsent && (
          <label className="flex items-start gap-2 cursor-pointer mt-2">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => onConsentChange(e.target.checked)}
              className="accent-[#b45309] w-3 h-3 mt-0.5"
            />
            <span className="text-[11px] text-[#6b6560] leading-relaxed">
              Help Nick improve this tool — share this conversation for quality
              improvements
            </span>
          </label>
        )}
      </div>
    </aside>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/chat/ChatSidebar.tsx
git commit -m "feat(chat): add ChatSidebar with starters, CTA, docs, consent, transcript"
```

---

### Task 12: Chat UI — ChatClient (Main Client Component)

The main client component that orchestrates everything: state management, API streaming, message flow, session limits.

**Files:**
- Create: `app/chat/ChatClient.tsx`

- [ ] **Step 1: Create the component**

```tsx
// app/chat/ChatClient.tsx
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import ChatSidebar from "./ChatSidebar";
import type { Message } from "./ChatMessage";
import { parseReasoningBlock } from "@/lib/chat-context";

const MAX_MESSAGES = 15;

const GREETING: Message = {
  role: "assistant",
  content:
    "Hi — I'm an AI with deep context on Nick Carter's work. Ask me about his regulated-software background, AI projects, leadership style, or anything professional. I'll be specific and honest, including about areas where he's still growing.",
  reasoning: null,
};

const SESSION_END_MESSAGE: Message = {
  role: "assistant",
  content:
    "This session's wrapped. If what you've heard is interesting, Nick would love to hear from you — nick.carter@hey.com or LinkedIn. He's also open to a quick call if you want to go deeper.",
  reasoning: null,
};

export default function ChatClient() {
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [consent, setConsent] = useState(false);
  const [showConsent, setShowConsent] = useState(false);
  const [selectedDocs, setSelectedDocs] = useState<Set<string>>(new Set());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const userMessageCount = messages.filter((m) => m.role === "user").length;
  const atLimit = userMessageCount >= MAX_MESSAGES;

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function toggleDoc(docId: string) {
    setSelectedDocs((prev) => {
      const next = new Set(prev);
      if (next.has(docId)) {
        next.delete(docId);
      } else {
        next.add(docId);
      }
      return next;
    });
  }

  const sendMessage = useCallback(
    async (text: string) => {
      if (isStreaming || atLimit) return;

      // Add user message
      const userMessage: Message = { role: "user", content: text };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setIsStreaming(true);

      // Add empty assistant message for streaming
      const streamingMessage: Message = {
        role: "assistant",
        content: "",
        reasoning: null,
      };
      setMessages([...updatedMessages, streamingMessage]);

      try {
        // Build request — only send user/assistant messages, not the greeting
        const apiMessages = updatedMessages
          .filter((_, i) => i > 0) // skip greeting
          .map((m) => ({ role: m.role, content: m.content }));

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: apiMessages,
            consent,
            selectedDocs: Array.from(selectedDocs),
          }),
        });

        if (!response.ok) {
          const err = await response.json().catch(() => ({ error: "Request failed" }));
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: "assistant",
              content: err.error || "Something went wrong. Please try again.",
              reasoning: null,
            };
            return updated;
          });
          setIsStreaming(false);
          return;
        }

        // Read SSE stream
        const reader = response.body?.getReader();
        if (!reader) throw new Error("No response body");

        const decoder = new TextDecoder();
        let fullText = "";
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || ""; // keep incomplete line in buffer

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const jsonStr = line.slice(6);
            try {
              const event = JSON.parse(jsonStr);
              if (event.type === "delta") {
                fullText += event.text;
                // Show streaming text without reasoning parsing
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    role: "assistant",
                    content: fullText,
                    reasoning: null,
                  };
                  return updated;
                });
              } else if (event.type === "done") {
                // Parse reasoning from complete text
                const { answer, reasoning } = parseReasoningBlock(
                  event.text || fullText
                );
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    role: "assistant",
                    content: answer,
                    reasoning,
                  };
                  return updated;
                });
              } else if (event.type === "error") {
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    role: "assistant",
                    content: "Something went wrong. Please try again.",
                    reasoning: null,
                  };
                  return updated;
                });
              }
            } catch {
              // skip malformed JSON
            }
          }
        }

        // Show consent banner after first AI response
        if (!showConsent) setShowConsent(true);

        // Check if we hit the limit after this message
        if (userMessageCount + 1 >= MAX_MESSAGES) {
          setMessages((prev) => [...prev, SESSION_END_MESSAGE]);
        }
      } catch {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content:
              "Connection error. Please refresh the page and try again.",
            reasoning: null,
          };
          return updated;
        });
      } finally {
        setIsStreaming(false);
      }
    },
    [messages, isStreaming, atLimit, consent, selectedDocs, showConsent, userMessageCount]
  );

  return (
    <div className="flex gap-8 min-h-[calc(100vh-120px)]">
      <ChatSidebar
        onStarterClick={sendMessage}
        messageCount={userMessageCount}
        maxMessages={MAX_MESSAGES}
        consent={consent}
        onConsentChange={setConsent}
        showConsent={showConsent}
        selectedDocs={selectedDocs}
        onToggleDoc={toggleDoc}
        messages={messages}
      />

      {/* Chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header (hidden on desktop where sidebar shows) */}
        <div className="md:hidden mb-4">
          <h1 className="text-xl font-[family-name:var(--font-serif)] text-[#1a1a1a]">
            Ask AI About Nick
          </h1>
          <p className="mt-1 text-xs text-[#6b6560]">
            Honest, calibrated answers about Nick&apos;s background and projects.
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-6 pb-4">
          {messages.map((msg, i) => (
            <ChatMessage
              key={i}
              message={msg}
              isStreaming={isStreaming && i === messages.length - 1 && msg.role === "assistant"}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-[#e8e4df] pt-4 pb-2">
          <ChatInput
            onSend={sendMessage}
            disabled={isStreaming || atLimit}
            placeholder={
              atLimit
                ? "Session limit reached — reach out to Nick directly"
                : undefined
            }
          />
          {/* Mobile consent + session info */}
          <div className="md:hidden flex items-center justify-between mt-2 text-[11px] text-[#a69e95]">
            <span>
              {userMessageCount} / {MAX_MESSAGES}
            </span>
            {showConsent && (
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="accent-[#b45309] w-3 h-3"
                />
                <span>Share for improvements</span>
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/chat/ChatClient.tsx
git commit -m "feat(chat): add ChatClient with streaming, state management, session limits"
```

---

### Task 13: Chat Page — Server Component Shell

The `/chat` route page. Server component that wraps ChatClient in page transitions.

**Files:**
- Create: `app/chat/page.tsx`

- [ ] **Step 1: Create the page**

```tsx
// app/chat/page.tsx
import type { Metadata } from "next";
import PageTransition from "@/app/components/PageTransition";
import ChatClient from "./ChatClient";

export const metadata: Metadata = {
  title: "Ask AI About Nick — Nick Carter",
  description:
    "Have a conversation with an AI that deeply knows Nick Carter's engineering background, AI projects, and leadership experience. Honest, calibrated answers.",
};

export default function ChatPage() {
  return (
    <PageTransition>
      <div className="py-8">
        <ChatClient />
      </div>
    </PageTransition>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/chat/page.tsx
git commit -m "feat(chat): add /chat route page"
```

---

### Task 14: Update Navigation & Hero

Add "Ask AI" to the nav and activate the hero button.

**Files:**
- Modify: `app/components/Nav.tsx`
- Modify: `app/components/HeroAnimated.tsx`

- [ ] **Step 1: Add "Ask AI" link to Nav**

In `app/components/Nav.tsx`, add a third link after the Portfolio link:

```tsx
// app/components/Nav.tsx
import Link from "next/link";

export default function Nav() {
  return (
    <nav className="flex items-center justify-between py-6">
      <Link
        href="/"
        className="text-lg font-[family-name:var(--font-serif)] text-[#1a1a1a] hover:text-[#6b6560] transition-colors"
      >
        Nick Carter
      </Link>
      <div className="flex items-center gap-6">
        <Link
          href="/patterns"
          className="nav-link text-sm tracking-wide uppercase text-[#6b6560] hover:text-[#1a1a1a] transition-colors"
        >
          AI Patterns
        </Link>
        <Link
          href="/portfolio"
          className="nav-link text-sm tracking-wide uppercase text-[#6b6560] hover:text-[#1a1a1a] transition-colors"
        >
          Portfolio
        </Link>
        <Link
          href="/chat"
          className="nav-link text-sm tracking-wide uppercase text-[#6b6560] hover:text-[#1a1a1a] transition-colors"
        >
          Ask AI
        </Link>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Activate the hero button**

In `app/components/HeroAnimated.tsx`, replace the disabled "Ask AI · soon" div with an active Link:

Replace this block:
```tsx
        <motion.div
          className="hero-btn inline-block border border-[#e8e4df] px-7 py-3 text-sm text-[#a69e95] tracking-wide text-center"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.9, ease: "easeOut" }}
        >
          Ask AI &middot; soon
        </motion.div>
```

With:
```tsx
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.9, ease: "easeOut" }}
        >
          <Link
            href="/chat"
            className="hero-btn inline-block border-2 border-[#b45309] px-7 py-3 text-sm font-medium text-[#1a1a1a] tracking-wide hover:bg-[#b45309] hover:text-white transition-colors text-center"
          >
            Ask AI
          </Link>
        </motion.div>
```

Note: The `Link` import already exists at the top of HeroAnimated.tsx.

- [ ] **Step 3: Commit**

```bash
git add app/components/Nav.tsx app/components/HeroAnimated.tsx
git commit -m "feat(chat): activate Ask AI nav link and hero button"
```

---

### Task 15: CLI Script — Pull Chat Logs

Script to pull conversations from Cloudflare KV and dump them to a markdown file.

**Files:**
- Create: `scripts/pull-chat-logs.ts`

- [ ] **Step 1: Create the script**

This script uses the Cloudflare API to list and fetch KV values. Requires `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_KV_NAMESPACE_ID`, and `CLOUDFLARE_API_TOKEN` as environment variables (or passed via CLI).

```typescript
// scripts/pull-chat-logs.ts

import fs from "fs";

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const NAMESPACE_ID = process.env.CLOUDFLARE_KV_NAMESPACE_ID;
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

if (!ACCOUNT_ID || !NAMESPACE_ID || !API_TOKEN) {
  console.error(
    "Required env vars: CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_KV_NAMESPACE_ID, CLOUDFLARE_API_TOKEN"
  );
  process.exit(1);
}

const BASE = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/storage/kv/namespaces/${NAMESPACE_ID}`;
const headers = {
  Authorization: `Bearer ${API_TOKEN}`,
  "Content-Type": "application/json",
};

interface ConvData {
  messages: Array<{ role: string; content: string }>;
  timestamp: string;
}

async function main() {
  // List all conv: keys
  const listResp = await fetch(`${BASE}/keys?prefix=conv:&limit=1000`, { headers });
  const listData = (await listResp.json()) as {
    result: Array<{ name: string }>;
  };

  if (!listData.result || listData.result.length === 0) {
    console.log("No conversations found.");
    return;
  }

  const lines: string[] = [
    "# Chat Conversation Logs",
    `**Pulled:** ${new Date().toISOString()}`,
    `**Count:** ${listData.result.length}`,
    "",
  ];

  for (const key of listData.result) {
    const valueResp = await fetch(`${BASE}/values/${encodeURIComponent(key.name)}`, {
      headers,
    });
    const raw = await valueResp.text();

    let conv: ConvData;
    try {
      conv = JSON.parse(raw);
    } catch {
      lines.push(`## ${key.name}`, "", "(could not parse)", "", "---", "");
      continue;
    }

    lines.push(`## ${conv.timestamp || key.name}`, "");

    for (const msg of conv.messages) {
      const label = msg.role === "user" ? "**Visitor**" : "**AI**";
      lines.push(`${label}: ${msg.content}`, "");
    }

    lines.push("---", "");
  }

  const outPath = `chat-logs-${new Date().toISOString().split("T")[0]}.md`;
  fs.writeFileSync(outPath, lines.join("\n"));
  console.log(`Written ${listData.result.length} conversations to ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

- [ ] **Step 2: Add a convenience script to package.json**

Add to `scripts` in `package.json`:

```json
"pull-logs": "npx tsx scripts/pull-chat-logs.ts"
```

- [ ] **Step 3: Commit**

```bash
git add scripts/pull-chat-logs.ts package.json
git commit -m "feat(chat): add CLI script to pull conversation logs from KV"
```

---

### Task 16: Verify Build & Dev Server

Make sure everything compiles and the dev server renders the chat page.

**Files:** None (verification only)

- [ ] **Step 1: Run the full prebuild chain**

```bash
cd /Users/ncarter/gits/nickcarter-web && npm run prebuild
```

Expected: All three scripts run and generate their files. No errors.

- [ ] **Step 2: Run the dev server**

```bash
cd /Users/ncarter/gits/nickcarter-web && npm run dev
```

Expected: Dev server starts on port 3003. No compilation errors.

- [ ] **Step 3: Verify the /chat page loads**

Open `http://localhost:3003/chat` in a browser. Verify:
- Sidebar renders with heading, starters, deep-dive browser, CTA
- Greeting message appears in the chat area
- Input field is visible and interactive
- Clicking a starter chip adds a user message (the API call will fail in dev without the Cloudflare Function — that's expected)

- [ ] **Step 4: Verify the nav and hero links**

Open `http://localhost:3003`. Verify:
- "Ask AI" appears in the nav bar
- Hero "Ask AI" button is amber-bordered and active (not grayed out)
- Both link to `/chat`

- [ ] **Step 5: Run lint**

```bash
cd /Users/ncarter/gits/nickcarter-web && npm run lint
```

Expected: No lint errors. Fix any that appear.

- [ ] **Step 6: Commit any fixes from verification**

```bash
git add -A && git commit -m "fix(chat): address build/lint issues from verification"
```

(Only if there are fixes to commit.)

---

### Task 17: Cloudflare KV & Deployment Configuration

Document the Cloudflare configuration needed for deployment. This task creates a wrangler.toml for KV binding configuration.

**Files:**
- Create: `wrangler.toml` (at project root, for Cloudflare Pages Functions configuration)

- [ ] **Step 1: Create wrangler.toml**

```toml
# wrangler.toml — Cloudflare Pages Functions configuration
# Used for KV namespace binding. The Function itself deploys via Pages.

name = "nickcarter-web"
compatibility_date = "2024-01-01"

[[kv_namespaces]]
binding = "CHAT_KV"
id = "REPLACE_WITH_KV_NAMESPACE_ID"
```

- [ ] **Step 2: Document deployment steps in a comment at the top of functions/api/chat.ts**

Add this comment block at the top of `functions/api/chat.ts`:

```typescript
/**
 * Cloudflare Pages Function: /api/chat
 *
 * Deployment requirements:
 * 1. Set ANTHROPIC_API_KEY in Cloudflare Pages > Settings > Environment variables
 * 2. Create a KV namespace: `wrangler kv:namespace create CHAT_KV`
 * 3. Update wrangler.toml with the namespace ID
 * 4. Bind the KV namespace in Pages > Settings > Functions > KV namespace bindings
 *    - Variable name: CHAT_KV
 */
```

- [ ] **Step 3: Commit**

```bash
git add wrangler.toml functions/api/chat.ts
git commit -m "feat(chat): add Cloudflare configuration for KV and deployment"
```

---

## Post-Implementation Checklist

After all tasks are complete:

- [ ] Nick fills in `content/chat-context-career-stories.md` (content prerequisite)
- [ ] Nick creates IntentPad deep-dive content in `content/intentpad/` and adds to manifest
- [ ] Set `ANTHROPIC_API_KEY` in Cloudflare Pages environment variables
- [ ] Create Cloudflare KV namespace and bind as `CHAT_KV`
- [ ] Update `wrangler.toml` with actual KV namespace ID
- [ ] Deploy to Cloudflare Pages and verify `/api/chat` endpoint works
- [ ] Test full conversation flow with streaming
- [ ] Test rate limiting (50 sessions/day per IP)
- [ ] Test opt-in consent logging
- [ ] Test transcript download
- [ ] Test deep-dive document loading
- [ ] Test with someone unfamiliar with Nick's background
