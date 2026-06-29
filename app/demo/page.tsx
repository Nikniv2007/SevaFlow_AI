import InteractiveDemo from "@/components/InteractiveDemo";

export const metadata = {
  title: "AI Request Classifier Demo — SevaFlow AI",
  description:
    "Try converting an informal community message into structured JSON using SevaFlow AI. No API key required.",
};

const HOW_IT_WORKS = [
  {
    icon: "✍️",
    title: "Type or paste a request",
    desc: "Any informal message — WhatsApp text, SMS, or a hallway note.",
  },
  {
    icon: "⚡",
    title: "AI classifies it instantly",
    desc: "The mock classifier matches keywords and extracts priority, category, and next action.",
  },
  {
    icon: "📋",
    title: "Structured JSON output",
    desc: "Every result is validated by a Zod schema before being displayed.",
  },
];

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Page header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold uppercase tracking-widest mb-5 border border-blue-100">
            Interactive Demo
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            AI Request Classifier Demo
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
            Try converting an informal community message into structured JSON. No API key required — works entirely on localhost.
          </p>

          {/* How it works strip */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.title} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-xl shrink-0">{item.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-0.5">{item.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Demo */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <InteractiveDemo />
        </div>

        {/* Footer note */}
        <p className="mt-6 text-center text-xs text-gray-400">
          Running in mock mode · Keyword-based classifier · Validated with Zod · Zero network requests
        </p>
      </div>

    </div>
  );
}
