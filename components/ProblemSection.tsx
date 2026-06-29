const problems = [
  {
    icon: "💬",
    title: "Informal requests",
    desc: "Requests arrive through WhatsApp, SMS, phone calls, and hallway conversations — with no consistent format.",
  },
  {
    icon: "🔁",
    title: "Lost follow-ups",
    desc: "Important tasks get buried when no one owns the next step and there is no system to track them.",
  },
  {
    icon: "⚙️",
    title: "Manual coordination",
    desc: "Volunteer assignments and last-minute changes require constant back-and-forth with no single source of truth.",
  },
  {
    icon: "📭",
    title: "No structure",
    desc: "Messages often lack priority, category, deadline, or clear ownership — leaving coordinators to guess.",
  },
];

export default function ProblemSection() {
  return (
    <section id="problem" className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-semibold uppercase tracking-widest mb-4 border border-rose-100">
            The Problem
          </span>
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
            Community work often runs on scattered messages.
          </h2>
          <p className="mt-4 text-gray-500 text-lg leading-relaxed">
            Most volunteer organizations coordinate through a mix of informal channels with no shared system — and things fall through the cracks.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {problems.map((item) => (
            <div
              key={item.title}
              className="group p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-white hover:border-gray-200 hover:shadow-lg transition-all duration-200"
            >
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-2 text-base">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
