import { describe, it, expect } from "vitest";
import { VolunteerSchema, EvalSchema, ContactSchema } from "@/lib/schemas";

describe("VolunteerSchema", () => {
  it("accepts a valid volunteer", () => {
    const result = VolunteerSchema.safeParse({
      name: "Jane Smith",
      email: "jane@example.com",
      skills: ["Web Dev", "Design"],
      availability: "weekends",
      bio: "Passionate about helping nonprofits.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty name", () => {
    const result = VolunteerSchema.safeParse({
      name: "",
      email: "jane@example.com",
      skills: ["Web Dev"],
      availability: "weekdays",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = VolunteerSchema.safeParse({
      name: "Jane",
      email: "not-an-email",
      skills: ["Web Dev"],
      availability: "both",
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty skills array", () => {
    const result = VolunteerSchema.safeParse({
      name: "Jane",
      email: "jane@example.com",
      skills: [],
      availability: "weekdays",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid availability value", () => {
    const result = VolunteerSchema.safeParse({
      name: "Jane",
      email: "jane@example.com",
      skills: ["Design"],
      availability: "never",
    });
    expect(result.success).toBe(false);
  });

  it("accepts volunteer without optional bio", () => {
    const result = VolunteerSchema.safeParse({
      name: "Bob",
      email: "bob@example.com",
      skills: ["Marketing"],
      availability: "both",
    });
    expect(result.success).toBe(true);
  });
});

describe("EvalSchema", () => {
  it("accepts a valid evaluation", () => {
    const result = EvalSchema.safeParse({
      taskId: "task-123",
      modelResponse: "The volunteer performed excellently.",
      rating: 5,
      notes: "Would recommend.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects rating below 1", () => {
    const result = EvalSchema.safeParse({
      taskId: "task-123",
      modelResponse: "Good work.",
      rating: 0,
    });
    expect(result.success).toBe(false);
  });

  it("rejects rating above 5", () => {
    const result = EvalSchema.safeParse({
      taskId: "task-123",
      modelResponse: "Good work.",
      rating: 6,
    });
    expect(result.success).toBe(false);
  });

  it("rejects non-integer rating", () => {
    const result = EvalSchema.safeParse({
      taskId: "task-123",
      modelResponse: "Good work.",
      rating: 3.5,
    });
    expect(result.success).toBe(false);
  });

  it("accepts eval without optional notes", () => {
    const result = EvalSchema.safeParse({
      taskId: "task-abc",
      modelResponse: "Solid contribution.",
      rating: 4,
    });
    expect(result.success).toBe(true);
  });
});

describe("ContactSchema", () => {
  it("accepts a valid contact submission", () => {
    const result = ContactSchema.safeParse({
      name: "Alice",
      email: "alice@nonprofit.org",
      organization: "Good Works Inc.",
      message: "We would love to partner with SevaFlow AI.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects message shorter than 10 characters", () => {
    const result = ContactSchema.safeParse({
      name: "Alice",
      email: "alice@nonprofit.org",
      message: "Hi",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = ContactSchema.safeParse({
      name: "Alice",
      email: "bad-email",
      message: "We want to learn more about your platform.",
    });
    expect(result.success).toBe(false);
  });

  it("accepts contact without optional organization", () => {
    const result = ContactSchema.safeParse({
      name: "Bob",
      email: "bob@example.com",
      message: "Interested in volunteering through your platform.",
    });
    expect(result.success).toBe(true);
  });
});
