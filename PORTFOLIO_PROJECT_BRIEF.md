# PDD — Programme Delivery Dashboard

## One-line summary
A real-time, collaborative web application built for my employer to replace manual, Excel-based project tracking with a live single source of truth for portfolio, task, KPI, and risk management across teams.

## Context
Built for internal use at the organisation I work for, to solve a real operational problem: departments were tracking dozens of initiatives in scattered spreadsheets with no shared visibility, no audit trail, and no way to see status changes as they happened. I designed and built the full system — schema, backend API, real-time layer, and frontend — and it has continued to evolve through active use, with new modules (financial-year restructuring, KPI tracking, AI-assisted reporting) added in response to real usage feedback rather than built speculatively upfront.

## My role
Sole developer — architecture, database design, backend API, real-time infrastructure, frontend, and ongoing feature iteration driven directly by end-user feedback from the organisation.

## Tech stack
- **Backend:** Node.js, Express 5, PostgreSQL (raw SQL via `pg`, no ORM), Socket.IO for real-time updates, JWT auth with email OTP verification
- **Frontend:** React 19 (Vite), react-router, react-bootstrap, Framer Motion, Recharts, Leaflet/react-leaflet for maps, TipTap for rich text, @hello-pangea/dnd for drag-and-drop Kanban
- **AI integration:** Google Gemini as primary provider with Groq as an automatic fallback (multi-provider chain with retry/backoff), used to generate narrative analysis in reports rather than just templated text
- **Document generation:** `docx` for Word report generation, `exceljs` for Excel import/export, `pdf-lib`
- **Other:** node-cron for scheduled jobs (automatic snapshotting), Mapbox for location geocoding

## Core problem it solves
Replacing spreadsheet-based portfolio tracking with:
- One shared, permissioned source of truth per team/department ("workspace")
- Live visibility into task and project status changes as they happen — not end-of-week reports
- A structured way to track KPIs, risks, and progress narratives tied to a government-style Financial Year / quarterly cycle
- Automated, AI-assisted report generation for stakeholders instead of manually compiled status decks

## Key features

**Portfolio dashboard & collaboration**
- Owned vs. shared-with-me workspaces, each with granular Owner/Editor/Viewer permissions
- Instant shareable invite links; access can be revoked immediately
- Live activity stream and real-time updates across all connected clients via Socket.IO (task edits, new comments, status changes appear instantly for every viewer)

**Intelligent Excel import**
- Uploads legacy `.xlsx` trackers, auto-detects header rows within the first 20 rows (skipping titles/blank rows), and lets the user interactively map their columns to the system's schema before import
- Validates mandatory fields, date formats, and status values with a review step before committing

**Dual-view project tracking**
- Spreadsheet-style table view and a drag-and-drop Kanban board over the same underlying data
- Each project opens into a dedicated workspace: a task list, task-level assignees, rich-text descriptions, and a narrative progress-update stream

**Financial Year / KPI system** (the most architecturally involved part of the system)
- Projects are organised into government-style Financial Year cycles (Apr–Mar, fixed Q1–Q4 quarter calendar) with a guided setup wizard
- Top-level KPIs ("Output Indicators") with annual and per-quarter targets, linked to the projects that contribute to them
- Progress updates, risks, achievements, and challenges are explicitly tagged to the quarter they occurred in (not just inferred from a timestamp), so per-quarter reports show exactly what happened in that quarter even for projects that span multiple quarters
- Grace-period/reopen rules for closed financial years, with automatic point-in-time snapshots at quarter/year boundaries via a scheduled job

**Risk register & multi-location project tracking**
- Structured risk entries per project with impact/likelihood ratings and a status history
- Projects can have different locations per quarter (multi-site initiatives), searched via Mapbox autocomplete or entered as raw coordinates for sites with no street address, with the result validated and pinned on an interactive Leaflet map

**AI-assisted report generation**
- Generates Word documents for quarterly/annual reports combining real logged data (progress updates, risks, achievements, challenges) with AI-written narrative analysis (executive summaries, reasoning over the raw data) layered on top of — not replacing — the literal record
- Multi-provider AI chain: Gemini primary, Groq as an automatic fallback under rate-limiting/overload, deterministic template as a final fallback — with an honest on-document indicator of whether AI narrative was actually used for that report, so the system never silently claims more than it did

**Governance & accountability**
- Immutable audit log capturing who changed what, when, and from where, across the whole system
- Threaded, real-time discussion drawers on tables and tasks

## Scale / shape of the system
- ~7 core database tables in the base schema, expanded over time through incremental, idempotent migrations as the Financial Year/KPI system was added
- ~19 backend route groups / controllers (auth, tables, tasks, comments, risks, achievements, challenges, KPIs, financial years, programmes, reports, snapshots, sharing, access requests, analytics, documents, Excel import/export)
- Full real-time layer, not bolted on: controllers emit domain events after every successful write so every connected client reflects state changes without polling

## Notable technical decisions worth highlighting
- **No ORM** — raw SQL with a layered routes → controllers → models structure, keeping full control over query shape and transactions (e.g. multi-location inserts run inside explicit `BEGIN`/`COMMIT` transactions)
- **Idempotent migrations with no framework** — schema evolves via `CREATE TABLE IF NOT EXISTS` / `ALTER TABLE ... ADD COLUMN IF NOT EXISTS` run automatically on server startup, which let the system evolve significantly (new FY/KPI subsystem) without any downtime or manual migration step
- **Honest AI reporting** — deliberately built to disclose when AI generation degraded to a fallback rather than silently presenting a lesser report as if it were the full AI-assisted version
- **Defense-in-depth data validation** — e.g. manually-entered map coordinates are validated both client-side (inline) and server-side (sanitized before persistence), because a single malformed coordinate could otherwise break map rendering for an entire team's view

## Suggested portfolio framing
This project is best presented as a full-stack, real-world system built to solve an actual workplace problem — not a tutorial project. Worth emphasizing: end-to-end ownership (schema through UI), the real-time collaboration layer, the iterative evolution of the Financial Year/KPI system in direct response to organisational needs, and the AI-integration work (multi-provider fallback, and the deliberate choice to be transparent about when AI was actually used).
