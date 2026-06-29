# SevaFlow AI — Developer Handoff

Everything a new developer needs to understand, navigate, run, and extend SevaFlow AI.

---

## Getting Started

```bash
git clone https://github.com/Nikniv2007/SevaFlow_AI.git
cd SevaFlow_AI
npm install
npm run dev      # http://localhost:3000
npm run test     # 60 tests, all passing
```

No `.env` file required. All features work in mock mode.

---

## Orientation: What Lives Where

| You want to… | Look in… |
|---|---|
| Change the classifier categories or priority keywords | `lib/mock-classifier.ts` |
| Change the output JSON shape | `lib/schemas.ts` → `ClassifierOutputSchema` |
| Change the system prompt for real LLM use | `lib/prompts/request-classifier.ts` |
| Add a sample request to the demo | `lib/sample-requests.ts` |
| Add an eval test case | `lib/evals/test-cases.ts` |
| Add a volunteer role to the portal | `lib/volunteer-data.ts` |
| Change volunteer state logic | `lib/volunteer-storage.ts` |
| Change the portal UI flow | `components/VolunteerPortal.tsx` |
| Change the eval results page | `app/evals/page.tsx` |
| Change the interactive demo UI | `components/InteractiveDemo.tsx` |

---

## The Classifier

### Entry point
`lib/classifier.ts` → `classifyRequest(input: ClassifierInput): Promise<ClassifierOutput>`

All code that wants to classify a request goes through this function. It handles the mode switch (mock vs real LLM) and schema validation. Never call `mockClassify()` directly from UI code.

### Mock mode (default)
`lib/mock-classifier.ts` — runs when no `ANTHROPIC_API_KEY` is set.

The keyword tables are at the top of the file:
```typescript
const HIGH_KEYWORDS = ["urgent", "asap", "immediately", ...];
const MEDIUM_KEYWORDS = ["this week", "soon", "check", ...];
const CATEGORY_KEYWORDS: Record<string, string[]> = { ... };
```

**Important matching behavior:**
- All matching is case-insensitive substring — `"urgently".includes("urgent")` is true
- Priority keywords are checked first; first match wins
- Category keywords are checked in `Object.entries()` order; first category with a match wins
- `"Other"` is the default — no category keyword needed

### Real LLM mode
Set `ANTHROPIC_API_KEY` in `.env.local`. `lib/classifier.ts` will route to the Anthropic API. The output goes through the same `ClassifierOutputSchema.safeParse()` as mock mode — the downstream code is unchanged.

---

## How to Add a Classifier Category

1. **Add keywords** — open `lib/mock-classifier.ts`, add a new entry to `CATEGORY_KEYWORDS`:
   ```typescript
   "Transportation": ["bus", "carpool", "pickup", "ride", "transport"],
   ```
   Add it before `"Other"` so it can be matched before the default fallback.

2. **Update the schema enum** — open `lib/schemas.ts`, add the new category to the enum:
   ```typescript
   export const ClassifierOutputSchema = z.object({
     category: z.enum([
       "Volunteer Scheduling", "Feedback", "Event Logistics",
       "Communication", "Follow Up", "Technical Help",
       "Donation Support", "Transportation",  // ← add here
       "Other"
     ]),
     ...
   });
   ```

3. **Update the system prompt** — open `lib/prompts/request-classifier.ts`, add the new category to the category list and add a few-shot example.

4. **Update badge colors** — if `EvalTable.tsx` or `InteractiveDemo.tsx` has category-to-color mappings, add the new category.

5. **Add eval test cases** — see "How to Add Eval Test Cases" below.

6. **Update docs** — update `FEATURES.md` category table and `docs/evals.md` test case notes.

---

## How to Add Eval Test Cases

1. Open `lib/evals/test-cases.ts`
2. Add to the `TEST_CASES` array:
   ```typescript
   {
     id: "TR-001",                              // unique ID: category prefix + sequence
     input: "We need a bus for 30 people...",  // test input
     expectedCategory: "Transportation",        // must match schema enum exactly
     expectedPriority: "Low",                   // "High", "Medium", or "Low"
   },
   ```
3. **Verify expected values** — open `lib/mock-classifier.ts` and manually trace through the keyword tables for your input. Expected values must match what the mock classifier actually produces.
4. Run `npm run test` — all 11 eval runner tests should still pass (they test shape and arithmetic, not specific test case accuracy).
5. Reload `/evals` to see the new row in the results table.

---

## How to Add a Volunteer Role

1. Open `lib/volunteer-data.ts`
2. Add a new object to the `INITIAL_ASSIGNMENTS` array:
   ```typescript
   {
     id: "VA-007",                         // unique ID
     title: "Photography",
     description: "Capture event memories for the community album",
     totalSpots: 2,
     openSpots: 2,
     time: "9:00 AM – 1:00 PM",
     location: "Throughout Venue",
     skillLevel: "Experienced",
     status: "Open",
   },
   ```
3. `openSpots` and `status` will be recalculated at runtime as volunteers sign up and release. The initial values are what a fresh browser session sees.
4. The portal UI picks up new roles automatically — no component changes needed.

**Warning:** Existing volunteers who have `localStorage` data from a previous session will continue to see the old assignment list until they clear localStorage or a new session starts. In production, this would require a migration step.

---

## How to Add a Sample Request to the Demo

1. Open `lib/sample-requests.ts`
2. Add to the array:
   ```typescript
   {
     label: "Transportation",
     description: "We need a bus for 30 people from the west side to the main temple for Sunday event.",
   },
   ```
3. The `InteractiveDemo.tsx` renders all sample buttons in order. No changes needed there.
4. Add a corresponding eval test case if this input reveals a new category or edge case.

---

## How to Connect a Real LLM

1. Create `.env.local` in the project root:
   ```
   ANTHROPIC_API_KEY=sk-ant-...
   ```
2. Restart the dev server (`npm run dev`)
3. `lib/classifier.ts` checks for this variable and routes to the Anthropic API
4. The system prompt from `lib/prompts/request-classifier.ts` is used automatically
5. Run `/evals` to see how the real model performs against the 10 test cases

The downstream pipeline (schema validation, demo UI, eval table) is identical in both modes.

---

## How to Swap localStorage for a Database

The volunteer storage layer is intentionally decoupled. Here's the path:

1. **Keep the pure functions** — `selectAssignment()`, `releaseAssignment()`, `changeAssignment()` in `lib/volunteer-storage.ts` are pure and can be reused regardless of storage backend.

2. **Replace the I/O functions** — `loadAssignments()`, `saveAssignments()`, `loadCurrentVolunteer()`, `saveCurrentVolunteer()`, `clearCurrentVolunteer()` currently use `localStorage`. Replace these with API calls:
   ```typescript
   export async function loadAssignments(): Promise<VolunteerAssignment[] | null> {
     const res = await fetch("/api/assignments");
     if (!res.ok) return null;
     return res.json();
   }
   ```

3. **Make the portal async** — `VolunteerPortal.tsx` currently calls `loadAssignments()` synchronously in `useEffect`. With API-based loading, use `useState` + `useEffect` with `async` loading and a loading state.

4. **Add an API route** — create `app/api/assignments/route.ts` for GET (fetch all) and POST (update) operations.

5. **Connect a database** — Supabase, PlanetScale, or any Postgres-compatible provider. The business logic functions don't care about the storage technology.

---

## TypeScript Notes

- All types are derived with `z.infer<>` — never define TypeScript interfaces manually for schema-validated data.
- `ClassifierOutput` = `z.infer<typeof ClassifierOutputSchema>`
- `VolunteerAssignment` = `z.infer<typeof VolunteerAssignmentSchema>`
- If you add a field to a Zod schema, the TypeScript type automatically includes it — no manual sync needed.

---

## Zod v4 Gotcha

This project uses Zod **v4.4.3**. The error API changed:

```typescript
// v3 (OLD — will fail in this project):
parsed.error.errors[0]?.message

// v4 (CORRECT):
parsed.error.issues[0]?.message
```

Any new code reading Zod validation errors must use `.issues`, not `.errors`.

---

## Tailwind v4 Note

This project uses Tailwind CSS **v4**. The setup is different from v3:

```css
/* globals.css — v4 setup */
@import "tailwindcss";
```

No `tailwind.config.js` content array, no PostCSS plugin configuration. Utilities work the same way in templates; only the configuration layer changed.

---

## Testing Notes

- Vitest runs in `environment: "node"` — no `window`, no `document`
- All storage tests use pure functions — `loadAssignments()` etc. are not tested directly (they require a browser)
- To test SSR guards, verify that functions return `null` when called outside a browser (which is the default in Vitest)
- Eval tests use `runEvals()` with the real mock classifier — no mocking required
- If you add a new classifier category and it breaks existing classifier tests, check the keyword order in `mock-classifier.ts` — new categories may intercept inputs that previously fell through to another category

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| Adding `metadata` to a client component | Move metadata to the server component page wrapper |
| Reading `localStorage` at module scope | Wrap in `typeof window !== "undefined"` inside a function |
| Using `parsed.error.errors` (Zod v3 API) | Use `parsed.error.issues` (Zod v4) |
| Adding a category to the keyword table but not the schema enum | Add to both `mock-classifier.ts` AND `schemas.ts` |
| Expecting "before event" to match "before the event" | Mock classifier uses substring includes — "before event" does NOT match "before the event" |
| Running tests with `environment: "jsdom"` | Keep `environment: "node"` — jsdom is not needed, pure functions are testable without it |
