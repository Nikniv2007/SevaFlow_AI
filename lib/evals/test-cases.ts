export interface EvalTestCase {
  id: string;
  input: string;
  expectedCategory: string;
  expectedPriority: string;
}

// Inputs are crafted so keyword matches are unambiguous.
// See lib/mock-classifier.ts for the full keyword table.
export const TEST_CASES: EvalTestCase[] = [
  {
    id: "VS-001",
    input: "We urgently need volunteers for Sunday prasad serving before 9 AM. Can anyone help?",
    expectedCategory: "Volunteer Scheduling",
    expectedPriority: "High",
    // "volunteers"(VS) + "serving"(VS) > "prasad"(EL); "urgent" + "before 9 am" → High
  },
  {
    id: "VS-002",
    input: "We need a volunteer for the afternoon shift at the entrance.",
    expectedCategory: "Volunteer Scheduling",
    expectedPriority: "Low",
    // "volunteer"(VS) + "shift"(VS); no priority keywords
  },
  {
    id: "FB-001",
    input: "A yajman said the process was confusing and shared a suggestion for improvement.",
    expectedCategory: "Feedback",
    expectedPriority: "Low",
    // "yajman said"(FB) + "confusing"(FB) + "suggestion"(FB) + "improvement"(FB) = 4; no priority keywords
  },
  {
    id: "EL-001",
    input: "We need extra chairs arranged in the hall before the event today.",
    expectedCategory: "Event Logistics",
    expectedPriority: "High",
    // "chairs"(EL) + "hall"(EL) + "event"(EL) = 3; "today" → High
  },
  {
    id: "EL-002",
    input: "Please arrange the stage and equipment in the hall before the event.",
    expectedCategory: "Event Logistics",
    expectedPriority: "Low",
    // "stage"(EL) + "equipment"(EL) + "hall"(EL) + "event"(EL) = 4; no priority keywords
    // Note: "before the event" ≠ "before event" substring; no HIGH match
  },
  {
    id: "CM-001",
    input: "Please send a WhatsApp announcement to all members immediately.",
    expectedCategory: "Communication",
    expectedPriority: "High",
    // "announcement"(CM) + "whatsapp"(CM) + "send"(CM) = 3; "immediately" → High
  },
  {
    id: "FU-001",
    input: "Someone needs to follow up with the families and check with the coordinator this week.",
    expectedCategory: "Follow Up",
    expectedPriority: "Medium",
    // "follow up"(FU) + "check with"(FU) = 2; "follow up" + "check" + "this week" → Medium
  },
  {
    id: "TH-001",
    input: "The registration link is not working and the form is broken. Please fix it asap.",
    expectedCategory: "Technical Help",
    expectedPriority: "High",
    // "link"(TH) + "not working"(TH) + "broken"(TH) + "form"(TH) = 4; "asap" → High
  },
  {
    id: "DS-001",
    input: "A yajman needs a donation receipt and invoice for their contribution.",
    expectedCategory: "Donation Support",
    expectedPriority: "Low",
    // "donation"(DS) + "receipt"(DS) + "invoice"(DS) + "contribution"(DS) = 4; no priority keywords
  },
  {
    id: "OT-001",
    input: "Please coordinate with the regional temple for the upcoming anniversary celebration.",
    expectedCategory: "Other",
    expectedPriority: "Low",
    // No keywords match any non-Other category; no priority keywords
  },
];
