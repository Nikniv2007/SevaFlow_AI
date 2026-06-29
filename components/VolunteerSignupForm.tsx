"use client";

import { useState } from "react";
import type { VolunteerAssignment } from "@/lib/schemas";

interface SignupData {
  volunteerName: string;
  contact: string;
  note?: string;
}

interface Props {
  assignment: VolunteerAssignment;
  onSubmit: (data: SignupData) => void;
  onCancel: () => void;
}

export default function VolunteerSignupForm({ assignment, onSubmit, onCancel }: Props) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!contact.trim()) {
      setError("Please enter your phone number or email.");
      return;
    }

    onSubmit({
      volunteerName: name.trim(),
      contact: contact.trim(),
      note: note.trim() || undefined,
    });
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">Confirm Your Signup</h3>
      <p className="text-sm text-gray-500 mb-5">
        Signing up for{" "}
        <span className="font-semibold text-gray-800">{assignment.title}</span>
        {" — "}{assignment.time}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); setError(null); }}
            placeholder="Your full name"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Phone or Email <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={contact}
            onChange={(e) => { setContact(e.target.value); setError(null); }}
            placeholder="your@email.com or 555-0100"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Note{" "}
            <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
            placeholder="Any message for the seva coordinator…"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
          />
        </div>

        {error && (
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}

        <div className="flex gap-3 pt-1">
          <button
            type="submit"
            className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors"
          >
            Confirm Assignment
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 border border-gray-200 text-gray-600 font-medium rounded-xl text-sm hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
