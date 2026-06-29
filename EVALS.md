# SevaFlow AI — Evaluation System

How SevaFlow AI tests its AI classifier, what the tests cover, and how pass/fail is calculated.

---

## Why AI Evaluations Matter

In traditional software, unit tests verify deterministic functions. AI classifiers are not deterministic in the same way — a small change in the input, prompt, or model can produce a different output. Evaluations (evals) are the AI equivalent of a test suite: they run a fixed set of inputs through the classifier, compare the output against a hand-labelled ground truth, and produce a pass rate.

Evals serve three purposes in SevaFlow AI:

1. **Regression testing** — catch accuracy drops when the prompt, keyword table, or model changes
2. **Schema enforcement** — verify that every output is structurally valid JSON matching the `ClassifierOutputSchema`
3. **Ground truth alignment** — confirm that the classifier agrees with a human reviewer on category and priority for known inputs

---

## What the Evals Test

Each evaluation run covers 10 predefined test cases, one per classification category (with 2 cases for Volunteer Scheduling and 2 for Event Logistics to test priority variation):

| ID | Category | Priority | What it tests |
|---|---|---|---|
| VS-001 | Volunteer Scheduling | High | "urgently" + time pressure |
| VS-002 | Volunteer Scheduling | Low | routine volunteer request, no urgency |
| FB-001 | Feedback | Low | yajman suggestion, no urgency |
| EL-001 | Event Logistics | High | "today" + physical setup |
| EL-002 | Event Logistics | Low | logistics request, no time pressure |
| CM-001 | Communication | High | "immediately" + WhatsApp announcement |
| FU-001 | Follow Up | Medium | "check" + coordinator follow-up |
| TH-001 | Technical Help | High | "broken" + "asap" |
| DS-001 | Donation Support | Low | receipt and invoice request |
| OT-001 | Other | Low | cross-organizational coordination |

---

## How Pass / Fail Is Calculated

A result is marked **Pass** only when all three conditions hold simultaneously:

### 1. Schema Valid
```typescript
const parsed = ClassifierOutputSchema.safeParse(rawOutput);
const schemaValid = parsed.success;
```

The classifier output must pass Zod validation against `ClassifierOutputSchema`. Fields checked:
- `category` — must be one of the 8 recognized strings
- `priority` — must be "High", "Medium", or "Low"
- `summary` — must be a non-empty string ≤90 characters
- `suggested_owner_role` — non-empty string
- `next_action` — non-empty string
- `deadline` — string
- `confidence` — number between 0 and 1
- `originalDescription` — string

If schema validation fails, `categoryMatch` and `priorityMatch` are both automatically set to `false` — a schema-invalid output cannot pass any check.

### 2. Category Match
```typescript
const categoryMatch = data.category === tc.expectedCategory;
```

Exact string comparison. `"Volunteer Scheduling"` does not match `"volunteer scheduling"`.

### 3. Priority Match
```typescript
const priorityMatch = data.priority === tc.expectedPriority;
```

Exact string comparison. "High", "Medium", "Low" — capitalization must match.

### Combined
```typescript
const passed = categoryMatch && priorityMatch;
```

All three must be true. A result that passes schema and category but fails priority is still a **Fail**.

---

## Aggregate Metrics

`runEvals()` returns an `EvalSummary`:

```typescript
interface EvalSummary {
  total: number;          // total test cases run
  passed: number;         // count of results where passed === true
  failed: number;         // total - passed
  passRate: number;       // passed / total (0.0 to 1.0)
  allSchemaValid: boolean; // true only if every result has schemaValid === true
  results: EvalResult[];  // one EvalResult per test case
}
```

**Pass rate** is a ratio from 0.0 to 1.0. The `/evals` page displays it as a percentage (rounded to the nearest integer).

**`allSchemaValid`** can be true even when some results fail — a result can be schema-valid but still fail due to category or priority mismatch.

---

## File Locations

```
lib/evals/
├── test-cases.ts     ← EvalTestCase array (10 records)
└── run-evals.ts      ← runEvals() function

tests/
└── evals.test.ts     ← 11 Vitest tests covering the eval runner

app/evals/
└── page.tsx          ← async server component; runs evals on every page load

components/
└── EvalTable.tsx     ← server component; renders results table
```

---

## How the Eval Runner Works (`lib/evals/run-evals.ts`)

```typescript
export async function runEvals(cases = TEST_CASES): Promise<EvalSummary> {
  const results: EvalResult[] = [];

  for (const tc of cases) {
    try {
      const raw = await classifyRequest({ description: tc.input });
      const parsed = ClassifierOutputSchema.safeParse(raw);

      if (!parsed.success) {
        results.push({ ...tc, schemaValid: false, categoryMatch: false,
                        priorityMatch: false, passed: false, ... });
        continue;
      }

      const { data } = parsed;
      const categoryMatch = data.category === tc.expectedCategory;
      const priorityMatch = data.priority === tc.expectedPriority;
      const passed = categoryMatch && priorityMatch;

      results.push({ ...tc, schemaValid: true, actualCategory: data.category,
                      actualPriority: data.priority, categoryMatch, priorityMatch, passed });
    } catch (err) {
      results.push({ ...tc, schemaValid: false, categoryMatch: false,
                      priorityMatch: false, passed: false, error: String(err) });
    }
  }

  const passed = results.filter(r => r.passed).length;
  return {
    total: results.length,
    passed,
    failed: results.length - passed,
    passRate: results.length > 0 ? passed / results.length : 0,
    allSchemaValid: results.every(r => r.schemaValid),
    results,
  };
}
```

Each test case runs independently inside a `try/catch`. A thrown error produces a Fail result — it does not stop the rest of the suite.

The function accepts an optional `cases` argument so test suites can inject a subset without touching the global `TEST_CASES` array.

---

## Test Suite (`tests/evals.test.ts`)

11 Vitest tests covering:

| Test | What it verifies |
|---|---|
| Returns results for every test case | `results.length === TEST_CASES.length` |
| Every result contains required fields | id, input, expected*, actual*, schemaValid, categoryMatch, priorityMatch, passed |
| schemaValid is a boolean | `typeof r.schemaValid === "boolean"` |
| All test cases return schema-valid JSON | `r.schemaValid === true` for all |
| `total === passed + failed` | Aggregate arithmetic |
| `total` matches `TEST_CASES.length` | Consistency between summary and input |
| Pass rate is `passed / total` | Formula verification (closeTo 10 decimal places) |
| Pass rate is between 0 and 1 | Bounds check |
| `allSchemaValid` derived correctly | Matches `results.every(r => r.schemaValid)` |
| Accepts a custom subset | `runEvals(TEST_CASES.slice(0, 3))` produces 3 results |
| Counts are non-negative integers | `Number.isInteger()` + `>= 0` |

---

## Current Results

With the mock classifier, all 10 test cases should pass. The mock classifier's keyword table is deterministic and the test cases were labelled against that table. Expected pass rate: **100%** (10/10).

---

## Future Improvements

- **More test cases** — expand to 50+ cases covering edge cases, ambiguous inputs, and multi-category requests
- **Real LLM evals** — run the same suite against the Anthropic API and compare mock vs real pass rates
- **Regression tracking** — store historical pass rate results and alert on drops
- **Per-category breakdown** — pass rate per category, not just overall
- **Latency tracking** — measure and report classifier response time per case
- **Automated CI run** — `npm run test` already covers the runner; add a separate `npm run evals` script for the full live eval suite
