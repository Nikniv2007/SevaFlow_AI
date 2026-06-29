const skills = [
  {
    emoji: "🤖",
    title: "Applied AI & LLM APIs",
    accent: "bg-blue-500",
    items: [
      "System prompt design",
      "Few-shot examples",
      "Structured JSON outputs",
      "Schema validation",
    ],
  },
  {
    emoji: "⚡",
    title: "Functional Web Apps & Tools",
    accent: "bg-indigo-500",
    items: [
      "Next.js App Router",
      "React & TypeScript",
      "Tailwind CSS",
      "Interactive local-first volunteer portal",
      "localStorage persistence",
    ],
  },
  {
    emoji: "🔄",
    title: "Workflow Automation",
    accent: "bg-green-500",
    items: [
      "Converts messy requests into structured tasks",
      "Suggests owner roles",
      "Generates next actions",
      "Assigns priority",
      "Volunteer assignment & switching",
    ],
  },
  {
    emoji: "📊",
    title: "AI Evaluations & Testing",
    accent: "bg-amber-500",
    items: [
      "Evaluation test cases",
      "Pass/fail scoring",
      "Zod validation",
      "Vitest tests",
    ],
  },
  {
    emoji: "✍️",
    title: "Prompt Engineering",
    accent: "bg-violet-500",
    items: [
      "Few-shot examples",
      "Controlled output format",
      "Fallback behavior",
      "Confidence scoring",
    ],
  },
  {
    emoji: "🚀",
    title: "Fast Prototyping",
    accent: "bg-cyan-500",
    items: [
      "Runs fully on localhost",
      "No database required",
      "No API key required",
      "Mock AI classifier",
    ],
  },
  {
    emoji: "🎯",
    title: "Product Scoping",
    accent: "bg-rose-500",
    items: [
      "Real community ops problem → technical workflow",
      "Defines users, use cases, categories",
      "MVP boundary decisions",
    ],
  },
  {
    emoji: "🏗️",
    title: "System Ownership",
    accent: "bg-slate-500",
    items: [
      "Organized file structure",
      "Documentation",
      "Tests",
      "Error handling",
      "Handoff-ready project",
    ],
  },
  {
    emoji: "🌱",
    title: "Adaptability & Mission Alignment",
    accent: "bg-emerald-500",
    items: [
      "Built for community & nonprofit organizations",
      "Temple and volunteer group ready",
      "Public-interest tech focus",
    ],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold uppercase tracking-widest mb-4 border border-slate-200">
            Skills Demonstrated
          </span>
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
            What this project shows.
          </h2>
          <p className="mt-4 text-gray-500 leading-relaxed">
            SevaFlow AI is a working demonstration of the skills needed to build practical AI tools for real-world coordination problems.
          </p>
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((skill) => (
            <div
              key={skill.title}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              {/* Color accent bar */}
              <div className={`h-1 ${skill.accent}`} />

              <div className="p-5">
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="text-2xl">{skill.emoji}</span>
                  <h3 className="font-semibold text-gray-900 text-sm leading-tight">{skill.title}</h3>
                </div>
                <ul className="space-y-1.5">
                  {skill.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-gray-500">
                      <span className="mt-1 w-1 h-1 rounded-full bg-gray-300 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
