import React, { useState, useEffect } from 'react';
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
  { value: 'work', label: 'Work Project' },
  { value: 'personal', label: 'Personal Project' },
  { value: 'ai', label: 'AI-Powered' },
  { value: 'realtime', label: 'Real-Time' },
  { value: 'fullstack', label: 'Full-Stack' }
];

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const allProjects = [
    {
      id: 11,
      title: "Programme Delivery Dashboard",
      category: "work",
      tags: ["ai", "realtime", "fullstack"],
      tier: "major",
      current: true,
      impactLine: "Replaced spreadsheet-based project tracking with a live source of truth used across departments",
      shortDescription: "A real-time, collaborative dashboard for portfolio, task, KPI, and risk management — built solo, end-to-end, and in active daily use.",
      fullDescription: "Designed and built a real-time, collaborative Programme Delivery Dashboard to replace manual, Excel-based project tracking with a live single source of truth for portfolio, task, KPI, and risk management across departments. As sole developer, delivered the full stack: the PostgreSQL schema, a Node.js/Express REST API, a Socket.IO real-time layer, and the React frontend. The system organises projects into government-style Financial Year and quarterly cycles, tracks output indicators against annual and quarterly targets, and maintains a structured risk register with multi-location project tracking on interactive maps. Quarterly and annual reports combine logged data with AI-generated narrative analysis, while an immutable audit log and live activity stream keep every change visible to the whole team. The system has continued to evolve through active use, with new modules added directly in response to organisational feedback.",
      technologies: ["React", "Node.js", "Express", "PostgreSQL", "Socket.IO", "Google Gemini AI"],
      image: "/images/logo1.png",
      logoDisclaimer: "The DEDAT logo displayed is the property of the Department of Economic Development and Tourism and is used here for demonstration purposes only with permission.",
      permissionNote: null,
      githubLink: null,
      status: "In active daily use internally",
      features: [
        "Real-time collaboration via Socket.IO across every connected client",
        "Financial Year & KPI tracking with quarterly output indicators",
        "AI-assisted report generation with an automatic fallback chain",
        "Structured risk register with multi-location map tracking",
        "Immutable audit log and permissioned team workspaces"
      ]
    },
    {
      id: 10,
      title: "Field Route Optimization & Site Verification System (Pro Edition)",
      category: "personal",
      tags: ["fullstack"],
      tier: "major",
      impactLine: "Replaced paper-based site trips with a hands-free, voice-guided field operations tool",
      shortDescription: "A professional-grade field operations system covering the full trip lifecycle — from coordinate import to evidence-based reporting.",
      fullDescription: "A professional-grade web application designed for field teams to manage complex site verification trips. The system handles the entire lifecycle from coordinate import to final evidence-based reporting. Key use cases include WiFi & Telecom site verification, infrastructure inspections, and dynamic route planning. It features hands-free navigation with voice guidance, auto-pilot rerouting, and a robust photo evidence system with background syncing.",
      image: "/images/logo9.png",
      technologies: ["React", "Vite", "Bootstrap 5", "Leaflet", "Zustand", "Supabase", "OpenRouteService", "Web Speech API"],
      githubLink: "https://github.com/TeekayVuyisile/Field-Route-Optimization-Site-Verification-System",
      demoLink: "https://field-route-optimization-site-verif.vercel.app/",
      features: [
        "Hands-Free Navigation with voice guidance",
        "Auto-Pilot Rerouting & re-optimization",
        "Photo Evidence System with background sync",
        "Digital Site Logbooks with real-time autosave",
        "Field-Grade GPS signal filtering",
        "Professional Reporting & analytics dashboard"
      ]
    },
    {
      id: 1,
      title: "DEDAT Internal LMS",
      category: "work",
      tags: ["fullstack"],
      shortDescription: "Internal Learning Management System for course and user management.",
      fullDescription: "Developed an internal Learning Management System (LMS) to streamline the management of courses, users, and training content for the Department of Economic Development and Tourism. The system features robust authentication and role-based access control, ensuring secure and appropriate access for different user types. Built with a responsive React and Bootstrap frontend, the platform provides an intuitive interface for administrators and learners. The backend is powered by Node.js and PostgreSQL, delivering reliable performance for handling training materials, tracking course completion, and managing user enrollments efficiently.",
      technologies: ["React", "Bootstrap", "Node.js", "Express", "PostgreSQL"],
      image: "/images/logo1.png",
      logoDisclaimer: "The DEDAT logo displayed is the property of the Department of Economic Development and Tourism and is used here for demonstration purposes only with permission.",
      permissionNote: null,
      githubLink: null,
      status: "Deployed internally — not publicly accessible",
      features: [
        "Course and user management",
        "Authentication and role-based access",
        "Training content delivery",
        "Progress tracking"
      ]
    },
    {
      id: 2,
      title: "Awrise Intervention Management System",
      category: "work",
      tags: ["fullstack"],
      shortDescription: "Educational intervention platform for tracking learner assessments and attendance.",
      fullDescription: "Developed a comprehensive educational intervention management system designed to track and manage learner assessments, educational materials, and monthly attendance registers with sign-off capabilities. The platform implements detailed student progress tracking with performance analytics and reporting dashboards, enabling educators to monitor individual and class-wide progress effectively. Key features include assessment management, material distribution, attendance tracking with digital sign-offs, and comprehensive analytics that provide insights into student performance and intervention effectiveness. Built with a React and Bootstrap frontend and Node.js/PostgreSQL backend, the system provides a responsive, user-friendly interface for educators to manage interventions and track student progress.",
      technologies: ["React", "Bootstrap", "Node.js", "Express", "PostgreSQL", "REST API"],
      image: "/images/logo3.png",
      logoDisclaimer: "The Awrise logo is the property of Awrise Innovations and is used here for demonstration purposes only with permission.",
      permissionNote: null,
      githubLink: null,
      status: "Deployed internally — not publicly accessible",
      features: [
        "Learner assessment tracking",
        "Monthly attendance with sign-offs",
        "Performance analytics dashboards",
        "Educational material management"
      ]
    },
    {
      id: 3,
      title: "AI Mock Interview Coach",
      category: "personal",
      tags: ["ai"],
      shortDescription: "AI-powered interview simulator using Gemini API and Web Speech API.",
      fullDescription: "An AI-powered interview simulator that provides a realistic, voice-driven mock interview experience. Users can upload their CV and job descriptions for tailored questions. The app features voice-to-voice interaction where the AI speaks questions and listens to responses, providing real-time transcripts and a detailed AI feedback dashboard with scoring on confidence and technical depth.",
      technologies: ["React", "Bootstrap", "Framer Motion", "Vercel Serverless", "Google Gemini", "Web Speech API"],
      image: "/images/logo8.png",
      githubLink: "https://github.com/TeekayVuyisile/AI-Mock-Interview-Coach",
      demoLink: "https://ai-mock-interview-coach-orpin.vercel.app/",
      features: [
        "CV & Job Description Analysis",
        "Voice-to-Voice Interaction",
        "Real-time Spoken Word Transcripts",
        "AI Feedback Dashboard with detailed scoring",
        "Serverless Backend Processing"
      ]
    },
    {
      id: 4,
      title: "Mafia: The Underground Society",
      category: "personal",
      tags: ["realtime", "fullstack"],
      shortDescription: "Cinematic, realtime multiplayer social deduction game.",
      fullDescription: "A cinematic, realtime multiplayer Mafia party game experience. Players are assigned secret identities in an underground secret society. Featuring a polished, noir-inspired interface with glassmorphism, the game uses Socket.io for instantaneous phase transitions, voting, and chat. Includes a browser-based Text-to-Speech narrator and seamless reconnection support for identity persistence.",
      technologies: ["React", "Framer Motion", "Bootstrap 5", "Socket.io", "Node.js", "Express", "Supabase"],
      image: "/images/logo7.png",
      githubLink: "https://github.com/TeekayVuyisile/mafia-game",
      features: [
        "Cinematic UI with glassmorphism & noir aesthetic",
        "Realtime Synchronization via Socket.io",
        "AI Narrator (Text-to-Speech)",
        "Identity Persistence & reconnection support",
        "Secure Account Management via Supabase"
      ]
    },
    {
      id: 5,
      title: "EduLens LMS",
      category: "personal",
      tags: ["ai", "fullstack"],
      shortDescription: "Role-based learning platform for primary schools (Grade R–3).",
      fullDescription: "Built a comprehensive role-based Learning Management System specifically designed for primary schools catering to Grade R through 3. The platform provides distinct interfaces and functionalities for administrators, teachers, and young learners, ensuring age-appropriate content delivery and management capabilities. Key features include assessment tracking to monitor student progress, detailed learner performance analytics that help identify areas for improvement, and academic progression tracking to ensure students meet grade-level expectations. A standout feature is the AI-powered worksheet generation system that creates curriculum-aligned exercises appropriate for each grade level, saving teachers valuable preparation time while ensuring educational content remains engaging and relevant.",
      technologies: ["React", "Bootstrap", "Node.js", "Express", "PostgreSQL"],
      image: "/images/logo4.png",
      githubLink: "https://github.com/TeekayVuyisile/edulens_mvp",
      features: [
        "Role-based access (Admin, Teacher, Learner)",
        "Assessment and performance tracking",
        "AI-powered worksheet generation",
        "Academic progression monitoring"
      ]
    },
    {
      id: 6,
      title: "Event Management System",
      category: "personal",
      tags: ["fullstack"],
      shortDescription: "Full-stack event platform with ticketing and QR code entry.",
      fullDescription: "Developed a comprehensive full-stack event management platform that streamlines the entire event lifecycle from creation to execution. The system provides distinct interfaces for administrators to create and manage events, and for attendees to discover, register, and participate. Core functionality includes a complete ticketing system that handles sales and validation, QR code-based entry management for secure and efficient check-ins, and integrated wallet management for handling payments and ticket storage. Built with a responsive React and Bootstrap frontend and a robust Node.js/PostgreSQL backend, the platform ensures smooth event operations whether managing a small workshop or a large conference with hundreds of attendees.",
      technologies: ["EJS", "Bootstrap", "Node.js", "Express", "PostgreSQL"],
      image: "/images/logo2.png",
      logoDisclaimer: "The Sol Plaatjie University logo displayed is the property of its respective owner and is used here for demonstration purposes only.",
      githubLink: "https://github.com/TeekayVuyisile/university_event_management_system",
      features: [
        "Event creation and management",
        "Ticketing system with QR codes",
        "Wallet management",
        "Attendee registration and check-in"
      ]
    },
    {
      id: 7,
      title: "AI Travel Planner",
      category: "personal",
      tags: ["ai", "fullstack"],
      shortDescription: "AI-powered travel planning with personalized itineraries.",
      fullDescription: "Created an innovative AI-powered travel planning web application that generates personalized travel itineraries based on user preferences, budget constraints, and travel styles. The platform integrates multiple real-time APIs to provide comprehensive travel information including weather forecasts for destinations, interactive maps for navigation and exploration, and attraction data to help users discover points of interest. The AI engine analyzes user inputs to suggest optimal travel routes, accommodation options, and daily activities that align with individual preferences. All user data, saved itineraries, and preferences are persistently stored in PostgreSQL, allowing users to revisit and modify their travel plans. The responsive React frontend ensures a seamless experience across devices, while the Node.js/Express backend efficiently orchestrates API calls and data management.",
      technologies: ["React", "Bootstrap", "Node.js", "Express","OpenWeatherMap","ExchangeRate-API", "PostgreSQL"],
      image: "/images/logo11.png",
      githubLink: "https://github.com/TeekayVuyisile/AI-Travel-Planner",
      features: [
        "AI-powered itinerary generation",
        "Real-time weather integration",
        "Maps and attractions data",
        "Personalized travel recommendations"
      ]
    },
    {
      id: 8,
      title: "To-Do List Application",
      category: "personal",
      tags: ["fullstack"],
      shortDescription: "Full-stack task management with progress tracking.",
      fullDescription: "Built a full-stack task management web application designed to help users organize their tasks efficiently and track their productivity. The system features secure user authentication, ensuring that each user's tasks remain private and accessible only to them. A comprehensive dashboard provides visual task statistics, showing completion rates, pending items, and productivity trends over time. Tasks are automatically categorized based on their due dates, with the system intelligently marking overdue tasks as 'failed' while tracking completion progress for active tasks. The application implements full CRUD functionality through RESTful APIs, allowing users to create, read, update, and delete tasks and to-do lists seamlessly. The clean, intuitive interface built with React and Bootstrap makes task management effortless, while the Node.js/Express backend with PostgreSQL ensures reliable data persistence and retrieval.",
      technologies: ["React", "Bootstrap", "Node.js", "Express", "PostgreSQL"],
      image: "/images/logo10.png",
      githubLink: "https://github.com/TeekayVuyisile/To-Do-List-Management-System",
      features: [
        "User authentication",
        "Task statistics dashboard",
        "Deadline-based status tracking",
        "Full CRUD functionality"
      ]
    }
  ];

  const filteredProjects = allProjects.filter(
    p => activeFilter === 'all' || p.category === activeFilter || p.tags.includes(activeFilter)
  );

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
    <section id="projects" className="section section-light">
      <div className="container-custom">
        <h2 className="section-title">My Projects<EqualizerBars className="title-equalizer" /></h2>

        {/* Global Permission Note */}
        <div className="global-permission-note">
          <InfoCircle size={20} />
          <p>
            <strong>Note:</strong> All logos and trademarks displayed belong to their respective owners.
          </p>
        </div>

        <div className="projects-filters">
          {FILTERS.map(filter => (
            <button
              key={filter.value}
              className={`filter-chip ${activeFilter === filter.value ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project, index) => {
            if (project.current) {
              return (
                <div
                  key={project.id}
                  className="current-build-bar"
                  style={{animationDelay: `${index * 0.1}s`}}
                  onClick={() => openModal(project)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View details for ${project.title}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openModal(project);
                    }
                  }}
                >
                  <span className="current-build-dot" aria-hidden="true"></span>
                  <div className="current-build-disc disc-spin">
                    <div className="project-disc">
                      <div className="project-disc-label">
                        <img src={project.image} alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="current-build-main">
                    <span className="current-build-label">Currently Building</span>
                    <h3>{project.title}</h3>
                    <p>{project.impactLine}</p>
                  </div>
                  <div className="current-build-tech">
                    Built with {project.technologies.slice(0, 4).join(', ')}
                  </div>
                  <span className="current-build-cta">
                    View Details <ArrowRight size={14} />
                  </span>
                </div>
              );
            }

            const isMajor = project.tier === 'major';
            const secondaryTag = project.tags.find(tag => tag !== 'fullstack') || project.tags[0];

            return (
              <div
                key={project.id}
                className={`project-card ${isMajor ? 'major' : ''} ${project.category === 'work' ? 'work-project' : ''}`}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div
                  className="project-image disc-spin"
                  onClick={() => openModal(project)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View details for ${project.title}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openModal(project);
                    }
                  }}
                >
                  <div className="project-disc">
                    <div className="project-disc-label">
                      <img
                        src={project.image}
                        alt={project.title}
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/400x400/111111/0066ff?text=${encodeURIComponent(project.title)}`;
                        }}
                      />
                    </div>
                  </div>
                  <div className="project-feature-count">{project.features.length} Features</div>
                  <div className="project-overlay">
                    <div className="overlay-buttons">
                      <button
                        className="view-project-btn"
                        onClick={() => openModal(project)}
                      >
                        View Details
                      </button>
                      {project.demoLink && (
                        <a
                          href={project.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="view-demo-overlay-btn"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <div className="project-tags">
                    <span className={`tag ${project.category === 'work' ? 'tone-teal' : ''}`}>
                      {project.category === 'work' ? 'Work Project' : 'Personal Project'}
                    </span>
                    {secondaryTag && <span className="tag">{TAG_LABELS[secondaryTag]}</span>}
                  </div>
                  <p className="project-description">{project.shortDescription}</p>

                  {isMajor ? (
                    <ul className="project-highlights">
                      {project.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  ) : (
                    <>
                      <div className="project-technologies">
                        {project.technologies.map(tech => (
                          <span key={tech} className="tech-badge">{tech}</span>
                        ))}
                      </div>
                      <div className="feature-preview">
                        {project.features.slice(0, 2).map((feature, idx) => (
                          <span key={idx} className="feature-tag">{feature}</span>
                        ))}
                        {project.features.length > 2 && (
                          <span className="feature-tag more">+{project.features.length - 2} more</span>
                        )}
                      </div>
                    </>
                  )}

                  {isMajor && (
                    <div className="project-technologies major-technologies">
                      {project.technologies.slice(0, 6).map(tech => (
                        <span key={tech} className="tech-badge">{tech}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

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
                      <span className={`tag ${activeProject.category === 'work' ? 'tone-teal' : ''}`}>
                        {activeProject.category === 'work' ? 'Work Project' : 'Personal Project'}
                      </span>
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
