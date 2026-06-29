"use client";

import { useState } from "react";
import { classifyRequest } from "@/lib/classifier";
import { ClassifierInputSchema, ClassifierOutputSchema } from "@/lib/schemas";
import type { ClassifierOutput } from "@/lib/schemas";
import JsonOutput from "./JsonOutput";

const SAMPLES = [
  {
    label: "Volunteers for prasad",
    text: "Radhe Radhe, we need 5 volunteers for Sunday prasad serving before 9 AM.",
  },
  {
    label: "Donation receipt link",
    text: "The donation receipt link is not working for some yajmans.",
  },
  {
    label: "WhatsApp announcement",
    text: "Please send a WhatsApp announcement for tomorrow's youth program.",
  },
  {
    label: "Extra chairs needed",
    text: "We need extra chairs near the main hall before the event starts.",
  },
  {
    label: "Call back yajman",
    text: "A yajman asked for someone to call them back about sponsorship.",
  },
  {
    label: "QR code confusing",
    text: "The QR code for feedback is confusing.",
  },
  {
    label: "Parking volunteers",
    text: "Parking volunteers need instructions before 8 AM.",
  },
  {
    label: "Update spreadsheet",
    text: "Can someone update the spreadsheet with new volunteer names?",
  },
];

const PRIORITY_STYLES: Record<string, string> = {
  High: "bg-red-100 text-red-700 border-red-200",
  Medium: "bg-amber-100 text-amber-700 border-amber-200",
  Low: "bg-green-100 text-green-700 border-green-200",
};

const CATEGORY_STYLES: Record<string, string> = {
  "Volunteer Scheduling": "bg-blue-100 text-blue-700 border-blue-200",
  "Feedback": "bg-purple-100 text-purple-700 border-purple-200",
  "Event Logistics": "bg-orange-100 text-orange-700 border-orange-200",
  "Communication": "bg-cyan-100 text-cyan-700 border-cyan-200",
  "Follow Up": "bg-indigo-100 text-indigo-700 border-indigo-200",
  "Technical Help": "bg-rose-100 text-rose-700 border-rose-200",
  "Donation Support": "bg-emerald-100 text-emerald-700 border-emerald-200",
  "Other": "bg-gray-100 text-gray-600 border-gray-200",
};

const CONFIDENCE_COLOR = (n: number) =>
  n >= 0.85 ? "bg-green-500" : n >= 0.7 ? "bg-blue-500" : "bg-amber-400";

export default function InteractiveDemo() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ClassifierOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  function selectSample(text: string) {
    setInput(text);
    setResult(null);
    setError(null);
  }

  async function handleAnalyze() {
    setError(null);
    setResult(null);

    const trimmed = input.trim();

    if (!trimmed) {
      setError("Please enter a request before analyzing.");
      return;
    }
    if (trimmed.length < 5) {
      setError("Request is too short. Please enter at least a few words.");
      return;
    }

    const parsed = ClassifierInputSchema.safeParse({ description: trimmed });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Your input could not be validated. Please check it and try again.");
      return;
    }

    setLoading(true);
    try {
      // Brief artificial delay so the loading state is visible
      await new Promise((r) => setTimeout(r, 480));
      const raw = await classifyRequest(parsed.data);

      // Validate that the classifier output matches the expected schema
      const validation = ClassifierOutputSchema.safeParse(raw);
      if (!validation.success) {
        setError(
          "The classifier returned an unexpected response format. Please try again."
        );
        return;
      }

      setResult(validation.data);
    } catch {
      setError(
        "Something went wrong while classifying your request. Please try again in a moment."
      );
    } finally {
      setLoading(false);
    }
  }

  const pct = result ? Math.round(result.confidence * 100) : 0;

  return (
    <div className="space-y-6">

      {/* Sample buttons */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
          Try a sample request
        </p>
        <div className="flex flex-wrap gap-2">
          {SAMPLES.map((s) => (
            <button
              key={s.label}
              onClick={() => selectSample(s.text)}
              title={s.text}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                input === s.text
                  ? "border-blue-400 bg-blue-50 text-blue-700"
                  : "border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Textarea */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Community Request
        </label>
        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError(null);
          }}
          rows={4}
          placeholder="Paste or type a community request here — any format, any language mix..."
          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none leading-relaxed"
        />
        <p className="mt-1 text-xs text-gray-400">{input.length} characters</p>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-2.5 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
          <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}

      {/* Analyze button */}
      <button
        onClick={handleAnalyze}
        disabled={loading || !input.trim()}
        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-100 disabled:text-gray-400 text-white font-semibold rounded-xl transition-colors text-sm shadow-sm disabled:shadow-none disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Analyzing…
          </>
        ) : (
          <>
            Analyze Request
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </>
        )}
      </button>

      {/* Result */}
      {result && (
        <div className="space-y-4 animate-[fadeIn_0.3s_ease]">

          {/* Structured card */}
          <div className="rounded-2xl border border-gray-100 bg-gray-50 overflow-hidden">

            {/* Card header */}
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-gray-100 bg-white">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-semibold text-gray-700">Classification Result</span>
            </div>

            <div className="p-5 space-y-5">

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${CATEGORY_STYLES[result.category] ?? CATEGORY_STYLES["Other"]}`}>
                  {result.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${PRIORITY_STYLES[result.priority]}`}>
                  {result.priority} Priority
                </span>
              </div>

              {/* 2-col fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Summary</p>
                  <p className="text-sm text-gray-800 leading-relaxed">{result.summary}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Suggested Owner</p>
                  <p className="text-sm text-gray-800">{result.suggested_owner_role}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Next Action</p>
                  <p className="text-sm text-gray-800 leading-relaxed">{result.next_action}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Deadline</p>
                  <p className="text-sm text-gray-800">{result.deadline ?? "None specified"}</p>
                </div>
              </div>

              {/* Confidence bar */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Confidence</p>
                  <p className="text-xs font-bold text-gray-600">{pct}%</p>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${CONFIDENCE_COLOR(result.confidence)}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              {/* Original */}
              <div className="pt-1 border-t border-gray-100">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5">Original Request</p>
                <p className="text-sm text-gray-500 italic leading-relaxed">
                  &ldquo;{result.originalDescription}&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Raw JSON */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Raw JSON Output</p>
            <JsonOutput data={result as unknown as Record<string, unknown>} />
          </div>
        </div>
      )}
    </div>
  );
}
