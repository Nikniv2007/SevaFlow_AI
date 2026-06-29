# SevaFlow AI

AI-powered volunteer coordination platform. Connects skilled volunteers with nonprofits using intelligent matching, structured workflows, and post-engagement evaluations.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Key Principles

- **Local-first** — runs entirely on your machine, no cloud service required
- **No database** — all data is in-memory and schema-validated at the edge
- **No API key required** — the full website runs without any external API keys
- **Instant setup** — `npm install && npm run dev` is all you need

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Validation | Zod |
| Testing | Vitest |

## Project Structure

```
app/
  page.tsx          # Home — hero, problem, how it works, skills, CTA
  demo/page.tsx     # Interactive demo walkthrough
  volunteer/page.tsx  # Volunteer registration portal
  evals/page.tsx    # Engagement evaluations dashboard
  docs/page.tsx     # Documentation
  case-study/page.tsx # Nonprofit case study
  layout.tsx        # Root layout (Navbar + Footer)
  globals.css       # Global styles

components/
  Navbar.tsx        # Sticky responsive navigation
  Footer.tsx        # Site footer with links
  Badge.tsx         # Colored label badge component

lib/
  schemas.ts        # Zod schemas: VolunteerSchema, EvalSchema, ContactSchema

tests/
  schema.test.ts    # Vitest unit tests for all schemas
```

## Running Tests

```bash
npm run test
```

Runs all Vitest schema validation tests.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in keys only if you need AI features:

```env
ANTHROPIC_API_KEY=   # optional
OPENAI_API_KEY=      # optional
```

The site runs fully without these keys.

## Pages

| Route | Description |
|---|---|
| `/` | Home — marketing landing page |
| `/demo` | Interactive demo walkthrough |
| `/volunteer` | Volunteer registration form |
| `/evals` | Engagement evaluation dashboard |
| `/docs` | Documentation and schema reference |
| `/case-study` | Nonprofit success story |
