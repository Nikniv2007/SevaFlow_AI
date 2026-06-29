import Link from "next/link";

const footerLinks = {
  Product: [
    { label: "Demo", href: "/demo" },
    { label: "Evaluations", href: "/evals" },
    { label: "Case Study", href: "/case-study" },
  ],
  Resources: [
    { label: "Docs", href: "/docs" },
    { label: "Volunteer Portal", href: "/volunteer" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white text-xs font-bold">S</span>
              </div>
              <span className="text-white font-semibold text-lg">
                SevaFlow <span className="text-blue-400">AI</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              AI-powered volunteer matching and coordination platform. Connecting skilled volunteers with nonprofits that need them most.
            </p>
          </div>

          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-white text-sm font-semibold mb-3">{section}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs">
            &copy; {new Date().getFullYear()} SevaFlow AI. All rights reserved.
          </p>
          <p className="text-xs">
            Built with Next.js, TypeScript &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
