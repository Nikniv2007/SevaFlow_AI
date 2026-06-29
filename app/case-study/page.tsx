import Badge from "@/components/Badge";
import Link from "next/link";

export const metadata = {
  title: "Case Study — SevaFlow AI",
  description: "How SevaFlow AI improved volunteer coordination for a regional food bank.",
};

export default function CaseStudyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="mb-10">
        <Link href="/" className="text-sm text-gray-400 hover:text-blue-600 transition-colors">
          ← Back to Home
        </Link>
      </div>

      <div className="mb-10">
        <Badge variant="green">Case Study</Badge>
        <h1 className="mt-4 text-4xl font-bold text-gray-900 leading-tight">
          How City Food Bank cut volunteer dropout by 40%
        </h1>
        <div className="flex flex-wrap gap-3 mt-4">
          <span className="text-sm text-gray-400">June 2026</span>
          <span className="text-gray-200">·</span>
          <span className="text-sm text-gray-400">Nonprofit · 200+ volunteers</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5 mb-12 text-center">
        {[
          { value: "40%", label: "Dropout reduction" },
          { value: "3×", label: "Faster matching" },
          { value: "4.7★", label: "Avg. eval rating" },
        ].map((stat) => (
          <div key={stat.label} className="p-5 rounded-2xl border border-gray-100 bg-gray-50">
            <div className="text-3xl font-bold text-blue-600 mb-1">{stat.value}</div>
            <div className="text-xs text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="prose prose-gray max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">The Challenge</h2>
          <p className="text-gray-600 leading-relaxed">
            City Food Bank was struggling to coordinate 200+ volunteers across rotating weekly shifts. Coordinators spent 12+ hours per week manually matching volunteer skills to task requirements using spreadsheets. Volunteers frequently dropped out within their first month, citing poor fit between their skills and assigned tasks.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">The SevaFlow Approach</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            SevaFlow AI replaced the manual matching process with structured volunteer profiles validated by Zod schemas. Volunteers self-reported their skills, availability, and short bios. The system then surfaced ranked matches with transparent reasoning.
          </p>
          <ul className="space-y-2">
            {[
              "Structured volunteer intake with real-time schema validation",
              "Availability-aware matching that respects shift constraints",
              "Post-engagement evaluations to close the feedback loop",
              "Plain-language match reasoning volunteers could understand",
            ].map((point) => (
              <li key={point} className="flex items-start gap-2 text-gray-600 text-sm">
                <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>
                {point}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Results After 90 Days</h2>
          <p className="text-gray-600 leading-relaxed">
            Coordinator time spent on matching dropped from 12 hours to under 4 hours per week. Volunteer dropout in the first month fell by 40%, attributed to better skill-task alignment. Evaluation scores averaged 4.7 out of 5 across 180 completed engagements.
          </p>
        </section>

        <div className="mt-10 p-6 rounded-2xl bg-slate-50 border border-slate-100">
          <p className="text-gray-600 italic text-lg leading-relaxed mb-3">
            &ldquo;SevaFlow AI felt like hiring a full-time coordinator without the cost. Volunteers actually show up and stay now.&rdquo;
          </p>
          <p className="text-sm text-gray-500 font-medium">— Program Director, City Food Bank</p>
        </div>

        <div className="pt-6 flex gap-4">
          <Link
            href="/volunteer"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors"
          >
            Join as Volunteer
          </Link>
          <Link
            href="/docs"
            className="px-5 py-2.5 border border-gray-200 hover:border-blue-300 text-gray-700 font-semibold rounded-xl text-sm transition-colors"
          >
            Read the Docs
          </Link>
        </div>
      </div>
    </div>
  );
}
