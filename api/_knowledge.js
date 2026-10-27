// Plain-text knowledge base fed to the AI assistant as context.
// Keep this in sync manually with the portfolio content in src/components/*.js
// (About.js, Experience.js, Projects.js, Skills.js, Education.js, References.js, Contact.js)
// whenever that content changes.

module.exports = `
IDENTITY
Name: Teekay Vuyisile Manale
Role: Full Stack Web Developer
Location: South Africa
Availability: Available for new projects. Usual response time within 24 hours.

ABOUT
Teekay is a Full-Stack Web Developer with a Diploma in ICT and hands-on experience building
responsive, user-friendly web applications. He is skilled in front-end and back-end development,
database management, and cloud technologies. He follows Agile methodologies, focuses on clean
code principles, and prioritizes user-centered design in his projects.

Quick stats: 8 personal projects deployed live, 3 client systems delivered, 6+ technologies used regularly,
100% client satisfaction on delivered work.

WORK EXPERIENCE

1. Junior Full Stack Web Developer — Department of Economic Development & Tourism (DEDAT)
   May 2026 - Present
   - Hired full-time by DEDAT after completing the internship below.
   - Maintains and supports the internal Learning Management System (LMS) built during his
     internship: resolving bugs, handling feature requests, monitoring performance and reliability,
     and shipping updates across the React frontend and Node.js/PostgreSQL backend.
   - Sole developer of the "Programme Delivery Dashboard": a real-time, collaborative dashboard that
     replaced manual Excel-based tracking with a live single source of truth for portfolio, task,
     KPI, and risk management across departments. Designed the PostgreSQL schema and built a
     Node.js/Express REST API (layered routes -> controllers -> models, no ORM, including
     transactional multi-location inserts). Implemented real-time updates with Socket.IO so task
     edits, comments, and status changes propagate instantly. Built the React (Vite) frontend,
     including a dual-view spreadsheet/Kanban project tracker and interactive Leaflet/Mapbox
     multi-site location tracking. Built an intelligent Excel import pipeline with auto column
     mapping and validation. Built a Financial Year/KPI subsystem for government-style quarterly
     reporting with automatic snapshotting. Integrated AI-assisted report generation (Google Gemini
     with a Groq fallback) to produce Word/Excel reports combining logged data with narrative
     analysis. Implemented JWT authentication with email OTP verification and an immutable audit
     log for governance and accountability.
   - Technologies: HTML, CSS, Bootstrap, React, Node.js, Express, PostgreSQL, Socket.IO, Vite,
     REST API, JWT, Google Gemini AI, Leaflet, Mapbox, Git.

2. Full Stack Web Developer Intern — Awrise Internship (hosted by DEDAT)
   Mar 2025 - Mar 2026
   - Developed a full-featured Learning Management System (LMS) to improve internal training and
     e-learning processes: responsive HTML/CSS/Bootstrap/React interfaces, RESTful APIs with
     Node.js, and PostgreSQL for data management. Collaborated with stakeholders to gather
     requirements, troubleshoot issues, and deliver scalable solutions.
   - Led end-to-end development of the "Educational Intervention Management System" (Awrise
     initiative): a platform for managing learner assessments and materials, attendance tracking
     with digital sign-offs, and performance analytics dashboards. Built responsive React/Bootstrap
     interfaces and Node.js (REST API) + PostgreSQL backend services.
   - Technologies: HTML, CSS, Bootstrap, React, Node.js, Express, PostgreSQL, REST API, Git.

PERSONAL PROJECTS (listed strongest first; all are personal builds, deployed live with a GitHub repo.
His work systems at DEDAT and Awrise are described under WORK EXPERIENCE above, not here.)

1. Tender Insight Hub (eTender system). Multi-tenant SaaS helping South African SMEs find public
   tenders, understand the bid documents and assess where they can win, built on live National
   Treasury OCDS eTenders data synced every 6 hours. AI summaries of 50-150 page bid packs (PyMuPDF,
   python-docx, Groq LLM, validated with Pydantic); a transparent rule-based readiness score (CIDB,
   province, B-BBEE, experience, certifications, briefings); team workspace with bid pipeline, tasks
   and reminders; Free/Basic/Pro plans enforced on the server; public REST API with hashed API keys
   and rate limits. Redis is used for caching (searches ~1.2 s down to ~0.4 s), shared rate limits,
   and a Redis Stream job queue that survives restarts and shares one Groq token budget. Runs as a
   Docker Compose stack (nginx, FastAPI API, worker, PostgreSQL, MongoDB, Redis). 225 pytest tests;
   GitHub Actions CI with a SQLite/PostgreSQL matrix, migration drift checks and Docker image builds.
   Tech: Python, FastAPI, SQLAlchemy, Alembic, React 19, TypeScript, Tailwind CSS, TanStack Query,
   PostgreSQL, MongoDB, Redis, Docker, GitHub Actions, Render.
   Live: https://tender-insight-hub.onrender.com | Code: github.com/TeekayVuyisile/etender_system

2. SPU Events. Campus events platform for Sol Plaatje University in a TypeScript monorepo: event
   discovery, campus wallet payments, HMAC-signed QR tickets (work offline), phone-camera gate
   scanning, live check-in counts via server-sent events, admin dashboard, moderation and audit log.
   Money is an append-only ledger in integer cents; check-in is a single conditional UPDATE so two
   gates can't admit the same ticket (proven by a concurrency test); fixed a real overselling bug
   caused by PostgreSQL READ COMMITTED snapshots. Shared Zod schemas, axe-core accessibility checks.
   Tech: TypeScript, React 19, Express 5, Drizzle ORM, PostgreSQL (Neon), Zod, Tailwind CSS, Vitest,
   Supertest, GitHub Actions, Render.
   Live: https://spu-events.onrender.com | Code: github.com/TeekayVuyisile/spu-events

3. RouteOps: Field Route Optimization & Site Verification System. Mobile-first, installable,
   offline-first PWA for field teams: CSV/Excel site import, route optimization via OpenRouteService
   (up to 70 stops, with a local fallback), voice-guided driver mode, GPS-verified check-ins,
   checklists, compressed photo evidence, an IndexedDB offline outbox, trip reports to CSV/PDF.
   Supabase with row-level security per team. 300+ Vitest tests plus SQL tests in Docker; GitHub
   Actions CI. Tech: React 19, Vite, Zustand, Tailwind CSS, Leaflet, OpenRouteService, Supabase,
   Vercel Functions.
   Live: https://field-route-optimization-site-verif.vercel.app | Code:
   github.com/TeekayVuyisile/Field-Route-Optimization-Site-Verification-System

4. SignConnect. Accessible real-time video calling for Deaf and hearing people (built with South
   African Sign Language in mind): peer-to-peer WebRTC calls, live speech captions, on-device hand
   sign recognition with MediaPipe (no video uploaded), typed messages and read-aloud, sign lessons
   with a camera practice mode, WCAG AA design. The server only handles accounts and Socket.IO
   signaling. The current sign vocabulary is demo gestures; a proper SASL model is the next phase.
   Tech: React, WebRTC, Socket.IO, MediaPipe, Web Speech API, Node.js, Express, SQLite, Tailwind CSS.
   Live: https://signconnect-app.onrender.com | Code: github.com/TeekayVuyisile/SignConnect

5. EduLens LMS. Multi-school learning management system for South African Foundation Phase
   (Grade R-3): CAPS-aligned marks on the 7-level scale, parent access, AI-generated worksheets
   (Groq with model fallback), invite-only accounts with hashed single-use tokens, Excel register
   import with validation, school-scoped data isolation verified by security tests, and security
   hardening since the MVP (SQL injection, XSS and stored-password fixes). GitHub Actions CI.
   Tech: React 19, Node.js, Express 5, PostgreSQL (Neon), Groq, React Bootstrap, Render.
   Live: https://edulens-lms.onrender.com | Code: github.com/TeekayVuyisile/edulens_mvp

6. AI Travel Planner. Group trip planner: weather-aware AI itineraries (Groq with strict JSON
   schemas), places verified on OpenStreetMap, packing lists with reasons, group roles and voting,
   multi-currency shared expenses with minimal settle-up, a streaming trip assistant, PDF export,
   fallbacks for every external API. 56 tests, GitHub Actions CI. Tech: React 19, Node.js, Express,
   PostgreSQL, Groq, Leaflet, Tailwind CSS, TanStack Query.
   Live: https://ai-travel-assistant-cp6l.onrender.com | Code: github.com/TeekayVuyisile/AI-Travel-Planner

7. Mafia: The Underground Society. Real-time multiplayer social deduction game for 4-10 players:
   secret roles, private Mafia and graveyard chats, text-to-speech narrator, server-authoritative
   state with session-authenticated sockets, restart-proof rooms persisted to PostgreSQL, email and
   Google sign-in (Better Auth), XP, ranks and a leaderboard. Tech: React, Socket.IO, Node.js,
   Express 5, PostgreSQL (Neon), Better Auth, Framer Motion, Bootstrap.
   Live: https://mafia-game-opal.vercel.app | Code: github.com/TeekayVuyisile/mafia-game

8. AI Mock Interview Coach. Voice-driven mock interviews: questions tailored to an uploaded CV and
   job description (Google Gemini), spoken questions and live transcripts (Web Speech API), scored
   feedback across five categories. CVs are parsed in serverless functions and never stored.
   Tech: React, Vite, Vercel Serverless, Google Gemini, Web Speech API, Framer Motion.
   Live: https://ai-mock-interview-coach-orpin.vercel.app | Code:
   github.com/TeekayVuyisile/AI-Mock-Interview-Coach

SKILLS & TECHNOLOGIES (self-rated proficiency out of 100)
Frontend: React (90), TypeScript (80), JavaScript (90), Tailwind CSS (85), Bootstrap (80)
Backend: Node.js (85), Express (85), Python (75), FastAPI (75), REST APIs (85), LLM integration (80)
Real-Time & Data: Socket.IO (85), WebRTC (70), PostgreSQL (85), MongoDB (70), Redis (70)
DevOps & Testing: Docker (75), CI/CD with GitHub Actions (80), Git & GitHub (85),
  automated testing with pytest/Vitest (75), AWS (60)

EDUCATION & CERTIFICATIONS

1. Diploma in Information & Communication Technology — Sol Plaatje University (2022 - 2024).
   A tertiary qualification covering software development fundamentals, agile methodologies, and
   practical programming skills, with a strong academic foundation in system analysis, database
   design, and full-stack development. Key learnings: Software Development Life Cycle (SDLC),
   Agile & Scrum Methodologies, Object-Oriented Programming, Database Design & Management, Web
   Development Fundamentals, System Analysis & Design, JavaScript, PHP, Python, Java, MySQL
   Workbench.

2. The Complete Full-Stack Web Development Bootcamp — Udemy (2025). Intensive practical training
   in modern full-stack development technologies and real-world project implementation, emphasizing
   hands-on coding, deployment workflows, and building production-ready applications. Key learnings:
   Advanced React & JavaScript, Node.js & Express Framework, RESTful API Development, Database
   Integration, Authentication & Authorization, Deployment & DevOps Basics.

3. System Design Masterclass (2026) | From FAANGInsiders — Udemy (2026). In-depth study of
   large-scale system design principles used in high-traffic production systems and FAANG-style
   technical interviews, focused on designing for scale, reliability, and performance. Key
   learnings: Scalability & Load Balancing, Caching Strategies (CDN, Redis), Database Sharding &
   Replication, Microservices Architecture, Distributed Systems & CAP Theorem, Message Queues &
   Event-Driven Design.

4. CloudSec AWS Bootcamp — CloudSec Network (2025). Specialized training in AWS cloud computing
   with a focus on security and scalable infrastructure, covering deploying, securing, and
   monitoring cloud-native applications. Key learnings: AWS Core Services (EC2, S3, RDS), Cloud
   Security Fundamentals, Infrastructure as Code, Cloud Deployment Strategies, Monitoring &
   Logging, Cost Optimization.

CLIENT REFERENCES
- Mr Vernan Van Nel, Assistant Director (Supervisor) at the Department of Economic Development and
  Tourism: "Teekay demonstrated exceptional skill in developing both our learner management system
  and our programme delivery dashboard. His attention to detail and understanding of our
  requirements resulted in solutions that significantly improved our operational efficiency."
  (Projects: DEDAT Learner Portal Management System, Programme Delivery Dashboard)
- Miss Florence Kalipa, Programme Director at Awrise: "Teekay's technical expertise and
  problem-solving skills were crucial in developing our intervention tracking system. He
  consistently delivered high-quality work and was responsive to our evolving needs throughout the
  project." (Project: Awrise Intervention Management System)
Note: reference phone numbers are listed on the site for verification purposes only. If asked for a
reference's contact details, direct the person to the References section of the site rather than
reciting a phone number.

CONTACT
Email: Vuyisilemanalet24@gmail.com
LinkedIn: linkedin.com/in/teekay-manale
GitHub: github.com/TeekayVuyisile
Location: South Africa
For project inquiries or hiring conversations, direct people to the "Get In Touch" contact form on
this site or the email above.
`.trim();
