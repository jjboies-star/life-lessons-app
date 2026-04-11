"use client";

import { useState } from "react";
import Link from "next/link";
import { AuthProvider, useAuth } from "@/lib/AuthContext";
import "./globals.css";

function Sidebar({
  sidebarOpen,
  closeSidebar,
}: {
  sidebarOpen: boolean;
  closeSidebar: () => void;
}) {
  const { user, loading, signOut } = useAuth();

  return (
    <aside
      className={`
        fixed left-0 top-0 z-50 h-full w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 lg:shadow-md flex flex-col
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      {/* Mobile Close Button */}
      <button
        onClick={closeSidebar}
        className="absolute top-4 right-4 lg:hidden text-slate-600 hover:text-slate-900"
        aria-label="Close menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Sidebar Header */}
      <div className="border-b border-slate-200 px-6 py-6 hidden lg:block">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-3xl">📚</span>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Life Lessons</h1>
            <p className="text-xs text-slate-500">for ages 10-12</p>
          </div>
        </Link>
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex-1 px-4 py-6 lg:py-8 space-y-2 pt-16 lg:pt-0">
        <Link
          href="/"
          onClick={closeSidebar}
          className="block px-4 py-3 rounded-lg font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-900 transition-colors"
        >
          🏠 Home
        </Link>
        <Link
          href="/lessons"
          onClick={closeSidebar}
          className="block px-4 py-3 rounded-lg font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-900 transition-colors"
        >
          📖 Lesson Library
        </Link>
        <Link
          href={user ? "/children" : "/auth"}
          onClick={closeSidebar}
          className="block px-4 py-3 rounded-lg font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-900 transition-colors"
        >
          👨‍👩‍👧 My Children
        </Link>
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            closeSidebar();
          }}
          className="block px-4 py-3 rounded-lg font-medium text-slate-400 cursor-not-allowed"
        >
          📊 My Progress
        </Link>
      </nav>

      {/* Auth Section */}
      <div className="border-t border-slate-200 px-4 py-4">
        {loading ? (
          <p className="text-xs text-slate-400 text-center">Loading...</p>
        ) : user ? (
          <div className="space-y-2">
            <p className="text-xs text-slate-500 text-center truncate px-2">
              {user.email}
            </p>
            <button
              onClick={async () => {
                await signOut();
                closeSidebar();
              }}
              className="w-full px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <Link
            href="/auth"
            onClick={closeSidebar}
            className="block w-full px-4 py-2 rounded-lg text-sm font-medium text-center bg-blue-900 text-white hover:bg-blue-800 transition-colors"
          >
            Sign In / Sign Up
          </Link>
        )}
      </div>

      {/* Sidebar Footer */}
      <div className="border-t border-slate-200 px-6 py-4 text-xs text-slate-500">
        <p className="text-center">© 2026 Life Lessons</p>
      </div>
    </aside>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <html lang="en">
      <head>
        <title>Life Lessons - Teaching Kids What Matters Most</title>
        <meta
          name="description"
          content="Help your kids learn important life lessons at the perfect moment"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-slate-50">
        <AuthProvider>
          <div className="flex h-screen flex-col lg:flex-row">
            {/* Mobile Header */}
            <div className="flex items-center justify-between bg-white px-6 py-4 lg:hidden shadow-sm">
              <Link href="/" className="font-bold text-xl text-blue-900">
                📚 Life Lessons
              </Link>
              <button
                onClick={toggleSidebar}
                className="text-slate-600 hover:text-slate-900"
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>

            {/* Sidebar Overlay (Mobile) */}
            {sidebarOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                onClick={closeSidebar}
              />
            )}

            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />

            {/* Main Content */}
            <main className="flex-1 overflow-auto">{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
