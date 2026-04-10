# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start Vite dev server on port 3000 (hot reload)
pnpm build        # Build frontend (Vite → dist/public/) + server (esbuild → dist/index.js)
pnpm start        # Run production server (NODE_ENV=production node dist/index.js)
pnpm check        # TypeScript type-check (no emit)
pnpm format       # Prettier formatting
```

No test runner is configured yet (Vitest is installed but tests don't exist).

## Architecture

This is a **full-stack SPA**: a React 19 + TypeScript frontend (Vite) with a minimal Express.js backend that only serves static files and handles SPA fallback routing.

### Key Layout

```
client/src/
  App.tsx              # Root: ThemeProvider, TooltipProvider, wouter Router, ErrorBoundary
  pages/               # One component per route (11 routes total)
  components/          # Reusable UI; components/ui/ = shadcn/ui primitives
  lib/                 # All static data (no API calls to backend for data)
  hooks/               # Custom hooks (mobile detection, IME composition)
  contexts/            # ThemeContext (light/dark, persisted to localStorage)
shared/
  const.ts             # Constants shared between client and server (cookie names, etc.)
server/
  index.ts             # Express server — static files + SPA catch-all only
```

### Path Aliases

- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`

### Routing (wouter)

Routes defined in `App.tsx`. All data is client-side; the server never handles API routes.

| Path | Page |
|------|------|
| `/` | Home — landing + risk legend + assessment tool |
| `/assessment` | Risk Assessment Tool |
| `/providers` | AI Providers database |
| `/checklist` | Compliance Audit Checklist |
| `/calculator` | Risk Score Calculator |
| `/report` | Compliance Report Generator |
| `/comparison` | Side-by-side provider comparison |
| `/dashboard` | Analytics Dashboard (Recharts) |
| `/history` | Provider version history |
| `/profiles` | Custom Risk Profiles |
| `/export` | Export assessments |

### Data Layer

All application data lives in `client/src/lib/`:

- **`aiProvidersData.ts`** — Single source of truth for all AI providers (OpenAI, Google, Anthropic, Microsoft), their versions/plans, risk levels, compliance certifications, and source URLs. This is the core data file.
- `complianceChecklistData.ts` / `complianceData.ts` — Compliance standards data
- `providerHistoryData.ts` — Provider version change history
- `riskProfilesData.ts` — Pre-defined risk assessment profiles

The `RiskLevel` type is `'low' | 'medium' | 'high' | 'very-high'`.

### UI Stack

- **shadcn/ui** (new-york style) with Radix UI primitives in `components/ui/`
- **Tailwind CSS v4** with CSS variables for theming
- **Recharts** for charts on the Dashboard
- **Framer Motion** for animations
- **React Hook Form + Zod** for form validation
- **Sonner** for toast notifications
- **html2pdf.js** for PDF export

### Build

Two-step build in `package.json`:
1. `vite build` — compiles React frontend to `dist/public/`
2. `esbuild` — bundles `server/index.ts` to `dist/index.js`
