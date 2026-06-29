import { describe, it, expect } from "vitest";
import { runEvals } from "@/lib/evals/run-evals";
import { TEST_CASES } from "@/lib/evals/test-cases";
import type { EvalTestCase } from "@/lib/evals/test-cases";

describe("runEvals", () => {
  it("returns results for every test case", async () => {
    const summary = await runEvals();
    expect(summary.results).toHaveLength(TEST_CASES.length);
  });

  it("every result contains the required fields", async () => {
    const summary = await runEvals();
    for (const r of summary.results) {
      expect(r).toHaveProperty("id");
      expect(r).toHaveProperty("input");
      expect(r).toHaveProperty("expectedCategory");
      expect(r).toHaveProperty("expectedPriority");
      expect(r).toHaveProperty("actualCategory");
      expect(r).toHaveProperty("actualPriority");
      expect(r).toHaveProperty("schemaValid");
      expect(r).toHaveProperty("categoryMatch");
      expect(r).toHaveProperty("priorityMatch");
      expect(r).toHaveProperty("passed");
    }
  });

  it("every result includes a boolean schemaValid field", async () => {
    const summary = await runEvals();
    for (const r of summary.results) {
      expect(typeof r.schemaValid).toBe("boolean");
    }
  });

  it("all test cases return schema-valid JSON", async () => {
    const summary = await runEvals();
    for (const r of summary.results) {
      expect(r.schemaValid).toBe(true);
    }
  });

  it("total equals passed + failed", async () => {
    const summary = await runEvals();
    expect(summary.total).toBe(summary.passed + summary.failed);
  });

  it("total matches the number of test cases", async () => {
    const summary = await runEvals();
    expect(summary.total).toBe(TEST_CASES.length);
  });

  it("pass rate is passed / total", async () => {
    const summary = await runEvals();
    const expected = summary.total > 0 ? summary.passed / summary.total : 0;
    expect(summary.passRate).toBeCloseTo(expected, 10);
  });

  it("pass rate is between 0 and 1", async () => {
    const summary = await runEvals();
    expect(summary.passRate).toBeGreaterThanOrEqual(0);
    expect(summary.passRate).toBeLessThanOrEqual(1);
  });

  it("allSchemaValid is true when all results are schema-valid", async () => {
    const summary = await runEvals();
    const expected = summary.results.every((r) => r.schemaValid);
    expect(summary.allSchemaValid).toBe(expected);
  });

  it("accepts a custom subset of test cases", async () => {
    const subset = TEST_CASES.slice(0, 3);
    const summary = await runEvals(subset);
    expect(summary.results).toHaveLength(3);
    expect(summary.total).toBe(3);
  });

  it("passed and failed counts are non-negative integers", async () => {
    const summary = await runEvals();
    expect(summary.passed).toBeGreaterThanOrEqual(0);
    expect(summary.failed).toBeGreaterThanOrEqual(0);
    expect(Number.isInteger(summary.passed)).toBe(true);
    expect(Number.isInteger(summary.failed)).toBe(true);
  });
});

describe("runEvals — pass/fail result accuracy", () => {
  it("a correctly-labelled test case is marked Pass", async () => {
    const passingCase: EvalTestCase = {
      id: "TEST-PASS",
      input: "We need a volunteer for the afternoon shift at the entrance.",
      expectedCategory: "Volunteer Scheduling",
      expectedPriority: "Low",
    };
    const summary = await runEvals([passingCase]);
    expect(summary.results[0].passed).toBe(true);
    expect(summary.results[0].categoryMatch).toBe(true);
    expect(summary.results[0].priorityMatch).toBe(true);
    expect(summary.passed).toBe(1);
    expect(summary.failed).toBe(0);
  });

  it("a test case with the wrong expected category is marked Fail", async () => {
    const wrongCategory: EvalTestCase = {
      id: "TEST-FAIL-CAT",
      input: "We need a volunteer for the afternoon shift at the entrance.",
      expectedCategory: "Other", // classifier returns "Volunteer Scheduling"
      expectedPriority: "Low",
    };
    const summary = await runEvals([wrongCategory]);
    expect(summary.results[0].passed).toBe(false);
    expect(summary.results[0].categoryMatch).toBe(false);
    expect(summary.passed).toBe(0);
    expect(summary.failed).toBe(1);
  });

  it("a test case with the wrong expected priority is marked Fail", async () => {
    const wrongPriority: EvalTestCase = {
      id: "TEST-FAIL-PRI",
      input: "We need a volunteer for the afternoon shift at the entrance.",
      expectedCategory: "Volunteer Scheduling",
      expectedPriority: "High", // classifier returns "Low" — no urgency keywords
    };
    const summary = await runEvals([wrongPriority]);
    expect(summary.results[0].passed).toBe(false);
    expect(summary.results[0].priorityMatch).toBe(false);
    expect(summary.failed).toBe(1);
  });

  it("all 10 current mock test cases pass", async () => {
    const summary = await runEvals();
    expect(summary.passed).toBe(TEST_CASES.length);
    expect(summary.passRate).toBe(1);
  });
});
