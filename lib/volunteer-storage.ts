import {
  VolunteerAssignmentSchema,
  VolunteerAssignmentsSchema,
  CurrentVolunteerAssignmentSchema,
} from "./schemas";
import type { VolunteerAssignment, CurrentVolunteerAssignment } from "./schemas";
import { INITIAL_ASSIGNMENTS } from "./volunteer-data";

const ASSIGNMENTS_KEY = "SEVAFLOW_ASSIGNMENTS";
const CURRENT_KEY = "SEVAFLOW_CURRENT_ASSIGNMENT";

// ── SSR guard ─────────────────────────────────────────────────────────────────

function isClient(): boolean {
  return typeof window !== "undefined";
}

// ── Pure business logic (no browser dependency — fully testable) ───────────────

export function getOpenSpots(assignment: VolunteerAssignment): number {
  return assignment.totalSpots - assignment.filledSpots;
}

export function getAssignmentStatus(
  assignment: VolunteerAssignment
): "Full" | "Almost Full" | "Open" {
  const open = getOpenSpots(assignment);
  if (open === 0) return "Full";
  if (open === 1) return "Almost Full";
  return "Open";
}

export function canSignup(assignment: VolunteerAssignment): boolean {
  return getOpenSpots(assignment) > 0;
}

export function applySignup(
  assignments: VolunteerAssignment[],
  id: string
): VolunteerAssignment[] {
  return assignments.map((a) =>
    a.id === id ? { ...a, filledSpots: a.filledSpots + 1 } : a
  );
}

export function applyRelease(
  assignments: VolunteerAssignment[],
  id: string
): VolunteerAssignment[] {
  return assignments.map((a) =>
    a.id === id ? { ...a, filledSpots: Math.max(0, a.filledSpots - 1) } : a
  );
}

// ── localStorage helpers (SSR-safe) ───────────────────────────────────────────

export function getAssignments(): VolunteerAssignment[] {
  if (!isClient()) return INITIAL_ASSIGNMENTS;
  try {
    const raw = localStorage.getItem(ASSIGNMENTS_KEY);
    if (!raw) return INITIAL_ASSIGNMENTS;
    return VolunteerAssignmentsSchema.parse(JSON.parse(raw));
  } catch {
    return INITIAL_ASSIGNMENTS;
  }
}

export function saveAssignments(assignments: VolunteerAssignment[]): void {
  if (!isClient()) return;
  try {
    localStorage.setItem(ASSIGNMENTS_KEY, JSON.stringify(assignments));
  } catch {
    // Storage quota exceeded or private browsing restriction — fail silently
  }
}

export function getCurrentVolunteerAssignment(): CurrentVolunteerAssignment | null {
  if (!isClient()) return null;
  try {
    const raw = localStorage.getItem(CURRENT_KEY);
    if (!raw) return null;
    return CurrentVolunteerAssignmentSchema.parse(JSON.parse(raw));
  } catch {
    return null;
  }
}

export function saveCurrentVolunteerAssignment(
  assignment: CurrentVolunteerAssignment
): void {
  if (!isClient()) return;
  CurrentVolunteerAssignmentSchema.parse(assignment);
  try {
    localStorage.setItem(CURRENT_KEY, JSON.stringify(assignment));
  } catch {
    // Storage quota exceeded or private browsing restriction — fail silently
  }
}

export function releaseCurrentVolunteerAssignment(): void {
  if (!isClient()) return;
  const current = getCurrentVolunteerAssignment();
  if (!current) return;
  const updated = applyRelease(getAssignments(), current.assignmentId);
  saveAssignments(updated);
  localStorage.removeItem(CURRENT_KEY);
}

/**
 * Switches the current volunteer from their existing assignment to a new one.
 * Releases the old spot and fills the new spot atomically.
 * Returns false if the new assignment is full or does not exist.
 */
export function changeVolunteerAssignment(newAssignmentId: string): boolean {
  if (!isClient()) return false;

  const assignments = getAssignments();
  const target = assignments.find((a) => a.id === newAssignmentId);
  if (!target || !canSignup(target)) return false;

  const current = getCurrentVolunteerAssignment();
  let updated = assignments;

  if (current) {
    updated = applyRelease(updated, current.assignmentId);
  }
  updated = applySignup(updated, newAssignmentId);
  saveAssignments(updated);

  if (current) {
    saveCurrentVolunteerAssignment({
      ...current,
      assignmentId: newAssignmentId,
      assignedAt: new Date().toISOString(),
    });
  }

  return true;
}

// ── Convenience re-exports used by UI ─────────────────────────────────────────

export type { VolunteerAssignment, CurrentVolunteerAssignment };
export { VolunteerAssignmentSchema, CurrentVolunteerAssignmentSchema };
