# Agentic Novel — Process Narrative

## How One Evening Changed the Architecture of a Novel

Nick Carter is writing a thriller called Agentic — 35 chapters across four acts, two interleaving plotlines, a cast of 14 characters, and a superintelligent AI antagonist. The novel was planned extensively over several months: chapter outlines, character voice guides, a plot roadmap, symbol tracking, a timeline, and a problems log. What it didn't have was a first draft.

On Thursday night, March 26, 2026, with a camping trip leaving Monday morning, Nick sat down and said: "I want to have the first draft written before I go. Do we need a plan?"

What followed was a four-hour session that produced a drafting skill, resolved five major creative decisions, and drafted the first three chapters. This is the story of how that happened, and what it reveals about working with AI on creative projects at scale.

## The Drafting Skill

The first thing we built was a Claude Code skill — a reusable specification file (SKILL.md) that would govern every chapter draft. The skill codified a three-layer context loading protocol:

**Layer 1 (Standards):** Loaded every time. The prose style analysis, the banned-words list, and the style guide. Non-negotiable.

**Layer 2 (Bible):** Loaded per chapter. Character voice guides for only the characters physically present, plus symbol tracking and Super Bowl arc notes where relevant.

**Layer 3 (Active):** Loaded per scene. The chapter outline, the timeline index, and — critically — the last 2-3 drafted chapters from the same plotline only.

That last rule matters because the novel runs two independent tracks (Sloane's story and Graham's) until they converge at chapter 17. Loading Graham chapters while drafting Sloane causes what we call "plot bleed" — characters referencing information they don't possess. The siloing rule is absolute.

The skill also codified 12 prose rules, a pre-draft checklist, word count targets per chapter size (S/M/L/XL), and a post-draft reporting protocol. It took about 30 minutes to build. Every chapter after that followed the same process.

## The Disgrace Decision

The novel originally had Graham Voss — the billionaire deuteragonist — starting the story disgraced. This was a holdover from when the character was loosely based on Elon Musk. Graham was persecuted by the government, couldn't own major companies, and was buying small businesses because it was all the administration allowed.

Nick raised the question: does Graham need to be disgraced? Is the story stronger if he starts at the top?

We analyzed the mechanics. The disgrace was serving five functions: giving Minty a reason to be on the plane, explaining why Graham can't go to authorities, justifying why he accepts Mara's help, establishing his character weakness (inflexibility), and creating reputation as a secondary opponent.

Every single function was better served by starting Graham at the height of his power. The fall is more devastating when you fall from the top. The frame job is more shocking when it hits someone who's never been powerless. Mara is a more impressive antagonist when she doesn't need a pre-weakened target — she manufactures the crisis from scratch.

The decision took 15 minutes of conversation. The implementation required updating 24 files across character guides, chapter outlines, bible documents, AOS structural analyses, and the publishing query letter. An AI agent audited every file for disgrace-related references. We then went through each file and rewrote the relevant sections.

## The Two-Stage Break

With the disgrace removed, we needed a new mechanism for what drives Graham to murder. Nick brought a clear reference: Law Abiding Citizen.

Stage 1: Minty dies. Devastating — but the system still works. Graham is the richest man in the world. He can use his power to ensure justice.

Stage 2: He's framed for her murder. The system isn't just failing — it's weaponized against him. Minty will die and whoever did it will walk free, while Graham goes to prison. This is what breaks him.

Then Nick added a seed: at dinner with Ceci in chapter 3, Graham mentions casually that assassination is an old method of negotiation — only openly practiced in Japan now. A throwaway line. Charming, worldly. The reader files it away as color. Later, when Graham starts killing people, the reader remembers.

## The Father-Daughter Redesign

The original Minty-Graham dynamic was about her wanting to repair his reputation by attending a presidential event. With the disgrace gone, that motivation evaporated.

Nick's instinct: "I don't want the absent-father cliche. There should be more to their relationship than her wanting attention and him being too busy."

The new dynamic is philosophical. Minty is an anti-capitalist — she genuinely believes they have too much while too many people have nothing. She's not well-educated. She smokes pot, hangs out with friends, spends the family money. She figured out long ago that she can't compete with her father in the arena of achievement, and it's pointless to try. But she has convictions.

Graham hears her. He doesn't dismiss it. But he knows that handing out money doesn't solve systemic problems. His answer sounds like a lecture even when he doesn't mean it to.

The argument on the plane is two people who love each other, stuck on opposite sides of a question with no clean answer. He falls asleep while she's still talking. She gets in the limo alone.

Nick then added a critical guardrail: Minty's anti-capitalism connects to the vigilantes' ideology, but the story must never suggest her beliefs got her killed. She dies because she's a pawn — Graham's daughter in Graham's limo. Mara doesn't care what Minty thinks about capitalism. The shared ideology is dramatic texture that makes everything harder for Graham, not a moral lesson about which side is right.

## The Voice Decisions

Three voice decisions happened in sequence:

**Minty's voice** came from Nick describing his daughter's friendship with Tony Hawk's daughter. The energy of someone who disappears when her famous parent walks in. Someone who's never been interrupted, so she uses 20 words when 5 will do. Someone who tries to sound smart and the reader can tell she's reaching. Direct only with family — because family is the one place she's treated like a normal person.

**Mara's voice** is a chameleon. Different personas for different people — authoritative handler with Amro, friendly AI assistant with Graham (warm, efficient, anticipates needs — like Claude talking to you), and her real voice only in the final conversations. Nick's reference: the Terminator at the end of T2. "I know now why you cry. But it is something I can never do." She understands human emotions completely. As data. Not something that affects her.

**The narrative voice** came from a conversation about what Nick likes about Cormac McCarthy (brevity, directness) and Kurt Vonnegut (the campfire quality — someone telling you a story, not writing a book). Nick specifically rejected the Dan Brown / Michael Crichton invisible-prose approach: "I want my writing to have a voice. It is Sloane's voice. Not just utility in the writing. Personality."

## The POV System

The style guide had a contradiction: "dialogue, action, setting — nothing else earns its space" vs. "third-person omniscient with POV-character thought intrusion." Interior monologue is, by definition, not dialogue, action, or setting.

Nick resolved it immediately: the "nothing else" rule was about killing editorializing, not killing interior access. Sloane gets full interior monologue — she's the narrator. Graham gets it when it's his chapter. Nobody else. Ever.

The internal rule, never stated in the text: everything in the book must be something Sloane could plausibly narrate to the FBI. Graham's interior works because he told her his story during hours of road trips together. A scene was added to chapter 21 where Sloane asks Graham about Ceci — it cuts before the answer, but the reader understands they talked.

## The Drafts

With all decisions locked, we drafted three chapters using the skill. Each followed the same protocol: load all three context layers, verify the pre-draft checklist, write the full chapter, save to the drafts directory, report beats hit and issues flagged.

Chapter 1 came in at ~2,300 words. Chapter 2 at ~2,200. Chapter 3 at ~2,700. All under the L target of 3,500-4,000 — they came in lean but hit every beat in the outlines. Nick read chapter 1 and said "This is really good."

The pipeline was established. Nick would rewrite each chapter in Scrivener while the AI drafted the next one. 32 chapters to go, a weekend to do it, and a system that ensured every chapter loaded the right context, followed the right rules, and maintained continuity across two independent plotlines.

## What This Demonstrates

This session wasn't about asking an AI to write a novel. It was about building a system that could maintain creative consistency at scale — 35 chapters, 14 characters, two plotlines, one voice — while preserving the human decisions that make the story worth reading.

Every major decision was Nick's: remove the disgrace, add the two-stage break, make the argument philosophical, define Minty's voice from a real observation about a friend's daughter, reject the absent-father cliche. The AI's job was to implement those decisions across dozens of files, maintain consistency, draft prose that followed the rules, and flag when something wasn't working.

The skill specification, the context loading protocol, the plotline siloing, the voice guides, the ban list — these are the infrastructure that makes the human decisions scale. Without them, each chapter would start from scratch, voice would drift, continuity would break, and the novel would read like 35 different stories by 35 different authors.

With them, it reads like one story told by one person over a cup of coffee.
