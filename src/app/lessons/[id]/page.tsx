"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { categories, allLessons, type Lesson } from "@/data/lessons";

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

export default function LessonDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [reflection, setReflection] = useState("");
  const [mounted, setMounted] = useState(false);

  const lesson = allLessons.find((l) => l.id === id) || null;

  useEffect(() => {
    setMounted(true);
    if (!lesson) return;

    const completed = localStorage.getItem(`lesson-completed-${lesson.id}`);
    const favorited = localStorage.getItem(`lesson-favorited-${lesson.id}`);
    const reflectionText = localStorage.getItem(
      `lesson-reflection-${lesson.id}`
    );

    if (completed) setIsCompleted(true);
    if (favorited) setIsFavorited(true);
    if (reflectionText) setReflection(reflectionText);
  }, [lesson]);

  const handleToggleComplete = () => {
    if (!lesson) return;
    const newStatus = !isCompleted;
    setIsCompleted(newStatus);
    if (newStatus) {
      localStorage.setItem(`lesson-completed-${lesson.id}`, "true");
    } else {
      localStorage.removeItem(`lesson-completed-${lesson.id}`);
    }
  };

  const handleToggleFavorite = () => {
    if (!lesson) return;
    const newStatus = !isFavorited;
    setIsFavorited(newStatus);
    if (newStatus) {
      localStorage.setItem(`lesson-favorited-${lesson.id}`, "true");
    } else {
      localStorage.removeItem(`lesson-favorited-${lesson.id}`);
    }
  };

  const handleReflectionChange = (text: string) => {
    setReflection(text);
    if (lesson) {
      if (text.trim()) {
        localStorage.setItem(`lesson-reflection-${lesson.id}`, text);
      } else {
        localStorage.removeItem(`lesson-reflection-${lesson.id}`);
      }
    }
  };

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-slate-600 font-medium mb-4">Lesson not found</p>
          <Link
            href="/lessons"
            className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
          >
            Back to Lessons
          </Link>
        </div>
      </div>
    );
  }

  const categoryInfo = categories.find((c) => c.slug === lesson.categorySlug);
  const colors = categoryInfo
    ? colorMap[categoryInfo.color] || colorMap.blue
    : colorMap.blue;

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/lessons"
            className="inline-flex items-center text-slate-500 hover:text-slate-900 text-sm font-medium mb-5 transition-colors"
          >
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to Lessons
          </Link>

          {categoryInfo && (
            <div className={`${colors.bg} ${colors.text} inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 mb-4`}>
              <span className="text-base">{categoryInfo.icon}</span>
              <span className="text-sm font-semibold">{lesson.category}</span>
            </div>
          )}

          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
            {lesson.name}
          </h1>
        </div>
      </div>

      {/* Action buttons */}
      {mounted && (
        <div className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="max-w-2xl mx-auto flex flex-wrap gap-3">
            <button
              onClick={handleToggleFavorite}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                isFavorited
                  ? "bg-amber-50 text-amber-700 border border-amber-200"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-amber-300 hover:text-amber-700"
              }`}
            >
              {isFavorited ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              )}
              {isFavorited ? "Favorited" : "Favorite"}
            </button>
            <button
              onClick={handleToggleComplete}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                isCompleted
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-green-300 hover:text-green-700"
              }`}
            >
              {isCompleted ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2a10 10 0 100 20 10 10 0 000-20z" /></svg>
              )}
              {isCompleted ? "Completed" : "Mark Complete"}
            </button>
          </div>
        </div>
      )}

      {/* Content - each section separated with space */}
      <div className="max-w-2xl mx-auto px-6 py-8">

        {/* About */}
        <section className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
            About This Lesson
          </h2>
          <p className="text-slate-700 leading-relaxed">
            {lesson.description}
          </p>
        </section>

        {/* Spacer */}
        <div className="h-6"></div>

        {/* Teachable Moment */}
        <section className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">
            Teachable Moment
          </h2>
          <p className="text-slate-700 leading-relaxed">
            {lesson.teachableMoment}
          </p>
        </section>

        {/* Spacer */}
        <div className="h-6"></div>

        {/* Discussion Questions */}
        <section className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
            Discussion Questions
          </h2>
          <div className="space-y-4">
            {lesson.discussionQuestions.map((question, index) => (
              <div
                key={index}
                className="flex gap-3 items-start"
              >
                <span className="flex-shrink-0 w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-xs font-bold text-slate-500 mt-0.5">
                  {index + 1}
                </span>
                <p className="text-slate-700 leading-relaxed text-sm">{question}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Spacer */}
        <div className="h-6"></div>

        {/* Reflection */}
        {mounted && (
          <section className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
              My Reflection
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Capture your thoughts or how the lesson went
            </p>
            <textarea
              value={reflection}
              onChange={(e) => handleReflectionChange(e.target.value)}
              placeholder="Write your reflection here... (auto-saves)"
              className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 resize-none text-sm"
              rows={5}
            />
            {reflection && (
              <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Saved automatically
              </p>
            )}
          </section>
        )}

      </div>
    </div>
  );
}
