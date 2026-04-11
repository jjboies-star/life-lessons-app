"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home", icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
    )},
    { href: "/lessons", label: "Lesson Library", icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
    )},
    { href: user ? "/children" : "/auth", label: "My Children", icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
    )},
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={`
        fixed left-0 top-0 z-50 h-full w-64 bg-white border-r border-slate-100 transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 flex flex-col
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      {/* Mobile Close Button */}
      <button
        onClick={closeSidebar}
        className="absolute top-4 right-4 lg:hidden text-slate-400 hover:text-slate-600 transition-colors"
        aria-label="Close menu"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Sidebar Header */}
      <div className="px-6 py-6 hidden lg:block">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center">
            <span className="text-lg">📚</span>
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900 leading-tight">
              Life Lessons
            </h1>
            <p className="text-xs text-slate-400">for ages 10–12</p>
          </div>
        </Link>
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex-1 px-3 py-4 pt-14 lg:pt-2 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={closeSidebar}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
              isActive(item.href)
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}

        {/* Progress - Coming Soon */}
        <div
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-300 cursor-default"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
          <span>My Progress</span>
          <span className="ml-auto text-xs bg-slate-100 text-slate-400 px-2 py-0.5 rounded-full font-medium">Soon</span>
        </div>
      </nav>

      {/* Auth Section */}
      <div className="px-3 py-4 border-t border-slate-100">
        {loading ? (
          <div className="flex items-center justify-center py-2">
            <div className="w-4 h-4 border-2 border-slate-200 border-t-slate-500 rounded-full animate-spin"></div>
          </div>
        ) : user ? (
          <div className="space-y-2">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-sm font-bold text-blue-700">
                {user.email?.charAt(0).toUpperCase()}
              </div>
              <p className="text-xs text-slate-500 truncate flex-1">
                {user.email}
              </p>
            </div>
            <button
              onClick={async () => {
                await signOut();
                closeSidebar();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              Sign Out
            </button>
          </div>
        ) : (
          <Link
            href="/auth"
            onClick={closeSidebar}
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors"
          >
            Sign In
          </Link>
        )}
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
            <div className="flex items-center justify-between bg-white px-5 py-3.5 lg:hidden border-b border-slate-100">
              <Link href="/" className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                  <span className="text-sm">📚</span>
                </div>
                <span className="font-bold text-base text-slate-900">Life Lessons</span>
              </Link>
              <button
                onClick={toggleSidebar}
                className="text-slate-500 hover:text-slate-900 transition-colors"
                aria-label="Toggle menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Sidebar Overlay (Mobile) */}
            {sidebarOpen && (
              <div
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
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
