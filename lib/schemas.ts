import { z } from "zod";

export const VolunteerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  skills: z.array(z.string()).min(1, "At least one skill required"),
  availability: z.enum(["weekdays", "weekends", "both"]),
  bio: z.string().max(500).optional(),
});

export const EvalSchema = z.object({
  taskId: z.string().min(1),
  modelResponse: z.string().min(1, "Response is required"),
  rating: z.number().int().min(1).max(5),
  notes: z.string().max(1000).optional(),
});

export const ContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  organization: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type Volunteer = z.infer<typeof VolunteerSchema>;
export type Eval = z.infer<typeof EvalSchema>;
export type Contact = z.infer<typeof ContactSchema>;

// ── Classifier ────────────────────────────────────────────────────────────────

export const ClassifierInputSchema = z.object({
  description: z.string().min(1, "Description is required"),
  urgency: z.enum(["Low", "Medium", "High"]).optional(),
  source: z.enum(["WhatsApp", "SMS", "In Person", "Email", "Other"]).optional(),
});

export const ClassifierOutputSchema = z.object({
  category: z.enum([
    "Volunteer Scheduling",
    "Feedback",
    "Event Logistics",
    "Communication",
    "Follow Up",
    "Technical Help",
    "Donation Support",
    "Other",
  ]),
  priority: z.enum(["Low", "Medium", "High"]),
  summary: z.string(),
  suggested_owner_role: z.string(),
  next_action: z.string(),
  deadline: z.string().nullable(),
  confidence: z.number().min(0).max(1),
  originalDescription: z.string(),
});

export type ClassifierInput = z.infer<typeof ClassifierInputSchema>;
export type ClassifierOutput = z.infer<typeof ClassifierOutputSchema>;

// ── Volunteer Portal ───────────────────────────────────────────────────────────

export const VolunteerAssignmentSchema = z.object({
  id: z.string(),
  title: z.string(),
  time: z.string(),
  location: z.string(),
  description: z.string(),
  skillLevel: z.enum(["Easy", "Medium", "Experienced"]),
  totalSpots: z.number().int().positive(),
  filledSpots: z.number().int().min(0),
});

export const VolunteerAssignmentsSchema = z.array(VolunteerAssignmentSchema);

export const CurrentVolunteerAssignmentSchema = z.object({
  volunteerName: z.string().min(1, "Name is required"),
  contact: z.string().min(1, "Contact is required"),
  note: z.string().optional(),
  assignmentId: z.string(),
  assignedAt: z.string(),
});

export type VolunteerAssignment = z.infer<typeof VolunteerAssignmentSchema>;
export type CurrentVolunteerAssignment = z.infer<typeof CurrentVolunteerAssignmentSchema>;
