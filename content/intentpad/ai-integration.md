# IntentPad — AI Integration

## Classification System

The core AI feature is automatic thought classification. A user types a single thought into a text field. AI classifies it into one of several primitives:

- **Task** — Has a deliverable and a due date. Gets slotted into the weekly planner.
- **Idea** — Goes into the second brain. No deadline, no pressure. Available for retrieval when relevant.
- **Concern** — A risk or worry. Gets proper tracking with mitigation frameworks — useful in regulated and enterprise environments where risks need formal documentation.
- **Initiative** — A leadership-level epic spanning multiple quarters, with milestones and deadlines.

Classification uses confidence-based graduation:
- **High confidence:** Auto-promotes (e.g., a note that clearly describes a task with a deadline becomes a task automatically)
- **Medium confidence:** Suggests a classification, lets the user confirm or override
- **Low confidence:** Stays as a raw note until the user decides

The model is OpenAI GPT-4o-mini — chosen for speed and cost at classification scale. Every thought captured triggers a classification call, so the model needs to be fast and cheap. The classification prompt is structured to output both a type and a confidence score.

## Weekly Reviews

At the end of each week, AI analyzes what happened across all primitives. The review isn't evaluative — it's observational. Patterns like "You completed everything Monday through Wednesday. Nothing after Wednesday got done" help users understand their own rhythm without judgment.

The review also surfaces:
- Neglected Concerns that haven't been addressed
- Initiatives without recent progress
- Tasks that were repeatedly moved to later days

## Smart Planning

When a new task with a deadline enters the system, AI suggests where to slot it in the weekly plan. If every day is full (two goals per day), something gets moved out. The user always has final say, but AI handles the logistics of rearranging the week.
