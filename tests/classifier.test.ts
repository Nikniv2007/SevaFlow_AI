import { describe, it, expect } from "vitest";
import { classifyRequest } from "@/lib/classifier";
import { ClassifierInputSchema, ClassifierOutputSchema } from "@/lib/schemas";

describe("classifyRequest — mock mode", () => {
  it("returns an output that satisfies ClassifierOutputSchema", async () => {
    const output = await classifyRequest({ description: "We need help with the event setup." });
    const result = ClassifierOutputSchema.safeParse(output);
    expect(result.success).toBe(true);
  });

  it("classifies a volunteer request as Volunteer Scheduling", async () => {
    const output = await classifyRequest({
      description: "We need 5 volunteers for prasad serving this Sunday.",
    });
    expect(output.category).toBe("Volunteer Scheduling");
  });

  it("classifies a feedback request as Feedback", async () => {
    const output = await classifyRequest({
      description: "A yajman gave feedback about the event experience.",
    });
    expect(output.category).toBe("Feedback");
  });

  it("classifies a WhatsApp reminder as Communication", async () => {
    const output = await classifyRequest({
      description: "Please send a WhatsApp reminder for the upcoming program.",
    });
    expect(output.category).toBe("Communication");
  });

  it("classifies a broken link as Technical Help", async () => {
    const output = await classifyRequest({
      description: "The registration form link is broken and not working.",
    });
    expect(output.category).toBe("Technical Help");
  });

  it("classifies a donation receipt request as Donation Support", async () => {
    const output = await classifyRequest({
      description: "A yajman needs a donation receipt for their contribution.",
    });
    expect(output.category).toBe("Donation Support");
  });

  it("sets priority to High when text includes urgency keywords", async () => {
    const output = await classifyRequest({
      description: "Volunteers needed for prasad serving before 9 AM today.",
    });
    expect(output.priority).toBe("High");
  });

  it("respects the urgency field as a strong priority signal", async () => {
    const output = await classifyRequest({
      description: "Update the volunteer spreadsheet when you get a chance.",
      urgency: "High",
    });
    expect(output.priority).toBe("High");
  });

  it("includes the originalDescription unchanged", async () => {
    const desc = "Call back the yajman about sponsorship details.";
    const output = await classifyRequest({ description: desc });
    expect(output.originalDescription).toBe(desc);
  });

  it("returns confidence between 0 and 1", async () => {
    const output = await classifyRequest({
      description: "Please announce the event on WhatsApp.",
    });
    expect(output.confidence).toBeGreaterThanOrEqual(0);
    expect(output.confidence).toBeLessThanOrEqual(1);
  });
});

describe("ClassifierInputSchema validation", () => {
  it("fails validation on empty description", () => {
    const result = ClassifierInputSchema.safeParse({ description: "" });
    expect(result.success).toBe(false);
  });

  it("fails validation when description is missing", () => {
    const result = ClassifierInputSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  it("accepts a valid input with optional fields", () => {
    const result = ClassifierInputSchema.safeParse({
      description: "We need volunteers for Sunday.",
      urgency: "High",
      source: "WhatsApp",
    });
    expect(result.success).toBe(true);
  });

  it("rejects an invalid urgency value", () => {
    const result = ClassifierInputSchema.safeParse({
      description: "Some request.",
      urgency: "Critical",
    });
    expect(result.success).toBe(false);
  });
});
