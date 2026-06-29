import Badge from "@/components/Badge";
import Link from "next/link";

export const metadata = {
  title: "Docs — SevaFlow AI",
  description: "Documentation for SevaFlow AI — setup, architecture, and API reference.",
};

const sections = [
  {
    id: "getting-started",
    title: "Getting Started",
    badge: "green" as const,
    items: [
      { title: "Installation", desc: "Clone the repo and run npm install. No database or API key needed." },
      { title: "Running Locally", desc: "Start the dev server with npm run dev. The site opens at http://localhost:3000." },
      { title: "Running Tests", desc: "Execute npm run test to run all Vitest schema tests." },
    ],
  },
  {
    id: "architecture",
    title: "Architecture",
    badge: "blue" as const,
    items: [
      { title: "Local-First Design", desc: "SevaFlow AI runs entirely in the browser and local dev environment — no cloud service dependency." },
      { title: "App Router", desc: "Built on Next.js 15 App Router with TypeScript for type-safe page and API route definitions." },
      { title: "Schema Validation", desc: "All forms and data structures are validated with Zod schemas defined in lib/schemas.ts." },
    ],
  },
  {
    id: "schemas",
    title: "Data Schemas",
    badge: "purple" as const,
    items: [
      { title: "VolunteerSchema", desc: "Validates name, email, skills array, availability enum, and optional bio." },
      { title: "EvalSchema", desc: "Validates taskId, modelResponse, rating (1–5), and optional notes." },
      { title: "ContactSchema", desc: "Validates name, email, optional organization, and message (min 10 chars)." },
    ],
  },
];

export default function DocsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-14">
        <Badge variant="gray">Documentation</Badge>
        <h1 className="mt-4 text-4xl font-bold text-gray-900">SevaFlow AI Docs</h1>
        <p className="mt-4 text-gray-500 max-w-xl mx-auto">
          Everything you need to understand, run, and extend SevaFlow AI locally.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar nav */}
        <aside className="lg:w-48 flex-shrink-0">
          <nav className="sticky top-24 space-y-1">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="block px-3 py-2 text-sm text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
              >
                {s.title}
              </a>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1 space-y-12">
          {sections.map((section) => (
            <section key={section.id} id={section.id}>
              <div className="flex items-center gap-3 mb-6">
                <Badge variant={section.badge}>{section.title}</Badge>
              </div>
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div key={item.title} className="p-5 rounded-xl border border-gray-100 bg-gray-50">
                    <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}

          <section id="env">
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="gray">Environment Variables</Badge>
            </div>
            <div className="rounded-xl border border-gray-200 bg-gray-950 p-5 font-mono text-sm">
              <p className="text-gray-400 mb-2"># .env.example — copy to .env.local</p>
              <p className="text-emerald-400">ANTHROPIC_API_KEY=<span className="text-gray-500">{"# optional — for AI features"}</span></p>
              <p className="text-emerald-400">OPENAI_API_KEY=<span className="text-gray-500">{"# optional — for AI features"}</span></p>
            </div>
            <p className="mt-3 text-sm text-gray-400">
              All API keys are optional. The site runs fully without them.
            </p>
          </section>

          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <h3 className="font-semibold text-blue-900 mb-1">Need help?</h3>
            <p className="text-sm text-blue-700 mb-3">
              Check the README for quick-start instructions or explore the source schemas.
            </p>
            <Link
              href="/case-study"
              className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
              Read the Case Study →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
