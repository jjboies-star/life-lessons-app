"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";

interface Child {
  id: string;
  name: string;
  age: number;
  interests: string;
  personality: string;
  challenges: string;
}

export default function ChildrenPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [children, setChildren] = useState<Child[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingChild, setEditingChild] = useState<Child | null>(null);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [interests, setInterests] = useState("");
  const [personality, setPersonality] = useState("");
  const [challenges, setChallenges] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) fetchChildren();
  }, [user]);

  const fetchChildren = async () => {
    const { data, error } = await supabase
      .from("children")
      .select("*")
      .eq("parent_id", user!.id)
      .order("created_at", { ascending: true });

    if (!error && data) {
      setChildren(data);
    }
    setLoading(false);
  };

  const resetForm = () => {
    setName("");
    setAge("");
    setInterests("");
    setPersonality("");
    setChallenges("");
    setEditingChild(null);
    setShowForm(false);
  };

  const handleEdit = (child: Child) => {
    setEditingChild(child);
    setName(child.name);
    setAge(child.age.toString());
    setInterests(child.interests || "");
    setPersonality(child.personality || "");
    setChallenges(child.challenges || "");
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const childData = {
      parent_id: user!.id,
      name: name.trim(),
      age: parseInt(age),
      interests: interests.trim(),
      personality: personality.trim(),
      challenges: challenges.trim(),
    };

    if (editingChild) {
      await supabase
        .from("children")
        .update(childData)
        .eq("id", editingChild.id);
    } else {
      await supabase.from("children").insert(childData);
    }

    setSaving(false);
    resetForm();
    fetchChildren();
  };

  const handleDelete = async (childId: string) => {
    if (confirm("Are you sure you want to remove this child profile?")) {
      await supabase.from("children").delete().eq("id", childId);
      fetchChildren();
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-slate-200 border-t-slate-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) return null;

  const avatarColors = [
    "bg-blue-100 text-blue-700",
    "bg-purple-100 text-purple-700",
    "bg-amber-100 text-amber-700",
    "bg-green-100 text-green-700",
    "bg-rose-100 text-rose-700",
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center text-slate-500 hover:text-slate-900 text-sm font-medium mb-6 transition-colors"
          >
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back Home
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
                My Children
              </h1>
              <p className="text-slate-500">
                Add your kids to personalize their learning experience
              </p>
            </div>
            {children.length > 0 && !showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="hidden sm:inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 px-5 rounded-xl transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                Add Child
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Children List */}
        {children.length > 0 && (
          <div className="space-y-4 mb-8">
            {children.map((child, index) => (
              <div
                key={child.id}
                className="bg-white rounded-2xl p-6 border border-slate-100"
              >
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0 ${avatarColors[index % avatarColors.length]}`}>
                    {child.name.charAt(0).toUpperCase()}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">
                          {child.name}
                        </h3>
                        <p className="text-sm text-slate-500">Age {child.age}</p>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleEdit(child)}
                          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </button>
                        <button
                          onClick={() => handleDelete(child.id)}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </div>

                    {(child.interests || child.personality || child.challenges) && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {child.interests && (
                          <div className="bg-slate-50 rounded-xl px-4 py-3">
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                              Interests
                            </p>
                            <p className="text-sm text-slate-700">{child.interests}</p>
                          </div>
                        )}
                        {child.personality && (
                          <div className="bg-slate-50 rounded-xl px-4 py-3">
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                              Personality
                            </p>
                            <p className="text-sm text-slate-700">{child.personality}</p>
                          </div>
                        )}
                        {child.challenges && (
                          <div className="bg-slate-50 rounded-xl px-4 py-3">
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                              Areas to Grow
                            </p>
                            <p className="text-sm text-slate-700">{child.challenges}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mobile Add Button */}
        {children.length > 0 && !showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="sm:hidden w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-xl transition-colors text-sm mb-8"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Add Child
          </button>
        )}

        {/* Empty State */}
        {children.length === 0 && !showForm && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">No children added yet</h3>
            <p className="text-slate-500 mb-6 max-w-sm mx-auto">
              Add your kids to personalize their learning experience and track their progress.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-6 rounded-xl transition-colors text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              Add Your First Child
            </button>
          </div>
        )}

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white rounded-2xl p-8 border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              {editingChild ? `Edit ${editingChild.name}` : "Add a Child"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Child's name"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Age *
                  </label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="10"
                    min="1"
                    max="18"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Interests
                </label>
                <input
                  type="text"
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  placeholder="Soccer, Minecraft, reading, drawing..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Personality
                </label>
                <input
                  type="text"
                  value={personality}
                  onChange={(e) => setPersonality(e.target.value)}
                  placeholder="Shy, outgoing, curious, sensitive..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Areas to Grow
                </label>
                <input
                  type="text"
                  value={challenges}
                  onChange={(e) => setChallenges(e.target.value)}
                  placeholder="Managing anger, speaking up, peer pressure..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm transition-all"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-6 rounded-xl transition-colors disabled:opacity-50 text-sm"
                >
                  {saving
                    ? "Saving..."
                    : editingChild
                    ? "Save Changes"
                    : "Add Child"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-slate-500 hover:text-slate-900 font-medium py-3 px-4 text-sm transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
