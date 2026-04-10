"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { categories, allLessons } from "@/data/lessons";

const colorMap: Record<string, string> = {
  blue: "bg-blue-100",
  rose: "bg-rose-100",
  cyan: "bg-cyan-100",
  emerald: "bg-emerald-100",
  green: "bg-green-100",
  purple: "bg-purple-100",
  amber: "bg-amber-100",
  teal: "bg-teal-100",
  orange: "bg-orange-100",
  indigo: "bg-indigo-100",
};

function LessonsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  // Filter lessons based on search and category
  const filteredLessons = allLessons.filter((lesson) => {
    const matchesCategory = !selectedCategory || lesson.categorySlug === selectedCategory;
    const matchesSearch =
      lesson.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.teachableMoment.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get category info for display
  const getCategoryInfo = (slug: string) => {
    return categories.find((cat) => cat.slug === slug);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center text-blue-900 hover:text-blue-600 font-medium mb-4"
          >
            ← Back Home
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Lesson Library
          </h1>
          <p className="text-slate-600">
            Browse and search lessons to find the perfect teaching moments
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search lessons by name, description, or teachable moment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Category Filters */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wide">
            Filter by Category
          </h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("")}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                !selectedCategory
                  ? "bg-blue-900 text-white"
                  : "bg-white text-slate-700 border border-slate-300 hover:border-blue-900"
              }`}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category.slug}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === category.slug ? "" : category.slug
                  )
                }
                className={`px-4 py-2 rounded-full font-medium transition-colors flex items-center gap-2 ${
                  selectedCategory === category.slug
                    ? "bg-blue-900 text-white"
                    : "bg-white text-slate-700 border border-slate-300 hover:border-blue-900"
                }`}
              >
                <span>{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-slate-600 font-medium">
            Showing {filteredLessons.length} of {allLessons.length} lessons
          </p>
        </div>

        {/* Lessons Grid */}
        {filteredLessons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLessons.map((lesson) => {
              const categoryInfo = getCategoryInfo(lesson.categorySlug);
              return (
                <Link
                  key={lesson.id}
                  href={`/lessons/${lesson.id}`}
                  className="group"
                >
                  <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full cursor-pointer">
                    {/* Category Badge */}
                    <div className={`${colorMap[categoryInfo?.color || "blue"]} inline-block rounded-lg px-3 py-2 mb-4`}>
                      <span className="text-2xl mr-2">{categoryInfo?.icon}</span>
                      <span className="text-sm font-semibold text-blue-900">
                        {lesson.category}
                      </span>
                    </div>

                    {/* Lesson Name */}
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-900 transition-colors">
                      {lesson.name}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                      {lesson.description}
                    </p>

                    {/* Learn More Link */}
                    <p className="text-blue-900 font-semibold text-sm group-hover:text-orange-500 transition-colors">
                      Read Lesson →
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg mb-4">
              No lessons found matching your search.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("");
              }}
              className="text-blue-900 hover:text-blue-600 font-semibold"
            >
              Clear filters and try again
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 px-6 py-8 mt-16">
        <div className="max-w-6xl mx-auto text-center">
          <p>© 2026 Life Lessons. A parenting companion app.</p>
        </div>
      </footer>
    </div>
  );
}

export default function LessonsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <LessonsContent />
    </Suspense>
  );
}
