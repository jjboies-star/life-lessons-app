import Link from "next/link";
import { categories } from "@/data/lessons";

const colorMap: Record<string, string> = {
  blue: "bg-blue-50 hover:bg-blue-100",
  rose: "bg-rose-50 hover:bg-rose-100",
  cyan: "bg-cyan-50 hover:bg-cyan-100",
  emerald: "bg-emerald-50 hover:bg-emerald-100",
  green: "bg-green-50 hover:bg-green-100",
  purple: "bg-purple-50 hover:bg-purple-100",
  amber: "bg-amber-50 hover:bg-amber-100",
  teal: "bg-teal-50 hover:bg-teal-100",
  orange: "bg-orange-50 hover:bg-orange-100",
  indigo: "bg-indigo-50 hover:bg-indigo-100",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 px-6 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Welcome to Life Lessons
          </h1>
          <p className="text-xl lg:text-2xl text-blue-100">
            Find the right moment to teach what matters most
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-8 shadow-md text-center">
          <p className="text-4xl font-bold text-blue-900 mb-2">150+</p>
          <p className="text-slate-600 font-medium">Lessons Available</p>
        </div>
        <div className="bg-white rounded-xl p-8 shadow-md text-center">
          <p className="text-4xl font-bold text-blue-900 mb-2">10</p>
          <p className="text-slate-600 font-medium">Categories</p>
        </div>
        <div className="bg-white rounded-xl p-8 shadow-md text-center">
          <p className="text-4xl font-bold text-blue-900 mb-2">Ages 10-12</p>
          <p className="text-slate-600 font-medium">Perfect for your kids</p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-8">
          Explore All Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const bgClass = colorMap[category.color] || "bg-blue-50 hover:bg-blue-100";
            return (
              <Link
                key={category.slug}
                href={`/lessons?category=${category.slug}`}
                className="group"
              >
                <div className={`${bgClass} rounded-xl p-8 h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer`}>
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4">
                    {category.description}
                  </p>
                  <p className="text-sm font-semibold text-blue-900">
                    {category.lessons.length} lessons →
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Getting Started */}
      <section className="bg-white mt-16 px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            Getting Started
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-blue-900">1</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Browse Lessons
              </h3>
              <p className="text-slate-600">
                Explore our collection of lessons organized by topic and category.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-blue-900">2</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Choose What Matters
              </h3>
              <p className="text-slate-600">
                Select lessons that align with your family's values and goals.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-blue-900">3</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Find the Right Moment
              </h3>
              <p className="text-slate-600">
                Use the teachable moments to have meaningful conversations.
              </p>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link
              href="/lessons"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl transition-colors"
            >
              Start Exploring Lessons
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 px-6 py-8 mt-16">
        <div className="max-w-6xl mx-auto text-center">
          <p>© 2026 Life Lessons. A parenting companion app.</p>
        </div>
      </footer>
    </div>
  );
}
