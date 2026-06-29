import Badge from "@/components/Badge";

export const metadata = {
  title: "Evaluations — SevaFlow AI",
  description: "Review and rate volunteer engagements to improve future AI matching quality.",
};

export default function EvalsPage() {
  const sampleEvals = [
    { id: "EVL-001", volunteer: "Maya Patel", org: "City Food Bank", rating: 5, date: "2026-06-15", skill: "Data Analysis" },
    { id: "EVL-002", volunteer: "Carlos Rivera", org: "Youth Literacy Org", rating: 4, date: "2026-06-12", skill: "Education" },
    { id: "EVL-003", volunteer: "Sarah Chen", org: "Animal Rescue Network", rating: 5, date: "2026-06-08", skill: "Web Dev" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <Badge variant="purple">Evaluations</Badge>
        <h1 className="mt-4 text-4xl font-bold text-gray-900">
          Engagement Evaluations
        </h1>
        <p className="mt-4 text-gray-500 max-w-xl mx-auto">
          Post-engagement ratings and structured feedback that continuously improve AI matching quality.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
        {[
          { label: "Total Evaluations", value: "3", color: "text-blue-600" },
          { label: "Average Rating", value: "4.7 / 5", color: "text-emerald-600" },
          { label: "Match Accuracy", value: "94%", color: "text-purple-600" },
        ].map((stat) => (
          <div key={stat.label} className="p-6 rounded-2xl border border-gray-100 bg-gray-50 text-center">
            <div className={`text-3xl font-bold mb-1 ${stat.color}`}>{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden mb-10">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
          <h2 className="font-semibold text-gray-800">Recent Evaluations</h2>
          <Badge variant="gray">Sample Data</Badge>
        </div>
        <div className="divide-y divide-gray-50">
          {sampleEvals.map((ev) => (
            <div key={ev.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-mono text-gray-400">{ev.id}</span>
                  <Badge variant="blue">{ev.skill}</Badge>
                </div>
                <p className="text-sm font-medium text-gray-800">{ev.volunteer}</p>
                <p className="text-xs text-gray-400">{ev.org} · {ev.date}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-0.5 justify-end mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < ev.rating ? "text-amber-400" : "text-gray-200"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-gray-400">{ev.rating}.0 / 5</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center">
        <div className="text-3xl mb-3">📝</div>
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Submit a New Evaluation</h2>
        <p className="text-gray-400 text-sm">
          Evaluation form with Zod-validated fields coming soon.
        </p>
      </div>
    </div>
  );
}
