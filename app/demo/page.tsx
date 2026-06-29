import Badge from "@/components/Badge";
import Link from "next/link";

export const metadata = {
  title: "Demo — SevaFlow AI",
  description: "See SevaFlow AI in action with a live walkthrough.",
};

export default function DemoPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <Badge variant="blue">Interactive Demo</Badge>
        <h1 className="mt-4 text-4xl font-bold text-gray-900">
          See SevaFlow AI in Action
        </h1>
        <p className="mt-4 text-gray-500 max-w-xl mx-auto">
          Walk through a complete volunteer coordination workflow — from profile creation to match and evaluation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {[
          {
            step: "Step 1",
            title: "Volunteer Submits Profile",
            desc: "A volunteer fills out their skill profile. Zod validates the data in real time before submission.",
            badge: "blue" as const,
            status: "Coming Soon",
          },
          {
            step: "Step 2",
            title: "Nonprofit Posts Need",
            desc: "An organization describes what kind of skilled help they need and when.",
            badge: "green" as const,
            status: "Coming Soon",
          },
          {
            step: "Step 3",
            title: "AI Generates Match",
            desc: "SevaFlow AI scores compatibility and explains the reasoning behind every recommendation.",
            badge: "purple" as const,
            status: "Coming Soon",
          },
          {
            step: "Step 4",
            title: "Post-Engagement Eval",
            desc: "Both parties complete a structured evaluation that improves future matching quality.",
            badge: "gray" as const,
            status: "Coming Soon",
          },
        ].map((item) => (
          <div
            key={item.step}
            className="p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <Badge variant={item.badge}>{item.step}</Badge>
              <span className="text-xs text-gray-400 font-medium">{item.status}</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-16 text-center">
        <div className="text-4xl mb-4">🎬</div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Interactive demo coming soon</h2>
        <p className="text-gray-400 text-sm mb-6">
          This section will contain a fully interactive walkthrough of the SevaFlow AI workflow.
        </p>
        <Link
          href="/volunteer"
          className="inline-flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors text-sm"
        >
          Try the Volunteer Portal →
        </Link>
      </div>
    </div>
  );
}
