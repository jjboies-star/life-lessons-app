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
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 2a10 10 0 100 20 10 10 0 000-20z" /></svg>
          </div>
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
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/lessons"
            className="inline-flex items-center text-slate-500 hover:text-slate-900 text-sm font-medium mb-6 transition-colors"
          >
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to Lessons
          </Link>

          {categoryInfo && (
            <div className={`${colors.bg} ${colors.text} inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 mb-5`}>
              <span className="text-base">{categoryInfo.icon}</span>
              <span className="text-sm font-semibold">{lesson.category}</span>
            </div>
          )}

          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-5 leading-tight">
            {lesson.name}
          </h1>

          {mounted && (
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleToggleFavorite}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
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
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
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
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">
        {/* About */}
        <section className="bg-white rounded-2xl p-8 border border-slate-100">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
            About This Lesson
          </h2>
          <p className="text-slate-700 leading-relaxed text-lg">
            {lesson.description}
          </p>
        </section>

        {/* Teachable Moment */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              Teachable Moment
            </h2>
          </div>
          <p className="text-slate-700 leading-relaxed text-lg">
            {lesson.teachableMoment}
          </p>
        </section>

        {/* Discussion Questions */}
        <section className="bg-white rounded-2xl p-8 border border-slate-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              Discussion Questions
            </h2>
          </div>
          <div className="space-y-4">
            {lesson.discussionQuestions.map((question, index) => (
              <div
                key={index}
                className="flex gap-4 items-start"
              >
                <span className="flex-shrink-0 w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center text-sm font-bold text-slate-500">
                  {index + 1}
                </span>
                <p className="text-slate-700 leading-relaxed pt-0.5">{question}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Reflection */}
        {mounted && (
          <section className="bg-white rounded-2xl p-8 border border-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  My Reflection
                </h2>
                <p className="text-sm text-slate-500">
                  Capture your thoughts or how the lesson went
                </p>
              </div>
            </div>
            <textarea
              value={reflection}
              onChange={(e) => handleReflectionChange(e.target.value)}
              placeholder="Write your reflection here... (auto-saves)"
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 resize-none transition-all"
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
