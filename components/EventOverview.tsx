export default function EventOverview() {
  return (
    <section className="bg-white border-b border-gray-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-1 block">
              Upcoming Event
            </span>
            <h2 className="text-2xl font-bold text-gray-900">Sunday Community Seva</h2>
          </div>
          <div className="flex flex-wrap gap-5">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Sunday, 9:00 AM – 1:00 PM
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Main Hall
            </div>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-4">
          Help with setup, parking, prasad serving, guest guidance, and cleanup for the Sunday
          community event. Pick the role that fits your availability and we&apos;ll see you there.
        </p>
      </div>
    </section>
  );
}
