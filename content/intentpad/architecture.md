# IntentPad — Architecture & Tech Stack

## Stack

- **API:** Hono on Node.js — lightweight, fast, TypeScript-native
- **Database:** PostgreSQL with Drizzle ORM — type-safe queries, migration management
- **Frontend:** Next.js with React — server components where possible, client components for interactive views
- **AI:** OpenAI GPT-4o-mini for classification — fast and cheap at high-volume single-thought classification
- **Payments:** Stripe billing with subscription management
- **Email:** Resend for transactional emails
- **Deployment:** Cloudflare Pages (frontend) and Railway (API + database)
- **Styling:** Tailwind CSS with the Pulp & Ink custom design system

## Authentication

Custom JWT auth with refresh token rotation — no third-party auth providers (Auth0, Clerk, etc.). Built from scratch because:
1. Full control over the auth flow and token lifecycle
2. No vendor dependency for a core security function
3. Understanding exactly what happens at every step

Refresh token rotation means each refresh token is single-use. When a client refreshes, the old token is invalidated and a new one is issued. This limits the window of exposure if a token is compromised.

## Design System — Pulp & Ink

A custom comic book-inspired design system with halftone textures, inky shadows, and bold typography. The visual identity is deliberately distinctive — not another minimalist SaaS dashboard. The design system is built as Tailwind CSS utilities and components, reusable across the application.

## Key Views

- **Capture:** Single text field, AI classifies on submit
- **Weekly Planner:** Three-column desktop cockpit showing the week, daily goals, and backlog
- **Dashboard:** Read-only web dashboards for at-a-glance status across all primitives
- **Mobile:** Responsive views optimized for quick capture on the go

## Compliance

- GDPR-compliant account deletion with an external ledger — when a user deletes their account, all personal data is removed but billing records are preserved in a separate ledger for legal compliance
- No third-party analytics or tracking
