import type { ClassifierInput } from "./schemas";

export const SAMPLE_REQUESTS: ClassifierInput[] = [
  {
    description: "Radhe Radhe, we need 5 volunteers for Sunday prasad serving before 9 AM.",
    source: "WhatsApp",
  },
  {
    description: "The donation receipt link is not working for some yajmans.",
    source: "Email",
  },
  {
    description: "Please send a WhatsApp announcement for tomorrow's youth program.",
    source: "In Person",
  },
  {
    description: "We need extra chairs near the main hall before the event starts.",
    source: "SMS",
  },
  {
    description: "A yajman asked for someone to call them back about sponsorship.",
    source: "WhatsApp",
  },
  {
    description: "The QR code for feedback is confusing.",
    source: "In Person",
  },
  {
    description: "Parking volunteers need instructions before 8 AM.",
    urgency: "High",
    source: "WhatsApp",
  },
  {
    description: "Can someone update the spreadsheet with new volunteer names?",
    source: "Email",
  },
];
