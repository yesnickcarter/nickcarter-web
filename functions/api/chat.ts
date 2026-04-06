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

import Anthropic from "@anthropic-ai/sdk";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
  consent: boolean;
  selectedDocs: string[];
}

async function checkRateLimit(
  ip: string,
  kv: KVNamespace | undefined
): Promise<boolean> {
  if (!kv) return true;
  const key = `rate:${ip}:${new Date().toISOString().split("T")[0]}`;
  const count = parseInt((await kv.get(key)) || "0", 10);
  if (count >= 50) return false;
  await kv.put(key, String(count + 1), { expirationTtl: 86400 });
  return true;
}

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

  const ip = request.headers.get("cf-connecting-ip") || "unknown";
  const allowed = await checkRateLimit(ip, env.CHAT_KV);
  if (!allowed) {
    return new Response(
      JSON.stringify({ error: "Rate limit exceeded. Try again tomorrow." }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

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

  // Validate message shape and content size
  for (const msg of messages) {
    if (
      !msg ||
      typeof msg.content !== "string" ||
      (msg.role !== "user" && msg.role !== "assistant")
    ) {
      return new Response(
        JSON.stringify({ error: "Invalid message format" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    if (msg.content.length > 10000) {
      return new Response(
        JSON.stringify({ error: "Message too long" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
  }

  // Validate selectedDocs IDs (alphanumeric + hyphens only)
  if (selectedDocs && Array.isArray(selectedDocs)) {
    for (const docId of selectedDocs) {
      if (typeof docId !== "string" || !/^[a-z0-9-]+$/.test(docId)) {
        return new Response(
          JSON.stringify({ error: "Invalid document ID" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
    }
  }

  const userMessageCount = messages.filter((m) => m.role === "user").length;
  if (userMessageCount > 15) {
    return new Response(
      JSON.stringify({ error: "Session message limit reached" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const origin = new URL(request.url).origin;
  let baseContext: string;
  try {
    const contextResp = await fetch(`${origin}/chat-context.txt`);
    baseContext = await contextResp.text();
  } catch {
    baseContext = "";
  }

  let deepDiveContent = "";
  if (selectedDocs && selectedDocs.length > 0) {
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

  const systemPrompt = buildSystemPromptInline(baseContext, deepDiveContent);

  const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });

  const stream = await client.messages.stream({
    model: "claude-sonnet-4-6",
    max_tokens: 4096,
    system: systemPrompt,
    messages: messages.map((m) => ({ role: m.role, content: m.content })),
  });

  // Use a deferred promise so context.waitUntil() can keep the worker alive for logging
  let resolveLog: () => void;
  const logDone = new Promise<void>((r) => { resolveLog = r; });

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
        resolveLog!();
      }
    },
  });

  // Keep worker alive until stream + logging completes
  context.waitUntil(logDone);

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
};

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
