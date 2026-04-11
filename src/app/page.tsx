import Link from "next/link";
import { categories } from "@/data/lessons";

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-100" },
  rose: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-100" },
  cyan: { bg: "bg-cyan-50", text: "text-cyan-700", border: "border-cyan-100" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-100" },
  green: { bg: "bg-green-50", text: "text-green-700", border: "border-green-100" },
  purple: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-100" },
  amber: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-100" },
  teal: { bg: "bg-teal-50", text: "text-teal-700", border: "border-teal-100" },
  orange: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-100" },
  indigo: { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-100" },
};

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-20 lg:py-32">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            <span className="text-sm text-slate-300 font-medium">150+ lessons for ages 10–12</span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            Teach life lessons at
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-amber-400"> the perfect moment</span>
          </h1>

          <p className="text-lg lg:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Real-world experiences, engineered by you. Find the right time to teach what matters most to your kids — character, resilience, empathy, and more.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/lessons"
              className="inline-flex items-center justify-center bg-white text-slate-900 font-semibold py-3.5 px-8 rounded-xl hover:bg-slate-100 transition-colors text-base"
            >
              Browse Lessons
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
            <Link
              href="/auth"
              className="inline-flex items-center justify-center border border-white/20 text-white font-semibold py-3.5 px-8 rounded-xl hover:bg-white/10 transition-colors text-base"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">How it works</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
            Three simple steps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Browse Lessons",
              desc: "Explore 150+ lessons across 10 categories, from character building to financial literacy.",
              icon: "📖",
            },
            {
              step: "02",
              title: "Choose What Matters",
              desc: "Select lessons that align with your family's values and your child's unique personality.",
              icon: "🎯",
            },
            {
              step: "03",
              title: "Find the Moment",
              desc: "Use our teachable moments to create authentic experiences that make the lesson stick.",
              icon: "💡",
            },
          ].map((item) => (
            <div key={item.step} className="relative">
              <div className="bg-white rounded-2xl p-8 border border-slate-100 h-full">
                <span className="text-4xl mb-5 block">{item.icon}</span>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Step {item.step}</p>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="bg-white border-t border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">Categories</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
              Explore every topic that matters
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((category) => {
              const colors = colorMap[category.color] || colorMap.blue;
              return (
                <Link
                  key={category.slug}
                  href={`/lessons?category=${category.slug}`}
                  className="group"
                >
                  <div className="card-hover bg-white rounded-2xl p-6 border border-slate-100 h-full cursor-pointer">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`${colors.bg} w-12 h-12 rounded-xl flex items-center justify-center text-2xl`}>
                        {category.icon}
                      </div>
                      <span className={`${colors.bg} ${colors.text} text-xs font-semibold px-3 py-1 rounded-full`}>
                        {category.lessons.length} lessons
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
                      {category.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-4xl font-extrabold text-white mb-1">150+</p>
            <p className="text-slate-400 font-medium text-sm">Curated Lessons</p>
          </div>
          <div className="md:border-x md:border-slate-700">
            <p className="text-4xl font-extrabold text-white mb-1">10</p>
            <p className="text-slate-400 font-medium text-sm">Life Skill Categories</p>
          </div>
          <div>
            <p className="text-4xl font-extrabold text-white mb-1">Ages 10–12</p>
            <p className="text-slate-400 font-medium text-sm">Tailored for Your Kids</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-50 px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">
            Ready to start teaching what matters?
          </h2>
          <p className="text-slate-500 mb-8 text-lg">
            Create a free account, add your children, and begin finding the perfect moments.
          </p>
          <Link
            href="/lessons"
            className="inline-flex items-center justify-center bg-slate-900 text-white font-semibold py-3.5 px-8 rounded-xl hover:bg-slate-800 transition-colors"
          >
            Start Exploring
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 px-6 py-8">
        <div className="max-w-6xl mx-auto text-center text-sm text-slate-400">
          <p>© 2026 Life Lessons. A parenting companion app.</p>
        </div>
      </footer>
    </div>
  );
}
