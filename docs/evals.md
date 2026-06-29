# SevaFlow AI — Evaluation System Deep-Dive

Detailed technical reference for the evaluation pipeline, test case design, scoring logic, and how to extend the eval suite.

---

## Overview

The SevaFlow AI evaluation system is a lightweight, code-first test harness for the request classifier. It runs a fixed set of hand-labelled inputs through the classifier, validates outputs against a Zod schema, and compares predicted values against ground truth.

It is not a statistical benchmark — it is a correctness regression suite for a deterministic mock classifier and a behavioral sanity check for real LLM integration.

---

## File Map

```
lib/evals/
├── test-cases.ts     EvalTestCase array (10 records, hand-labelled)
└── run-evals.ts      runEvals() → EvalSummary

tests/
└── evals.test.ts     11 Vitest unit tests for the runner

app/evals/
└── page.tsx          Async server component — runs evals on every page load

components/
└── EvalTable.tsx     Server component — renders per-row results table
```

---

## Data Types

### EvalTestCase
```typescript
interface EvalTestCase {
  id: string;               // e.g. "VS-001"
  input: string;            // the free-text community request
  expectedCategory: string; // exact string to match against classifier output
  expectedPriority: string; // "High", "Medium", or "Low"
}
```

### EvalResult
```typescript
interface EvalResult {
  id: string;
  input: string;
  expectedCategory: string;
  expectedPriority: string;
  actualCategory: string;
  actualPriority: string;
  schemaValid: boolean;
  categoryMatch: boolean;
  priorityMatch: boolean;
  passed: boolean;
  error?: string;           // set when classifyRequest() throws
}
```

### EvalSummary
```typescript
interface EvalSummary {
  total: number;
  passed: number;
  failed: number;
  passRate: number;         // 0.0 – 1.0
  allSchemaValid: boolean;
  results: EvalResult[];
}
```

---

## Test Cases

All 10 test cases with their inputs and rationale:

### VS-001 — Volunteer Scheduling, High
**Input:** `"We urgently need volunteers for Sunday prasad serving before 9 AM..."`  
**Why High:** "urgently" contains the substring "urgent" which is in HIGH_KEYWORDS.  
**Why Volunteer Scheduling:** "volunteers", "prasad serving" match CATEGORY_KEYWORDS["Volunteer Scheduling"].

### VS-002 — Volunteer Scheduling, Low
**Input:** `"We need a volunteer for the afternoon shift at the entrance."`  
**Why Low:** No High or Medium keywords.  
**Why Volunteer Scheduling:** "volunteer", "shift" match.

### FB-001 — Feedback, Low
**Input:** `"A yajman said the process was confusing and shared a suggestion for improvement."`  
**Why Low:** No urgency keywords.  
**Why Feedback:** "suggestion" matches CATEGORY_KEYWORDS["Feedback"].

### EL-001 — Event Logistics, High
**Input:** `"We need extra chairs arranged in the hall before the event today."`  
**Why High:** "today" is in HIGH_KEYWORDS.  
**Why Event Logistics:** "chairs", "hall" match.

### EL-002 — Event Logistics, Low
**Input:** `"Please arrange the stage and equipment in the hall before the event."`  
**Why Low:** "before the event" does NOT match the keyword "before event" (substring check fails). No other urgency markers.  
**Why Event Logistics:** "stage", "equipment", "hall" match.

### CM-001 — Communication, High
**Input:** `"Please send a WhatsApp announcement to all members immediately."`  
**Why High:** "immediately" is in HIGH_KEYWORDS.  
**Why Communication:** "announcement", "WhatsApp" match.

### FU-001 — Follow Up, Medium
**Input:** `"Someone needs to follow up with the families and check with the coordinator this week."`  
**Why Medium:** "check" is in MEDIUM_KEYWORDS. "this week" is also Medium — first match wins but both agree.  
**Why Follow Up:** "follow up" matches.

### TH-001 — Technical Help, High
**Input:** `"The registration link is not working and the form is broken. Please fix it asap."`  
**Why High:** "broken" and "asap" are both in HIGH_KEYWORDS.  
**Why Technical Help:** "registration", "form", "broken", "fix" match.

### DS-001 — Donation Support, Low
**Input:** `"A yajman needs a donation receipt and invoice for their contribution."`  
**Why Low:** No urgency keywords.  
**Why Donation Support:** "donation", "receipt", "invoice" match.

### OT-001 — Other, Low
**Input:** `"Please coordinate with the regional temple for the upcoming anniversary celebration."`  
**Why Low:** No urgency keywords.  
**Why Other:** No keywords match any specific category; falls through to default.

---

## Pass / Fail Logic

```typescript
// In run-evals.ts
const parsed = ClassifierOutputSchema.safeParse(rawOutput);

if (!parsed.success) {
  // schema invalid — all checks fail
  results.push({
    ...tc,
    actualCategory: "—",
    actualPriority: "—",
    schemaValid: false,
    categoryMatch: false,
    priorityMatch: false,
    passed: false,
  });
  continue;
}

const { data } = parsed;
const categoryMatch = data.category === tc.expectedCategory;
const priorityMatch = data.priority === tc.expectedPriority;
const passed = categoryMatch && priorityMatch;
```

**Key invariants:**
- `schemaValid === false` implies `categoryMatch === false && priorityMatch === false`
- `passed === (categoryMatch && priorityMatch)` — never `(schemaValid && categoryMatch && priorityMatch)`, because a schema-invalid result auto-fails both match checks already
- `allSchemaValid === results.every(r => r.schemaValid)` — true even when some results fail on category/priority

---

## Why These 10 Cases

The test suite was designed with three goals:

1. **Category coverage** — at least one case per category confirms the classifier can distinguish all 8 types
2. **Priority variation** — High/Low pairs for Volunteer Scheduling and Event Logistics test that priority is detected independently of category
3. **Edge case validation** — EL-002 uses "before the event" (not "before event") to confirm substring matching boundaries; FU-001 uses "check" to confirm Medium detection

Cases were labelled after reading `lib/mock-classifier.ts` directly — they match the actual keyword table, not intuition about what "should" be High or Medium. This means the test suite is an accurate regression harness for the mock classifier.

---

## Live Rendering (`app/evals/page.tsx`)

The evals page is an `async` server component:

```typescript
export default async function EvalsPage() {
  const summary = await runEvals();
  // render with summary.results, summary.passRate, etc.
}
```

No `export const dynamic` override is needed — the default (dynamic rendering) ensures evals run fresh on every request. No ISR caching, no stale results.

This means:
- If the classifier behavior changes, the live page reflects it immediately
- If a real LLM is connected, the evals page shows real model results on every load

---

## Results Table (`components/EvalTable.tsx`)

Server component — no interactivity, no client JS.

Per row:
- **ID** — e.g. "VS-001"
- **Input (truncated)** — first 60 characters of the test input
- **Expected Category** — with ✓ or ✗ based on `categoryMatch`
- **Expected Priority** — with ✓ or ✗ based on `priorityMatch`
- **Actual Category** — red strikethrough on mismatch
- **Actual Priority** — red strikethrough on mismatch
- **Result** — green "Pass" or red "Fail" badge

---

## Running Evals in Code

```typescript
import { runEvals } from "@/lib/evals/run-evals";

// Full suite
const summary = await runEvals();

// Custom subset
import { TEST_CASES } from "@/lib/evals/test-cases";
const partial = await runEvals(TEST_CASES.slice(0, 3));
```

---

## Adding Test Cases

1. Open `lib/evals/test-cases.ts`
2. Add a new entry to the `TEST_CASES` array:

```typescript
{
  id: "XX-001",
  input: "Your test input here",
  expectedCategory: "Volunteer Scheduling",   // must be an exact enum value
  expectedPriority: "High",                   // "High", "Medium", or "Low"
},
```

3. Verify the expected values match `lib/mock-classifier.ts` keyword behavior — search for the key nouns and check which category and priority keywords appear in the input
4. Run `npm run test` to ensure the eval test suite still passes (all 11 tests are shape/arithmetic checks, not accuracy checks)
5. Reload `/evals` to see the new case in the results table

---

## Future Eval Improvements

- **More cases** — expand from 10 to 50+ with ambiguous, multi-category, and adversarial inputs
- **Per-category pass rate** — break down accuracy by category to identify weaknesses
- **Real LLM comparison** — run same suite against Anthropic API, compare to mock baseline
- **Historical tracking** — store pass rate per run and display a trend chart on the evals page
- **CI integration** — `npm run evals` script that exits non-zero when `passRate < 0.9`
- **Latency metrics** — measure and report average `classifyRequest()` time per run
- **Confidence calibration** — check whether high-confidence results actually have higher accuracy
