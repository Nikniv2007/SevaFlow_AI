"use client";

import { useState } from "react";
import type { CurrentVolunteerAssignment, VolunteerAssignment } from "@/lib/schemas";

interface Props {
  currentAssignment: CurrentVolunteerAssignment;
  assignmentDetails: VolunteerAssignment;
  onChangeClick: () => void;
  onRelease: () => void;
}

export default function MyAssignment({
  currentAssignment,
  assignmentDetails,
  onChangeClick,
  onRelease,
}: Props) {
  const [releaseConfirm, setReleaseConfirm] = useState(false);

  return (
    <div>
      <div className="mb-4">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-700">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          My Current Assignment
        </span>
      </div>

      <div className="rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <h3 className="text-xl font-bold text-gray-900 leading-snug">
              {assignmentDetails.title}
            </h3>
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mt-1">
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {assignmentDetails.time}
              </span>
              <span className="text-gray-300">·</span>
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {assignmentDetails.location}
              </span>
            </div>
          </div>
          <span className="shrink-0 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
            Confirmed
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed mb-5 pb-5 border-b border-gray-100">
          {assignmentDetails.description}
        </p>

        {/* Volunteer details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5 pb-5 border-b border-gray-100">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-0.5">
              Volunteer Name
            </p>
            <p className="text-sm font-medium text-gray-800">{currentAssignment.volunteerName}</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-0.5">
              Contact
            </p>
            <p className="text-sm font-medium text-gray-800">{currentAssignment.contact}</p>
          </div>
          {currentAssignment.note && (
            <div className="sm:col-span-2">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-0.5">
                Note
              </p>
              <p className="text-sm text-gray-500 italic">&ldquo;{currentAssignment.note}&rdquo;</p>
            </div>
          )}
        </div>

        {/* Actions */}
        {!releaseConfirm ? (
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onChangeClick}
              className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors"
            >
              Change Assignment
            </button>
            <button
              onClick={() => setReleaseConfirm(true)}
              className="flex-1 py-2.5 px-4 border border-red-200 text-red-600 hover:bg-red-50 font-semibold rounded-xl text-sm transition-colors"
            >
              Release Spot
            </button>
          </div>
        ) : (
          <div className="rounded-xl bg-red-50 border border-red-100 p-4">
            <p className="text-sm font-semibold text-red-800 mb-1">
              Release your spot in{" "}
              <span className="font-bold">{assignmentDetails.title}</span>?
            </p>
            <p className="text-xs text-red-500 mb-4">
              This will free up your spot for another volunteer.
            </p>
            <div className="flex gap-3">
              <button
                onClick={onRelease}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg text-sm transition-colors"
              >
                Yes, Release
              </button>
              <button
                onClick={() => setReleaseConfirm(false)}
                className="px-4 py-2 border border-red-200 text-red-600 hover:bg-white font-medium rounded-lg text-sm transition-colors"
              >
                Keep My Spot
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
