# SevaFlow AI — Technical Architecture

Detailed reference for how the system is structured, how components interact, and how each layer is designed to be extended.

---

## Stack

| Layer | Technology | Version | Notes |
|---|---|---|---|
| Framework | Next.js (App Router) | 16.2.9 | Server + client component split |
| Language | TypeScript | 5 | Strict mode enabled |
| UI | React | 19.2.4 | Server components by default |
| Styling | Tailwind CSS | v4 | `@import "tailwindcss"` in globals.css |
| Validation | Zod | 4.4.3 | v4 API — `.issues` not `.errors` |
| Testing | Vitest | 4.1.9 | Node environment, no jsdom |
| Persistence | localStorage | — | SSR-safe wrapper in lib/volunteer-storage.ts |

---

## Project Structure

```
app/                    Next.js App Router pages
components/             React components (server + client)
lib/                    Business logic, schemas, data
  evals/                Eval runner and test cases
  prompts/              LLM system prompts
tests/                  Vitest test files
docs/                   Developer documentation
```

---

## App Router Conventions

### Server Components (Default)
Every component in Next.js App Router is a server component unless marked `"use client"`. Server components:
- Run only on the server (or at build time)
- Cannot use `useState`, `useEffect`, or browser APIs
- Can `async`/`await` data directly
- Export `metadata` for `<head>` tags
- Render static HTML sent to the browser

### Client Components (`"use client"`)
Components marked `"use client"`:
- Hydrate on the client and are interactive
- Can use all React hooks
- Can access `window`, `localStorage`, `document`
- Are still pre-rendered on the server for the initial HTML — `typeof window !== "undefined"` guards are required

### Page Pattern
Every page follows this pattern:

```tsx
// app/some-route/page.tsx — server component
export const metadata = { title: "...", description: "..." };

export default function SomePage() {
  return (
    <>
      <StaticHeroSection />       {/* server component */}
      <InteractiveComponent />    {/* "use client" */}
    </>
  );
}
```

Interactivity is always in a child client component. `metadata` and the page wrapper stay server-side.

---

## Classifier Architecture

### Entry Point (`lib/classifier.ts`)

```typescript
export async function classifyRequest(input: ClassifierInput): Promise<ClassifierOutput>
```

- Validates input with `ClassifierInputSchema.safeParse()`
- Routes to `mockClassify()` (default) or Anthropic API (when `ANTHROPIC_API_KEY` is set)
- Validates output with `ClassifierOutputSchema.safeParse()`
- Returns typed `ClassifierOutput` or throws on validation failure

### Mock Engine (`lib/mock-classifier.ts`)

Deterministic keyword-based classifier:

```
input string (lowercase)
    ↓
HIGH_KEYWORDS scan     → first match sets priority to "High"
MEDIUM_KEYWORDS scan   → first match (if no High) sets "Medium"
    ↓
CATEGORY_KEYWORDS scan → first matching category wins
    ↓
confidence calculation → (matched keywords / total keywords) clamped 0.3–0.95
    ↓
deadline extraction    → regex patterns for times, "today", "this week"
    ↓
summary generation     → first 90 chars of input (or full if shorter)
    ↓
ClassifierOutput object
```

**Data structures:**
```typescript
const HIGH_KEYWORDS = ["urgent", "asap", "immediately", "emergency", "broken", "right now", "today", "fix it"];
const MEDIUM_KEYWORDS = ["this week", "soon", "check", "follow up"];

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  "Volunteer Scheduling": ["volunteer", "seva", "help", "shift", "assign", ...],
  "Feedback": ["feedback", "suggestion", "complaint", "yajman said", ...],
  "Event Logistics": ["chairs", "setup", "stage", "hall", "equipment", ...],
  ...
};
```

First category with a matching keyword wins. Ties broken by insertion order.

### Real LLM Mode (`lib/prompts/request-classifier.ts`)

The system prompt includes:
- Role: "You are a community request classifier for a temple management system"
- Output format: strict JSON matching `ClassifierOutputSchema`
- 3 few-shot examples covering High/Medium/Low priority across different categories
- Instruction to return ONLY the JSON object, no prose

When `ANTHROPIC_API_KEY` is present, `lib/classifier.ts` calls the Anthropic Messages API with this system prompt and the user's request as the human turn.

---

## Schema Layer (`lib/schemas.ts`)

All Zod schemas in one file. Types derived with `z.infer<>`:

```typescript
export const ClassifierOutputSchema = z.object({
  category: z.enum([
    "Volunteer Scheduling", "Feedback", "Event Logistics",
    "Communication", "Follow Up", "Technical Help",
    "Donation Support", "Other"
  ]),
  priority: z.enum(["High", "Medium", "Low"]),
  summary: z.string().max(90),
  suggested_owner_role: z.string(),
  next_action: z.string(),
  deadline: z.string(),
  confidence: z.number().min(0).max(1),
  originalDescription: z.string(),
});

export type ClassifierOutput = z.infer<typeof ClassifierOutputSchema>;
```

**Zod v4 breaking change:** `ZodError.issues` replaces `.errors`. Every error read uses:
```typescript
parsed.error.issues[0]?.message  // v4 — NOT .errors[0]
```

---

## Volunteer Portal Architecture

### State Machine

`VolunteerPortal.tsx` manages a 4-view state machine:

```
             ┌──────────────────────────────────────┐
             │              "browse"                │
             │  Assignment cards + Select buttons   │
             └────────────┬─────────────────────────┘
                          │ onSelect(id)
                          ▼
             ┌──────────────────────────────────────┐
             │              "signup"                │
             │  Name + Contact + Note form          │
             └────────────┬─────────────────────────┘
                          │ onSubmit(volunteer)
                          ▼
             ┌──────────────────────────────────────┐
             │           "my-assignment"            │◄──── on change confirm
             │  Confirmed role + Change / Release   │
             └────────────┬─────────────────────────┘
                          │ onChangeClick()
                          ▼
             ┌──────────────────────────────────────┐
             │              "change"                │
             │  All roles + Confirm Change button   │
             └──────────────────────────────────────┘
```

Release transitions directly from `my-assignment` back to `browse`.

### localStorage Keys

```typescript
const ASSIGNMENTS_KEY = "sevaflow_assignments";
const VOLUNTEER_KEY   = "sevaflow_current_volunteer";
```

Both are JSON-serialized. On read:
1. `typeof window !== "undefined"` — skip on server
2. `localStorage.getItem(key)` — get raw string
3. `JSON.parse(raw)` — parse, catch any error and return null
4. Schema validation (optional, for robustness)

### Pure Business Logic

Functions in `lib/volunteer-storage.ts` that touch no global state:

```typescript
// Returns new assignments array with spot count adjusted
function selectAssignment(
  assignments: VolunteerAssignment[],
  id: string,
  volunteer: CurrentVolunteerAssignment
): VolunteerAssignment[]

// Returns new array with openSpots++ for the given id
function releaseAssignment(
  assignments: VolunteerAssignment[],
  assignmentId: string
): VolunteerAssignment[]

// Returns new array with old spot released and new spot filled atomically
function changeAssignment(
  assignments: VolunteerAssignment[],
  oldId: string,
  newId: string
): VolunteerAssignment[]
```

These functions are pure — they take state in, return new state out. They are tested without any DOM setup in `tests/volunteer-storage.test.ts`.

### Hydration Pattern

```tsx
const [mounted, setMounted] = useState(false);

useEffect(() => {
  const saved = loadAssignments();
  const vol   = loadCurrentVolunteer();
  setAssignments(saved ?? INITIAL_ASSIGNMENTS);
  setCurrentVolunteer(vol);
  if (vol) setView("my-assignment");
  setMounted(true);
}, []);

if (!mounted) {
  return <div className="flex justify-center py-24"><Spinner /></div>;
}
```

Server renders the spinner. Client hydrates with the spinner, then `useEffect` fires, loads localStorage, and re-renders with real data. This prevents any mismatch between server HTML and client state.

---

## Evaluation Pipeline

```
TEST_CASES (lib/evals/test-cases.ts)
    ↓ injected into
runEvals(cases?) (lib/evals/run-evals.ts)
    ↓ for each case:
classifyRequest({ description: tc.input })
    ↓
ClassifierOutputSchema.safeParse(raw)
    ↓
compare actual vs expected
    ↓
EvalResult { id, schemaValid, categoryMatch, priorityMatch, passed, ... }
    ↓ aggregated into
EvalSummary { total, passed, failed, passRate, allSchemaValid, results }
    ↓ returned to
app/evals/page.tsx (async server component)
    ↓ renders
stats cards + EvalTable (passes EvalResult[] as prop)
```

The eval pipeline has no side effects. It does not write to any file, database, or cache. Every render of `/evals` runs a fresh eval suite from scratch.

---

## Testing Architecture

### Vitest Configuration

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    globals: true,
    environment: "node",
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, ".") },
  },
});
```

`environment: "node"` — no jsdom, no window. This is intentional. All tests that touch volunteer logic use pure functions from `lib/volunteer-storage.ts` that are designed to work without the browser environment. The SSR safety layer is tested by verifying that `typeof window !== "undefined"` guards are present (not by mocking `window`).

### Test File Summary

| File | Scope | Key approaches |
|---|---|---|
| `tests/schema.test.ts` | Zod schema correctness | Valid/invalid input enumeration |
| `tests/classifier.test.ts` | Mock classifier accuracy | Known inputs, expected outputs |
| `tests/volunteer-storage.test.ts` | Pure storage functions | State-in → state-out |
| `tests/evals.test.ts` | Eval runner | Shape, arithmetic, injectable subset |

---

## Extending the System

See `docs/handoff.md` for step-by-step guides on:
- Adding a new classifier category
- Adding eval test cases
- Adding a volunteer role
- Swapping localStorage for a real database
- Connecting a real LLM
