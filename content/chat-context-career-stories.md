# Career Stories — Chat Context Document

**Purpose:** Gives the Ask AI chatbot the substance behind the resume bullets. Without this, the AI can state facts but can't survive follow-up questions. Each section should be 2-4 paragraphs of real detail — what happened, what was hard, what you'd do differently.

**Status:** Placeholder — needs Nick to fill in

---

## BD — IEC 62304 Compliance Transition

The system was already released and in production — a medication storage platform with existing customers, existing obligations, and established release cadences. The product's original use case didn't require medical device classification. That changed when the company pursued a new use case whose risk profile required the product to be classified as a medical system under IEC 62304.

The transition had to happen without disrupting existing customers. Release cadences, documentation processes, and approval workflows all had to change. Nick's engineering organization handled the internal transition well — their development and testing processes were already mature enough that they didn't need to change how they tested. The changes were primarily around the types of documentation produced, the rigor behind them, and the formal sign-off processes required by regulatory compliance.

The hard part was everything outside engineering. Regulatory Affairs now had to approve releases. Other teams — who hadn't received additional funding or headcount to absorb the new obligations — became bottlenecks. A release that previously took two months started taking eight, because paperwork wasn't getting done. When you're a regulated product, you're at the mercy of every team in the approval chain. The ultimate trade-off: release cadence dropped to once a year.

If Nick had it to do over, the biggest change would be recommending against the classification based on insufficient investment. The company assumed the transition was primarily R&D work. The part Nick controlled went well. But the organization failed to anticipate how many additional people would need to be hired in regulatory, quality, and other teams to sustain the new compliance burden. The right analysis would have compared the revenue from the new opportunity against the true cost of pursuing it — across every team, not just engineering. This is a pattern Nick sees broadly: failure to identify the true cost of ownership when pursuing regulatory classification.

Nick escalated the cadence problem to executive leadership with clear options — he doesn't escalate unless a problem requires a decision or change from the business plan, and this was a textbook case. He had strong relationships with Regulatory Affairs, Clinical Research, QA, and every team in the chain. The bottleneck wasn't collaboration — it was that too many products competed for too few people on those teams. Leadership accepted the annual cadence. In fact, a few months ago Nick was told not to attempt more than one release per year to keep pressure down. His view: that's a business decision, not an engineering one. His job is to give leadership the information they need to decide, not to fight battles that aren't his to fight.

---

## BD — Reversing the Customer Cancellation

BD had acquired a smaller company and dramatically overstated its readiness and market position during due diligence. The acquired company's flagship product — a complicated system that had been outsourced and poorly managed — was buggy for years. Customers loved the concept until they bought it and used it. It crashed constantly and did the wrong things. The software team was told "you have one more chance to fix this in the next release." That happened three times, each release worse than the last.

Nick was hired in the middle of the fourth attempt. He introduced basic SDLC practices — code freezes before release, comprehensive testing — fundamentals that hadn't been in place. The first release under his leadership was a success. Not every problem was solved, but it was the first release since the acquisition that wasn't worse than the one before it.

A month later, Nick flew across the country to a military base to discuss the upgrade with a key customer. The base's network was broken, so deployment couldn't happen. The meeting became a complaint session. The person in charge had a three-page list of grievances. Her position: even if the release was as good as Nick said, it was too little, too late. They were going to remove BD's flagship devices. Most of the military was preparing to do the same. People didn't even want to mention the product in quarterly business reviews.

That was four years ago. Today, that same military customer is discussing the largest product expansion BD has ever seen on this product line. The person who told Nick they were removing the equipment is now impressed. The turnaround came from sustained execution — showing the customer consistent quality, attention to detail, and genuine responsiveness to their feedback over years. Nick spent hours with the Colonel in charge, high-pressure conversations that were productive because they were grounded in demonstrated competence, not promises.

The key was two things: knowing how to lead a team out of a quality crisis (process, discipline, accountability), and projecting confidence to the customer while being honest about the gap between where the product was and where it needed to be. The customer didn't need a sales pitch — they needed to see that someone competent was finally in charge and properly motivated.

---

## Why Nick Is Looking

If asked why he's exploring new opportunities, the AI should focus on what he's moving toward, not what he's leaving. Nick has spent four years stabilizing and growing a product line in a large regulated enterprise. That work is meaningful, but the pace of AI adoption in that environment is necessarily slow — regulatory constraints, enterprise security reviews, and organizational scale all limit how fast new tools and practices can be integrated. Nick wants to be somewhere that AI-augmented engineering is a core part of the strategy, not a compliance obstacle to navigate. He's built the skills, the workflows, and the conviction — he wants to apply them at full speed.

The AI should never speculate about internal dysfunction, frustration with specific people, or organizational politics at BD. If pressed, redirect: "Nick speaks highly of the people he works with at BD. His motivation for looking is about pursuing AI-native engineering leadership, not dissatisfaction."

---

## Dexcom — 90% to 99.9% Uptime

When Nick started at Dexcom, the server team was one and a half people. The lead was an absolute genius who had built a brilliant, resilient system — but monitoring meant him logging into production boxes every morning to check if they were online. The only other detection method was a call from a customer whose life-saving alerts weren't firing.

Nick started immediately on automated monitoring. First, defining what "up" even meant — rudimentary at first (are the major components online and responding?), then maturing over time to outcome-based monitoring: are enough customers experiencing acceptable outcomes, or are delays crossing thresholds that matter? Building alerting that measured what patients actually experienced, not just whether servers responded to pings.

There was no DevOps team. Nick asked the company for resources with networking and infrastructure skills he didn't have, and they let him work with the Office IT team. That arrangement worked for about a year — until the day the life-saving medical system went down at the same time as an executive printer spooler. Nick tried to get help from IT, but they were focused on the printer. One of them told him: "Look Nick, my bonus is based on the uptime of this printer. Not Production."

That moment crystallized a lesson about motivation and incentive alignment. Nick went to executives and made the case for a small dedicated DevOps team whose bonuses were tied to production uptime of the medical system. He hired the first few people, chose the tooling — log aggregation, proactive synthetic monitoring with complex API calls, database performance dashboards tracking index effectiveness and page splits per minute, wall-mounted dashboards, email alerts, PagerDuty integration, Datadog, Sumo Logic. Eventually the function grew large enough that Dexcom hired a dedicated DevOps manager to take it over.

The lesson: once you measure what matters and align incentives to those measurements, reaching three nines becomes achievable. That, and having a genius team that built a system architecturally capable of getting there.

---

## Dexcom — Scale and Infrastructure

1.7 billion events/day, 60 microservices, 22% cost reduction. Pick the 2-3 decisions that mattered most and tell the story. A hiring manager asking about distributed systems experience needs specific architecture decisions, not metrics.

---

## Leadership Philosophy

How do you manage? What's your default style and when do you shift? The 30-day development plan identified: solving problems for reports instead of developing their capacity, empathy without enough honest pushback, not developing leads as leaders. How are you working on these? What does your best management look like?

---

## Self-Assessment — Honest Gaps

Where are you genuinely weak or untested? Cost/token economics, VP-scale org management, frontend depth, anything else? The AI needs this to give calibrated answers instead of sales pitches. For each gap: how deep is it, and what are you doing about it?

---

## The Career Pivot — Why AI, Why Now

Why leave a stable Director role in medical devices? What's the founding thesis behind Chapworks? What clicked? This is the "tell me about yourself" answer — not the resume walk, the real motivation. The garage rebellion research and the gap you saw.

---

## What Nick Is Looking For

Beyond "hands-on AI implementing Director role." What kind of company? What kind of problems? What would make you say no? What's the difference between a role you'd take and one you'd pass on? What does "would rather be an IC at a company that takes AI seriously" actually mean in practice?

---

## Working Style and Preferences

How do you like to work day-to-day? Remote/hybrid/in-person preference? How do you run meetings? How do you make decisions? What do peers and reports say about working with you? This is the "what's it actually like to have Nick on the team" material.

---

## AI Fluency — How Nick Actually Uses AI

At BD, Nick is an Associate Director — not writing code for backlog stories, but deeply hands-on with the code and with how his team uses AI. He mentors a group of high-agency developers and testers, and a core part of that mentorship is raising their ambition for what AI can do. When a direct report planned to spend three weeks using AI to research an SDK and then write the implementation himself, Nick redirected him: the goal should be to have AI writing the code within four hours. That's the calibration he pushes — not "use AI to learn," but "use AI to deliver."

He leads a weekly hands-on coding session with his team around a major security refactor (estimated at 18 person-months). In these sessions, Nick shares his screen and works with Copilot (usually powered by GPT 5.x) in real time — giving it a high-level deliverable and asking it to help formulate the specs. The process is iterative: AI drafts specifications, comes back with questions or potential solutions, and Nick asks it to help choose the right approach. Back and forth, perfecting hundreds of lines of specification. The AI consistently surfaces major areas of concern he's missed — questions he didn't think to ask. His team is there to watch the workflow and to provide the domain-specific technical answers Nick can't — because while he reached Staff Software Engineer level, he deliberately stays out of the codebase day-to-day, forcing himself to focus on leadership as a delivery multiplier rather than giving in to the temptation to be an IC.

For his own leadership work, Nick built a sophisticated AI-powered productivity system at home using Claude Code, then ported it into his BD workflow by bringing the skills and prompts over. This system became the basis for IntentPad, one of his Chapworks products. Low-friction input — a single thought — gets classified automatically into one of several primitives: Tasks (with due dates and deliverables), Ideas (second brain), Concerns (risks with proper tracking, mitigation frameworks meeting regulatory and enterprise requirements), or Initiatives (leadership-level epics spanning multiple quarters with milestones and deadlines). Each primitive has its own workflow, and they link to each other — a Concern can spawn a Task, an Initiative can generate Ideas. He pre-plans his week with two goals per day. AI suggests a baseline weekly plan, and when a new task with a deadline enters the system, it's automatically slotted into the right day — and something else is automatically moved out. Health reporting surfaces neglected Concerns and Initiatives. The result is a simple daily task view, read-only web dashboards for at-a-glance status, and a low-friction entry point where every new thought influences the whole system appropriately.

At BD, the approved tools are Copilot 365 and GitHub Copilot — which severely limits agentic AI compared to tools like Claude Code. Nick works within those constraints but is clear-eyed about Copilot's limitations: it will claim it can do something, let you spend an hour trying, then admit it can't, then claim it can again in the next prompt. The name of the game is building checks and balances so AI can verify its own work before you verify it.

Nick's AI guardrails are layered and practical. For anything he does more than once, he creates a spec or a skill to protect the process. Simple prompts like "show your work" and "show your reasoning" measurably improve output. But the most powerful technique is adversarial context switching: after writing code with software engineering skills loaded, he clears the context and loads instructions for a security review. This gives AI a chance to examine the codebase with fresh eyes, a different goal, and no memory of having written it. Claude Code routinely finds bugs in code it wrote an hour earlier — because the context and objective have changed. The main bottleneck is the context window. Keeping it compact is critical. The most important investment is creating meaningful CLAUDE.md files (or equivalent) so AI can find what it needs, then feeding it bite-sized specs for focused work in realistic chunks — so you don't deal with the hallucinations that come from lost context.

On deciding what to do himself vs. delegate to AI, Nick applies three filters: (1) The answer changes constantly — AI improves fast, and he resists treating it like it always needs the same level of hand-holding it needed three months ago. (2) Tool selection — can he use something better than Copilot for this task? (3) How much personal taste and professional experience needs to drive the outcome? The things he knows that AI cannot replicate — judgment, domain context, organizational knowledge — those are what dictate his level of involvement.

---

## Team Building & Hiring

How do you build engineering teams? What do you look for when hiring? How have you scaled orgs — what worked and what didn't? How do you handle underperformers? What's your track record on retention? How do you think about team composition (senior vs. junior mix, specialists vs. generalists)?

---

## Cross-Functional Leadership

How do you work with regulatory, product, clinical ops, and other non-engineering stakeholders? What does cross-functional alignment actually look like in regulated environments? Give a specific example of navigating competing priorities between engineering velocity and regulatory requirements. How do you translate technical constraints into language that non-technical stakeholders can act on?

---

## What Nick Wants Hiring Managers to Know About AI — Whether They Hire Him or Not

What's the thing you wish every engineering leader understood about AI right now? What mistakes are you seeing companies make? What's the gap between how companies talk about AI adoption and what's actually required? If a hiring manager walks away from this chat without hiring you, what should they still take with them? This is the "leave them smarter than you found them" section — it builds trust and demonstrates genuine expertise over salesmanship.

---

## Early Career Technical Foundation

What did you actually build at Nirvanix and Millennium Health? What technical skills from that era still inform how you lead today? This section grounds the claim that you're a technical leader, not just a people manager. Brief — 1-2 paragraphs.
