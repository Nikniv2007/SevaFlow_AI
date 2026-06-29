const features = [
  "Takes messy text input from any channel",
  "Classifies the request into a structured category",
  "Extracts priority — High, Medium, or Low",
  "Suggests the right owner role automatically",
  "Creates a clear, actionable next step",
  "Produces validated JSON output via Zod",
  "Helps volunteers self-manage their own assignments",
];

export default function SolutionSection() {
  return (
    <section className="py-24 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — content */}
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold uppercase tracking-widest mb-6 border border-blue-100">
              The Solution
            </span>
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight leading-tight mb-5">
              SevaFlow AI brings structure to service work.
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              SevaFlow AI acts as a lightweight coordination layer — turning unstructured community messages into clean, validated, actionable data in seconds.
            </p>
            <ul className="space-y-3">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 text-sm leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — JSON visualization */}
          <div className="relative">
            <div className="absolute -inset-4 bg-blue-600/5 rounded-3xl blur-xl" />
            <div className="relative bg-slate-900 rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/20 border border-slate-800">

              {/* Terminal chrome */}
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-slate-800 bg-slate-950">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="ml-2 text-slate-500 text-xs font-mono">classifier_output.json</span>
              </div>

              {/* Code */}
              <div className="p-5 font-mono text-sm leading-relaxed">
                <p className="text-slate-500">{"{"}</p>
                <div className="pl-4 space-y-1">
                  <p>
                    <span className="text-blue-400">&quot;category&quot;</span>
                    <span className="text-slate-500">: </span>
                    <span className="text-emerald-400">&quot;Volunteer Scheduling&quot;</span>
                    <span className="text-slate-500">,</span>
                  </p>
                  <p>
                    <span className="text-blue-400">&quot;priority&quot;</span>
                    <span className="text-slate-500">: </span>
                    <span className="text-yellow-300">&quot;High&quot;</span>
                    <span className="text-slate-500">,</span>
                  </p>
                  <p>
                    <span className="text-blue-400">&quot;suggested_owner_role&quot;</span>
                    <span className="text-slate-500">: </span>
                    <span className="text-emerald-400">&quot;Volunteer Coordinator&quot;</span>
                    <span className="text-slate-500">,</span>
                  </p>
                  <p>
                    <span className="text-blue-400">&quot;next_action&quot;</span>
                    <span className="text-slate-500">: </span>
                    <span className="text-emerald-400">&quot;Confirm 4 volunteers before 9 AM&quot;</span>
                    <span className="text-slate-500">,</span>
                  </p>
                  <p>
                    <span className="text-blue-400">&quot;deadline&quot;</span>
                    <span className="text-slate-500">: </span>
                    <span className="text-emerald-400">&quot;Before 9 AM Sunday&quot;</span>
                    <span className="text-slate-500">,</span>
                  </p>
                  <p>
                    <span className="text-blue-400">&quot;confidence&quot;</span>
                    <span className="text-slate-500">: </span>
                    <span className="text-purple-400">0.92</span>
                  </p>
                </div>
                <p className="text-slate-500">{"}"}</p>
              </div>

              {/* Footer badge */}
              <div className="px-5 pb-4">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Validated by Zod schema · No API key required
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
