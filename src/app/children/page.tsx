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

  // Form state
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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-600">Loading...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center text-blue-900 hover:text-blue-600 font-medium mb-4"
          >
            ← Back Home
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            My Children
          </h1>
          <p className="text-slate-600">
            Add your children so we can personalize lessons for each one
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Children List */}
        {children.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {children.map((child) => (
              <div
                key={child.id}
                className="bg-white rounded-xl p-6 shadow-md"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {child.name}
                    </h3>
                    <p className="text-slate-600">Age {child.age}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(child)}
                      className="text-blue-900 hover:text-blue-600 text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(child.id)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {child.interests && (
                  <div className="mb-3">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                      Interests
                    </p>
                    <p className="text-slate-700 text-sm">{child.interests}</p>
                  </div>
                )}
                {child.personality && (
                  <div className="mb-3">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                      Personality
                    </p>
                    <p className="text-slate-700 text-sm">
                      {child.personality}
                    </p>
                  </div>
                )}
                {child.challenges && (
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                      Areas to Grow
                    </p>
                    <p className="text-slate-700 text-sm">{child.challenges}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Add Button */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl transition-colors"
          >
            + Add a Child
          </button>
        )}

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white rounded-xl p-8 shadow-md">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              {editingChild ? `Edit ${editingChild.name}` : "Add a Child"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Child's name"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Age *
                  </label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="10"
                    min="1"
                    max="18"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Interests
                </label>
                <input
                  type="text"
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  placeholder="Soccer, Minecraft, reading, drawing..."
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Personality
                </label>
                <input
                  type="text"
                  value={personality}
                  onChange={(e) => setPersonality(e.target.value)}
                  placeholder="Shy, outgoing, curious, sensitive..."
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Areas to Grow
                </label>
                <input
                  type="text"
                  value={challenges}
                  onChange={(e) => setChallenges(e.target.value)}
                  placeholder="Managing anger, speaking up, peer pressure..."
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-lg transition-colors disabled:opacity-50"
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
                  className="text-slate-600 hover:text-slate-900 font-medium py-3 px-6"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {children.length === 0 && !showForm && (
          <div className="text-center py-12">
            <p className="text-5xl mb-4">👨‍👩‍👧‍👦</p>
            <p className="text-slate-600 text-lg">
              No children added yet. Add your kids to personalize their learning
              experience!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
