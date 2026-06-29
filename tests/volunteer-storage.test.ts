import { describe, it, expect } from "vitest";
import {
  getOpenSpots,
  getAssignmentStatus,
  canSignup,
  applySignup,
  applyRelease,
  getAssignments,
  getCurrentVolunteerAssignment,
  saveAssignments,
  releaseCurrentVolunteerAssignment,
  VolunteerAssignmentSchema,
} from "@/lib/volunteer-storage";
import { INITIAL_ASSIGNMENTS } from "@/lib/volunteer-data";

// ── Pure logic ────────────────────────────────────────────────────────────────

describe("getOpenSpots", () => {
  it("returns the difference between total and filled spots", () => {
    const a = { ...INITIAL_ASSIGNMENTS[0], totalSpots: 4, filledSpots: 2 };
    expect(getOpenSpots(a)).toBe(2);
  });

  it("returns 0 when assignment is full", () => {
    const a = { ...INITIAL_ASSIGNMENTS[0], totalSpots: 3, filledSpots: 3 };
    expect(getOpenSpots(a)).toBe(0);
  });

  it("returns totalSpots when no spots are filled", () => {
    const a = { ...INITIAL_ASSIGNMENTS[0], totalSpots: 4, filledSpots: 0 };
    expect(getOpenSpots(a)).toBe(4);
  });
});

describe("getAssignmentStatus", () => {
  it("returns Open when more than 1 spot is available", () => {
    const a = { ...INITIAL_ASSIGNMENTS[0], totalSpots: 4, filledSpots: 2 };
    expect(getAssignmentStatus(a)).toBe("Open");
  });

  it("returns Almost Full when exactly 1 spot remains", () => {
    const a = { ...INITIAL_ASSIGNMENTS[0], totalSpots: 4, filledSpots: 3 };
    expect(getAssignmentStatus(a)).toBe("Almost Full");
  });

  it("returns Full when no spots remain", () => {
    const a = { ...INITIAL_ASSIGNMENTS[0], totalSpots: 4, filledSpots: 4 };
    expect(getAssignmentStatus(a)).toBe("Full");
  });
});

describe("canSignup", () => {
  it("returns true for an open assignment", () => {
    const open = { ...INITIAL_ASSIGNMENTS[0], totalSpots: 4, filledSpots: 2 };
    expect(canSignup(open)).toBe(true);
  });

  it("returns true when exactly 1 spot remains", () => {
    const almostFull = { ...INITIAL_ASSIGNMENTS[0], totalSpots: 4, filledSpots: 3 };
    expect(canSignup(almostFull)).toBe(true);
  });

  it("returns false for a full assignment", () => {
    const full = { ...INITIAL_ASSIGNMENTS[0], totalSpots: 4, filledSpots: 4 };
    expect(canSignup(full)).toBe(false);
  });
});

describe("applySignup / applyRelease", () => {
  it("applySignup increments filledSpots for the target assignment only", () => {
    const before = [...INITIAL_ASSIGNMENTS];
    const targetId = "prasad-serving";
    const otherIds = before.filter((a) => a.id !== targetId).map((a) => a.id);

    const after = applySignup(before, targetId);
    const target = after.find((a) => a.id === targetId)!;

    expect(target.filledSpots).toBe(
      before.find((a) => a.id === targetId)!.filledSpots + 1
    );

    // Other assignments are unchanged
    otherIds.forEach((id) => {
      expect(after.find((a) => a.id === id)!.filledSpots).toBe(
        before.find((a) => a.id === id)!.filledSpots
      );
    });
  });

  it("applyRelease decrements filledSpots for the target assignment only", () => {
    const before = [...INITIAL_ASSIGNMENTS];
    const targetId = "prasad-serving";

    const after = applyRelease(before, targetId);
    const target = after.find((a) => a.id === targetId)!;

    expect(target.filledSpots).toBe(
      before.find((a) => a.id === targetId)!.filledSpots - 1
    );
  });

  it("applyRelease does not go below 0", () => {
    const assignments = [
      { ...INITIAL_ASSIGNMENTS[0], filledSpots: 0 },
    ];
    const after = applyRelease(assignments, assignments[0].id);
    expect(after[0].filledSpots).toBe(0);
  });

  it("changing assignment releases old spot and fills new spot", () => {
    const oldId = "prasad-serving";   // filledSpots: 2, totalSpots: 4
    const newId = "parking-guidance"; // filledSpots: 2, totalSpots: 3

    const oldBefore = INITIAL_ASSIGNMENTS.find((a) => a.id === oldId)!.filledSpots;
    const newBefore = INITIAL_ASSIGNMENTS.find((a) => a.id === newId)!.filledSpots;

    let updated = applyRelease(INITIAL_ASSIGNMENTS, oldId);
    updated = applySignup(updated, newId);

    expect(updated.find((a) => a.id === oldId)!.filledSpots).toBe(oldBefore - 1);
    expect(updated.find((a) => a.id === newId)!.filledSpots).toBe(newBefore + 1);
  });

  it("releasing an assignment restores the open spot count", () => {
    const id = "cleanup-team"; // filledSpots: 0 → signup → filledSpots: 1 → release → 0

    let assignments = applySignup(INITIAL_ASSIGNMENTS, id);
    expect(assignments.find((a) => a.id === id)!.filledSpots).toBe(1);

    assignments = applyRelease(assignments, id);
    expect(assignments.find((a) => a.id === id)!.filledSpots).toBe(0);
  });
});

describe("sample data integrity", () => {
  it("all INITIAL_ASSIGNMENTS pass VolunteerAssignmentSchema", () => {
    INITIAL_ASSIGNMENTS.forEach((a) => {
      expect(VolunteerAssignmentSchema.safeParse(a).success).toBe(true);
    });
  });

  it("every assignment has filledSpots <= totalSpots", () => {
    INITIAL_ASSIGNMENTS.forEach((a) => {
      expect(a.filledSpots).toBeLessThanOrEqual(a.totalSpots);
    });
  });
});

describe("SSR safety — localStorage functions with window undefined", () => {
  // In the node test environment, window is undefined.
  // All localStorage functions must return safe defaults and never throw.

  it("getAssignments() returns INITIAL_ASSIGNMENTS when window is undefined", () => {
    expect(typeof window).toBe("undefined");
    const result = getAssignments();
    expect(result).toEqual(INITIAL_ASSIGNMENTS);
  });

  it("getCurrentVolunteerAssignment() returns null when window is undefined", () => {
    expect(getCurrentVolunteerAssignment()).toBeNull();
  });

  it("saveAssignments() does not throw when window is undefined", () => {
    expect(() => saveAssignments(INITIAL_ASSIGNMENTS)).not.toThrow();
  });

  it("releaseCurrentVolunteerAssignment() does not throw when window is undefined", () => {
    expect(() => releaseCurrentVolunteerAssignment()).not.toThrow();
  });
});
