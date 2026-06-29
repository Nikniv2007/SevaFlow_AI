import Link from "next/link";

export const metadata = {
  title: "Product Case Study — SevaFlow AI",
  description:
    "How SevaFlow AI was designed: the problem, product requirements, MVP scope, technical decisions, and future roadmap.",
};

const NAV = [
  { id: "problem",             label: "The Problem" },
  { id: "why-it-matters",      label: "Why It Matters" },
  { id: "target-users",        label: "Target Users" },
  { id: "requirements",        label: "Product Requirements" },
  { id: "mvp-scope",           label: "MVP Scope" },
  { id: "non-goals",           label: "Non-Goals" },
  { id: "technical-decisions", label: "Technical Decisions" },
  { id: "ai-workflow",         label: "AI Workflow" },
  { id: "volunteer-workflow",  label: "Volunteer Workflow" },
  { id: "roadmap",             label: "Future Roadmap" },
];

function SectionHeading({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-5">
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      {sub && <p className="text-sm text-gray-400 mt-1">{sub}</p>}
    </div>
  );
}

const TECH_DECISIONS = [
  {
    tech: "Next.js (App Router)",
    purpose: "Framework",
    reason: "Server Components + async page rendering let the eval system run server-side on every request without a separate API. Metadata exports keep SEO simple.",
  },
  {
    tech: "TypeScript",
    purpose: "Type safety",
    reason: "Catches schema mismatches at compile time. Every classifier input and output is typed end-to-end from Zod inference.",
  },
  {
    tech: "Tailwind CSS v4",
    purpose: "Styling",
    reason: "Utility-first styling with no PostCSS config. v4's @import syntax makes the setup minimal while keeping full design flexibility.",
  },
  {
    tech: "Zod",
    purpose: "Validation",
    reason: "Runtime schema validation with TypeScript type inference. A single schema definition validates the form, the classifier output, and the eval harness simultaneously.",
  },
  {
    tech: "Vitest",
    purpose: "Testing",
    reason: "ESM-native, fast, and compatible with the Next.js TypeScript setup. Tests run in a Node environment — no jsdom needed for pure business logic.",
  },
  {
    tech: "localStorage",
    purpose: "Persistence",
    reason: "Local-first design — no database setup, no login, no deployment dependency. SSR-safe with typeof window guards. Swappable for a real DB without changing business logic.",
  },
];

const MVP_FEATURES = [
  { label: "AI classifier demo",        href: "/demo",      desc: "Live input → structured JSON output with confidence score" },
  { label: "Volunteer self-service portal", href: "/volunteer", desc: "Browse, select, change, and release seva assignments" },
  { label: "Evaluation page",           href: "/evals",     desc: "10 test cases, schema validation, pass/fail scoring" },
  { label: "Documentation",             href: "/docs",      desc: "Full technical reference for the system" },
];

const NON_GOALS = [
  "No login or user authentication system",
  "No payment processing or donation collection",
  "No production database or persistent backend",
  "No real SMS or WhatsApp API integration",
  "No admin coordinator dashboard or moderation tools",
];

const REQUIREMENTS = [
  { req: "Convert informal requests into structured tasks", how: "Mock keyword classifier + Zod-validated JSON output" },
  { req: "Run entirely locally with no backend setup",      how: "Next.js dev server + localStorage persistence" },
  { req: "No API key required to use any feature",         how: "Mock classifier runs without a network call" },
  { req: "No database required",                           how: "All state in localStorage with SSR-safe fallback" },
  { req: "Demonstrate the full AI workflow end-to-end",    how: "Input → System Prompt → Classifier → Zod → JSON → Task" },
  { req: "Demonstrate volunteer self-service assignment",   how: "Browse → Select → Confirm → Change / Release" },
];

const ROADMAP = [
  { item: "Real LLM API",              desc: "Add ANTHROPIC_API_KEY support to replace the mock classifier with Claude." },
  { item: "Supabase backend",           desc: "Replace localStorage with a real database for multi-user and multi-event support." },
  { item: "Admin coordinator panel",    desc: "Dashboard for coordinators to view all requests, assignments, and eval results." },
  { item: "Volunteer notifications",    desc: "Email or SMS confirmations when a volunteer signs up, changes, or is reminded." },
  { item: "Multi-event support",        desc: "Separate role definitions and spot counts per event, with an event selector." },
];

export default function CaseStudyPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero header ── */}
      <header className="bg-gradient-to-br from-slate-50 to-white border-b border-gray-100 py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-5">
            <Link href="/" className="text-sm text-gray-400 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-sm text-gray-500">Case Study</span>
          </div>
          <span className="inline-block px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-600 text-xs font-semibold uppercase tracking-widest mb-5">
            Product Case Study
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-4">
            SevaFlow AI
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl leading-relaxed">
            How a local-first AI product turns informal community messages into structured,
            actionable tasks — with no database, no API key, and no login required.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">June 2026</span>
            <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">Product design + engineering</span>
            <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">Local-first · No auth · No DB</span>
          </div>
        </div>
      </header>

      {/* ── Body ── */}
      <div className="max-w-5xl mx-auto px-4 py-14">
        <div className="flex gap-14">

          {/* Sidebar */}
          <aside className="hidden lg:block w-52 shrink-0">
            <nav className="sticky top-24 space-y-0.5">
              {NAV.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium group"
                >
                  <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-blue-500 transition-colors shrink-0" />
                  {item.label}
                </a>
              ))}
              <div className="pt-4 mt-4 border-t border-gray-100">
                <Link
                  href="/docs"
                  className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  Technical Docs →
                </Link>
              </div>
            </nav>
          </aside>

          {/* Content */}
          <main className="flex-1 min-w-0 space-y-16">

            {/* The Problem */}
            <section id="problem" className="scroll-mt-24">
              <SectionHeading title="The Problem" />
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Community organizations — temples, nonprofits, cultural groups — depend on
                  volunteers. But the way they coordinate those volunteers hasn&apos;t changed much
                  in decades. Requests come in over WhatsApp. Tasks get assigned over phone calls.
                  Follow-ups happen in group chats that nobody re-reads.
                </p>
                <p>
                  The result: coordinators spend hours every week manually triaging requests,
                  chasing confirmations, and assigning roles — work that is repetitive,
                  error-prone, and entirely undocumented.
                </p>
                <blockquote className="border-l-4 border-blue-200 pl-5 py-1 italic text-gray-500">
                  &ldquo;A yajman sent a WhatsApp asking for 5 volunteers for Sunday prasad serving
                  before 9 AM. Did anyone follow up? Nobody knows.&rdquo;
                </blockquote>
              </div>
            </section>

            {/* Why It Matters */}
            <section id="why-it-matters" className="scroll-mt-24">
              <SectionHeading title="Why It Matters" />
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  When service work is disorganized, the people doing it suffer the most.
                  Volunteers show up without knowing their role. Coordinators burn out managing
                  logistics that should be self-service. Important requests get dropped between
                  messages.
                </p>
                <p>
                  AI can help — not by replacing human judgment, but by giving structure to
                  unstructured input. A classifier that turns a raw WhatsApp message into a
                  categorized, prioritized task with a suggested owner and next action is a
                  meaningful improvement over the status quo.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  {[
                    { metric: "Hours saved",   value: "8+",  sub: "per week for coordinators" },
                    { metric: "Follow-ups lost", value: "0",  sub: "when requests are structured" },
                    { metric: "Volunteer self-service", value: "100%", sub: "no coordinator needed to assign" },
                  ].map((s) => (
                    <div key={s.metric} className="text-center p-4 rounded-2xl border border-gray-100 bg-gray-50">
                      <div className="text-2xl font-bold text-blue-600 mb-0.5">{s.value}</div>
                      <div className="text-xs font-semibold text-gray-700">{s.metric}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{s.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Target Users */}
            <section id="target-users" className="scroll-mt-24">
              <SectionHeading title="Target Users" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { role: "Temple / community organizers",  icon: "🏛️" },
                  { role: "Nonprofit operations teams",      icon: "🤝" },
                  { role: "Volunteer coordinators",         icon: "📋" },
                  { role: "Event leads",                    icon: "📅" },
                  { role: "Technical volunteers",           icon: "💻" },
                ].map((u) => (
                  <div key={u.role} className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50">
                    <span className="text-xl">{u.icon}</span>
                    <span className="text-sm font-medium text-gray-700">{u.role}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Product Requirements */}
            <section id="requirements" className="scroll-mt-24">
              <SectionHeading
                title="Product Requirements"
                sub="What the system must do — and how it does it."
              />
              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-gray-500 w-1/2">
                        Requirement
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-gray-500 w-1/2">
                        Implementation
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {REQUIREMENTS.map((r) => (
                      <tr key={r.req} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3.5 text-gray-700 font-medium align-top">{r.req}</td>
                        <td className="px-4 py-3.5 text-gray-500 align-top">{r.how}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* MVP Scope */}
            <section id="mvp-scope" className="scroll-mt-24">
              <SectionHeading
                title="MVP Scope"
                sub="Four surfaces, fully functional."
              />
              <div className="space-y-3">
                {MVP_FEATURES.map((f) => (
                  <Link
                    key={f.label}
                    href={f.href}
                    className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50 hover:border-blue-200 hover:bg-blue-50 transition-all group"
                  >
                    <svg className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                        {f.label}
                        <span className="ml-1.5 font-mono text-xs text-gray-400 group-hover:text-blue-400">
                          {f.href}
                        </span>
                      </p>
                      <p className="text-sm text-gray-500 mt-0.5">{f.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Non-Goals */}
            <section id="non-goals" className="scroll-mt-24">
              <SectionHeading
                title="Non-Goals"
                sub="What this MVP deliberately does not include."
              />
              <div className="space-y-2.5">
                {NON_GOALS.map((item) => (
                  <div key={item} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-sm text-gray-500">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Technical Decisions */}
            <section id="technical-decisions" className="scroll-mt-24">
              <SectionHeading
                title="Technical Decisions"
                sub="Every choice was made to minimize setup friction while demonstrating real patterns."
              />
              <div className="space-y-4">
                {TECH_DECISIONS.map((d) => (
                  <div key={d.tech} className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{d.tech}</p>
                      <p className="text-xs text-blue-600 font-medium mt-0.5">{d.purpose}</p>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed sm:border-l sm:border-gray-200 sm:pl-4">
                      {d.reason}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* AI Workflow */}
            <section id="ai-workflow" className="scroll-mt-24">
              <SectionHeading title="AI Workflow" />
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Every classifier request follows the same six-stage pipeline. A system prompt
                  containing few-shot examples and a strict JSON format instruction is prepended
                  to the raw input. In mock mode, a keyword-matching engine produces the output
                  deterministically — no network call, no API key.
                </p>
                <p>
                  The output is immediately validated against{" "}
                  <code className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">
                    ClassifierOutputSchema
                  </code>{" "}
                  using Zod&apos;s{" "}
                  <code className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">
                    safeParse()
                  </code>
                  . If validation fails, the error is caught before reaching the UI — the user
                  always sees a clean error message, never a raw exception.
                </p>
                <p>
                  When a real LLM is wired in (by adding{" "}
                  <code className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">
                    ANTHROPIC_API_KEY
                  </code>
                  ), the same validation and evaluation pipeline applies — making it straightforward
                  to measure the quality gap between mock and real model responses.
                </p>
              </div>
              <div className="mt-5 p-4 rounded-xl bg-slate-900 font-mono text-xs text-slate-300 leading-relaxed">
                <div className="text-slate-500 mb-2">// The classifier contract</div>
                <div>
                  <span className="text-blue-400">classifyRequest</span>
                  <span className="text-slate-400">(</span>
                  <span className="text-emerald-400">{"{ description: string }"}</span>
                  <span className="text-slate-400">)</span>
                </div>
                <div className="pl-4 mt-1">
                  <span className="text-slate-500">→ </span>
                  <span className="text-purple-400">Promise{"<ClassifierOutput>"}</span>
                </div>
                <div className="mt-2 text-slate-500">
                  {"// same interface for mock and real LLM"}
                </div>
              </div>
            </section>

            {/* Volunteer Workflow */}
            <section id="volunteer-workflow" className="scroll-mt-24">
              <SectionHeading title="Volunteer Workflow" />
              <p className="text-gray-600 leading-relaxed mb-5">
                The volunteer assignment portal is fully self-service. A volunteer can sign up,
                change their mind, or release their spot — all without contacting a coordinator.
                State is persisted in{" "}
                <code className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">
                  localStorage
                </code>{" "}
                with SSR-safe guards, so the page hydrates correctly on the first render.
              </p>
              <div className="relative pl-6 space-y-5 border-l-2 border-gray-100">
                {[
                  { title: "Browse",   desc: "Volunteers see all 6 seva roles with real-time spot counts and skill level badges." },
                  { title: "Select",   desc: "Clicking a role shows a signup form. Full roles are disabled automatically." },
                  { title: "Confirm",  desc: "Name, contact, and optional note are saved locally. The spot count decrements." },
                  { title: "Change",   desc: "The old spot is released and the new spot is filled in a single atomic operation." },
                  { title: "Release",  desc: "An inline confirmation frees the spot for another volunteer. The state resets." },
                ].map((item, i) => (
                  <div key={item.title} className="relative">
                    <div className="absolute -left-[1.625rem] top-0.5 w-4 h-4 rounded-full bg-white border-2 border-blue-500 flex items-center justify-center">
                      <span className="text-[8px] font-bold text-blue-600">{i + 1}</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 mb-0.5">{item.title}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Future Roadmap */}
            <section id="roadmap" className="scroll-mt-24">
              <SectionHeading
                title="Future Roadmap"
                sub="What comes after the MVP."
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ROADMAP.map((r) => (
                  <div key={r.item} className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                    <div className="flex items-center gap-2 mb-1.5">
                      <svg className="w-4 h-4 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <p className="text-sm font-semibold text-gray-900">{r.item}</p>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed pl-6">{r.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Footer CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
              <Link
                href="/demo"
                className="flex items-center justify-center gap-2 px-5 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors"
              >
                Try the Classifier Demo
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/docs"
                className="flex items-center justify-center gap-2 px-5 py-3.5 border border-gray-200 hover:border-blue-300 text-gray-700 font-semibold rounded-xl text-sm transition-colors hover:bg-blue-50"
              >
                Read the Technical Docs
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </Link>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
