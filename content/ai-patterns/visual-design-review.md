# Visual Design Review

## The Problem

Design conversations in text are broken. You say "I want it to feel editorial, like a magazine." The AI says "Great, I'll use serif headings and generous white space." You both think you agree. Then the AI builds something and it's not what you pictured, because "editorial" means different things to different people and neither of you knew that until the code was written.

The traditional fix is wireframes — but wireframes require a designer, a separate tool, and a handoff step. By the time you're looking at a mockup, the conversation has moved on and the feedback loop is slow.

## The Pattern

Instead of describing a design and hoping the other person pictures the same thing, the AI renders interactive mockups directly in your browser — in real time, during the conversation. You see options side by side. You click to select. The AI reads your selection and moves to the next decision.

The conversation stays in the terminal. The visuals appear in the browser. Each decision is isolated: one screen per question, 2-4 options max, clear descriptions of the trade-offs. When the visual question is resolved, the browser shows a waiting screen and the conversation continues in text until the next visual question arrives.

## How It Works

The system has three parts:

**A local HTTP server** watches a directory for HTML files and serves the newest one to the browser. The AI writes a new HTML file for each design question. The browser auto-refreshes.

**Interactive mockups** use a standard set of CSS classes for options, cards, mockups, and split views. Each option has a `data-choice` attribute. When you click, the selection is recorded to an events file that the AI reads on its next turn.

**The conversation loop:**
1. AI writes an HTML file with 2-4 design options
2. AI tells you to check the browser and describes what's on screen
3. You look, click your preference, and respond in the terminal
4. AI reads your selection (from the events file and your text)
5. AI either iterates on the current question or advances to the next

## What This Looks Like in Practice

For nickcarter.ai, the design process went through four visual rounds:

**Round 1 — Design Direction:** Three complete mockups shown side by side — Warm Minimal, Dark Technical, and Editorial. Each rendered as a card with a realistic preview of how the site would look. Nick selected Editorial in seconds. In text, this would have been paragraphs of description and still been ambiguous.

**Round 2 — Hero Style:** Two variants of the editorial hero — Classic (quiet authority) and Bold (stacked name, accent bar). Both rendered with real typography and layout. Nick selected Bold. The left-border accent bar that became the site's signature element emerged from this choice.

**Round 3 — Card Style:** Three options for artifact cards — Ruled (top line), Bordered (box), Accent Bar (left border). Nick selected Accent Bar, creating visual continuity with the hero.

**Round 4 — Animation Package:** Six animation options presented as a multi-select checklist with descriptions. Nick selected all six. The descriptions were text, not visual — because animation options are better understood through description than through static mockups.

Four rounds. Four decisions that would have taken an hour of back-and-forth in text. Total time: about ten minutes.

## The Setup

This pattern requires the Superpowers plugin for Claude Code, which includes a brainstorming skill with a built-in visual companion server.

**What gets installed:**
- A Node.js HTTP server script (`start-server.sh`) that watches a content directory
- A frame template with CSS classes for options, cards, mockups, and interactive elements
- A helper script that records click events to a file the AI can read

**How it starts:**
```
scripts/start-server.sh --project-dir /path/to/your/project
```

This returns a URL (e.g., `http://localhost:59958`). Open it in your browser. The AI writes HTML files to the content directory. The server serves the newest one.

**What the AI writes:** Content fragments — just the HTML inside the page. The server wraps it in the frame template automatically, adding the header, CSS theme, selection indicator, and interactive infrastructure. A typical mockup file is 30-80 lines of HTML with inline styles for the design previews.

**What you do:** Open the URL once at the start of the session. Leave the tab open. The AI tells you when to look and what's on screen. Click options to select. Respond in the terminal.

## Why This Matters

The visual companion changes the nature of design decisions with AI. Without it, you describe what you want, the AI interprets, builds, and you react to the result. The feedback loop has one full build cycle of latency. With it, you see the interpretation before anything is built. Misunderstandings surface in seconds, not hours.

It also changes what the AI can propose. When options are text-only, the AI defaults to safe, familiar choices — because novel ideas are hard to describe and easy to misunderstand. When options are visual, the AI can show you something unexpected and let you react to the actual thing, not your imagination of the thing.

The pattern works for any visual decision: design direction, layout, color palettes, component styles, architecture diagrams, data flow visualizations. Anything where "look at this" is faster than "imagine this."

## Lessons Learned

- **Not every question needs the browser.** Conceptual choices, tradeoff lists, and scope decisions are faster in text. The visual companion is for content that IS visual — mockups, side-by-side comparisons, diagrams. Using it for text questions wastes time.
- **2-4 options per screen.** More than four creates decision paralysis. Fewer than two isn't a choice. Three is usually right.
- **The events file doesn't always capture clicks.** Sometimes the browser connection drops or the events file isn't created. The user's terminal response is always the primary feedback — the events file is supplementary data.
- **The mockups don't need to be pixel-perfect.** They need to communicate the difference between options. Inline styles with approximate colors and sizes are enough. The AI isn't building a design system — it's showing you three directions so you can pick one.
- **Architecture diagrams are a surprise use case.** The visual companion was designed for UI mockups, but it turned out to be excellent for architecture diagrams — showing system boundaries, data flow, and component relationships. The LoreHaven architecture diagram was prototyped in the companion before being built as a React component.
