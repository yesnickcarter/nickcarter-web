# IntentPad — Overview

Most productivity apps give you a list. Lists don't work — they grow faster than you can check things off, and the important stuff drowns in the noise. IntentPad takes a different approach: capture anything in a single text field, let AI classify it (note, task, or event), then plan your week with just two commitments per day — a Primary Goal and a Secondary Goal.

The constraint is the feature. When you can only pick two things, you have to decide what actually matters. The weekly planner is a negotiation with your future self — you set three outcomes for the week (Big 3), fill your daily slots, and at the end of the week, AI analyzes what happened. Not to judge, but to help you see patterns: "You completed everything Monday through Wednesday. Nothing after Wednesday got done." Week after week, you learn your rhythm.

## Origin

IntentPad started as a personal system Nick built for his own leadership work at BD using Claude Code. He needed low-friction input — a single thought — that would get classified automatically into one of several primitives: Tasks (with due dates and deliverables), Ideas (second brain), Concerns (risks with proper tracking, mitigation frameworks meeting regulatory and enterprise requirements), or Initiatives (leadership-level epics spanning multiple quarters with milestones and deadlines). Each primitive has its own workflow, and they link to each other — a Concern can spawn a Task, an Initiative can generate Ideas.

The system worked so well for his own productivity that he productized it as one of the first Chapworks products. The personal version used Claude Code skills and a local database. The product version is a full-stack web app with Stripe billing and a polished UI.

## The Two-Goal Philosophy

The weekly planning model is deliberately constrained. You pre-plan your week with two goals per day. AI suggests a baseline weekly plan, and when a new task with a deadline enters the system, it's automatically slotted into the right day — and something else is automatically moved out. Health reporting surfaces neglected Concerns and Initiatives. The result is a simple daily task view, read-only web dashboards for at-a-glance status, and a low-friction entry point where every new thought influences the whole system appropriately.
