import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EqualizerBars from './EqualizerBars';
import {
  XCircle,
  SkipStartFill,
  SkipEndFill,
  PlayCircle,
  InfoCircle,
  Github,
  ArrowRight
} from 'react-bootstrap-icons';

const TAG_LABELS = {
  ai: 'AI-Powered',
  realtime: 'Real-Time',
  fullstack: 'Full-Stack'
};

const FILTERS = [
  { value: 'all', label: 'All Projects' },
  { value: 'ai', label: 'AI-Powered' },
  { value: 'realtime', label: 'Real-Time' },
  { value: 'fullstack', label: 'Full-Stack' }
];

const COVER_TONES = 6;

// Album-sleeve project card: tilts toward the pointer and slides its record out on hover
const ProjectSleeve = React.forwardRef(({ project, tone, onOpen }, ref) => {
  const stage = useRef(null);
  const isFeatured = project.tier === 'major' || project.current;
  const secondaryTag = project.tags.find(tag => tag !== 'fullstack');
  const techLimit = isFeatured ? 6 : 4;

  const handlePointerMove = (e) => {
    if (e.pointerType !== 'mouse' || !stage.current) return;
    const rect = stage.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    stage.current.style.setProperty('--tilt-x', `${(-y * 12).toFixed(2)}deg`);
    stage.current.style.setProperty('--tilt-y', `${(x * 16).toFixed(2)}deg`);
    stage.current.style.setProperty('--glare-x', `${((x + 0.5) * 100).toFixed(1)}%`);
    stage.current.style.setProperty('--glare-y', `${((y + 0.5) * 100).toFixed(1)}%`);
  };

  const handlePointerLeave = () => {
    if (!stage.current) return;
    stage.current.style.setProperty('--tilt-x', '0deg');
    stage.current.style.setProperty('--tilt-y', '0deg');
  };

  return (
    <motion.article
      ref={ref}
      layout
      className={`sleeve-card ${isFeatured ? 'is-featured' : ''}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.2 } }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <button
        ref={stage}
        type="button"
        className="sleeve-stage"
        onClick={() => onOpen(project)}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        aria-label={`View details for ${project.title}`}
      >
        <span className="sleeve-tilt">
          <span className="sleeve-record" aria-hidden="true">
            <span className="sleeve-record-disc ambient">
              <span className="sleeve-record-label">
                <img src={project.image} alt="" />
              </span>
            </span>
          </span>
          <span className={`sleeve-cover tone-${tone}`}>
            <span className="sleeve-cover-grain" aria-hidden="true"></span>
            <span className="sleeve-cover-index" aria-hidden="true">
              {String(project.id).padStart(2, '0')}
            </span>
            <span className="sleeve-cover-logo">
              <img
                src={project.image}
                alt=""
                onError={(e) => { e.target.style.visibility = 'hidden'; }}
              />
            </span>
            <span className="sleeve-cover-caption" aria-hidden="true">
              {project.kind}
            </span>
            <span className="sleeve-glare" aria-hidden="true"></span>
          </span>
        </span>
      </button>

      <div className="sleeve-info">
        <div className="sleeve-tags">
          {project.current && (
            <span className="sleeve-tag is-live">
              <span className="live-dot ambient" aria-hidden="true"></span>
              Currently Building
            </span>
          )}
          <span className="sleeve-tag is-work">{project.kind}</span>
          {secondaryTag && <span className="sleeve-tag">{TAG_LABELS[secondaryTag]}</span>}
        </div>

        <h3 className="sleeve-title">{project.title}</h3>
        <p className="sleeve-desc">
          {isFeatured && project.impactLine ? project.impactLine : project.shortDescription}
        </p>

        {isFeatured && (
          <ul className="sleeve-highlights">
            {project.features.slice(0, 3).map(feature => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        )}

        <div className="sleeve-tech">
          {project.technologies.slice(0, techLimit).map(tech => (
            <span key={tech}>{tech}</span>
          ))}
          {project.technologies.length > techLimit && (
            <span className="is-more">+{project.technologies.length - techLimit}</span>
          )}
        </div>

        <div className="sleeve-actions">
          <button type="button" className="sleeve-link is-primary" onClick={() => onOpen(project)}>
            View Details <ArrowRight size={14} />
          </button>
          {project.demoLink && (
            <a className="sleeve-link" href={project.demoLink} target="_blank" rel="noopener noreferrer">
              <PlayCircle size={14} /> Live Demo
            </a>
          )}
          {project.githubLink && (
            <a className="sleeve-link" href={project.githubLink} target="_blank" rel="noopener noreferrer">
              <Github size={14} /> Code
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
});

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  // Ordered strongest first: recruiters tend to open the first few projects only
  const allProjects = [
    {
      id: 1,
      title: "Tender Insight Hub",
      kind: "SaaS Platform",
      tags: ["ai", "fullstack"],
      tier: "major",
      impactLine: "Helps South African SMEs find public tenders that fit, understand 100-page bid packs in minutes and decide where they can win",
      shortDescription: "Multi-tenant SaaS on live National Treasury eTenders data, with AI document summaries and transparent readiness scoring.",
      fullDescription: "A multi-tenant SaaS platform built on live data from the National Treasury OCDS eTenders API. Tenders are synced every six hours, enriched from the eTenders portal and searchable with PostgreSQL full-text search. On request, a background worker downloads the bid documents (PDF, DOCX, ZIP), selects the passages that matter to fit a free-tier LLM token budget, and turns them into a plain-language summary with structured requirements validated by Pydantic. A rule-based readiness score then checks CIDB grading, provinces, B-BBEE level, experience and briefings against the company profile, so every point is explainable. Teams track bids through a shared workspace with tasks, notes and deadline reminders, while Free, Basic and Pro plans are enforced on the server. AI jobs run on a Redis Stream consumer group that survives restarts and shares one Groq rate limit across processes, and Redis caching cut search times from around 1.2 s to 0.4 s. The whole stack (API, worker, PostgreSQL, MongoDB, Redis, nginx) starts with one Docker Compose command, and CI runs 225 pytest tests against SQLite and PostgreSQL before every deploy.",
      technologies: ["Python", "FastAPI", "React", "TypeScript", "PostgreSQL", "MongoDB", "Redis", "Docker", "Groq LLM", "GitHub Actions"],
      image: "/assets/tender-insight-hub.webp",
      githubLink: "https://github.com/TeekayVuyisile/etender_system",
      demoLink: "https://tender-insight-hub.onrender.com/",
      features: [
        "AI summaries of 50 to 150 page bid documents, validated into structured requirements",
        "Rule-based readiness score with a line-by-line checklist against the company profile",
        "Redis job queue, caching and shared rate limits that keep working through restarts",
        "Team workspace with a bid pipeline, tasks, notes and deadline reminders",
        "Public REST API with hashed API keys, OpenAPI docs and per-key rate limiting",
        "One-click private demo workspace that cleans itself up after 24 hours"
      ]
    },
    {
      id: 2,
      title: "SPU Events",
      kind: "Campus Ticketing",
      tags: ["realtime", "fullstack"],
      shortDescription: "Campus events for Sol Plaatje University: wallet payments, signed QR tickets, gate scanning and a live admin dashboard.",
      fullDescription: "A campus events platform for Sol Plaatje University, written in TypeScript end to end as an npm-workspaces monorepo. Students discover events, pay from a campus wallet and receive HMAC-signed QR tickets that also work offline; gate staff scan them with a phone camera, and organisers get a live dashboard with revenue, sales and check-in rates. Money is stored as integer cents in an append-only ledger, purchases lock rows in a fixed order to avoid deadlocks, and check-in is a single conditional update, so two gates scanning the same ticket at once can never both admit it. A test races them to prove it. While building it I found and fixed a real overselling bug caused by PostgreSQL READ COMMITTED snapshots. Shared Zod schemas validate both the API and the React forms, integration tests run against a real Postgres database in GitHub Actions, and axe-core reports zero accessibility violations across every page in both themes.",
      technologies: ["TypeScript", "React", "Express 5", "PostgreSQL", "Drizzle ORM", "Zod", "Tailwind CSS", "Vitest", "GitHub Actions"],
      image: "/assets/spu-events.png",
      logoDisclaimer: "The Sol Plaatje University logo displayed is the property of its respective owner and is used here for demonstration purposes only.",
      githubLink: "https://github.com/TeekayVuyisile/spu-events",
      demoLink: "https://spu-events.onrender.com/",
      features: [
        "Signed QR tickets with double-scan protection proven by a concurrency test",
        "Wallet built as an append-only ledger with idempotent top-ups and automatic refunds",
        "Capacity limits that can't oversell, even under concurrent purchases",
        "Live check-in counter shared across gates via server-sent events",
        "Admin dashboard, moderation queue, staff invites and audit log",
        "One-click demo roles: student, gate staff and admin"
      ]
    },
    {
      id: 3,
      title: "RouteOps: Field Route Optimization",
      kind: "Offline-First PWA",
      tags: ["fullstack"],
      shortDescription: "Mobile-first field app: optimized routes, voice-guided driving and GPS-verified site check-ins that work without signal.",
      fullDescription: "A mobile-first web app for field teams. Managers import sites from CSV or Excel (South African decimal commas, degree-minute-second coordinates and swapped latitude/longitude are all handled), review them on a map and get the fastest visiting order from OpenRouteService, with a local fallback so a routing outage never leaves a driver without a plan. Agents drive with turn-by-turn voice guidance and filtered GPS, then prove each visit with check-ins the database measures against the site, custom checklists and compressed photo evidence. It installs as a PWA and keeps working offline: check-ins, notes and photos wait in an IndexedDB outbox and sync once there's signal. Data is protected with Supabase row-level security per team, and quality is backed by 300+ Vitest tests plus SQL tests against Postgres in Docker, run on every push by GitHub Actions.",
      technologies: ["React", "Vite", "Zustand", "Tailwind CSS", "Leaflet", "OpenRouteService", "Supabase", "PWA / IndexedDB", "Vitest", "GitHub Actions"],
      image: "/assets/routeops.webp",
      githubLink: "https://github.com/TeekayVuyisile/Field-Route-Optimization-Site-Verification-System",
      demoLink: "https://field-route-optimization-site-verif.vercel.app/",
      features: [
        "Route optimization for up to 70 stops with an offline nearest-neighbour fallback",
        "Driver mode with spoken turn-by-turn guidance and off-route recalculation",
        "GPS-verified check-ins, flagged when the phone is too far from the site",
        "Offline outbox: nothing is lost without signal, everything syncs later",
        "Trip reports with photos and checklist answers, exported to CSV or PDF",
        "Private 24-hour demo sandbox with manager and field agent accounts"
      ]
    },
    {
      id: 4,
      title: "SignConnect",
      kind: "Accessible Video Calls",
      tags: ["ai", "realtime"],
      shortDescription: "Accessible video calling: speak, sign or type, with live captions and on-device sign recognition.",
      fullDescription: "Real-time video calling built for Deaf and hearing people to talk to each other, with South African Sign Language in mind. Each person chooses how they communicate: speech becomes live captions, hand signs are recognised on-device with MediaPipe and sent as text (or read aloud), and typed messages appear as captions. Calls are peer-to-peer over WebRTC; the server only handles accounts and Socket.IO signaling, so video, audio and captions flow directly between browsers and camera video is never uploaded for AI processing. That gives lower latency, better privacy and near-zero server cost. The app includes multi-device ringing, call history, animated sign lessons with a camera practice mode, and an interface built to WCAG AA with the Atkinson Hyperlegible font, adjustable caption sizes and full keyboard and screen-reader support.",
      technologies: ["React", "WebRTC", "Socket.IO", "MediaPipe", "Web Speech API", "Node.js", "Express", "SQLite", "Tailwind CSS"],
      image: "/assets/signconnect.webp",
      githubLink: "https://github.com/TeekayVuyisile/SignConnect",
      demoLink: "https://signconnect-app.onrender.com/",
      features: [
        "Peer-to-peer WebRTC video calls with multi-device ringing",
        "Live speech captions streamed to the other person as they talk",
        "On-device sign recognition with confidence levels, nothing uploaded",
        "Typed messages and read-aloud for hearing participants",
        "Sign lessons with animated hands and a camera practice mode",
        "Accessible by design: WCAG AA, large targets, screen-reader support"
      ]
    },
    {
      id: 5,
      title: "EduLens LMS",
      kind: "School Platform",
      tags: ["ai", "fullstack"],
      shortDescription: "Learning platform for South African Foundation Phase schools (Grade R to 3), with CAPS-aligned marks and AI worksheets.",
      fullDescription: "A multi-school learning management system for South African Foundation Phase (Grade R to 3). School admins manage classes and learners, teachers record marks against the CAPS curriculum and its 7-level achievement scale, parents follow their children's progress from their phones, and AI writes printable, curriculum-aligned worksheets. Every query is scoped to the caller's school and role, and security tests check that nothing leaks between schools. Since the MVP I hardened it substantially: fixed SQL injection with column allow-lists, scrubbed passwords an old logger had stored, replaced public uploads with authenticated downloads and swapped AI-written HTML for validated JSON to remove an XSS risk. Staff and parents are invited with single-use hashed tokens, class capacity is enforced with row locks, and the Excel register import shows every row's problems before saving. CI runs lint, tests and builds for both apps.",
      technologies: ["React", "Node.js", "Express 5", "PostgreSQL", "Groq LLM", "React Bootstrap", "GitHub Actions"],
      image: "/assets/edulens.webp",
      githubLink: "https://github.com/TeekayVuyisile/edulens_mvp",
      demoLink: "https://edulens-lms.onrender.com/",
      features: [
        "Roles for super admin, school admin, teacher and parent",
        "CAPS-aligned marks with a 7-level achievement scale and progress tracking",
        "AI worksheet generation with automatic model fallback",
        "Multi-school data isolation verified by security tests",
        "Excel register import with row-by-row validation",
        "One-click demo school with teacher, admin and parent accounts"
      ]
    },
    {
      id: 6,
      title: "AI Travel Planner",
      kind: "Group Trip Planner",
      tags: ["ai", "fullstack"],
      shortDescription: "AI group trip planner: weather-aware itineraries, packing lists with reasons and shared expenses with settle-up.",
      fullDescription: "A group trip planner that builds a day-by-day itinerary around the real weather forecast, writes a packing list that explains every item, and keeps a shared budget that works out who owes whom. Groq returns itineraries through strict JSON schemas, and every suggested activity is checked against OpenStreetMap so unconfirmed places are never shown as exact pins. Groups invite members as editors or viewers, vote activities up or down and replan a single day, while a streaming trip assistant answers questions with the itinerary, forecast and budget in context. Expenses can be logged in any currency and split evenly or by amount; money is kept in cents and settle-up clears every balance in at most n - 1 payments. Every external service has a fallback, so the app keeps working when an API is down. 56 backend and frontend tests run in GitHub Actions on every pull request.",
      technologies: ["React", "Node.js", "Express", "PostgreSQL", "Groq LLM", "Leaflet", "Tailwind CSS", "TanStack Query", "GitHub Actions"],
      image: "/assets/ai-travel-planner.webp",
      githubLink: "https://github.com/TeekayVuyisile/AI-Travel-Planner",
      demoLink: "https://ai-travel-assistant-cp6l.onrender.com/",
      features: [
        "AI itineraries that adapt to rain and wind in the forecast",
        "Suggested places verified on OpenStreetMap before they're pinned",
        "Group roles, activity voting and single-day replanning",
        "Multi-currency expenses with minimum-payment settle-up",
        "Streaming trip assistant that knows the whole plan",
        "Drag-and-drop editing, PDF export and a no-sign-up demo"
      ]
    },
    {
      id: 7,
      title: "Mafia: The Underground Society",
      kind: "Multiplayer Game",
      tags: ["realtime", "fullstack"],
      shortDescription: "Real-time multiplayer social deduction game with secret roles, private channels and an AI narrator.",
      fullDescription: "A cinematic, real-time multiplayer Mafia party game for 4 to 10 players. Players are dealt secret roles (Mafia, Medic, Detective, Civilian), scheme in a private Mafia channel at night, argue by day and vote to unmask the killers, while a text-to-speech narrator announces every phase. The server is authoritative: roles and private messages are only sent to players allowed to see them, and socket connections are authenticated with the player's session so identities can't be spoofed. Room state is persisted to PostgreSQL, so a dropped connection, page reload or even a server restart only causes a brief reconnect. Players sign in with email or Google, earn XP and ranks, and compete on a leaderboard.",
      technologies: ["React", "Socket.IO", "Node.js", "Express 5", "PostgreSQL", "Better Auth", "Framer Motion", "Bootstrap"],
      image: "/assets/mafia.webp",
      githubLink: "https://github.com/TeekayVuyisile/mafia-game",
      demoLink: "https://mafia-game-opal.vercel.app/",
      features: [
        "Full night and day cycle with host-controlled timers and voting rules",
        "Private Mafia channel and a graveyard chat for eliminated players",
        "Server-authoritative state with session-authenticated sockets",
        "Restart-proof games: room state persisted to PostgreSQL",
        "Email and Google sign-in, XP, ranks and a leaderboard",
        "Text-to-speech narrator for every phase"
      ]
    },
    {
      id: 8,
      title: "AI Mock Interview Coach",
      kind: "Voice AI",
      tags: ["ai"],
      shortDescription: "Voice-driven mock interviews tailored to your CV and the job, with scored AI feedback.",
      fullDescription: "An AI interview simulator that runs a realistic, voice-driven mock interview. Users upload their CV (PDF or DOCX) and a job description, choose the difficulty, number of questions and interview type, and Gemini generates questions tailored to their experience and the role. The AI reads each question aloud, then listens and shows a live transcript of the spoken answer. At the end, a feedback dashboard scores confidence, communication, relevance, technical depth and clarity, with strengths, areas to improve and questions to practise next. CVs are parsed in Vercel serverless functions and deleted immediately, and the Gemini API key never reaches the browser.",
      technologies: ["React", "Vite", "Vercel Serverless", "Google Gemini", "Web Speech API", "Framer Motion"],
      image: "/assets/ai-mock-interview.webp",
      githubLink: "https://github.com/TeekayVuyisile/AI-Mock-Interview-Coach",
      demoLink: "https://ai-mock-interview-coach-orpin.vercel.app/",
      features: [
        "Questions tailored to an uploaded CV and job description",
        "Voice-to-voice interview with a live transcript",
        "Scored feedback across five categories with next steps",
        "Configurable difficulty, length and interview type",
        "Privacy first: CVs and recordings are never stored"
      ]
    }
  ];

  const matchesFilter = (project, filter) =>
    filter === 'all' || project.tags.includes(filter);

  const filteredProjects = allProjects.filter(p => matchesFilter(p, activeFilter));

  const countFor = (filter) => allProjects.filter(p => matchesFilter(p, filter)).length;

  const activeIndex = activeProject
    ? filteredProjects.findIndex(p => p.id === activeProject.id)
    : -1;

  const openModal = (project) => {
    setActiveProject(project);
    setShowDisclaimer(false);
  };

  const closeModal = () => {
    setActiveProject(null);
    setShowDisclaimer(false);
  };

  const goToProject = (offset) => {
    if (activeIndex === -1 || filteredProjects.length === 0) return;
    const nextIndex = (activeIndex + offset + filteredProjects.length) % filteredProjects.length;
    setActiveProject(filteredProjects[nextIndex]);
    setShowDisclaimer(false);
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && activeProject) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [activeProject]);

  // Prevent background scroll while the modal is open
  useEffect(() => {
    document.body.style.overflow = activeProject ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeProject]);

  const renderActionRow = (project) => {
    if (project.demoLink) {
      return (
        <div className="action-row">
          <a
            className="play-btn"
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open live demo for ${project.title}`}
          >
            <PlayCircle size={20} />
          </a>
          <div className="action-text">
            <strong>Live Demo</strong>
            <span>Opens the deployed app</span>
          </div>
          {project.githubLink && (
            <a
              className="code-btn"
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={16} />
              View Code
            </a>
          )}
        </div>
      );
    }

    if (project.githubLink) {
      return (
        <div className="action-row">
          <a
            className="code-btn"
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={16} />
            View Code
          </a>
        </div>
      );
    }

    return (
      <div className="action-row">
        <span className="status-pill">
          <span className="status-dot" aria-hidden="true"></span>
          {project.status}
        </span>
      </div>
    );
  };

  return (
    <section id="projects" className="section projects-studio">
      <div className="container-custom">
        <div className="studio-heading">
          <p className="studio-eyebrow">Personal builds · {allProjects.length} live demos</p>
          <h2 className="studio-title">My Projects</h2>
          <p className="studio-lede">
            Products I designed, built, tested and deployed on my own, each one deployed live,
            and most with a one-click demo login. Hover a cover to pull it out; click for the full story.
          </p>
        </div>

        <div className="sleeve-filters" role="group" aria-label="Filter projects">
          {FILTERS.map(filter => {
            const isActive = activeFilter === filter.value;
            return (
              <button
                key={filter.value}
                type="button"
                className={`sleeve-filter ${isActive ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter.value)}
                aria-pressed={isActive}
              >
                {isActive && (
                  <motion.span
                    layoutId="sleeve-filter-pill"
                    className="sleeve-filter-pill"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="sleeve-filter-label">{filter.label}</span>
                <span className="sleeve-filter-count">{countFor(filter.value)}</span>
              </button>
            );
          })}
        </div>

        <motion.div layout className="sleeve-grid">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map(project => (
              <ProjectSleeve
                key={project.id}
                project={project}
                tone={allProjects.indexOf(project) % COVER_TONES}
                onOpen={openModal}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        <p className="sleeve-footnote">
          <InfoCircle size={14} />
          All logos and trademarks displayed belong to their respective owners.
        </p>

        {/* Project Modal */}
        {activeProject && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal}>
                <XCircle size={24} />
              </button>

              {/* Disclaimer Info Button */}
              {(activeProject.logoDisclaimer || activeProject.permissionNote) && (
                <button
                  className="disclaimer-toggle"
                  onClick={() => setShowDisclaimer(!showDisclaimer)}
                  title="Show disclaimer information"
                >
                  <InfoCircle size={20} />
                </button>
              )}

              {/* Disclaimer Panel */}
              {showDisclaimer && (activeProject.logoDisclaimer || activeProject.permissionNote) && (
                <div className="disclaimer-panel">
                  {activeProject.permissionNote && (
                    <p className="permission-note">
                      <strong>Permission:</strong> {activeProject.permissionNote}
                    </p>
                  )}
                  {activeProject.logoDisclaimer && (
                    <p className="logo-disclaimer">
                      <strong>Logo Disclaimer:</strong> {activeProject.logoDisclaimer}
                    </p>
                  )}
                </div>
              )}

              {filteredProjects.length > 1 && (
                <div className="modal-nav-row">
                  <button className="nav-btn" onClick={() => goToProject(-1)} aria-label="Previous project">
                    <SkipStartFill size={16} />
                  </button>
                  <span className="nav-counter">{activeIndex + 1} / {filteredProjects.length}</span>
                  <button className="nav-btn" onClick={() => goToProject(1)} aria-label="Next project">
                    <SkipEndFill size={16} />
                  </button>
                </div>
              )}

              <div className="modal-details">
                <div className="modal-hero">
                  <div className="modal-disc-wrap disc-spin is-active">
                    <div className="project-disc modal-disc">
                      <div className="project-disc-label">
                        <img src={activeProject.image} alt={activeProject.title} />
                      </div>
                    </div>
                  </div>
                  <div className="modal-hero-info">
                    <div className="modal-tags">
                      <span className="tag tone-teal">{activeProject.kind}</span>
                      {activeProject.tags.map(tag => (
                        <span key={tag} className="tag">{TAG_LABELS[tag]}</span>
                      ))}
                    </div>
                    <h3>
                      {activeProject.title}
                      <EqualizerBars className="modal-title-equalizer" count={4} />
                    </h3>
                    <p className="full-description">{activeProject.fullDescription}</p>
                    {renderActionRow(activeProject)}
                  </div>
                </div>

                {/* Compact Permission Note in Modal */}
                {activeProject.permissionNote && (
                  <div className="modal-permission-note">
                    <InfoCircle size={16} />
                    <span>{activeProject.permissionNote}</span>
                  </div>
                )}

                <div className="modal-technologies">
                  <h4>Technologies Used:</h4>
                  <ul className="tracklist">
                    {activeProject.technologies.map((tech, idx) => (
                      <li key={tech}>
                        <span className="t-num">{String(idx + 1).padStart(2, '0')}</span>
                        <span className="t-name">{tech}</span>
                        <span className="t-bars" aria-hidden="true">
                          <span></span><span></span><span></span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Features Section */}
                {activeProject.features && (
                  <div className="modal-features">
                    <h4>Key Features:</h4>
                    <ul className="features-list">
                      {activeProject.features.map((feature, index) => (
                        <li key={index}>
                          <span className="feature-bullet">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
