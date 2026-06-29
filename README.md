# SevaFlow AI

SevaFlow AI is a local-first AI product website that demonstrates how unstructured community and volunteer requests can be converted into structured operational tasks using prompt engineering, schema validation, and AI-style classification.

Built for temple, nonprofit, and community organizations that coordinate hundreds of volunteers over WhatsApp and informal channels — with no unified task system.

---

## Overview

SevaFlow AI turns an informal message like this:

> *"Radhe Radhe, we need 5 volunteers for Sunday prasad serving before 9 AM"*

into a structured, actionable task:

```json
{
  "category": "Volunteer Scheduling",
  "priority": "High",
  "summary": "5 volunteers needed for Sunday prasad serving before 9 AM",
  "suggested_owner_role": "Volunteer Coordinator",
  "next_action": "Confirm availability and assign 5 volunteers for Sunday prasad shift",
  "deadline": "Before 9 AM Sunday",
  "confidence": 0.92,
  "originalDescription": "Radhe Radhe, we need 5 volunteers for Sunday prasad serving before 9 AM."
}
```

The site runs fully on `localhost` — no database, no API key, no cloud account required.

---

## The Problem

Community organizations rely on informal communication to coordinate volunteers and events:

- Requests arrive via **WhatsApp, SMS, phone calls, and in-person** — with no central record
- Follow-ups get **lost in group chats** that nobody re-reads
- Volunteer role assignment is **done manually** with spreadsheets and guesswork
- Event coordinators spend **8+ hours per week** triaging requests that should be self-service

---

## The Solution

SevaFlow AI addresses these problems with two workflows:

**AI Request Classifier** — converts informal community messages into structured tasks with category, priority, suggested owner, and next action.

**Volunteer Assignment Portal** — volunteers browse open seva roles, select their assignment, view their confirmation, and change or release it at any time — without contacting a coordinator.

---

## Live Features

| Route | Description |
|---|---|
| `/` | Landing page — hero, problem, AI demo embed, volunteer preview, skills |
| `/demo` | Interactive AI classifier — type any request and see structured JSON output |
| `/volunteer` | Volunteer Assignment Portal — self-service role selection and management |
| `/evals` | AI Evaluation Results — 10 live test cases with pass/fail scoring |
| `/docs` | Technical documentation — 9 sections with code references |
| `/case-study` | Product case study — problem, decisions, and roadmap |

---

## Volunteer Assignment Portal

SevaFlow AI includes a local-first volunteer assignment flow where volunteers can select open event roles, view their current assignment, change to another open spot, or release their assignment if they are no longer available.

**The full flow:**

1. **Browse** — view all 6 seva roles with real-time spot counts, time, location, and skill level badges
2. **Select** — click any open role to open the signup form (full roles are disabled)
3. **Sign up** — enter name, contact info, and an optional note for the coordinator
4. **Confirmed** — assignment is saved to `localStorage` and shown on every return visit
5. **Change** — switch to any other open role; old spot releases and new spot fills atomically
6. **Release** — free your spot for another volunteer with an inline confirmation step

All state persists in `localStorage` with SSR-safe guards. No login or backend required.

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.9 |
| Language | TypeScript | 5 |
| UI | React | 19.2.4 |
| Styling | Tailwind CSS | v4 |
| Validation | Zod | 4.4.3 |
| Testing | Vitest | 4.1.9 |
| Persistence | localStorage | SSR-safe |

---

## Features

### AI Request Classification
- Classifies community requests into 8 categories: Volunteer Scheduling, Feedback, Event Logistics, Communication, Follow Up, Technical Help, Donation Support, Other
- Assigns Low / Medium / High priority based on keyword detection
- Generates a summary (≤90 chars), suggested owner role, and next action
- Returns a confidence score between 0.0 and 1.0
- Validates every output against `ClassifierOutputSchema` (Zod)
- Runs in mock mode with no API key, or with a real LLM via `ANTHROPIC_API_KEY`

### Interactive Demo
- Live textarea input with 8 pre-loaded sample community requests
- 480ms simulated processing for realistic UX feedback
- Structured result card with category/priority badges, confidence bar, and 2-col field layout
- Dark terminal JSON output with per-token syntax highlighting and one-click copy

### Volunteer Assignment Portal
- 6 open seva roles with skill badges, time slots, spot counts, and descriptions
- Select → Sign Up → Confirmed → Change / Release flow
- Inline release confirmation — no separate page or modal
- Atomic change-assignment: release old spot and fill new spot in one operation
- Dynamic status badges: Open / Almost Full / Full
- SSR-safe with `typeof window !== "undefined"` guards throughout

### Evaluation System
- 10 predefined test cases hand-labelled across all 8 classifier categories
- Schema validation on every output using `ClassifierOutputSchema.safeParse()`
- Category match + priority match comparison against expected values
- Pass rate, total, passed, failed, and `allSchemaValid` aggregate metrics
- Results table with per-field ✓/✗ indicators and pass/fail badges
- Runs server-side on every page load — no caching, always live

---

## AI Workflow

```
Input Message
    │
    ▼
System Prompt  ─── few-shot examples + strict JSON format instruction
    │
    ▼
Mock / LLM Classifier  ─── keyword engine (default) or Anthropic API
    │
    ▼
Zod Schema Validation  ─── ClassifierOutputSchema.safeParse()
    │
    ▼
Structured JSON Output  ─── category, priority, deadline, confidence…
    │
    ▼
Actionable Task  ─── routed to the suggested owner role
```

The mock classifier (`lib/mock-classifier.ts`) uses keyword matching with stable sort tiebreaking, confidence scoring based on keyword density, and keyword-based deadline extraction. It is fully deterministic and requires no network call.

To use a real LLM, set `ANTHROPIC_API_KEY` in `.env.local`. The rest of the pipeline is unchanged.

---

## Evaluation System

```
lib/evals/test-cases.ts   ── 10 hand-labelled test inputs with expected category + priority
lib/evals/run-evals.ts    ── async runner: classify → validate → compare → EvalSummary
app/evals/page.tsx        ── async server component: runs all evals on every page load
```

A test case is marked **Pass** when all three checks hold simultaneously:

1. Output passes `ClassifierOutputSchema.safeParse()` — schema valid
2. `actual.category === expected.category` — exact string match
3. `actual.priority === expected.priority` — exact string match

Schema failures auto-fail all three checks.

---

## Running Locally

```bash
git clone https://github.com/Nikniv2007/SevaFlow_AI.git
cd SevaFlow_AI
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

No API key, database, or environment configuration required.

---

## Running Tests

```bash
npm run test
```

**60 tests across 4 test files — all passing:**

| File | Tests | Coverage |
|---|---|---|
| `tests/schema.test.ts` | 15 | Zod schema validation for all schemas |
| `tests/classifier.test.ts` | 14 | Mock classifier accuracy and keyword matching |
| `tests/volunteer-storage.test.ts` | 20 | Storage logic, pure functions, SSR safety |
| `tests/evals.test.ts` | 11 | Eval runner shape, pass rate, subset injection |

---

## Project Structure

```
app/
├── page.tsx                    # Home — hero, problem, solution, AI demo, skills
├── layout.tsx                  # Root layout: Navbar + Footer
├── demo/page.tsx               # Full interactive AI classifier demo
├── volunteer/page.tsx          # Volunteer Assignment Portal (server wrapper)
├── evals/page.tsx              # AI Evaluation Results (async server component)
├── docs/page.tsx               # Technical documentation (9 sections)
└── case-study/page.tsx         # Product case study (10 sections)

components/
├── Navbar.tsx                  # Sticky responsive navigation
├── Footer.tsx                  # Site footer
├── Badge.tsx                   # Reusable colored label badge
├── Hero.tsx                    # Home hero section
├── ProblemSection.tsx          # Problem statement cards
├── SolutionSection.tsx         # Feature list + live JSON visualization
├── HowItWorks.tsx              # 4-step AI workflow explainer
├── DemoSection.tsx             # Home AI demo section (server wrapper)
├── InteractiveDemo.tsx         # [client] textarea, samples, classifier, result card
├── JsonOutput.tsx              # [client] dark terminal JSON syntax highlighter
├── VolunteerPortalPreview.tsx  # Home volunteer section preview
├── SkillsSection.tsx           # Skills demonstration card grid
├── VolunteerHero.tsx           # /volunteer hero banner
├── EventOverview.tsx           # Event details strip
├── VolunteerPortal.tsx         # [client] full portal state machine
├── AssignmentCard.tsx          # [client] individual role card with status + action
├── VolunteerSignupForm.tsx     # [client] name / contact / note signup form
├── MyAssignment.tsx            # [client] confirmed assignment display + controls
├── ChangeAssignmentPanel.tsx   # [client] change assignment grid with confirm step
└── EvalTable.tsx               # [server] evaluation results table

lib/
├── schemas.ts                  # All Zod schemas and inferred TypeScript types
├── classifier.ts               # classifyRequest() — entry point for all classifier calls
├── mock-classifier.ts          # Keyword-based mock engine — no API key, deterministic
├── sample-requests.ts          # 8 typed ClassifierInput samples for the demo
├── volunteer-data.ts           # 6 initial VolunteerAssignment records (INITIAL_ASSIGNMENTS)
├── volunteer-storage.ts        # SSR-safe localStorage helpers + pure business logic
├── evals/
│   ├── test-cases.ts           # 10 EvalTestCase records with hand-labelled expected values
│   └── run-evals.ts            # runEvals() → EvalSummary (async, injectable)
└── prompts/
    └── request-classifier.ts   # System prompt with 3 few-shot examples for real LLM use

tests/
├── schema.test.ts              # 15 tests — Zod schemas
├── classifier.test.ts          # 14 tests — classifier accuracy
├── volunteer-storage.test.ts   # 20 tests — storage logic + SSR safety
└── evals.test.ts               # 11 tests — eval runner

docs/
├── product-scope.md            # Problem, users, user stories, MVP scope, non-goals
├── architecture.md             # Detailed technical architecture reference
├── evals.md                    # Evaluation system deep-dive
└── handoff.md                  # Developer onboarding and extension guide
```

---

## Skills Demonstrated

### Applied AI & LLM APIs
- System prompt design with few-shot examples
- Structured JSON output enforcement via prompt engineering
- Zod schema validation on every model response
- Mock fallback that mirrors the exact same interface as a real LLM call

### Functional Web Apps & Tools
- Next.js App Router with server and client component split
- React with TypeScript throughout
- Tailwind CSS v4 for all styling
- Interactive local-first volunteer portal
- `localStorage` persistence with SSR-safe guards
- Dynamic assignment availability with real-time spot count updates

### Workflow Automation
- Converts messy requests into structured tasks
- Suggests owner roles per category
- Generates specific next actions
- Assigns priority from keyword detection
- Volunteer assignment selection with dynamic availability
- Automatic spot availability updates on every sign-up, change, and release
- Releasing and switching assignments without coordinator involvement
- Reduces manual coordinator follow-up for the most common request types

### AI Evaluations & Testing
- 10 evaluation test cases with hand-labelled expected values
- Pass/fail scoring: schema valid + category match + priority match
- Zod-validated output on every classifier call
- 60 Vitest tests across 4 test files

### Prompt Engineering
- Few-shot examples guiding tone, format, and edge case behavior
- Controlled JSON output with strict schema enforcement in the prompt
- Priority detection rules embedded directly in the system prompt
- Confidence scoring for ambiguous or multi-category inputs
- Mock classifier preserving the same contract as a real LLM

### Fast Prototyping
- Runs fully on localhost — `npm install && npm run dev`
- No database, API key, or cloud account required
- Mock AI classifier with zero configuration
- SSR-safe local persistence with no additional infrastructure

### Product Scoping
- Turns a real community operations problem into a structured technical workflow
- Defines users, use cases, classification categories, and MVP boundaries
- Converts a real volunteer coordination problem into a self-service workflow
- Handles common edge cases like full assignments and changed availability

### System Ownership
- Organized file structure with clear separation of concerns
- Documentation: `README.md`, `FEATURES.md`, `ARCHITECTURE.md`, `EVALS.md`, `docs/`
- 60 tests covering schemas, classifier logic, storage helpers, and eval runner
- Error handling at every system boundary — schema validation, storage guards, form validation
- Handoff-ready with developer guide in `docs/handoff.md`
- Pure functions separated from localStorage for testability without jsdom
- No database dependency — persistence layer is swappable without changing business logic

### Adaptability & Mission Alignment
- Built for community, nonprofit, temple, and volunteer organizations
- Public-interest tech focus — addresses real coordination pain points
- Directly applicable to real-world seva and service groups
- Demonstrates how AI products can serve non-technical communities

---

## Future Improvements

- **Real LLM integration** — `ANTHROPIC_API_KEY` environment variable already stubbed in `lib/classifier.ts`
- **Production database** — replace `localStorage` with PostgreSQL or Supabase; business logic is already decoupled
- **Admin coordinator view** — dashboard with full request history, assignment overview, and eval trends
- **Email / SMS notifications** — confirmations on sign-up, change reminders, and pre-event alerts
- **Multi-event support** — per-event role definitions with separate spot counts and schedules
- **Volunteer reminders** — automated pre-event messaging to confirmed volunteers
- **Export reports** — CSV or PDF summary of assignments, request history, and eval results

---

*Built by [Nikniv2007](https://github.com/Nikniv2007)*
