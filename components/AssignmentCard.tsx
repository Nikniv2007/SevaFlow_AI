"use client";

import type { VolunteerAssignment } from "@/lib/schemas";

interface Props {
  assignment: VolunteerAssignment;
  status: "Open" | "Almost Full" | "Full";
  openSpots: number;
  isSelected?: boolean;
  isCurrentAssignment?: boolean;
  onSelect?: (id: string) => void;
}

const SKILL_STYLES = {
  Easy: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  Experienced: "bg-violet-50 text-violet-700 border-violet-200",
} as const;

const STATUS_DOT = {
  Open: "bg-emerald-500",
  "Almost Full": "bg-amber-500",
  Full: "bg-red-500",
} as const;

const STATUS_TEXT = {
  Open: "text-emerald-700",
  "Almost Full": "text-amber-700",
  Full: "text-red-600",
} as const;

export default function AssignmentCard({
  assignment,
  status,
  openSpots,
  isSelected = false,
  isCurrentAssignment = false,
  onSelect,
}: Props) {
  const borderClass = isCurrentAssignment
    ? "border-emerald-300 bg-emerald-50/40 shadow-sm"
    : isSelected
    ? "border-blue-400 bg-blue-50/40 shadow-sm"
    : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-md";

  const spotsLabel =
    status === "Full"
      ? "Full"
      : `${openSpots} spot${openSpots !== 1 ? "s" : ""} open`;

  return (
    <div className={`rounded-2xl border p-5 transition-all duration-200 flex flex-col ${borderClass}`}>
      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${SKILL_STYLES[assignment.skillLevel]}`}>
          {assignment.skillLevel}
        </span>
        <div className={`flex items-center gap-1.5 text-xs font-semibold ${STATUS_TEXT[status]}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[status]}`} />
          {spotsLabel}
        </div>
      </div>

      {/* Title */}
      <h3 className="font-bold text-gray-900 text-lg mb-2 leading-snug">{assignment.title}</h3>

      {/* Time + Location */}
      <div className="space-y-1 mb-3">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <svg className="w-4 h-4 shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {assignment.time}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <svg className="w-4 h-4 shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {assignment.location}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-500 leading-relaxed mb-5 flex-1">{assignment.description}</p>

      {/* Action footer */}
      {isCurrentAssignment ? (
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-100 rounded-xl px-4 py-2.5">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Your Assignment
        </div>
      ) : isSelected ? (
        <div className="text-center text-xs font-semibold text-blue-700 bg-blue-100 rounded-xl px-4 py-2.5">
          Selected
        </div>
      ) : status === "Full" ? (
        <div className="text-center text-xs font-semibold text-gray-400 bg-gray-100 rounded-xl px-4 py-2.5">
          Full — No Spots Available
        </div>
      ) : onSelect ? (
        <button
          onClick={() => onSelect(assignment.id)}
          className="w-full text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl px-4 py-2.5 transition-colors"
        >
          Select Assignment →
        </button>
      ) : null}
    </div>
  );
}
