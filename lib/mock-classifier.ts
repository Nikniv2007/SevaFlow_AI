import type { ClassifierInput, ClassifierOutput } from "./schemas";

type Category = ClassifierOutput["category"];
type Priority = ClassifierOutput["priority"];

// Insertion order matters — earlier entries win ties in keyword count matching
const CATEGORY_KEYWORDS: Record<Category, string[]> = {
  "Volunteer Scheduling": [
    "volunteer", "volunteers", "signup", "shift", "available",
    "help needed", "serving", "setup help",
  ],
  "Feedback": [
    "feedback", "complaint", "suggestion", "confusing", "issue",
    "improvement", "yajman said",
  ],
  "Event Logistics": [
    "parking", "chairs", "setup", "food", "stage", "hall",
    "event", "prasad", "equipment",
  ],
  "Communication": [
    "announce", "announcement", "message", "whatsapp", "reminder",
    "send", "text", "sms",
  ],
  "Follow Up": [
    "call back", "follow up", "check with", "remind", "contact", "reach out",
  ],
  "Technical Help": [
    "website", "form", "link", "qr", "spreadsheet", "technical",
    "not working", "broken",
  ],
  "Donation Support": [
    "donation", "receipt", "payment", "sponsorship", "invoice", "contribution",
  ],
  "Other": [],
};

const HIGH_KEYWORDS = [
  "urgent", "today", "asap", "immediately",
  "before event", "tomorrow", "before 9 am", "before 8 am",
];
const MEDIUM_KEYWORDS = ["soon", "this week", "follow up", "check"];

const OWNER_ROLES: Record<Category, string> = {
  "Volunteer Scheduling": "Volunteer Coordinator",
  "Feedback": "Feedback Coordinator",
  "Event Logistics": "Event Operations Lead",
  "Communication": "Communications Lead",
  "Follow Up": "Outreach Coordinator",
  "Technical Help": "Technical Support Volunteer",
  "Donation Support": "Donation Coordinator",
  "Other": "Operations Coordinator",
};

const NEXT_ACTIONS: Record<Category, string> = {
  "Volunteer Scheduling": "Confirm availability and assign volunteer slots",
  "Feedback": "Route to feedback coordinator for acknowledgement and logging",
  "Event Logistics": "Notify event operations lead to arrange logistics",
  "Communication": "Draft and send announcement via the specified channel",
  "Follow Up": "Assign outreach coordinator to make contact",
  "Technical Help": "Escalate to technical support volunteer to investigate",
  "Donation Support": "Connect yajman with donation coordinator for documentation",
  "Other": "Review with operations coordinator and assign appropriately",
};

function detectCategory(text: string): { category: Category; confidence: number } {
  const lower = text.toLowerCase();

  const scores = (
    Object.entries(CATEGORY_KEYWORDS) as [Category, string[]][]
  )
    .filter(([cat]) => cat !== "Other")
    .map(([cat, keywords]) => ({
      cat,
      count: keywords.filter((kw) => lower.includes(kw.toLowerCase())).length,
      total: keywords.length,
    }))
    .filter(({ count }) => count > 0);

  if (scores.length === 0) return { category: "Other", confidence: 0.6 };

  // Stable sort: descending score; ties preserve insertion order (defined above)
  scores.sort((a, b) => b.count - a.count);

  const { cat, count, total } = scores[0];
  const confidence = Math.round(Math.min(0.95, 0.65 + (count / total) * 0.35) * 100) / 100;

  return { category: cat, confidence };
}

function detectPriority(text: string, urgency?: ClassifierInput["urgency"]): Priority {
  if (urgency) return urgency;
  const lower = text.toLowerCase();
  if (HIGH_KEYWORDS.some((kw) => lower.includes(kw))) return "High";
  if (MEDIUM_KEYWORDS.some((kw) => lower.includes(kw))) return "Medium";
  return "Low";
}

function detectDeadline(text: string): string | null {
  const lower = text.toLowerCase();
  if (lower.includes("before 9 am") || lower.includes("before 9am")) return "Before 9 AM";
  if (lower.includes("before 8 am") || lower.includes("before 8am")) return "Before 8 AM";
  if (lower.includes("before event")) return "Before event";
  if (lower.includes("today") || lower.includes("asap") || lower.includes("immediately")) return "Today";
  if (lower.includes("tomorrow")) return "Tomorrow";
  if (lower.includes("this week")) return "This week";
  return null;
}

function summarize(text: string): string {
  const trimmed = text.trim();
  return trimmed.length <= 90 ? trimmed : trimmed.slice(0, 87) + "...";
}

export function mockClassify(input: ClassifierInput): ClassifierOutput {
  const { description, urgency } = input;
  const { category, confidence } = detectCategory(description);

  return {
    category,
    priority: detectPriority(description, urgency),
    summary: summarize(description),
    suggested_owner_role: OWNER_ROLES[category],
    next_action: NEXT_ACTIONS[category],
    deadline: detectDeadline(description),
    confidence,
    originalDescription: description,
  };
}
