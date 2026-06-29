import Link from "next/link";

export const metadata = {
  title: "Documentation — SevaFlow AI",
  description:
    "Full documentation for SevaFlow AI — project overview, AI workflow, classifier schema, volunteer portal, evaluations, and local setup.",
};

const NAV = [
  { id: "overview",            label: "Project Overview" },
  { id: "problem",             label: "Problem Statement" },
  { id: "target-users",        label: "Target Users" },
  { id: "ai-workflow",         label: "AI Workflow" },
  { id: "classifier-schema",   label: "Classifier Schema" },
  { id: "volunteer-workflow",  label: "Volunteer Workflow" },
  { id: "evaluation-approach", label: "Evaluation Approach" },
  { id: "local-setup",         label: "Local Setup" },
  { id: "future",              label: "Future Improvements" },
];

function SectionHeading({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-baseline gap-3 mb-6">
      <span className="font-mono text-xs text-gray-400 shrink-0">{num}</span>
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
    </div>
  );
}

function CodeBlock({ children, lang = "bash" }: { children: React.ReactNode; lang?: string }) {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-950 overflow-hidden">
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-gray-800">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
        <span className="ml-2 text-xs text-gray-500 font-mono">{lang}</span>
      </div>
      <pre className="p-5 overflow-x-auto">
        <code className="font-mono text-sm text-gray-300 leading-relaxed">{children}</code>
      </pre>
    </div>
  );
}

const WORKFLOW_STEPS = [
  { label: "Input Message",        desc: "WhatsApp, SMS, in-person, email — any format" },
  { label: "System Prompt",        desc: "Few-shot examples + structured JSON instructions" },
  { label: "Mock / LLM Classifier",desc: "Keyword engine or LLM API call" },
  { label: "Zod Validation",       desc: "ClassifierOutputSchema.safeParse()" },
  { label: "Structured JSON",      desc: "Category, priority, next action, deadline" },
  { label: "Actionable Task",      desc: "Routed to the correct owner role" },
];

const TARGET_USERS = [
  { role: "Temple / Community Organizers", desc: "Coordinate recurring events, manage seva assignments, and route community requests." },
  { role: "Nonprofit Teams",               desc: "Structure informal intake from WhatsApp groups and community channels." },
  { role: "Volunteer Coordinators",        desc: "Manage open roles, track spot counts, and communicate with volunteers." },
  { role: "Event Leads",                   desc: "Oversee logistics, equipment, and day-of operational tasks." },
  { role: "Technical Volunteers",          desc: "Support QR codes, digital forms, and attendee-facing tech at events." },
];

const FUTURE_ITEMS = [
  "Optional real LLM integration (Anthropic / OpenAI) via environment variable",
  "Real database (PostgreSQL or Supabase) to persist assignments across sessions",
  "Admin coordinator view with full request history and assignment overview",
  "Email / SMS notifications for volunteers on signup or assignment change",
  "Multi-event support with per-event role definitions and schedules",
  "Volunteer reminder system — automated messages before each event",
  "Export reports — CSV or PDF summary of assignments and eval results",
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Page header ── */}
      <header className="bg-slate-900 text-white py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full border border-slate-600 bg-slate-800 text-slate-300 text-xs font-semibold uppercase tracking-widest mb-5">
            Documentation
          </span>
          <h1 className="text-4xl font-bold mb-3">SevaFlow AI Docs</h1>
          <p className="text-slate-400 max-w-xl leading-relaxed">
            Everything you need to understand, run, and extend SevaFlow AI — from the AI
            workflow to the volunteer portal to the evaluation system.
          </p>
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
                  href="/case-study"
                  className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  Case Study →
                </Link>
              </div>
            </nav>
          </aside>

          {/* Content */}
          <main className="flex-1 min-w-0 space-y-16">

            {/* 01 Project Overview */}
            <section id="overview" className="scroll-mt-24">
              <SectionHeading num="01" title="Project Overview" />
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  SevaFlow AI is a local-first AI product website that turns informal community
                  requests into structured, actionable tasks. It demonstrates how AI can help
                  community and temple organizations manage volunteer coordination, event logistics,
                  and follow-ups — without requiring a database, login system, or API key.
                </p>
                <p>
                  The project is fully open and runs entirely in the browser and local dev
                  environment. It combines a live AI classifier demo, an interactive volunteer
                  assignment portal, and a repeatable evaluation system — all built with Next.js,
                  TypeScript, Tailwind CSS v4, and Zod.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {["Next.js", "TypeScript", "Tailwind v4", "Zod", "Vitest", "localStorage"].map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* 02 Problem Statement */}
            <section id="problem" className="scroll-mt-24">
              <SectionHeading num="02" title="Problem Statement" />
              <p className="text-gray-600 leading-relaxed mb-5">
                Community and temple organizations coordinate hundreds of volunteers and service
                requests using informal channels. The result is constant operational friction:
              </p>
              <ul className="space-y-3">
                {[
                  { title: "Scattered messages", desc: "Requests arrive over WhatsApp, SMS, phone calls, and in-person — with no central record." },
                  { title: "Lost follow-ups", desc: "Action items buried in group chats go unassigned. Coordinators spend hours each week chasing updates." },
                  { title: "Manual volunteer coordination", desc: "Matching volunteers to roles is done by hand, with no visibility into who is available or qualified." },
                  { title: "No structure", desc: "Without a shared format, requests cannot be prioritized, tracked, or handed off reliably." },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-100">
                    <svg className="w-4 h-4 text-red-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <span className="font-semibold text-gray-800 text-sm">{item.title} — </span>
                      <span className="text-gray-600 text-sm">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* 03 Target Users */}
            <section id="target-users" className="scroll-mt-24">
              <SectionHeading num="03" title="Target Users" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {TARGET_USERS.map((u) => (
                  <div key={u.role} className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                      <p className="text-sm font-semibold text-gray-900">{u.role}</p>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed pl-3.5">{u.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 04 AI Workflow */}
            <section id="ai-workflow" className="scroll-mt-24">
              <SectionHeading num="04" title="AI Workflow" />
              <p className="text-gray-600 leading-relaxed mb-6">
                Each community request passes through a six-stage pipeline before becoming a
                structured task. The classifier runs in mock mode by default — no API key needed.
              </p>
              <div className="overflow-x-auto pb-2">
                <div className="flex items-stretch gap-2 min-w-max">
                  {WORKFLOW_STEPS.map((step, i) => (
                    <div key={step.label} className="flex items-center gap-2">
                      <div className="w-36 rounded-xl border border-gray-200 bg-gray-50 p-3">
                        <div className="font-mono text-[10px] text-gray-400 mb-1">
                          0{i + 1}
                        </div>
                        <div className="text-sm font-semibold text-gray-900 leading-tight mb-1">
                          {step.label}
                        </div>
                        <div className="text-[11px] text-gray-500 leading-relaxed">
                          {step.desc}
                        </div>
                      </div>
                      {i < WORKFLOW_STEPS.length - 1 && (
                        <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <p className="mt-4 text-xs text-gray-400">
                Scroll right to see the full pipeline. Try it live on the{" "}
                <Link href="/demo" className="text-blue-500 hover:text-blue-700 underline underline-offset-2">
                  Demo page
                </Link>
                .
              </p>
            </section>

            {/* 05 Classifier Schema */}
            <section id="classifier-schema" className="scroll-mt-24">
              <SectionHeading num="05" title="Classifier Schema" />
              <p className="text-gray-600 leading-relaxed mb-5">
                Every classifier response is validated against{" "}
                <code className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">
                  ClassifierOutputSchema
                </code>{" "}
                before being returned to the UI. Invalid responses are rejected before reaching the user.
              </p>
              <CodeBlock lang="typescript">{`// lib/schemas.ts — ClassifierOutput
{
  category:
    | "Volunteer Scheduling"  // volunteer shifts, help needed
    | "Feedback"              // complaints, suggestions, improvements
    | "Event Logistics"       // chairs, parking, hall, equipment
    | "Communication"         // WhatsApp, announcements, reminders
    | "Follow Up"             // call back, check with, reach out
    | "Technical Help"        // links, QR codes, forms, broken
    | "Donation Support"      // receipts, invoices, contributions
    | "Other";                // no keywords matched

  priority:   "Low" | "Medium" | "High";
  summary:    string;             // ≤ 90 characters
  suggested_owner_role: string;   // e.g. "Volunteer Coordinator"
  next_action: string;            // e.g. "Assign volunteer slots"
  deadline:   string | null;      // e.g. "Before 9 AM" or null
  confidence: number;             // 0.0 – 1.0
  originalDescription: string;    // the raw input text
}`}</CodeBlock>
              <p className="mt-3 text-xs text-gray-400">
                Defined in{" "}
                <code className="font-mono bg-gray-100 px-1 py-0.5 rounded">lib/schemas.ts</code>
                {" "}· Validated in{" "}
                <code className="font-mono bg-gray-100 px-1 py-0.5 rounded">lib/evals/run-evals.ts</code>
              </p>
            </section>

            {/* 06 Volunteer Assignment Workflow */}
            <section id="volunteer-workflow" className="scroll-mt-24">
              <SectionHeading num="06" title="Volunteer Assignment Workflow" />
              <p className="text-gray-600 leading-relaxed mb-6">
                The volunteer portal is a fully self-service, local-first assignment system.
                All state persists in{" "}
                <code className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">
                  localStorage
                </code>{" "}
                — no login or backend required.
              </p>
              <ol className="space-y-4">
                {[
                  { step: "Browse open roles",       desc: "View all seva assignments with real-time spot counts and skill level badges." },
                  { step: "Select assignment",        desc: 'Click "Select Assignment" on any open role. Full roles are disabled automatically.' },
                  { step: "Sign up",                  desc: "Enter your name, contact info, and an optional note for the coordinator." },
                  { step: "View current assignment",  desc: "Your confirmed role is persisted locally and shown on every return visit." },
                  { step: "Change assignment",        desc: "Switch to any other open role. The old spot is released and the new one is filled atomically." },
                  { step: "Release spot",             desc: "Free your spot for another volunteer with an inline confirmation step." },
                  { step: "Dynamic spot counts",      desc: "Open spots update in real time as volunteers sign up, change, or release assignments." },
                ].map((item, i) => (
                  <li key={item.step} className="flex items-start gap-4">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-0.5">{item.step}</p>
                      <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* 07 Evaluation Approach */}
            <section id="evaluation-approach" className="scroll-mt-24">
              <SectionHeading num="07" title="Evaluation Approach" />
              <p className="text-gray-600 leading-relaxed mb-5">
                The evaluation system provides a repeatable, automated way to test the classifier.
                It lives in{" "}
                <code className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">
                  lib/evals/
                </code>{" "}
                and runs server-side on every page load at{" "}
                <Link href="/evals" className="text-blue-600 hover:text-blue-800 underline underline-offset-2">
                  /evals
                </Link>
                .
              </p>
              <div className="space-y-3">
                {[
                  { title: "10 predefined test cases",       desc: "Hand-labelled inputs covering all 8 classifier categories, crafted against the keyword table." },
                  { title: "Expected vs actual category",    desc: "Exact string comparison — e.g. \"Volunteer Scheduling\" must match exactly." },
                  { title: "Expected vs actual priority",    desc: "Low, Medium, or High — derived from keyword matching and the urgency field." },
                  { title: "Zod schema validation",          desc: "ClassifierOutputSchema.safeParse() must return success: true. A schema failure auto-fails all checks." },
                  { title: "Pass / fail scoring",            desc: "A result is Pass only when all three hold: schema valid, category match, priority match." },
                  { title: "Aggregate metrics",              desc: "Total, passed, failed, pass rate %, and allSchemaValid reported in the EvalSummary." },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50">
                    <svg className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-0.5">{item.title}</p>
                      <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 08 Local Setup */}
            <section id="local-setup" className="scroll-mt-24">
              <SectionHeading num="08" title="Local Setup" />
              <p className="text-gray-600 leading-relaxed mb-6">
                No database, no API key, and no environment configuration required to get started.
                Clone the repo and run three commands.
              </p>
              <div className="space-y-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
                    1 — Install dependencies
                  </p>
                  <CodeBlock lang="bash">npm install</CodeBlock>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
                    2 — Start the development server
                  </p>
                  <CodeBlock lang="bash">{`npm run dev\n# → http://localhost:3000`}</CodeBlock>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
                    3 — Run the test suite
                  </p>
                  <CodeBlock lang="bash">{`npm run test\n# → vitest — 60 tests passing`}</CodeBlock>
                </div>
              </div>
              <div className="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-100">
                <p className="text-sm text-blue-700">
                  <span className="font-semibold">Optional:</span> Add{" "}
                  <code className="font-mono text-xs bg-blue-100 px-1 py-0.5 rounded">
                    ANTHROPIC_API_KEY
                  </code>{" "}
                  to{" "}
                  <code className="font-mono text-xs bg-blue-100 px-1 py-0.5 rounded">
                    .env.local
                  </code>{" "}
                  to switch from mock mode to a real LLM. The site runs fully without it.
                </p>
              </div>
            </section>

            {/* 09 Future Improvements */}
            <section id="future" className="scroll-mt-24">
              <SectionHeading num="09" title="Future Improvements" />
              <p className="text-gray-600 leading-relaxed mb-5">
                SevaFlow AI is a working MVP. These are the highest-value next steps:
              </p>
              <ul className="space-y-2.5">
                {FUTURE_ITEMS.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Footer CTA */}
            <div className="rounded-2xl border border-gray-100 bg-slate-50 p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-gray-900 mb-1">Want the full product story?</p>
                <p className="text-sm text-gray-500">
                  Read how the system was designed, what decisions were made, and what comes next.
                </p>
              </div>
              <Link
                href="/case-study"
                className="shrink-0 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-sm transition-colors"
              >
                Read the Case Study →
              </Link>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
