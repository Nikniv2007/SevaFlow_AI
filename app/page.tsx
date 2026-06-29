import Link from "next/link";
import Badge from "@/components/Badge";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-slate-50 to-white px-4 py-24 sm:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="blue">Local-First · No Database Required</Badge>
          <h1 className="mt-6 text-5xl sm:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
            AI-Powered Volunteer{" "}
            <span className="text-blue-600">Coordination</span>
          </h1>
          <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            SevaFlow AI connects skilled volunteers with nonprofits using intelligent matching, evaluation tools, and structured workflows — all running locally without a cloud dependency.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demo"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-md shadow-blue-200"
            >
              View Live Demo
            </Link>
            <Link
              href="/volunteer"
              className="px-6 py-3 border border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700 font-semibold rounded-xl transition-colors"
            >
              Volunteer Portal
            </Link>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section id="problem" className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <Badge variant="purple">The Problem</Badge>
            <h2 className="mt-4 text-3xl font-bold text-gray-900">
              Volunteer coordination is broken
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">
              Nonprofits spend more time managing spreadsheets than doing good. Volunteers show up without the right skills at the wrong time.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "📋",
                title: "Manual Matching",
                desc: "Hours spent manually pairing volunteer skills to organizational needs — with no guarantee of fit.",
              },
              {
                icon: "📉",
                title: "High Dropout Rates",
                desc: "Mismatched expectations lead to early volunteer dropout, wasting everyone's time and energy.",
              },
              {
                icon: "🔍",
                title: "No Evaluation Loop",
                desc: "No structured way to measure volunteer effectiveness or improve coordination over time.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <Badge variant="green">How It Works</Badge>
            <h2 className="mt-4 text-3xl font-bold text-gray-900">
              Three steps to better coordination
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Profile Volunteers",
                desc: "Volunteers submit structured skill profiles. Zod schemas validate and normalize the data automatically.",
              },
              {
                step: "02",
                title: "AI Matching",
                desc: "SevaFlow AI analyzes nonprofit needs and volunteer profiles to surface the best fit — ranked and explained.",
              },
              {
                step: "03",
                title: "Evaluate & Improve",
                desc: "Post-engagement evaluations feed back into the system, improving future matches over time.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <Badge variant="gray">Skills Coverage</Badge>
          <h2 className="mt-4 text-3xl font-bold text-gray-900 mb-10">
            Matching across every domain
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              "Web Development", "Data Analysis", "Graphic Design",
              "Grant Writing", "Fundraising", "Legal Aid",
              "Healthcare", "Education", "Social Work",
              "Marketing", "Photography", "Translation",
              "Event Planning", "Accounting", "HR & Recruiting",
            ].map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 rounded-full border border-gray-200 bg-gray-50 text-sm text-gray-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-blue-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to streamline your volunteer program?
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Get started in minutes — no database, no API key, no cloud required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/volunteer"
              className="px-6 py-3 bg-white hover:bg-blue-50 text-blue-700 font-semibold rounded-xl transition-colors shadow-md"
            >
              Join as Volunteer
            </Link>
            <Link
              href="/docs"
              className="px-6 py-3 border border-blue-400 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
            >
              Read the Docs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
