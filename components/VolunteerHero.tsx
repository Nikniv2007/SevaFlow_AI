export default function VolunteerHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white py-20 px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_-20%,rgba(99,102,241,0.25),transparent)]" />
      <div className="relative max-w-4xl mx-auto text-center">
        <span className="inline-block px-3 py-1.5 rounded-full border border-white/20 bg-white/10 text-white/80 text-xs font-semibold uppercase tracking-widest mb-6">
          Volunteer Portal
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-5">
          Choose your seva assignment.
        </h1>
        <p className="text-blue-100 text-lg max-w-xl mx-auto leading-relaxed mb-8">
          View open event roles, select a shift that fits your schedule, and change your
          assignment any time before the event.
        </p>
        <a
          href="#assignments"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-blue-50 text-blue-700 font-semibold rounded-xl transition-colors shadow-md text-sm"
        >
          View Open Spots
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
