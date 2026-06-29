const steps = [
  {
    num: "01",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
    title: "Submit messy request",
    desc: "Any format works: a WhatsApp forward, a typed note, an SMS, or an in-person report. No template required.",
    color: "bg-blue-500",
    light: "bg-blue-50 text-blue-600",
  },
  {
    num: "02",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "AI classifies the message",
    desc: "SevaFlow AI reads the request and assigns a category, priority, owner role, and next action using keyword analysis and LLM-ready prompts.",
    color: "bg-purple-500",
    light: "bg-purple-50 text-purple-600",
  },
  {
    num: "03",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "JSON schema validates",
    desc: "Zod schemas verify every output field — category, priority, deadline, confidence score — ensuring the data is well-formed before it's used.",
    color: "bg-green-500",
    light: "bg-green-50 text-green-600",
  },
  {
    num: "04",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Team receives clear action",
    desc: "A structured task — with the right owner, priority, deadline, and next step — surfaces instantly so the right person can act.",
    color: "bg-cyan-500",
    light: "bg-cyan-50 text-cyan-600",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold uppercase tracking-widest mb-4 border border-green-100">
            How It Works
          </span>
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
            Four steps from chaos to clarity.
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={step.num} className="relative flex flex-col">
              {/* Connector line (desktop, not last item) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[calc(50%+24px)] right-0 h-px bg-gray-100 z-0" />
              )}

              <div className="relative z-10 flex flex-col h-full p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-white hover:border-gray-200 hover:shadow-lg transition-all duration-200">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl ${step.light} flex items-center justify-center mb-5`}>
                  {step.icon}
                </div>

                {/* Step number */}
                <div className="text-xs font-bold text-gray-300 tracking-widest mb-2">
                  STEP {step.num}
                </div>

                <h3 className="font-semibold text-gray-900 mb-2 text-base">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
