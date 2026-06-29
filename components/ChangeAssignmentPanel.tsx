"use client";

import { useState } from "react";
import type { VolunteerAssignment } from "@/lib/schemas";
import { getOpenSpots, getAssignmentStatus, canSignup } from "@/lib/volunteer-storage";
import AssignmentCard from "./AssignmentCard";

interface Props {
  assignments: VolunteerAssignment[];
  currentAssignmentId: string;
  onConfirm: (newId: string) => void;
  onCancel: () => void;
}

export default function ChangeAssignmentPanel({
  assignments,
  currentAssignmentId,
  onConfirm,
  onCancel,
}: Props) {
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleSelect(id: string) {
    setPendingId(id);
    setError(null);
  }

  function handleConfirm() {
    if (!pendingId) {
      setError("Please select a new assignment first.");
      return;
    }
    onConfirm(pendingId);
  }

  return (
    <div>
      {/* Panel header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Change Your Assignment</h2>
          <p className="text-gray-500 text-sm mt-1">
            Select a new seva role. Your current role and full roles cannot be selected.
          </p>
        </div>
        <button
          onClick={onCancel}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors shrink-0 ml-4"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          Back
        </button>
      </div>

      {/* Assignment grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
        {assignments.map((a) => {
          const isCurrent = a.id === currentAssignmentId;
          const isAvailable = !isCurrent && canSignup(a);
          return (
            <AssignmentCard
              key={a.id}
              assignment={a}
              status={getAssignmentStatus(a)}
              openSpots={getOpenSpots(a)}
              isSelected={pendingId === a.id}
              isCurrentAssignment={isCurrent}
              onSelect={isAvailable ? handleSelect : undefined}
            />
          );
        })}
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm text-red-600 mb-4 flex items-center gap-2">
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </p>
      )}

      {/* Confirm row */}
      <div className="flex gap-3">
        <button
          onClick={handleConfirm}
          disabled={!pendingId}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-100 disabled:text-gray-400 text-white font-semibold rounded-xl text-sm transition-colors disabled:cursor-not-allowed"
        >
          Confirm Change
        </button>
        <button
          onClick={onCancel}
          className="px-6 py-2.5 border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium rounded-xl text-sm transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
