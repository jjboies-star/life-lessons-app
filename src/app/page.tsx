import Link from "next/link";
import { categories } from "@/data/lessons";

const colorMap: Record<string, { bg: string; text: string }> = {
  blue: { bg: "bg-blue-50", text: "text-blue-700" },
  rose: { bg: "bg-rose-50", text: "text-rose-700" },
  cyan: { bg: "bg-cyan-50", text: "text-cyan-700" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-700" },
  green: { bg: "bg-green-50", text: "text-green-700" },
  purple: { bg: "bg-purple-50", text: "text-purple-700" },
  amber: { bg: "bg-amber-50", text: "text-amber-700" },
  teal: { bg: "bg-teal-50", text: "text-teal-700" },
  orange: { bg: "bg-orange-50", text: "text-orange-700" },
  indigo: { bg: "bg-indigo-50", text: "text-indigo-700" },
};

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - clean white, no dark background gimmicks */}
      <section className="px-6 pt-16 pb-20 lg:pt-24 lg:pb-28 bg-white border-b border-slate-100">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4">
            For parents of kids ages 10–12
          </p>

          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-5 leading-tight tracking-tight">
            Teach life lessons at the perfect moment
          </h1>

          <p className="text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed">
            150+ curated lessons with real-world teachable moments. Find the right time to teach your kids what matters most.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/lessons"
              className="inline-flex items-center justify-center bg-slate-900 text-white font-semibold py-3 px-7 rounded-xl hover:bg-slate-800 transition-colors"
            >
              Browse Lessons
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
            <Link
              href="/auth"
              className="inline-flex items-center justify-center bg-slate-100 text-slate-700 font-semibold py-3 px-7 rounded-xl hover:bg-slate-200 transition-colors"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>

      {/* Quick stats row */}
      <section className="bg-slate-50 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 py-8 grid grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-2xl font-extrabold text-slate-900">150+</p>
            <p className="text-xs text-slate-500 font-medium mt-1">Curated Lessons</p>
          </div>
          <div className="border-x border-slate-200">
            <p className="text-2xl font-extrabold text-slate-900">10</p>
            <p className="text-xs text-slate-500 font-medium mt-1">Categories</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900">Ages 10–12</p>
            <p className="text-xs text-slate-500 font-medium mt-1">Tailored for Your Kids</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">
          How it works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              num: "1",
              title: "Browse Lessons",
              desc: "Explore lessons across 10 categories — from character to financial literacy.",
              color: "bg-blue-600",
            },
            {
              num: "2",
              title: "Choose What Matters",
              desc: "Pick lessons that match your family's values and your child's personality.",
              color: "bg-blue-600",
            },
            {
              num: "3",
              title: "Find the Moment",
              desc: "Use the teachable moment to create a real experience that makes it stick.",
              color: "bg-blue-600",
            },
          ].map((item) => (
            <div key={item.num} className="text-center">
              <div className={`${item.color} w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <span className="text-white font-bold text-sm">{item.num}</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">
            Explore by category
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => {
              const colors = colorMap[category.color] || colorMap.blue;
              return (
                <Link
                  key={category.slug}
                  href={`/lessons?category=${category.slug}`}
                  className="group"
                >
                  <div className="card-hover rounded-xl p-5 border border-slate-150 h-full cursor-pointer bg-white hover:border-slate-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`${colors.bg} w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0`}>
                        {category.icon}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                          {category.name}
                        </h3>
                        <p className={`text-xs font-medium ${colors.text}`}>
                          {category.lessons.length} lessons
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                      {category.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-100 px-6 py-16">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Ready to get started?
          </h2>
          <p className="text-slate-500 mb-6">
            Create a free account, add your children, and start finding the perfect teachable moments.
          </p>
          <Link
            href="/lessons"
            className="inline-flex items-center justify-center bg-slate-900 text-white font-semibold py-3 px-7 rounded-xl hover:bg-slate-800 transition-colors"
          >
            Start Exploring
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 px-6 py-6">
        <div className="max-w-5xl mx-auto text-center text-xs text-slate-400">
          <p>© 2026 Life Lessons</p>
        </div>
      </footer>
    </div>
  );
}
