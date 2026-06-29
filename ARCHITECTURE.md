# SevaFlow AI — Architecture

Technical overview of how SevaFlow AI is structured, how data flows through the system, and the design decisions that shaped each layer.

---

## High-Level Overview

SevaFlow AI is a Next.js App Router site with no backend, no database, and no required API key. It runs entirely on `localhost` after `npm install && npm run dev`. The core functionality is split into two independent systems:

1. **AI Request Classifier** — classifies community request text into structured JSON
2. **Volunteer Assignment Portal** — self-service role selection persisted in `localStorage`

The two systems share Zod schemas and the Navbar/Footer, but are otherwise fully independent.

---

## Frontend Pages

```
app/
├── page.tsx          → Home (server component)
├── layout.tsx        → Root layout: Navbar, Footer, global styles
├── demo/page.tsx     → Full classifier demo (server wrapper + client InteractiveDemo)
├── volunteer/page.tsx → Volunteer portal (server wrapper with metadata + client VolunteerPortal)
├── evals/page.tsx    → Eval results (async server component, runs evals on every load)
├── docs/page.tsx     → Technical documentation (server component, 9 sections)
└── case-study/page.tsx → Product case study (server component, 10 sections)
```

### Server vs Client Split

Next.js App Router renders server components by default. `"use client"` is required for:
- Components using `useState` or `useEffect`
- Event handlers and form submissions
- `localStorage` access
- Browser-only APIs

All interactive components use `"use client"` at the top. Server components (pages, layout, static sections) do not.

**Server component rule:** Pages that export `metadata` are server components. Any interactivity is pushed into a child client component, never co-located with `metadata`.

---

## Component Structure

### Hierarchy
```
layout.tsx (server)
  └── Navbar.tsx (server)
  └── {page} (server)
      └── [client components as children]
  └── Footer.tsx (server)
```

### Client Components
All "use client" components are in `components/`:

| Component | State | Purpose |
|---|---|---|
| `InteractiveDemo.tsx` | input, result, loading | Classifier UI |
| `JsonOutput.tsx` | copied | Dark JSON renderer with copy |
| `VolunteerPortal.tsx` | assignments, currentVolunteer, view, selectedId, toast, mounted | Portal state machine |
| `AssignmentCard.tsx` | (none, props-driven) | Role card with status + action |
| `VolunteerSignupForm.tsx` | volunteerName, contact, note, errors | Signup form |
| `MyAssignment.tsx` | releaseConfirm | Confirmed assignment display |
| `ChangeAssignmentPanel.tsx` | pendingId | Change assignment with confirm |

### Server Components
Everything else: `Navbar`, `Footer`, `Badge`, `Hero`, `ProblemSection`, `SolutionSection`, `HowItWorks`, `DemoSection`, `VolunteerPortalPreview`, `SkillsSection`, `VolunteerHero`, `EventOverview`, `EvalTable`.

---

## Classifier Flow

```
User input
    ↓
classifyRequest(input: ClassifierInput)        ← lib/classifier.ts
    ↓
[mock mode] mockClassify(input)                ← lib/mock-classifier.ts
    ↓
raw JSON object
    ↓
ClassifierOutputSchema.safeParse(raw)          ← lib/schemas.ts
    ↓
{ success: true, data: ClassifierOutput }
    ↓
return data to caller
```

### Mock Classifier (`lib/mock-classifier.ts`)

The mock classifier is the default engine. It does not call any external service. It works by:

1. Converting the input to lowercase
2. Checking for HIGH_KEYWORDS, MEDIUM_KEYWORDS across all text — first match wins priority
3. Iterating CATEGORY_KEYWORDS in definition order — first category with a matching keyword wins
4. If no category keyword matches, category defaults to `"Other"`
5. Computing confidence from keyword density (how many total keywords matched / total possible)
6. Extracting a deadline via regex patterns (time mentions like "9 AM", "today", "this week")
7. Generating a summary by truncating the input if needed

**Key matching behavior:**
- All matching is substring-based (`input.includes(keyword)`)
- `"urgently"` matches because `"urgent"` is a HIGH keyword and `"urgently".includes("urgent")` is true
- `"check"` triggers Medium priority because it appears in MEDIUM_KEYWORDS
- `"before the event"` does NOT match the keyword `"before event"` (requires exact substring)
- Category wins at first-matching keyword — order in CATEGORY_KEYWORDS matters

### Real LLM Mode

When `ANTHROPIC_API_KEY` is set in `.env.local`, `lib/classifier.ts` switches to an Anthropic API call. The system prompt is defined in `lib/prompts/request-classifier.ts` with 3 few-shot examples. The output is parsed with the same `ClassifierOutputSchema.safeParse()` call — the validation layer is identical in both modes.

---

## Zod Schemas (`lib/schemas.ts`)

All schemas and inferred types live in one file:

| Schema | Used for |
|---|---|
| `ClassifierInputSchema` | Validating user input before classification |
| `ClassifierOutputSchema` | Validating every classifier result |
| `VolunteerAssignmentSchema` | Shape of each seva role in the portal |
| `CurrentVolunteerAssignmentSchema` | Volunteer's active assignment record |
| `EvalTestCaseSchema` | Shape of each eval test case |
| `EvalResultSchema` | Shape of each eval result |

TypeScript types are derived with `z.infer<typeof Schema>` — no manual interface duplication.

**Zod v4 note:** Uses `.issues` (not `.errors`) on `ZodError`. `safeParse()` is used throughout — never `parse()`.

---

## Volunteer Assignment System

### Data Source
`lib/volunteer-data.ts` exports `INITIAL_ASSIGNMENTS` — a hardcoded array of 6 `VolunteerAssignment` objects. This is the seed data for every new browser session.

### State Management
`VolunteerPortal.tsx` holds all portal state in React `useState`. On mount (via `useEffect`), it reads from `localStorage` and populates state. On every relevant user action, it writes updated state back to `localStorage`.

### Storage Helpers (`lib/volunteer-storage.ts`)
All `localStorage` interactions are wrapped in pure functions:

```
loadAssignments()        → VolunteerAssignment[] | null
saveAssignments(arr)     → void
loadCurrentVolunteer()   → CurrentVolunteerAssignment | null
saveCurrentVolunteer(v)  → void
clearCurrentVolunteer()  → void
```

These functions are SSR-safe — each checks `typeof window !== "undefined"` before touching `localStorage`. On the server, they return `null` or do nothing.

**Pure business logic** functions are separated from localStorage so they can be tested without jsdom:

```
selectAssignment(assignments, id, volunteer) → VolunteerAssignment[]
releaseAssignment(assignments, assignmentId) → VolunteerAssignment[]
changeAssignment(assignments, oldId, newId)  → VolunteerAssignment[]
computeAvailability(assignment)              → { status, openSpots }
```

### SSR + Hydration Safety
`VolunteerPortal.tsx` uses a `mounted` flag:

```tsx
const [mounted, setMounted] = useState(false);

useEffect(() => {
  // read from localStorage here
  setMounted(true);
}, []);

if (!mounted) return <Spinner />;
```

On the server and during initial hydration, a spinner is shown. After the first client paint, the real localStorage data is loaded. This prevents hydration mismatches between server-rendered HTML and client-side state.

### Availability Calculation
`status` and `openSpots` are fields on the `VolunteerAssignment` record:
- `status` = `"Open"` when `openSpots > total * 0.3`, `"Almost Full"` when ≤30% remain, `"Full"` when `openSpots === 0`
- Counts update inline on every state change — no re-fetch, no re-derive from a separate source

---

## Evaluation Architecture

```
lib/evals/test-cases.ts
    → 10 EvalTestCase records with id, input, expectedCategory, expectedPriority

lib/evals/run-evals.ts (runEvals)
    → for each test case:
        1. classify input
        2. validate with ClassifierOutputSchema.safeParse()
        3. compare actual vs expected
        4. record EvalResult
    → aggregate into EvalSummary

app/evals/page.tsx (async server component)
    → const summary = await runEvals()
    → renders stats + EvalTable

components/EvalTable.tsx (server component)
    → receives EvalResult[]
    → renders table with ✓/✗ indicators
```

### Injectable Test Cases
`runEvals(cases?)` accepts an optional array — defaults to `TEST_CASES`. This makes it testable with any subset without global side effects.

---

## Error Handling

| Layer | Approach |
|---|---|
| User form input | Inline validation before submit; error messages per field |
| Classifier output | `safeParse()` — returns `{ success: false }` on schema mismatch |
| localStorage reads | Try/catch in all read helpers; returns `null` on JSON parse failure |
| Eval runner | Per-result `try/catch` — failed classifications produce a Fail result, not a thrown error |
| SSR guards | `typeof window !== "undefined"` before every `localStorage` access |

---

## Design Constraints

- **No database** — all state lives in `localStorage`. Business logic is decoupled so this can be swapped for a real persistence layer without changing the component layer.
- **No login** — this is a demo-grade implementation. User identity comes from the name/contact entered at sign-up, stored locally.
- **No API key required** — the mock classifier is the default. Real LLM integration is available but optional.
- **Demo workflow, not production scheduling** — the volunteer portal demonstrates a self-service assignment UX pattern. It is not designed as a multi-tenant, multi-event, or concurrent-user system.
- **Tailwind CSS v4** — uses `@import "tailwindcss"` in `globals.css`, not the old PostCSS plugin setup. Utility classes work identically; configuration syntax differs from v3.
- **Next.js 16.2.9** — uses App Router conventions. `metadata` export requires a server component. Dynamic rendering for the evals page (no `export const dynamic`) — runs fresh on every request.
