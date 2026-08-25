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

Quick stats: 5+ projects completed, 3 client systems delivered, 6+ technologies used regularly,
100% client satisfaction on delivered work.

WORK EXPERIENCE

1. Junior Full Stack Web Developer — Department of Economic Development & Tourism (DEDAT)
   May 2026 - Present
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

FEATURED PROJECTS

1. Programme Delivery Dashboard (Work project, currently being built/extended, in active daily
   internal use at DEDAT). Real-time collaborative dashboard for portfolio, task, KPI, and risk
   management, built solo end-to-end. Tech: React, Node.js, Express, PostgreSQL, Socket.IO, Google
   Gemini AI. Not publicly deployed (internal use).

2. Field Route Optimization & Site Verification System (Pro Edition) (Personal project). A
   professional-grade field operations web app for WiFi/Telecom site verification and infrastructure
   inspections: hands-free voice-guided navigation, auto-pilot rerouting, photo evidence system with
   background sync, digital site logbooks, field-grade GPS filtering. Tech: React, Vite, Bootstrap 5,
   Leaflet, Zustand, Supabase, OpenRouteService, Web Speech API. Live demo and GitHub repo available.

3. DEDAT Internal LMS (Work project). Internal Learning Management System for course and user
   management at DEDAT, with authentication and role-based access control. Tech: React, Bootstrap,
   Node.js, Express, PostgreSQL. Deployed internally, not publicly accessible.

4. Awrise Intervention Management System (Work project). Educational intervention platform for
   tracking learner assessments, materials, and monthly attendance with digital sign-offs, plus
   performance analytics dashboards. Tech: React, Bootstrap, Node.js, Express, PostgreSQL, REST API.
   Deployed internally, not publicly accessible.

5. AI Mock Interview Coach (Personal project). AI-powered, voice-driven mock interview simulator:
   upload a CV and job description for tailored questions, voice-to-voice interaction, real-time
   transcripts, and an AI feedback dashboard scoring confidence and technical depth. Tech: React,
   Bootstrap, Framer Motion, Vercel Serverless, Google Gemini, Web Speech API. Live demo and GitHub
   repo available.

6. Mafia: The Underground Society (Personal project). A cinematic, realtime multiplayer social
   deduction (Mafia-style) party game with a noir/glassmorphism UI, Socket.io-driven phase
   transitions/voting/chat, a text-to-speech AI narrator, and reconnection support for identity
   persistence. Tech: React, Framer Motion, Bootstrap 5, Socket.io, Node.js, Express, Supabase. Live
   demo and GitHub repo available.

7. EduLens LMS (Personal project). Role-based Learning Management System for primary schools
   (Grade R-3) with distinct admin/teacher/learner interfaces, assessment tracking, performance
   analytics, academic progression tracking, and AI-powered worksheet generation aligned to
   curriculum. Tech: React, Bootstrap, Node.js, Express, PostgreSQL. GitHub repo available.

8. Event Management System (Personal project). Full-stack event platform covering event creation,
   ticketing and validation, QR-code based check-in, wallet management for payments, and attendee
   registration. Tech: EJS, Bootstrap, Node.js, Express, PostgreSQL. GitHub repo available.

9. AI Travel Planner (Personal project). AI-powered travel planning app generating personalized
   itineraries based on preferences, budget, and travel style, integrating live weather and maps
   data. Tech: React, Bootstrap, Node.js, Express, OpenWeatherMap, ExchangeRate-API, PostgreSQL.
   GitHub repo available.

10. To-Do List Application (Personal project). Full-stack task management app with secure user
    authentication, a task statistics dashboard, deadline-based status tracking, and full CRUD via
    RESTful APIs. Tech: React, Bootstrap, Node.js, Express, PostgreSQL. GitHub repo available.

SKILLS & TECHNOLOGIES (self-rated proficiency out of 100)
Frontend: React (90), Next.js (90), JavaScript (85), Bootstrap (80), Tailwind CSS (80)
Backend: Node.js (85), Express (80), Python (70), REST API design (85), WebSockets/Socket.IO (85)
Database: PostgreSQL (80), MySQL (75), MongoDB (75)
Tools & Platforms: Postman (80), Git & GitHub (80), AWS (60)

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
