# SevaFlow AI — Product Scope

Problem definition, target users, user stories, MVP scope, and non-goals.

---

## Problem Statement

Community and temple organizations coordinate hundreds of volunteers through informal channels — WhatsApp groups, phone calls, and in-person conversations. Requests arrive without structure, get lost in group chats, and require a coordinator to manually triage, respond, and follow up.

The result:
- **Duplicate follow-up work** — coordinators answer the same categories of requests repeatedly
- **Lost requests** — messages buried in long WhatsApp threads with no tracking
- **Manual volunteer assignment** — spreadsheets, group messages, verbal confirmation
- **No central record** — no way to review what was requested, who was assigned, or what happened

SevaFlow AI addresses the most time-consuming parts of this problem: classifying incoming requests and allowing volunteers to self-assign to open roles.

---

## Target Users

### Primary: Community/Temple Coordinator
- Manages volunteer scheduling, event logistics, and communications for a temple or community organization
- Receives 10–50 requests per week via WhatsApp, phone, and in person
- Spends 8+ hours per week manually sorting, responding, and following up
- Not necessarily technical — needs tools that explain themselves

### Secondary: Volunteer
- Wants to help at a community event
- Does not know what roles are open or how to sign up
- Would prefer to self-serve rather than text a coordinator and wait for a response

### Tertiary: Organization Leadership / Stakeholders
- Wants visibility into what's being requested and who's covering it
- Not involved in day-to-day coordination
- Interested in whether the AI is accurate and trustworthy

---

## User Stories

### Coordinator Stories
- As a coordinator, I want to paste an informal request and get a structured category and priority, so I know where to route it without reading every word carefully
- As a coordinator, I want a suggested owner role for each request, so I can delegate without deciding from scratch
- As a coordinator, I want a specific next action generated automatically, so I don't have to write a follow-up message for every request
- As a coordinator, I want volunteer assignments to be self-service, so I don't have to manually track who is signing up for what

### Volunteer Stories
- As a volunteer, I want to see all open seva roles with time, location, and skill level, so I can choose the right one for me
- As a volunteer, I want to sign up for an assignment from my phone, so I don't have to text someone and wait
- As a volunteer, I want to see my confirmed assignment when I return to the site, so I don't have to sign up again
- As a volunteer, I want to change my assignment if my availability changes, so I can update without contacting a coordinator
- As a volunteer, I want to release my spot if I can no longer attend, so another volunteer can take it

### Leadership Stories
- As a stakeholder, I want to see the AI classifier evaluated against known test cases, so I can assess its accuracy before trusting it for real requests
- As a stakeholder, I want documentation that explains how the product works and how it could be extended, so the team can maintain and improve it

---

## MVP Scope

### Included

**AI Request Classification**
- Free-text input → structured JSON output
- 8 classification categories
- 3 priority levels (High, Medium, Low)
- Category, priority, summary, suggested owner, next action, deadline, confidence
- Zod schema validation on every output
- Mock classifier (no API key required)
- Optional real LLM via `ANTHROPIC_API_KEY`

**Interactive Demo**
- Textarea + 8 sample requests
- Result card with all output fields
- Dark terminal JSON view with copy button
- Loading state

**Volunteer Assignment Portal**
- 6 hardcoded seva roles
- Browse → Select → Sign Up → Confirmed → Change / Release flow
- Dynamic spot count updates
- LocalStorage persistence with SSR-safe guards

**AI Evaluation System**
- 10 hand-labelled test cases
- Schema + category + priority pass criteria
- Live results page with pass rate, stats, and per-row table

**Documentation**
- README, FEATURES, ARCHITECTURE, EVALS, docs/

### Excluded from MVP

See Non-Goals section below.

---

## Volunteer Portal Scope

The volunteer portal is scoped as a **demo-grade, single-event, single-browser** experience:

- One event only (Sunday Community Seva, 9:00 AM – 1:00 PM)
- One assignment per volunteer
- No login — volunteer identity is name + contact stored in localStorage
- No cross-device sync — state is local to the browser
- No coordinator view — no admin panel or dashboard
- No conflict detection — two browsers could theoretically sign up for the same spot (no server coordination)

These limitations are by design for the MVP. The architecture is designed so they can be addressed later without rewriting the UI layer.

---

## Non-Goals

The following are explicitly out of scope for the current version:

- **Production database** — no PostgreSQL, Supabase, or any external storage
- **User authentication** — no login, no accounts, no sessions
- **Multi-event support** — the portal is hardcoded to one event
- **Admin coordinator dashboard** — no view of all volunteer assignments
- **Email or SMS notifications** — no confirmations, reminders, or alerts
- **Real-time sync** — no WebSockets, no cross-browser state updates
- **Mobile app** — web only
- **Bulk import** — no CSV or spreadsheet upload for requests or assignments
- **Export** — no CSV or PDF download of assignments or classifier results
- **Multi-language support** — English only (inputs may be informal or mixed)
- **Audit logging** — no history of who changed what

---

## Future Improvements

Listed in priority order based on impact vs effort:

1. **Real LLM integration** — `ANTHROPIC_API_KEY` stub is already in `lib/classifier.ts`; connect and test
2. **Production database** — replace `localStorage` with Supabase or PostgreSQL; business logic is already decoupled
3. **Coordinator dashboard** — admin view with all requests, assignment overview, and ability to override
4. **Email notifications** — Resend or SendGrid integration for signup and change confirmations
5. **Multi-event support** — per-event role configuration with separate spot counts
6. **Pre-event reminders** — automated day-of and week-before messages to confirmed volunteers
7. **Export** — CSV download of assignments for coordinator use during the event
8. **More eval test cases** — expand from 10 to 50+ with edge cases and adversarial inputs
9. **Eval CI integration** — `npm run evals` script that fails on pass rate below threshold
