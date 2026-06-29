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
