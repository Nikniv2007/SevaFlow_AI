import { runEvals } from "@/lib/evals/run-evals";
import EvalTable from "@/components/EvalTable";

export const metadata = {
  title: "AI Evaluation Results — SevaFlow AI",
  description:
    "Testing whether the SevaFlow AI classifier returns valid JSON, accurate categories, and useful priorities across 10 predefined community request inputs.",
};

export default async function EvalsPage() {
  let summary;
  try {
    summary = await runEvals();
  } catch {
    return (
      <div className="min-h-screen bg-white">
        <section className="bg-slate-900 text-white py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <span className="inline-block px-3 py-1 rounded-full border border-slate-600 bg-slate-800 text-slate-300 text-xs font-semibold uppercase tracking-widest mb-5">
              Model Evals
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              AI Evaluation Results
            </h1>
          </div>
        </section>
        <div className="max-w-5xl mx-auto px-4 py-14">
          <div className="rounded-2xl border border-red-100 bg-red-50 p-8 text-center">
            <p className="text-lg font-semibold text-red-800 mb-2">
              Evaluation run failed
            </p>
            <p className="text-sm text-red-600 max-w-md mx-auto">
              The evaluation suite could not complete. This may be a temporary
              issue — try refreshing the page. If the problem persists, check
              that the classifier is configured correctly.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const pct = Math.round(summary.passRate * 100);

  const rateColor =
    pct >= 90
      ? "text-emerald-600"
      : pct >= 70
      ? "text-amber-600"
      : "text-red-600";

  const rateRingColor =
    pct >= 90
      ? "bg-emerald-50 border-emerald-200"
      : pct >= 70
      ? "bg-amber-50 border-amber-200"
      : "bg-red-50 border-red-100";

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero header ── */}
      <section className="bg-slate-900 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full border border-slate-600 bg-slate-800 text-slate-300 text-xs font-semibold uppercase tracking-widest mb-5">
            Model Evals
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            AI Evaluation Results
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            Testing whether the classifier returns valid JSON, accurate categories,
            and useful priorities across 10 predefined community request inputs.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-14 space-y-14">

        {/* ── Why evals matter ── */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
            Why AI Evaluations Matter
          </h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 leading-relaxed mb-3">
              In production AI systems, correctness cannot be assumed — it must be measured.
              Even a well-prompted classifier can fail on edge cases, return structurally invalid
              JSON, or assign the wrong priority to time-sensitive requests. Evaluations create a
              repeatable test harness that catches regressions before they reach real users.
            </p>
            <p className="text-gray-600 leading-relaxed">
              SevaFlow AI runs each input through the request classifier, validates the output
              against a strict Zod schema, then compares the predicted category and priority
              against a hand-labelled ground truth. A result is only marked{" "}
              <span className="font-semibold text-emerald-700">Pass</span> if all three checks
              pass simultaneously — schema validation, category accuracy, and priority accuracy.
            </p>
          </div>
        </section>

        {/* ── Metrics ── */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
            Run Summary
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {/* Total */}
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5 text-center">
              <div className="font-mono text-3xl font-bold text-gray-900 mb-1">
                {summary.total}
              </div>
              <div className="text-xs text-gray-500 font-medium">Total Tests</div>
            </div>

            {/* Passed */}
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center">
              <div className="font-mono text-3xl font-bold text-emerald-700 mb-1">
                {summary.passed}
              </div>
              <div className="text-xs text-emerald-600 font-medium">Passed</div>
            </div>

            {/* Failed */}
            <div className={`rounded-2xl border p-5 text-center ${
              summary.failed === 0
                ? "border-gray-100 bg-gray-50"
                : "border-red-100 bg-red-50"
            }`}>
              <div className={`font-mono text-3xl font-bold mb-1 ${
                summary.failed === 0 ? "text-gray-400" : "text-red-600"
              }`}>
                {summary.failed}
              </div>
              <div className={`text-xs font-medium ${
                summary.failed === 0 ? "text-gray-400" : "text-red-500"
              }`}>
                Failed
              </div>
            </div>

            {/* Pass rate */}
            <div className={`rounded-2xl border p-5 text-center ${rateRingColor}`}>
              <div className={`font-mono text-3xl font-bold mb-1 ${rateColor}`}>
                {pct}%
              </div>
              <div className={`text-xs font-medium ${rateColor}`}>Pass Rate</div>
            </div>

            {/* Schema */}
            <div className={`rounded-2xl border p-5 text-center ${
              summary.allSchemaValid
                ? "border-emerald-200 bg-emerald-50"
                : "border-red-100 bg-red-50"
            }`}>
              <div className={`text-3xl font-bold mb-1 ${
                summary.allSchemaValid ? "text-emerald-600" : "text-red-500"
              }`}>
                {summary.allSchemaValid ? "✓" : "✗"}
              </div>
              <div className={`text-xs font-medium ${
                summary.allSchemaValid ? "text-emerald-600" : "text-red-500"
              }`}>
                Schema Valid
              </div>
            </div>
          </div>
        </section>

        {/* ── Results table ── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Detailed Results
            </h2>
            <span className="text-xs font-mono text-gray-400">
              {summary.passed}/{summary.total} passing
            </span>
          </div>
          <EvalTable results={summary.results} />
        </section>

        {/* ── Methodology ── */}
        <section className="border-t border-gray-100 pt-12">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">
            How Pass / Fail Is Calculated
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Each test case defines an{" "}
                <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-xs text-gray-700">
                  expectedCategory
                </span>{" "}
                and{" "}
                <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-xs text-gray-700">
                  expectedPriority
                </span>
                , hand-labelled against the mock classifier&apos;s keyword table. A result is
                marked <span className="font-semibold text-emerald-700">Pass</span> only when
                all three conditions hold:
              </p>
              <ol className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold mt-0.5">1</span>
                  <span>
                    <span className="font-semibold text-gray-800">Schema valid</span> — the
                    classifier output passes{" "}
                    <span className="font-mono text-xs bg-gray-100 px-1 py-0.5 rounded">
                      ClassifierOutputSchema.safeParse()
                    </span>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold mt-0.5">2</span>
                  <span>
                    <span className="font-semibold text-gray-800">Category match</span> —
                    actual category equals expected category (exact string comparison)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold mt-0.5">3</span>
                  <span>
                    <span className="font-semibold text-gray-800">Priority match</span> —
                    actual priority equals expected priority (exact string comparison)
                  </span>
                </li>
              </ol>
            </div>

            <div className="rounded-xl bg-slate-900 p-5 font-mono text-xs text-slate-300 leading-relaxed">
              <div className="text-slate-500 mb-3">// run-evals.ts — pass logic</div>
              <div>
                <span className="text-blue-400">const</span>{" "}
                <span className="text-white">categoryMatch</span>{" "}
                <span className="text-slate-400">=</span>
              </div>
              <div className="pl-4 text-emerald-400">
                data.category === tc.expectedCategory<span className="text-slate-400">;</span>
              </div>
              <div className="mt-2">
                <span className="text-blue-400">const</span>{" "}
                <span className="text-white">priorityMatch</span>{" "}
                <span className="text-slate-400">=</span>
              </div>
              <div className="pl-4 text-emerald-400">
                data.priority === tc.expectedPriority<span className="text-slate-400">;</span>
              </div>
              <div className="mt-2">
                <span className="text-blue-400">const</span>{" "}
                <span className="text-white">passed</span>{" "}
                <span className="text-slate-400">=</span>
              </div>
              <div className="pl-4 text-purple-400">
                categoryMatch{" "}
                <span className="text-slate-400">&amp;&amp;</span>{" "}
                priorityMatch
                <span className="text-slate-400">;</span>
              </div>
              <div className="mt-3 text-slate-500">
                {"// schema failures auto-fail all checks"}
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
