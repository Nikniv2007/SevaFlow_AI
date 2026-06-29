import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(59,130,246,0.22),transparent)]" />
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — copy */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-semibold mb-7 tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              AI-Powered Request Classification
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold leading-[1.1] tracking-tight">
              Turn messy community requests into{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                clear action.
              </span>
            </h1>

            <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-lg">
              SevaFlow AI helps volunteer and community organizations convert informal WhatsApp, SMS, and in-person requests into structured, prioritized, actionable tasks.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Link
                href="/demo"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-blue-900/40"
              >
                Try the Demo
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/volunteer"
                className="inline-flex items-center justify-center px-6 py-3.5 border border-white/20 hover:border-white/40 hover:bg-white/5 text-slate-300 hover:text-white font-semibold rounded-xl transition-colors"
              >
                View Volunteer Portal
              </Link>
            </div>

            {/* Stats strip */}
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
              {[
                { label: "65 tests passing" },
                { label: "Zero network requests" },
                { label: "No API key required" },
                { label: "Runs on localhost" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-1.5 text-xs text-slate-400">
                  <svg className="w-3.5 h-3.5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {s.label}
                </div>
              ))}
            </div>
          </div>

          {/* Right — transformation demo card */}
          <div className="relative">
            <div className="absolute -inset-6 bg-blue-500/5 rounded-3xl blur-2xl" />
            <div className="relative space-y-3">

              {/* Input */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-xl">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-400" />
                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest">
                    Incoming Request
                  </span>
                </div>
                <p className="text-slate-200 text-sm leading-relaxed font-mono">
                  &ldquo;Radhe Radhe, we need 4 volunteers for Sunday lunch setup before 9 AM.&rdquo;
                </p>
              </div>

              {/* Processing pill */}
              <div className="flex items-center gap-3 px-1">
                <div className="h-px flex-1 bg-white/10" />
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/15 border border-blue-500/25 rounded-full">
                  <svg className="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-xs text-blue-300 font-semibold">SevaFlow AI</span>
                </div>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              {/* Output */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest">
                    Structured Output
                  </span>
                </div>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500 w-24 shrink-0">Category</span>
                    <span className="text-xs px-2.5 py-1 bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30 font-medium">
                      Volunteer Scheduling
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500 w-24 shrink-0">Priority</span>
                    <span className="text-xs px-2.5 py-1 bg-red-500/20 text-red-300 rounded-full border border-red-500/30 font-medium">
                      High
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xs text-slate-500 w-24 shrink-0 pt-0.5">Next Action</span>
                    <span className="text-xs text-slate-200 leading-relaxed">
                      Confirm 4 volunteers before Sunday 9 AM
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
