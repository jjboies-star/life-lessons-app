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
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Lesson Library
          </h1>
          <p className="text-slate-500">
            Browse and search {allLessons.length} lessons across {categories.length} categories
          </p>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="max-w-4xl mx-auto px-6 py-6">
        {/* Search Bar */}
        <div className="mb-5">
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input
              type="text"
              placeholder="Search lessons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 shadow-sm"
            />
          </div>
        </div>

        {/* Category Filter - dropdown style */}
        <div className="mb-5">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-auto px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-700 font-medium shadow-sm cursor-pointer"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name} ({category.lessons.length})
              </option>
            ))}
          </select>
        </div>

        {/* Results Count */}
        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing <span className="font-semibold text-slate-900">{filteredLessons.length}</span> of {allLessons.length} lessons
          </p>
          {(searchQuery || selectedCategory) && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("");
              }}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Lessons Grid */}
        {filteredLessons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredLessons.map((lesson) => {
              const categoryInfo = getCategoryInfo(lesson.categorySlug);
              const colors = colorMap[categoryInfo?.color || "blue"] || colorMap.blue;
              return (
                <Link
                  key={lesson.id}
                  href={`/lessons/${lesson.id}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg p-5 border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all h-full">
                    {/* Category Badge */}
                    <div className={`${colors.bg} ${colors.text} inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 mb-3`}>
                      <span className="text-sm">{categoryInfo?.icon}</span>
                      <span className="text-xs font-semibold">
                        {lesson.category}
                      </span>
                    </div>

                    {/* Lesson Name */}
                    <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {lesson.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
                      {lesson.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg border border-slate-200">
            <p className="text-slate-600 font-medium mb-2">No lessons found</p>
            <p className="text-slate-400 text-sm mb-4">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("");
              }}
              className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
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
          <p className="text-slate-500">Loading...</p>
        </div>
      }
    >
      <LessonsContent />
    </Suspense>
  );
}
