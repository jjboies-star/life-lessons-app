"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { categories, allLessons } from "@/data/lessons";

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

function LessonsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const filteredLessons = allLessons.filter((lesson) => {
    const matchesCategory =
      !selectedCategory || lesson.categorySlug === selectedCategory;
    const matchesSearch =
      lesson.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.teachableMoment.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryInfo = (slug: string) => {
    return categories.find((cat) => cat.slug === slug);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center text-slate-500 hover:text-slate-900 text-sm font-medium mb-6 transition-colors"
          >
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back Home
          </Link>
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-2">
            Lesson Library
          </h1>
          <p className="text-slate-500 text-lg">
            Browse and search {allLessons.length} lessons across {categories.length} categories
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input
              type="text"
              placeholder="Search by name, description, or teachable moment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 text-base transition-all"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("")}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                !selectedCategory
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.slug}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === category.slug ? "" : category.slug
                  )
                }
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-1.5 ${
                  selectedCategory === category.slug
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
                }`}
              >
                <span className="text-base">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing <span className="font-semibold text-slate-700">{filteredLessons.length}</span> of {allLessons.length} lessons
          </p>
          {(searchQuery || selectedCategory) && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("");
              }}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Lessons Grid */}
        {filteredLessons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLessons.map((lesson) => {
              const categoryInfo = getCategoryInfo(lesson.categorySlug);
              const colors = colorMap[categoryInfo?.color || "blue"] || colorMap.blue;
              return (
                <Link
                  key={lesson.id}
                  href={`/lessons/${lesson.id}`}
                  className="group"
                >
                  <div className="card-hover bg-white rounded-xl p-6 border border-slate-100 h-full cursor-pointer">
                    {/* Category Badge */}
                    <div className={`${colors.bg} ${colors.text} inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 mb-4`}>
                      <span className="text-sm">{categoryInfo?.icon}</span>
                      <span className="text-xs font-semibold">
                        {lesson.category}
                      </span>
                    </div>

                    {/* Lesson Name */}
                    <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors leading-snug">
                      {lesson.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                      {lesson.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <p className="text-slate-600 font-medium mb-2">No lessons found</p>
            <p className="text-slate-400 text-sm mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("");
              }}
              className="text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function LessonsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-slate-200 border-t-slate-600 rounded-full animate-spin"></div>
        </div>
      }
    >
      <LessonsContent />
    </Suspense>
  );
}
