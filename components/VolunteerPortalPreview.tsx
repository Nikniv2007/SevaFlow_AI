import Link from "next/link";

const cards = [
  {
    icon: "🙋",
    title: "Pick an open role",
    desc: "Browse available seva roles and sign up for a shift that fits your schedule and skills.",
  },
  {
    icon: "📋",
    title: "View your assignment",
    desc: "See your current seva role, shift time, location, and what's expected of you — all in one place.",
  },
  {
    icon: "🔄",
    title: "Change if needed",
    desc: "Life happens. Release your spot and switch to another available role without hassle or back-and-forth.",
  },
];

export default function VolunteerPortalPreview() {
  return (
    <section className="py-24 px-4 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 text-white relative overflow-hidden">
      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_120%,rgba(99,102,241,0.3),transparent)]" />

      <div className="relative max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1.5 rounded-full border border-white/20 bg-white/10 text-white/80 text-xs font-semibold uppercase tracking-widest mb-5">
            Volunteer Portal
          </span>
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Volunteer self-service assignments.
          </h2>
          <p className="text-blue-100 text-lg max-w-xl mx-auto leading-relaxed">
            Volunteers can choose an open seva role, view their current assignment, and switch to another available spot if their plans change — no coordinator required.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {cards.map((card) => (
            <div
              key={card.title}
              className="p-6 rounded-2xl bg-white/10 border border-white/15 backdrop-blur hover:bg-white/15 transition-colors"
            >
              <div className="text-3xl mb-4">{card.icon}</div>
              <h3 className="font-semibold text-white mb-2">{card.title}</h3>
              <p className="text-sm text-blue-100 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/volunteer"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white hover:bg-blue-50 text-blue-700 font-semibold rounded-xl transition-colors shadow-lg shadow-blue-900/20 text-sm"
          >
            Try Volunteer Portal
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}
