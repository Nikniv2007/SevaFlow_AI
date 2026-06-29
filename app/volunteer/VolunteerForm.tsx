"use client";

import Badge from "@/components/Badge";

export default function VolunteerForm() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <Badge variant="green">Volunteer Portal</Badge>
        <h1 className="mt-4 text-4xl font-bold text-gray-900">
          Put Your Skills to Work
        </h1>
        <p className="mt-4 text-gray-500 max-w-xl mx-auto">
          Create your volunteer profile and get intelligently matched with nonprofits that need exactly what you offer.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { icon: "🎯", title: "Smart Matching", desc: "AI pairs your skills with real organizational needs." },
          { icon: "📅", title: "Flexible Schedule", desc: "Commit on your own terms — weekdays, weekends, or both." },
          { icon: "📊", title: "Track Impact", desc: "See your contribution history and effectiveness ratings." },
        ].map((item) => (
          <div
            key={item.title}
            className="p-6 rounded-2xl border border-gray-100 bg-gray-50 text-center hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-3">{item.icon}</div>
            <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
            <p className="text-sm text-gray-500">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Volunteer Registration</h2>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Jane Smith"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="jane@example.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Skills <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2 p-3 rounded-lg border border-gray-200 min-h-[80px]">
              {["Web Dev", "Design", "Writing", "Data Analysis", "Marketing", "Legal"].map((skill) => (
                <label key={skill} className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm text-gray-600">{skill}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Availability <span className="text-red-500">*</span>
            </label>
            <select className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white">
              <option value="">Select availability</option>
              <option value="weekdays">Weekdays</option>
              <option value="weekends">Weekends</option>
              <option value="both">Both</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Short Bio <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              rows={3}
              placeholder="Tell nonprofits a bit about yourself and your motivation to volunteer..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-sm text-sm"
            >
              Create Volunteer Profile
            </button>
            <p className="mt-3 text-xs text-gray-400">
              No account required. Your profile is validated with Zod schemas before submission.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
