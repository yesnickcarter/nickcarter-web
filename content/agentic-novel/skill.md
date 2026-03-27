---
name: agentic-draft
description: "Write first-draft prose for the novel Agentic. Use when asked to write a chapter, scene, or prose draft for the book."
---

# Agentic — Chapter Drafting Skill

Write first-draft prose for the novel Agentic. One chapter at a time.

## Invocation

User says: "draft chapter N" or "write chapter N" or just the chapter number.

## Context Loading Protocol

Before writing ANY prose, load these three layers. Do not write from memory.

### Layer 1: Standards (load every time, no exceptions)
1. `content/books/agentic/bible/references/prose-style.md` — voice analysis
2. `content/books/agentic/bible/references/ban-list.md` — banned words/moves
3. `content/books/agentic/bible/style-guide.md` — narrative rules

### Layer 2: Bible (load per chapter)
4. Character voice guides — ONLY characters physically present in this chapter (`content/books/agentic/Characters/*.md`)
5. `content/books/agentic/bible/detonator-continuity.md` — if detonator appears
6. `content/books/agentic/bible/symbols.md` — if any tracked symbol appears
7. `content/books/agentic/bible/superbowl-arc.md` — for Super Bowl texture notes

### Layer 3: Active (unique to this chapter)
8. The chapter outline: `content/books/agentic/chapters/ch##-*.md`
9. `content/books/agentic/chapters/INDEX.md` — for timeline, size guide, cross-references
10. The last 2-3 drafted chapters from the SAME PLOTLINE (see Plotline Siloing below)
11. Any specific instructions from Nick in the conversation

**Load all layers using parallel tool calls.** Do not start writing until all are read.

## Plotline Siloing

Two tracks run independently until convergence:

- **Sloane track:** Ch 1, 2, 5, 7, 9, 11, 13, 15
- **Graham track:** Ch 3, 4, 6, 8, 10, 12, 14, 16
- **Converged:** Ch 17 onward (both tracks in play)

When drafting a Sloane chapter, load previous Sloane drafts as context. Do NOT load Graham chapters — this causes "plot bleed" where characters reference information they don't have. Vice versa for Graham chapters. After convergence (Ch 17+), load from both.

For "last 2-3 drafted chapters," check the `drafts/` directory for the most recent files on the correct track.

## Pre-Draft Checklist (do silently, do not print)

Before writing, verify:
- [ ] Chapter outline has enough detail to draft (if THIN, tell Nick and offer to flesh it out first)
- [ ] All speaking characters have voice guides (if missing, tell Nick and offer to create one)
- [ ] Day/Time is set (if TBD, propose a value based on timeline)
- [ ] Size is assigned (S/M/L/XL)

If any check fails, stop and tell Nick what's missing. Offer to fix it before drafting.

## Writing the Draft

### Structure
- Write the FULL chapter in one pass
- Target the chapter's shirt size:
  - **S** = 1,500-2,000 words
  - **M** = 2,500-3,000 words
  - **L** = 3,500-4,000 words
  - **XL** = 4,000-5,000 words
- Follow the beat list in the chapter outline EXACTLY. Every beat must appear. Do not add beats. Do not skip beats.
- End on an unresolved question. Do not wrap up neatly.

### The 12 Prose Rules

1. **Show interior through exterior.** Characters are never "angry" or "scared." Their bodies do things. They notice things. They stop doing things.
2. **"Said" or nothing.** No "muttered," "exclaimed," "breathed," "offered," "countered." Action beats over attribution.
3. **Similes compare down.** Extraordinary → mundane. "Like he was waiting for the bus." Never up. Max one per page.
4. **Short sentences are verdicts.** They close a thought with finality. Max 2-3 single-sentence paragraphs per page.
5. **Objects carry meaning.** Characters are revealed by how they interact with objects. Every physical detail must characterize, not decorate.
6. **Withhold the important thing.** Tell the reader a character knows something without revealing what. The reader leans forward.
7. **No named emotions.** Not "she felt afraid." Show the physical manifestation.
8. **No adverbs on dialogue tags.** Zero instances of "said quietly."
9. **No editorializing.** The narrator observes. The reader judges. Never "It was a cruel thing to say."
10. **No explaining subtext.** Not "What he really meant was..." If the subtext needs explaining, rewrite the dialogue.
11. **Dark humor is character-driven.** Deadpan. Never authorial winking. Characters are funny because they are themselves.
12. **Interior monologue bleeds into narration.** No italics for thoughts. No "she thought." The POV character's perspective simply becomes the narration.

### Voice Calibration

The prose rhythm is **medium sentences punctuated by short, blunt ones.** The short sentences land like verdicts.

Longer sentences stack clauses with commas and "and" — they accumulate, they don't nest. No 50+ word sentences with complex subordination.

A signature move: a statement, then a correction or qualification in a sentence fragment immediately after. The fragment overrides what came before.

Character introductions get one dense paragraph (5-8 sentences): appearance → the detail that tells you what the appearance means → the inner truth the appearance hides.

Dialogue runs untagged for extended stretches in two-person exchanges. The reader is trusted to track speakers.

### What Goes on the Page

Three things only:
1. **Things characters say.** Dialogue. The primary engine.
2. **Things characters do.** Physical behavior. Interior states shown through exterior action.
3. **Setting descriptions.** Concrete, sensory, specific. Grounding and meaning through objects and spaces.

Nothing else earns its space.

### Hard Rules
- **No Mara inner monologue.** Ever. She is known only through dialogue and action.
- **No interrogation frame references** between Ch 2 and Ch 34. The reader must forget it exists.
- **Super Bowl is texture, not plot.** TVs in backgrounds. Food on counters. The game in passing. Weather — always present, never the point.
- **Political neutrality.** Characters can be politically motivated. The narrative never picks sides.

## Output

Write the draft to: `content/books/agentic/drafts/ch##-draft.md`

Format:
```markdown
# Chapter [N]: [Title]

[prose]
```

No metadata header. No scene breaks marked with `---` unless the chapter outline specifies a time/location jump. Just prose.

## Post-Draft

After writing:
1. **Report word count** (approximate)
2. **Report beats hit** — list each beat from the outline and confirm it appeared
3. **Flag any issues:**
   - Beats that were hard to execute and may need Nick's review
   - Continuity questions (character knowledge, timeline)
   - Missing voice guide moments (character spoke but guide was thin)
   - Any banned words/phrases that slipped through (self-check against ban list)
4. **Ask:** "Ready for the next chapter, or do you want to review this one first?"

## Thin Chapter Protocol

If a chapter outline is marked THIN in `remaining-work.md` or lacks scene beats:

1. Tell Nick: "Chapter N is thin — missing [X, Y, Z]. Want me to flesh out the outline first, or draft from what we have?"
2. If fleshing out: write expanded beats into the chapter file, then draft from the expanded version
3. If drafting anyway: do your best, but flag sections where you invented beats not in the outline

## Missing Voice Guide Protocol

If a speaking character has no voice guide:

1. Tell Nick: "[Character] speaks in this chapter but has no voice guide. Want me to create one first, or draft and we'll adjust?"
2. If creating: write a voice guide to `Characters/[Name].md` following the pattern of existing guides
3. If drafting anyway: base the voice on whatever notes exist in the chapter outline and character files

## Speed Mode

If Nick says "just go" or "keep going" or "next" — skip the post-draft report. Just write the draft, save it, and immediately load the next chapter.
