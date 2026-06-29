import Link from "next/link";
import InteractiveDemo from "./InteractiveDemo";

const PIPELINE = [
  { step: "Input", desc: "Any message format" },
  { step: "Classify", desc: "Keyword engine" },
  { step: "Validate", desc: "Zod schema" },
  { step: "Output", desc: "Structured JSON" },
];

export default function DemoSection() {
  return (
    <section id="demo" className="py-24 px-4 bg-slate-50">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold uppercase tracking-widest mb-4 border border-blue-100">
            Live Demo
          </span>
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
            Try it yourself.
          </h2>
          <p className="mt-3 text-gray-500 text-lg leading-relaxed max-w-xl mx-auto">
            Convert a real community message into structured output — right here, no API key needed.
          </p>

          {/* Mini pipeline */}
          <div className="mt-6 inline-flex items-center gap-1 bg-white border border-gray-100 rounded-full px-4 py-2 shadow-sm">
            {PIPELINE.map((p, i) => (
              <div key={p.step} className="flex items-center gap-1">
                <span className="text-xs font-semibold text-gray-700">{p.step}</span>
                <span className="text-[10px] text-gray-400 hidden sm:inline">({p.desc})</span>
                {i < PIPELINE.length - 1 && (
                  <svg className="w-3 h-3 text-gray-300 mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Demo card with subtle glow */}
        <div className="relative">
          <div className="absolute -inset-3 bg-blue-500/5 rounded-3xl blur-xl pointer-events-none" />
          <div className="relative bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
            <InteractiveDemo />
          </div>
        </div>

        {/* Footer row */}
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400 text-center sm:text-left">
            Mock mode · Keyword classifier · Validated with Zod · Zero network requests
          </p>
          <Link
            href="/demo"
            className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors shrink-0"
          >
            Open full demo page
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}
