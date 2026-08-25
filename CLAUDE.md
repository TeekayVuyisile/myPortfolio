# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A single-page personal portfolio site (Teekay Manale) built with Create React App. All sections (Hero, About, Experience, Projects, Skills, Education, References, Contact) are rendered on one page and navigated via anchor links (`#home`, `#about`, etc.) — there is no react-router routing despite `react-router-dom` being a dependency.

## Commands

- `npm start` — run the dev server (CRA) at http://localhost:3000
- `npm run build` — production build to `build/`
- `npm test` — run tests via `react-scripts test` (Jest + React Testing Library) in interactive watch mode
- `npm test -- --watchAll=false` — run tests once (non-interactive, e.g. for CI/scripting)
- `npm test -- -t "test name"` — run a single test by name
- `npm test src/App.test.js` — run a single test file

There is no lint script defined; CRA's built-in ESLint (`react-app` config) surfaces warnings in the dev server/build output only.

## Architecture

- **Composition root**: `src/App.js` wraps everything in `ThemeProvider` and renders section components in a fixed order. Sections are plain components with `id` attributes (e.g. `id="contact"`) that the nav bar links scroll to — no router.
- **Theming**: `src/context/ThemeContext.js` provides `useTheme()` (`isDarkMode`, `toggleTheme`), persists the choice to `localStorage` under `portfolio-theme`, and applies it by wrapping children in a `.dark-theme` / `.light-theme` div. All colors are CSS custom properties defined in `src/App.css` (`:root` sets `--dark-*`/`--light-*` values; `.dark-theme`/`.light-theme` remap them to theme-agnostic vars like `--bg`, `--text-primary`, `--primary-blue`). When adding UI, use the existing `--*` custom properties rather than hardcoding colors, so both themes stay correct.
- **Styling**: nearly all CSS lives in one large file, `src/App.css` (~3500 lines) — there's no CSS-modules or per-component stylesheet convention. Bootstrap and `react-bootstrap` are available but most components use hand-rolled class names matching sections in `App.css`. `react-bootstrap-icons` is the icon library used throughout (see `Header.js`, `Contact.js`).
- **Contact form flow**: `Contact.js` POSTs JSON to `/api/send-email`. The handler is `api/send-email.js`, a Vercel-style serverless function (`module.exports = async (req, res) => ...`) using `nodemailer` with Gmail SMTP, reading `EMAIL_USER`/`EMAIL_PASS` from environment variables (see `.env`, gitignored). `src/utils/emailService.js` exists but is currently empty/unused.
- **AI assistant (recruiter Q&A)**: `src/components/ChatWidget.js` is a floating chat widget (rendered globally from `App.js`, fixed-position so it floats over every section) that POSTs `{ messages: [...] }` to `/api/chat`. The handler, `api/chat.js` (same Vercel-style serverless convention as `send-email.js`), prepends a system prompt plus a static knowledge base (`api/_knowledge.js`) describing Teekay's background, then calls the Groq chat completions API (`GROQ_API_KEY` env var; model defaults to `openai/gpt-oss-120b`, overridable via `GROQ_MODEL`). The knowledge base is a plain-text module maintained by hand — it is **not** generated from the component data, so when About/Experience/Projects/Skills/Education content changes, update `api/_knowledge.js` to match or the assistant will answer with stale info.
- **Local dev proxy for `/api/*`**: neither serverless function is wired into CRA's dev server by default — Vercel maps `api/*.js` to routes automatically in production, but `npm start` alone will 404 on them. `server/dev-server.js` is a small Express app (dev-only, not deployed) that mounts both handlers on `http://localhost:5001`; `package.json`'s `"proxy"` field points CRA's dev server at that port, so `/api/send-email` and `/api/chat` work locally too. Run `npm run dev:api` in a second terminal alongside `npm start` to exercise either endpoint during development.
- **Assets**: project screenshots for `Projects.js` live under `public/images/<ProjectName>/N.png`; profile images under `public/images/`.
- **Content-as-code**: section content (project descriptions, skills, education entries, experience history) is defined inline as JS arrays/objects within each component file (e.g. `Projects.js`, `Skills.js`, `Education.js`), not pulled from a CMS or JSON data file. To update portfolio content, edit the relevant component directly.
