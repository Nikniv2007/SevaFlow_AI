import type { EvalResult } from "@/lib/evals/run-evals";

interface Props {
  results: EvalResult[];
}

const CATEGORY_COLOR: Record<string, string> = {
  "Volunteer Scheduling": "bg-blue-50 text-blue-700",
  "Feedback": "bg-purple-50 text-purple-700",
  "Event Logistics": "bg-orange-50 text-orange-700",
  "Communication": "bg-cyan-50 text-cyan-700",
  "Follow Up": "bg-indigo-50 text-indigo-700",
  "Technical Help": "bg-rose-50 text-rose-700",
  "Donation Support": "bg-emerald-50 text-emerald-700",
  "Other": "bg-gray-100 text-gray-500",
};

const PRIORITY_COLOR: Record<string, string> = {
  High: "bg-red-50 text-red-600",
  Medium: "bg-amber-50 text-amber-700",
  Low: "bg-green-50 text-green-700",
};

function CategoryBadge({ label, match }: { label: string | null; match: boolean }) {
  if (!label) return <span className="text-gray-300 text-xs">—</span>;
  const base = match
    ? (CATEGORY_COLOR[label] ?? "bg-gray-100 text-gray-600")
    : "bg-red-50 text-red-600 line-through";
  return (
    <span className={`inline-block px-2 py-0.5 rounded-md text-xs font-medium ${base}`}>
      {label}
    </span>
  );
}

function PriorityBadge({ label, match }: { label: string | null; match: boolean }) {
  if (!label) return <span className="text-gray-300 text-xs">—</span>;
  const base = match
    ? (PRIORITY_COLOR[label] ?? "bg-gray-100 text-gray-500")
    : "bg-red-50 text-red-600 line-through";
  return (
    <span className={`inline-block px-2 py-0.5 rounded-md text-xs font-semibold ${base}`}>
      {label}
    </span>
  );
}

function Check({ ok }: { ok: boolean }) {
  return ok ? (
    <span className="text-emerald-600 font-bold text-sm">✓</span>
  ) : (
    <span className="text-red-500 font-bold text-sm">✗</span>
  );
}

export default function EvalTable({ results }: Props) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200 text-left">
            <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-widest w-20">ID</th>
            <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-widest min-w-[220px]">Input</th>
            <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-widest">Expected Category</th>
            <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-widest">Actual Category</th>
            <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-widest">Exp. Priority</th>
            <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-widest">Act. Priority</th>
            <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-widest text-center">Schema</th>
            <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-widest text-center">Pass</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {results.map((r, i) => (
            <tr
              key={r.id}
              className={`transition-colors ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"} hover:bg-blue-50/30`}
            >
              {/* ID */}
              <td className="px-4 py-3 font-mono text-xs text-gray-400">{r.id}</td>

              {/* Input */}
              <td className="px-4 py-3">
                <span
                  className="font-mono text-xs text-gray-600 leading-relaxed"
                  title={r.input}
                >
                  {r.input.length > 58 ? r.input.slice(0, 55) + "…" : r.input}
                </span>
              </td>

              {/* Expected Category */}
              <td className="px-4 py-3">
                <CategoryBadge label={r.expectedCategory} match={true} />
              </td>

              {/* Actual Category */}
              <td className="px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <Check ok={r.categoryMatch} />
                  <CategoryBadge label={r.actualCategory} match={r.categoryMatch} />
                </div>
              </td>

              {/* Expected Priority */}
              <td className="px-4 py-3">
                <PriorityBadge label={r.expectedPriority} match={true} />
              </td>

              {/* Actual Priority */}
              <td className="px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <Check ok={r.priorityMatch} />
                  <PriorityBadge label={r.actualPriority} match={r.priorityMatch} />
                </div>
              </td>

              {/* Schema */}
              <td className="px-4 py-3 text-center">
                <Check ok={r.schemaValid} />
              </td>

              {/* Passed */}
              <td className="px-4 py-3 text-center">
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    r.passed
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {r.passed ? "Pass" : "Fail"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
