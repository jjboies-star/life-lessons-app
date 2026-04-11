"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import Link from "next/link";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (isSignUp) {
      if (!name.trim()) {
        setError("Please enter your name.");
        setLoading(false);
        return;
      }
      const { error } = await signUp(email, password, name);
      if (error) {
        setError(error);
      } else {
        setSuccess(
          "Account created! Check your email to confirm, then sign in."
        );
        setIsSignUp(false);
      }
    } else {
      const { error } = await signIn(email, password);
      if (error) {
        setError(error);
      } else {
        router.push("/");
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-sm w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto">
              <span className="text-2xl">📚</span>
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {isSignUp ? "Create your account" : "Welcome back"}
          </h1>
          <p className="text-slate-500 mt-2 text-sm">
            {isSignUp
              ? "Start your family's learning journey"
              : "Sign in to continue teaching what matters"}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-slate-100 p-7">
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Josh Boies"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm transition-all"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm transition-all"
                minLength={6}
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 px-4 py-3 rounded-xl text-sm border border-red-100">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 text-green-700 px-4 py-3 rounded-xl text-sm border border-green-100">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-6 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {loading
                ? "Please wait..."
                : isSignUp
                ? "Create Account"
                : "Sign In"}
            </button>
          </form>

          {/* Toggle */}
          <div className="mt-5 pt-5 border-t border-slate-100 text-center">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError("");
                setSuccess("");
              }}
              className="text-slate-500 hover:text-slate-900 font-medium text-sm transition-colors"
            >
              {isSignUp
                ? "Already have an account? Sign in"
                : "Don't have an account? Create one"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
