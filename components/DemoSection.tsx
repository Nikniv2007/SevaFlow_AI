import Link from "next/link";
import InteractiveDemo from "./InteractiveDemo";

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
        </div>

        {/* Demo */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <InteractiveDemo />
        </div>

        {/* Link to full page */}
        <div className="mt-5 text-center">
          <Link
            href="/demo"
            className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
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
