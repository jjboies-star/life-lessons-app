"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { categories, allLessons, type Lesson } from "@/data/lessons";

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

export default function LessonDetail({ params }: { params: Promise<{ id: string }> }) {
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
    const reflectionText = localStorage.getItem(`lesson-reflection-${lesson.id}`);

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
      <div className="min-h-screen bg-slate-50 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/lessons" className="text-blue-900 hover:text-blue-600 font-medium">
            ← Back to Lessons
          </Link>
          <div className="mt-8 text-center text-slate-600">
            Lesson not found.
          </div>
        </div>
      </div>
    );
  }

  const categoryInfo = categories.find((c) => c.slug === lesson.categorySlug);
  const bgColor = categoryInfo ? colorMap[categoryInfo.color] || "bg-blue-100" : "bg-blue-100";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/lessons"
            className="inline-flex items-center text-blue-900 hover:text-blue-600 font-medium mb-6"
          >
            ← Back to Lessons
          </Link>

          {categoryInfo && (
            <div className={`${bgColor} inline-block rounded-lg px-4 py-2 mb-6`}>
              <span className="text-2xl mr-2">{categoryInfo.icon}</span>
              <span className="font-semibold text-slate-900">
                {lesson.category}
              </span>
            </div>
          )}

          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            {lesson.name}
          </h1>

          {mounted && (
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleToggleFavorite}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  isFavorited
                    ? "bg-orange-100 text-orange-900 hover:bg-orange-200"
                    : "bg-white text-slate-700 border border-slate-300 hover:border-orange-500"
                }`}
              >
                {isFavorited ? "❤️ Favorited" : "🤍 Add to Favorites"}
              </button>
              <button
                onClick={handleToggleComplete}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  isCompleted
                    ? "bg-green-100 text-green-900 hover:bg-green-200"
                    : "bg-white text-slate-700 border border-slate-300 hover:border-green-500"
                }`}
              >
                {isCompleted ? "✅ Completed" : "☐ Mark as Complete"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <section className="bg-white rounded-xl p-8 shadow-md mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            About This Lesson
          </h2>
          <p className="text-slate-700 leading-relaxed text-lg">
            {lesson.description}
          </p>
        </section>

        <section className="bg-blue-50 border-l-4 border-blue-900 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            💡 Teachable Moment
          </h2>
          <p className="text-slate-800 leading-relaxed text-lg">
            {lesson.teachableMoment}
          </p>
        </section>

        <section className="bg-white rounded-xl p-8 shadow-md mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            💬 Discussion Questions
          </h2>
          <ol className="space-y-4">
            {lesson.discussionQuestions.map((question, index) => (
              <li
                key={index}
                className="flex gap-4 text-slate-700 leading-relaxed"
              >
                <span className="flex-shrink-0 font-bold text-blue-900 text-lg">
                  {index + 1}.
                </span>
                <span className="text-lg">{question}</span>
              </li>
            ))}
          </ol>
        </section>

        {mounted && (
          <section className="bg-white rounded-xl p-8 shadow-md">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              📝 My Reflection
            </h2>
            <p className="text-slate-600 mb-4">
              Capture your thoughts, notes, or how the lesson went with your child.
            </p>
            <textarea
              value={reflection}
              onChange={(e) => handleReflectionChange(e.target.value)}
              placeholder="Write your reflection here... (auto-saves)"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={6}
            />
            {reflection && (
              <p className="text-sm text-green-600 mt-3">
                ✓ Reflection saved automatically
              </p>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
