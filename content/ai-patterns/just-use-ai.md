# Just Use AI

## The Problem

Everyone knows they should be using AI more. They've read the articles. They've seen the demos. They've watched someone build an app in 20 minutes on YouTube and thought "I should try that." Then they don't. Or they open ChatGPT, ask it to write an email, think "that's neat," and close the tab.

A coworker told me this week: "I wish I did more with AI." He's a smart engineer. He's been meaning to go deeper for months. He hasn't. Not because he's lazy — because the gap between "I should use AI" and "I use AI every day" feels like a cliff. It feels like there's a course to take, a certification to earn, a weekend to set aside. There isn't. There's just the first 30 minutes.

## The Pattern

Sign up. Open it. Use it on something real. Today. Not a tutorial. Not a course. Something you were going to do anyway — a document you need to write, a problem you need to think through, code you need to debug, a plan you need to make. Use AI on that thing. Right now.

Here's what happens: you use it for 30 minutes this week. The next week you use it for 30 minutes a day. The week after that you can't imagine not using it. The adoption curve isn't a learning curve — it's a habit curve. The benefits are immediate enough that the tool sells itself after the first real use.

But there's a critical distinction most people miss.

## Chat AI vs. Agentic AI

Most people's experience with AI is chat. You type a question, you get an answer. It's Google with better grammar. It's useful — it can draft emails, explain concepts, summarize documents. But it's not life-changing. It doesn't fundamentally alter how you work. You're still doing the work. The AI is a faster reference tool.

**Agentic AI is different.** An agentic system doesn't just answer questions. It takes actions. It reads your files. It writes code. It runs commands. It makes plans and executes them. It can hold context across a complex task, break it into steps, and work through them while you review and steer.

The difference between chat AI and agentic AI is the difference between asking someone for directions and hiring someone to drive.

Here's a concrete example from today. I wanted a professional portfolio website. In a chat model, I'd describe what I want, get some suggestions, maybe get some code snippets I'd paste into files. With an agentic system (Claude Code), the AI:

1. Read my existing project specs across multiple repositories
2. Brainstormed the site structure through a conversation
3. Wrote a design specification and had it automatically reviewed
4. Created an 8-task implementation plan
5. Dispatched a fresh AI agent for each task
6. Built the components, wrote the content, applied the design
7. Showed me interactive mockups in my browser so I could pick the visual direction
8. Added animations, deployed to Cloudflare Pages, generated AI-readable endpoints

From "I need a website" to a live site at nickcarter.ai in one afternoon. Not because the AI did everything — because the AI handled the mechanical work while I made the decisions that matter: what to show, how to frame it, what the design should feel like, what to include and what to leave out.

That's the shift. Chat AI helps you do your work faster. Agentic AI changes what "your work" means.

## What to Set Up

You need three things. Total setup time: 15 minutes.

### 1. Claude Max (or Pro)

Sign up at claude.ai. Max gives you the highest usage limits and access to the most capable models. Pro works too — it's just lower limits. The point is: get an account and start using it. The specific tier matters less than the fact that you're using it.

**Cost:** $20/month (Pro) or $100/month (Max). If you're a professional, the Max tier pays for itself in the first week. If you're not sure, start with Pro and upgrade when you hit the limits.

### 2. Claude Code

This is where agentic AI lives. Claude Code is a command-line tool that reads your files, writes code, runs commands, and maintains context across complex tasks. It's not a chat window — it's a collaborator that can see your project and take action in it.

**Install:**
```
npm install -g @anthropic-ai/claude-code
```

Then navigate to any project directory and type `claude`. It reads your codebase, understands the structure, and starts working with you.

**What it can do on day one:**
- Read your codebase and answer questions about it
- Write code that follows your existing patterns
- Run tests, fix failures, explain what went wrong
- Create files, modify files, commit to git
- Break complex tasks into steps and execute them

You don't need to learn prompting. You don't need a course. You say "add a login page" or "fix the failing test" or "explain how the auth system works" and it does it. You review, you steer, you approve.

### 3. Claude Code with Superpowers (optional but recommended)

The Superpowers plugin adds structured workflows on top of Claude Code: brainstorming sessions, implementation plans, test-driven development, code review, and the visual companion for design decisions. It's the difference between having a capable assistant and having a capable assistant with a methodology.

**What it adds:**
- **Brainstorming skill:** Structured idea-to-design conversations with visual mockups
- **Writing plans:** Break specs into bite-sized implementation tasks
- **Subagent-driven development:** Fresh AI agent per task, automatic review
- **Visual companion:** Interactive browser mockups for design decisions
- **TDD workflow:** Test-first development with the AI writing tests before code

## The First 30 Minutes

Don't start with a tutorial. Start with something real.

**If you write code:** Open a project you're working on. Ask Claude Code to explain a part of the codebase you don't fully understand. Then ask it to write a test for something that isn't tested. Then ask it to implement a small feature you've been putting off.

**If you manage people:** Ask Claude to help you write a technical spec for something your team needs to build. Not a vague brief — a real spec with acceptance criteria, edge cases, and a definition of done. See how the conversation refines the idea.

**If you write documents:** Give Claude a draft of something — a report, a proposal, a strategy doc — and ask it to identify the three weakest arguments and suggest specific improvements. Not "make it better." Specific weaknesses.

**If you're not sure what to do:** Describe the most tedious part of your job. The thing you do every week that takes two hours and requires no creativity. Ask Claude how to automate it. Then actually automate it.

The first session will be awkward. You'll over-explain, under-explain, get output that's close but not right. That's normal. The second session will be better. By the fifth session you'll have a working pattern. By the tenth, you'll wonder how you worked without it.

## Why People Get Stuck on Chat

Chat AI is comfortable because it's familiar. You ask a question, you get an answer. It's the same interaction model as Google, Siri, or asking a colleague. The mental model is: I have a question, the tool has an answer.

Agentic AI requires a different mental model: I have a goal, the tool helps me get there. The shift isn't about technology — it's about trust. Trusting the AI to read your files. Trusting it to write code that works. Trusting it to make changes you can review. That trust builds through use. It can't build through reading about it.

The people who are thriving in the AI-augmented workforce aren't the ones who read the most articles about AI. They're the ones who opened the tool, used it on something real, and kept going. The reading comes later, once you have context for what the articles are talking about.

## The Compound Effect

Thirty minutes this week. Thirty minutes a day next week. An hour a day the week after. Not because you're disciplined — because the tool makes your work better and you don't want to stop.

Within a month, you'll have:
- A working mental model of what AI can and can't do (built from experience, not articles)
- 2-3 recurring workflows where AI saves you meaningful time
- The vocabulary to talk about AI collaboration in interviews, meetings, and strategy conversations
- An instinct for which tasks to delegate to AI and which to do yourself

None of this comes from a course. All of it comes from use. The course is the tool. The curriculum is your job. The credential is the work you ship.

**Start today. Not Monday. Not after you finish the article. Now.** Open claude.ai. Or install Claude Code. Pick something real. Use it for 30 minutes. That's the whole pattern.

*(I'm not sponsored by Anthropic, OpenAI, or anyone else. I use Claude because it's what works best for how I think. You might prefer Codex with ChatGPT, Gemini with Gemini CLI, Cursor, Windsurf, or something that doesn't exist yet. The tool matters less than the habit. Pick one, use it on something real, and stop reading about AI long enough to actually use it.)*
