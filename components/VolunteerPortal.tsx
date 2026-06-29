"use client";

import { useState, useEffect } from "react";
import {
  getAssignments,
  saveAssignments,
  getCurrentVolunteerAssignment,
  saveCurrentVolunteerAssignment,
  releaseCurrentVolunteerAssignment,
  changeVolunteerAssignment,
  getOpenSpots,
  getAssignmentStatus,
  canSignup,
  applySignup,
} from "@/lib/volunteer-storage";
import type { VolunteerAssignment, CurrentVolunteerAssignment } from "@/lib/schemas";
import { INITIAL_ASSIGNMENTS } from "@/lib/volunteer-data";
import AssignmentCard from "./AssignmentCard";
import VolunteerSignupForm from "./VolunteerSignupForm";
import MyAssignment from "./MyAssignment";
import ChangeAssignmentPanel from "./ChangeAssignmentPanel";

type View = "browse" | "signup" | "my-assignment" | "change";

interface Toast {
  type: "success" | "error";
  text: string;
}

export default function VolunteerPortal() {
  const [assignments, setAssignments] = useState<VolunteerAssignment[]>(INITIAL_ASSIGNMENTS);
  const [currentVolunteer, setCurrentVolunteer] = useState<CurrentVolunteerAssignment | null>(null);
  const [view, setView] = useState<View>("browse");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = getAssignments();
    const current = getCurrentVolunteerAssignment();
    setAssignments(saved);
    if (current) {
      setCurrentVolunteer(current);
      setView("my-assignment");
    }
    setMounted(true);
  }, []);

  function showToast(type: Toast["type"], text: string) {
    setToast({ type, text });
    setTimeout(() => setToast(null), 6000);
  }

  function handleSelectAssignment(id: string) {
    const a = assignments.find((x) => x.id === id);
    if (!a || !canSignup(a)) return;
    setSelectedId(id);
    setView("signup");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSignupSubmit(formData: { volunteerName: string; contact: string; note?: string }) {
    if (!selectedId) return;

    const record: CurrentVolunteerAssignment = {
      ...formData,
      assignmentId: selectedId,
      assignedAt: new Date().toISOString(),
    };

    const updated = applySignup(assignments, selectedId);
    saveAssignments(updated);
    saveCurrentVolunteerAssignment(record);
    setAssignments(updated);
    setCurrentVolunteer(record);

    const role = updated.find((a) => a.id === selectedId);
    showToast(
      "success",
      `You are signed up for ${role?.title ?? "your selected role"} — ${role?.time ?? "Sunday"}.`
    );
    setView("my-assignment");
    setSelectedId(null);
  }

  function handleSignupCancel() {
    setSelectedId(null);
    setView("browse");
  }

  function handleChangeConfirm(newId: string) {
    if (!currentVolunteer) return;

    const oldRole = assignments.find((a) => a.id === currentVolunteer.assignmentId);
    const newRole = assignments.find((a) => a.id === newId);

    const success = changeVolunteerAssignment(newId);
    if (!success) {
      showToast("error", "That assignment is now full. Please choose another.");
      return;
    }

    const updated = getAssignments();
    const updatedCurrent = getCurrentVolunteerAssignment();
    setAssignments(updated);
    setCurrentVolunteer(updatedCurrent);

    showToast(
      "success",
      `Assignment changed from ${oldRole?.title ?? "your previous role"} to ${newRole?.title ?? "your new role"}.`
    );
    setView("my-assignment");
  }

  function handleRelease() {
    releaseCurrentVolunteerAssignment();
    setAssignments(getAssignments());
    setCurrentVolunteer(null);
    showToast("success", "Your volunteer spot has been released. Thank you for letting the team know.");
    setView("browse");
  }

  const selectedAssignment = selectedId ? assignments.find((a) => a.id === selectedId) : null;
  const currentAssignmentDetails = currentVolunteer
    ? assignments.find((a) => a.id === currentVolunteer.assignmentId)
    : null;

  if (!mounted) {
    return (
      <section id="assignments" className="py-20 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto flex justify-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  return (
    <section id="assignments" className="py-16 px-4 bg-slate-50 min-h-[600px]">
      <div className="max-w-5xl mx-auto">

        {/* Toast notification */}
        {toast && (
          <div
            className={`mb-8 flex items-start gap-3 p-4 rounded-xl border text-sm font-medium ${
              toast.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : "bg-red-50 border-red-100 text-red-700"
            }`}
          >
            <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {toast.type === "success" ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              )}
            </svg>
            {toast.text}
          </div>
        )}

        {/* ── Browse: show all assignments ── */}
        {view === "browse" && (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Open Seva Roles</h2>
              <p className="text-sm text-gray-500">
                Select a role that fits your schedule. Full roles cannot be selected.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {assignments.map((a) => (
                <AssignmentCard
                  key={a.id}
                  assignment={a}
                  status={getAssignmentStatus(a)}
                  openSpots={getOpenSpots(a)}
                  isCurrentAssignment={false}
                  onSelect={canSignup(a) ? handleSelectAssignment : undefined}
                />
              ))}
            </div>
          </>
        )}

        {/* ── Signup: show selected card + form ── */}
        {view === "signup" && selectedAssignment && (
          <>
            <div className="mb-6">
              <button
                onClick={handleSignupCancel}
                className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                Back to all assignments
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <AssignmentCard
                assignment={selectedAssignment}
                status={getAssignmentStatus(selectedAssignment)}
                openSpots={getOpenSpots(selectedAssignment)}
                isSelected={true}
                isCurrentAssignment={false}
              />
              <VolunteerSignupForm
                assignment={selectedAssignment}
                onSubmit={handleSignupSubmit}
                onCancel={handleSignupCancel}
              />
            </div>
          </>
        )}

        {/* ── My Assignment: confirmed state ── */}
        {view === "my-assignment" && currentVolunteer && currentAssignmentDetails && (
          <>
            <MyAssignment
              currentAssignment={currentVolunteer}
              assignmentDetails={currentAssignmentDetails}
              onChangeClick={() => setView("change")}
              onRelease={handleRelease}
            />

            <div className="mt-14">
              <h2 className="text-xl font-bold text-gray-900 mb-1">All Seva Roles</h2>
              <p className="text-sm text-gray-500 mb-6">
                Overview of all assignments for this event.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {assignments.map((a) => (
                  <AssignmentCard
                    key={a.id}
                    assignment={a}
                    status={getAssignmentStatus(a)}
                    openSpots={getOpenSpots(a)}
                    isCurrentAssignment={a.id === currentVolunteer.assignmentId}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── Change: pick a different assignment ── */}
        {view === "change" && currentVolunteer && (
          <ChangeAssignmentPanel
            assignments={assignments}
            currentAssignmentId={currentVolunteer.assignmentId}
            onConfirm={handleChangeConfirm}
            onCancel={() => setView("my-assignment")}
          />
        )}
      </div>
    </section>
  );
}
