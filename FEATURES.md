# SevaFlow AI — Feature Reference

Complete reference for every feature in SevaFlow AI.

---

## AI Request Classifier

### Input
- Free-form text describing a community or volunteer request
- Accepted in any language style: formal, informal, WhatsApp shorthand, temple greetings
- No minimum or maximum length enforced

### Classification Categories
Eight mutually exclusive output categories:

| Category | Description |
|---|---|
| Volunteer Scheduling | Requests for volunteers, seva assignments, shift coverage |
| Feedback | Suggestions, complaints, improvement ideas from yajmans or volunteers |
| Event Logistics | Physical setup, equipment, seating, hall arrangements |
| Communication | Announcements, messages, broadcast requests |
| Follow Up | Tasks requiring coordinator follow-up with specific people |
| Technical Help | Website, registration form, app, or tech issues |
| Donation Support | Receipts, invoices, contribution records |
| Other | Requests that do not fit any above category |

### Priority Levels
Three priority levels assigned by keyword detection:

| Priority | Examples |
|---|---|
| High | urgently, asap, immediately, emergency, broken, right now, today, before 9 AM |
| Medium | this week, soon, check, follow up |
| Low | everything else |

### Output Fields
All output validated against `ClassifierOutputSchema` (Zod):

| Field | Type | Description |
|---|---|---|
| `category` | string | One of the 8 categories above |
| `priority` | string | "High", "Medium", or "Low" |
| `summary` | string | ≤90 character action summary |
| `suggested_owner_role` | string | The coordinator role best suited to handle this |
| `next_action` | string | Specific immediate action for the owner |
| `deadline` | string | Extracted deadline or "Not specified" |
| `confidence` | number | 0.0 – 1.0 |
| `originalDescription` | string | The original unmodified input |

### Mock Mode vs Real LLM
- **Default (mock):** `lib/mock-classifier.ts` — keyword-based engine, deterministic, no network
- **Real LLM:** Set `ANTHROPIC_API_KEY` in `.env.local` — switches to Anthropic API call
- Both modes return the same output shape; the Zod validation layer is shared

---

## Interactive Demo

Located at `/demo` and embedded on the home page (`/`).

### Textarea Input
- Multi-line free text — type any community request
- Automatically validates on submit

### Sample Request Buttons
8 pre-written sample requests covering all major categories:

1. Volunteer Scheduling (High) — prasad serving volunteers before 9 AM
2. Volunteer Scheduling (Low) — afternoon shift at the entrance
3. Feedback (Low) — yajman suggestion about the process
4. Event Logistics (High) — extra chairs before today's event
5. Event Logistics (Low) — stage and equipment arrangement
6. Communication (High) — WhatsApp announcement immediately
7. Follow Up (Medium) — coordinator check-in this week
8. Technical Help (High) — registration form broken, fix ASAP

### Processing UX
- 480ms simulated delay with loading spinner
- "Classifying request…" indicator during processing
- Error state shows if classification fails

### Result Card
- Category badge (color-coded per category)
- Priority badge (green/amber/red)
- Confidence progress bar
- 2-column field layout: summary, suggested owner, next action, deadline
- Original input shown below main fields

### JSON Output Panel
- Dark terminal background
- Per-token syntax highlighting: keys in blue, strings in yellow, numbers in purple
- One-click copy-to-clipboard button
- Collapses gracefully on mobile

---

## Volunteer Assignment Portal

Located at `/volunteer`.

### Roles Display
6 seva roles pre-loaded in `lib/volunteer-data.ts`:

| Role | Slots | Time | Location | Skill |
|---|---|---|---|---|
| Prasad Serving | 8 | 9:00 AM – 11:00 AM | Main Hall | Beginner |
| Entrance Welcome | 4 | 8:30 AM – 10:00 AM | Front Entrance | Beginner |
| Event Setup | 6 | 7:30 AM – 9:00 AM | Main Hall | Experienced |
| Kids Activity Lead | 3 | 10:00 AM – 12:00 PM | Community Room | Experienced |
| Cleaning & Closing | 5 | 11:30 AM – 1:00 PM | Full Venue | Beginner |
| Registration Desk | 4 | 8:00 AM – 11:00 AM | Lobby | Experienced |

### Assignment Cards
Each card displays:
- Role name and description
- Total spots and open spots
- Time slot and location
- Skill level badge
- Status badge: Open / Almost Full (≤30% spots left) / Full
- Action button: "Select Assignment →" (disabled when Full)
- "Your Assignment" badge when this is the volunteer's current role

### Sign Up Form
Fields:
- **Volunteer Name** — required, non-empty
- **Contact (email or phone)** — required, non-empty
- **Note for Coordinator** — optional, any text

Validation:
- Inline error messages on submit attempt without required fields
- No external validation library — pure string checks

### State Machine
```
browse → signup → my-assignment → change → my-assignment
                ↓
browse (on release)
```

Four views managed by `VolunteerPortal.tsx`:
- `browse` — card grid with assignment cards and Select buttons
- `signup` — sign-up form for the selected role
- `my-assignment` — confirmed assignment with Change and Release controls
- `change` — ChangeAssignmentPanel with all roles and atomic update

### Persistence
- All volunteer state stored in `localStorage` under two keys:
  - `sevaflow_assignments` — full array of VolunteerAssignment objects
  - `sevaflow_current_volunteer` — CurrentVolunteerAssignment or null
- SSR-safe: all localStorage reads wrapped in `typeof window !== "undefined"` checks
- Hydration-safe: VolunteerPortal uses `mounted` state pattern — shows spinner on server render, reads from localStorage after first client paint

### Spot Count Logic
- Spot counts computed from `openSpots` field on each VolunteerAssignment
- `openSpots` decrements on sign-up, increments on release
- Change assignment: old role's `openSpots++`, new role's `openSpots--` in a single state update
- Counts persist to `localStorage` on every change

### Change Assignment Flow
1. Volunteer clicks "Change Assignment" from my-assignment view
2. ChangeAssignmentPanel shows all roles; current role marked "Your Assignment"
3. Volunteer selects a new role — stored in local `pendingId` state
4. "Confirm Change" button enables when a different open role is selected
5. On confirm: spot counts update atomically, view transitions to my-assignment

### Release Assignment Flow
1. Volunteer clicks "Release Spot" from my-assignment view
2. Inline confirm text appears ("Are you sure? This will free your spot.")
3. Confirm → spot count restored, volunteer data cleared, view returns to browse

---

## Evaluation System

Located at `/evals`.

### Test Cases (`lib/evals/test-cases.ts`)
10 hand-labelled inputs covering all 8 categories:

| ID | Category | Priority |
|---|---|---|
| VS-001 | Volunteer Scheduling | High |
| VS-002 | Volunteer Scheduling | Low |
| FB-001 | Feedback | Low |
| EL-001 | Event Logistics | High |
| EL-002 | Event Logistics | Low |
| CM-001 | Communication | High |
| FU-001 | Follow Up | Medium |
| TH-001 | Technical Help | High |
| DS-001 | Donation Support | Low |
| OT-001 | Other | Low |

### Pass Criteria
All three must be true simultaneously:
1. Schema validation passes (`ClassifierOutputSchema.safeParse()`)
2. Actual category === expected category
3. Actual priority === expected priority

### Aggregate Metrics
- `total` — number of test cases run
- `passed` — count with `passed === true`
- `failed` — `total - passed`
- `passRate` — `passed / total` (0.0 – 1.0)
- `allSchemaValid` — true only if every result has `schemaValid === true`

### Results Table
Per row:
- Test case ID and truncated input
- Expected category and expected priority (with ✓/✗ match indicator)
- Actual category and actual priority (highlighted red on mismatch)
- Pass/Fail badge in last column

### Live Rendering
- `app/evals/page.tsx` is an `async` server component
- Calls `await runEvals()` on every page render — no caching, always live
- Pass rate drives color theming: ≥90% emerald, ≥70% amber, <70% red

---

## Documentation Pages

### `/docs` — Technical Documentation
9 sections with sidebar navigation:
1. Overview
2. Problem
3. Solution
4. AI Workflow
5. Volunteer Portal
6. Evaluation System
7. Tech Stack
8. Schema Reference
9. Getting Started

### `/case-study` — Product Case Study
10 sections with breadcrumb + gradient hero:
1. Overview
2. The Problem
3. Target Users
4. Key Requirements
5. Solution Approach
6. Technical Decisions
7. Volunteer Portal Design
8. Evaluation System Design
9. Lessons Learned
10. Roadmap

---

## Navigation

### Navbar
- Sticky top bar on all pages
- Links: Home, Demo, Volunteer, Evals, Docs, Case Study
- Active state highlights current route
- Mobile-responsive

### Footer
- Site description
- Navigation links
- Copyright

---

## Static Home Page Sections

1. **Hero** — headline, description, primary CTA to `/demo`, secondary to `/volunteer`
2. **Problem** — 4 problem statement cards
3. **Solution** — feature overview + live JSON block (pre-rendered from a sample input)
4. **How It Works** — 4-step workflow pipeline
5. **Demo** — embedded interactive classifier (same component as `/demo`)
6. **Volunteer Preview** — portal overview with CTA to `/volunteer`
7. **Skills** — card grid of technical skills demonstrated
