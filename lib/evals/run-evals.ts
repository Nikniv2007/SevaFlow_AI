import { classifyRequest } from "../classifier";
import { ClassifierOutputSchema } from "../schemas";
import { TEST_CASES } from "./test-cases";
import type { EvalTestCase } from "./test-cases";

export interface EvalResult {
  id: string;
  input: string;
  expectedCategory: string;
  expectedPriority: string;
  actualCategory: string | null;
  actualPriority: string | null;
  schemaValid: boolean;
  categoryMatch: boolean;
  priorityMatch: boolean;
  passed: boolean;
  error?: string;
}

export interface EvalSummary {
  total: number;
  passed: number;
  failed: number;
  passRate: number;
  allSchemaValid: boolean;
  results: EvalResult[];
}

export async function runEvals(
  cases: EvalTestCase[] = TEST_CASES
): Promise<EvalSummary> {
  const results: EvalResult[] = await Promise.all(
    cases.map(async (tc): Promise<EvalResult> => {
      try {
        const output = await classifyRequest({ description: tc.input });
        const parsed = ClassifierOutputSchema.safeParse(output);

        if (!parsed.success) {
          return {
            id: tc.id,
            input: tc.input,
            expectedCategory: tc.expectedCategory,
            expectedPriority: tc.expectedPriority,
            actualCategory: null,
            actualPriority: null,
            schemaValid: false,
            categoryMatch: false,
            priorityMatch: false,
            passed: false,
            error: parsed.error.issues[0]?.message ?? "Schema validation failed",
          };
        }

        const { data } = parsed;
        const categoryMatch = data.category === tc.expectedCategory;
        const priorityMatch = data.priority === tc.expectedPriority;

        return {
          id: tc.id,
          input: tc.input,
          expectedCategory: tc.expectedCategory,
          expectedPriority: tc.expectedPriority,
          actualCategory: data.category,
          actualPriority: data.priority,
          schemaValid: true,
          categoryMatch,
          priorityMatch,
          passed: categoryMatch && priorityMatch,
        };
      } catch (err) {
        return {
          id: tc.id,
          input: tc.input,
          expectedCategory: tc.expectedCategory,
          expectedPriority: tc.expectedPriority,
          actualCategory: null,
          actualPriority: null,
          schemaValid: false,
          categoryMatch: false,
          priorityMatch: false,
          passed: false,
          error: err instanceof Error ? err.message : String(err),
        };
      }
    })
  );

  const passed = results.filter((r) => r.passed).length;
  const total = results.length;

  return {
    total,
    passed,
    failed: total - passed,
    passRate: total > 0 ? passed / total : 0,
    allSchemaValid: results.every((r) => r.schemaValid),
    results,
  };
}
