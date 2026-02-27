import React, { useState, useEffect } from 'react';
import { 
  XCircle, 
  ChevronLeft, 
  ChevronRight, 
  PlayCircle, 
  InfoCircle,
  Github,
  ArrowRight,
  JournalCheck,
  People,
  BarChartLine,
  TicketPerforated,
  
  Check2Square,
  Robot
} from 'react-bootstrap-icons';

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);
  const [activeTab, setActiveTab] = useState('formal');
  const [activeSlide, setActiveSlide] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  // Helper function to extract YouTube video ID from URL
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Helper function to get project icon
  const getProjectIcon = (title) => {
    if (title.includes("DEDAT")) return JournalCheck;
    if (title.includes("Awrise")) return People;
    if (title.includes("EduLens")) return BarChartLine;
    if (title.includes("Event")) return TicketPerforated;
    if (title.includes("AI Travel")) return Robot;
    if (title.includes("To Do")) return Check2Square;
    return JournalCheck;
  };

  const formalProjects = [
    {
      id: 1,
      title: "DEDAT Internal LMS",
      shortDescription: "Internal Learning Management System for course and user management.",
      fullDescription: "Developed an internal Learning Management System (LMS) to streamline the management of courses, users, and training content for the Department of Economic Development and Tourism. The system features robust authentication and role-based access control, ensuring secure and appropriate access for different user types. Built with a responsive React and Bootstrap frontend, the platform provides an intuitive interface for administrators and learners. The backend is powered by Node.js and PostgreSQL, delivering reliable performance for handling training materials, tracking course completion, and managing user enrollments efficiently.",
      technologies: ["React", "Bootstrap", "Node.js", "Express", "PostgreSQL"],
      images: ["/images/logo1.png"],
      video: "https://youtu.be/dJjg1DQbMBw",
      logoDisclaimer: "The DEDAT logo displayed is the property of the Department of Economic Development and Tourism and is used here for demonstration purposes only with permission.",
      permissionNote: "✓ Permission granted to demonstrate this system in my portfolio",
      githubLink: null,
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
      shortDescription: "Educational intervention platform for tracking learner assessments and attendance.",
      fullDescription: "Developed a comprehensive educational intervention management system designed to track and manage learner assessments, educational materials, and monthly attendance registers with sign-off capabilities. The platform implements detailed student progress tracking with performance analytics and reporting dashboards, enabling educators to monitor individual and class-wide progress effectively. Key features include assessment management, material distribution, attendance tracking with digital sign-offs, and comprehensive analytics that provide insights into student performance and intervention effectiveness. Built with a React and Bootstrap frontend and Node.js/PostgreSQL backend, the system provides a responsive, user-friendly interface for educators to manage interventions and track student progress.",
      technologies: ["React", "Bootstrap", "Node.js", "Express", "PostgreSQL", "REST API"],
      images: ["/images/logo3.png"],
      video: "https://youtu.be/7sF0grOXr60",
      logoDisclaimer: "The Awrise logo is the property of Awrise Innovations and is used here for demonstration purposes only with permission.",
      permissionNote: "✓ Permission granted to demonstrate this system in my portfolio",
      githubLink: null,
      features: [
        "Learner assessment tracking",
        "Monthly attendance with sign-offs",
        "Performance analytics dashboards",
        "Educational material management"
      ]
    }
  ];

  const sideProjects = [
    {
      id: 3,
      title: "EduLens LMS",
      shortDescription: "Role-based learning platform for primary schools (Grade R–3).",
      fullDescription: "Built a comprehensive role-based Learning Management System specifically designed for primary schools catering to Grade R through 3. The platform provides distinct interfaces and functionalities for administrators, teachers, and young learners, ensuring age-appropriate content delivery and management capabilities. Key features include assessment tracking to monitor student progress, detailed learner performance analytics that help identify areas for improvement, and academic progression tracking to ensure students meet grade-level expectations. A standout feature is the AI-powered worksheet generation system that creates curriculum-aligned exercises appropriate for each grade level, saving teachers valuable preparation time while ensuring educational content remains engaging and relevant.",
      technologies: ["React", "Bootstrap", "Node.js", "Express", "PostgreSQL"],
      images: ["/images/logo4.png"],
      video: null,
      githubLink: "https://github.com/yourusername/edulens-lms",
      features: [
        "Role-based access (Admin, Teacher, Learner)",
        "Assessment and performance tracking",
        "AI-powered worksheet generation",
        "Academic progression monitoring"
      ]
    },
    {
      id: 4,
      title: "Event Management System",
      shortDescription: "Full-stack event platform with ticketing and QR code entry.",
      fullDescription: "Developed a comprehensive full-stack event management platform that streamlines the entire event lifecycle from creation to execution. The system provides distinct interfaces for administrators to create and manage events, and for attendees to discover, register, and participate. Core functionality includes a complete ticketing system that handles sales and validation, QR code-based entry management for secure and efficient check-ins, and integrated wallet management for handling payments and ticket storage. Built with a responsive React and Bootstrap frontend and a robust Node.js/PostgreSQL backend, the platform ensures smooth event operations whether managing a small workshop or a large conference with hundreds of attendees.",
      technologies: ["React", "Bootstrap", "Node.js", "Express", "PostgreSQL"],
      images: ["/images/logo2.png"],
      video: null,
      logoDisclaimer: "The Sol Plaatjie University logo displayed is the property of its respective owner and is used here for demonstration purposes only.",
      githubLink: "https://github.com/yourusername/event-management-system",
      features: [
        "Event creation and management",
        "Ticketing system with QR codes",
        "Wallet management",
        "Attendee registration and check-in"
      ]
    },
    {
      id: 5,
      title: "AI Travel Planner",
      shortDescription: "AI-powered travel planning with personalized itineraries.",
      fullDescription: "Created an innovative AI-powered travel planning web application that generates personalized travel itineraries based on user preferences, budget constraints, and travel styles. The platform integrates multiple real-time APIs to provide comprehensive travel information including weather forecasts for destinations, interactive maps for navigation and exploration, and attraction data to help users discover points of interest. The AI engine analyzes user inputs to suggest optimal travel routes, accommodation options, and daily activities that align with individual preferences. All user data, saved itineraries, and preferences are persistently stored in PostgreSQL, allowing users to revisit and modify their travel plans. The responsive React frontend ensures a seamless experience across devices, while the Node.js/Express backend efficiently orchestrates API calls and data management.",
      technologies: ["React", "Bootstrap", "Node.js", "Express", "PostgreSQL", "OpenAI API"],
      images: ["/images/logo5.png"],
      video: null,
      githubLink: "https://github.com/yourusername/ai-travel-planner",
      features: [
        "AI-powered itinerary generation",
        "Real-time weather integration",
        "Maps and attractions data",
        "Personalized travel recommendations"
      ]
    },
    {
      id: 6,
      title: "To-Do List Application",
      shortDescription: "Full-stack task management with progress tracking.",
      fullDescription: "Built a full-stack task management web application designed to help users organize their tasks efficiently and track their productivity. The system features secure user authentication, ensuring that each user's tasks remain private and accessible only to them. A comprehensive dashboard provides visual task statistics, showing completion rates, pending items, and productivity trends over time. Tasks are automatically categorized based on their due dates, with the system intelligently marking overdue tasks as 'failed' while tracking completion progress for active tasks. The application implements full CRUD functionality through RESTful APIs, allowing users to create, read, update, and delete tasks and to-do lists seamlessly. The clean, intuitive interface built with React and Bootstrap makes task management effortless, while the Node.js/Express backend with PostgreSQL ensures reliable data persistence and retrieval.",
      technologies: ["React", "Bootstrap", "Node.js", "Express", "PostgreSQL"],
      images: ["/images/logo6.png"],
      video: null,
      githubLink: "https://github.com/yourusername/todo-list-app",
      features: [
        "User authentication",
        "Task statistics dashboard",
        "Deadline-based status tracking",
        "Full CRUD functionality"
      ]
    }
  ];

  const projects = activeTab === 'formal' ? formalProjects : sideProjects;

  const openModal = (project) => {
    setActiveProject(project);
    setActiveSlide(0);
    setIsVideoPlaying(false);
  };

  const closeModal = () => {
    setActiveProject(null);
    setActiveSlide(0);
    setIsVideoPlaying(false);
    setShowDisclaimer(false);
  };

  const nextSlide = () => {
    if (!activeProject) return;
    const totalSlides = activeProject.images.length + (activeProject.video ? 1 : 0);
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    if (!activeProject) return;
    const totalSlides = activeProject.images.length + (activeProject.video ? 1 : 0);
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
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

  // Reset video state when changing slides
  useEffect(() => {
    setIsVideoPlaying(false);
  }, [activeSlide]);

  return (
    <section id="projects" className="section section-light">
      <div className="container-custom">
        <h2 className="section-title">My Projects</h2>
        
        {/* Global Permission Note */}
        <div className="global-permission-note">
          <InfoCircle size={20} />
          <p>
            <strong>Note:</strong> I have obtained explicit permission to demonstrate these systems 
            in my portfolio. All logos and trademarks displayed belong to their respective owners 
            and are used with permission for demonstration purposes only.
          </p>
        </div>

        <div className="projects-tabs">
          <button 
            className={`tab-button ${activeTab === 'formal' ? 'active' : ''}`}
            onClick={() => setActiveTab('formal')}
          >
            Formal Projects
          </button>
          <button 
            className={`tab-button ${activeTab === 'side' ? 'active' : ''}`}
            onClick={() => setActiveTab('side')}
          >
            Side Projects
          </button>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => {
            const IconComponent = getProjectIcon(project.title);
            return (
              <div 
                key={project.id} 
                className="project-card"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="project-image">
                  <img 
                    src={project.images[0]} 
                    alt={project.title}
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/400x250/111111/0066ff?text=${encodeURIComponent(project.title)}`;
                    }}
                  />
                  <div className="project-icon-badge">
                    <IconComponent size={20} />
                  </div>
                  <div className="project-overlay">
                    <button 
                      className="view-project-btn"
                      onClick={() => openModal(project)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.shortDescription}</p>
                  
                  {/* Permission Note Badge for Formal Projects */}
                  {project.permissionNote && (
                    <div className="permission-badge">
                      <InfoCircle size={14} />
                      <span>{project.permissionNote}</span>
                    </div>
                  )}
                  
                  <div className="project-technologies">
                    {project.technologies.map(tech => (
                      <span key={tech} className="tech-badge">{tech}</span>
                    ))}
                  </div>

                  {/* Feature Preview */}
                  <div className="feature-preview">
                    {project.features.slice(0, 2).map((feature, idx) => (
                      <span key={idx} className="feature-tag">{feature}</span>
                    ))}
                    {project.features.length > 2 && (
                      <span className="feature-tag more">+{project.features.length - 2} more</span>
                    )}
                  </div>
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
              
              <div className="modal-carousel">
                <div className="carousel-container">
                  <button className="carousel-btn prev" onClick={prevSlide}>
                    <ChevronLeft size={24} />
                  </button>
                  
                  <div className="carousel-slide">
                    {activeProject.images.map((img, index) => (
                      <div 
                        key={index}
                        className={`slide-item ${activeSlide === index ? 'active' : ''}`}
                        style={{
                          transform: `translateX(${100 * (index - activeSlide)}%)`,
                          opacity: activeSlide === index ? 1 : 0
                        }}
                      >
                        <img 
                          src={img} 
                          alt={`${activeProject.title} - Screenshot ${index + 1}`}
                          onError={(e) => {
                            e.target.src = `https://via.placeholder.com/800x500/111111/0066ff?text=${encodeURIComponent(activeProject.title + ' Screenshot ' + (index + 1))}`;
                          }}
                        />
                      </div>
                    ))}
                    
                    {activeProject.video && (
                      <div 
                        className={`slide-item ${activeSlide === activeProject.images.length ? 'active' : ''}`}
                        style={{
                          transform: `translateX(${100 * (activeProject.images.length - activeSlide)}%)`,
                          opacity: activeSlide === activeProject.images.length ? 1 : 0
                        }}
                      >
                        {isVideoPlaying ? (
                          <div className="video-container">
                            <iframe
                              className="youtube-video"
                              src={`https://www.youtube.com/embed/${getYouTubeVideoId(activeProject.video)}?autoplay=1`}
                              title={`${activeProject.title} Demo Video`}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                        ) : (
                          <div className="video-thumbnail" onClick={handleVideoPlay}>
                            <img 
                              src={`https://img.youtube.com/vi/${getYouTubeVideoId(activeProject.video)}/maxresdefault.jpg`}
                              alt={`${activeProject.title} Video Thumbnail`}
                              onError={(e) => {
                                e.target.src = `https://img.youtube.com/vi/${getYouTubeVideoId(activeProject.video)}/hqdefault.jpg`;
                              }}
                            />
                            <div className="video-play-overlay">
                              <PlayCircle size={64} />
                              <span>Click to play demo video</span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <button className="carousel-btn next" onClick={nextSlide}>
                    <ChevronRight size={24} />
                  </button>
                </div>
                
                {activeProject.images.length > 1 || activeProject.video ? (
                  <div className="carousel-dots">
                    {[...Array(activeProject.images.length + (activeProject.video ? 1 : 0))].map((_, index) => (
                      <button
                        key={index}
                        className={`carousel-dot ${activeSlide === index ? 'active' : ''}`}
                        onClick={() => setActiveSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                ) : null}
              </div>
              
              <div className="modal-details">
                <h3>{activeProject.title}</h3>
                <p className="full-description">{activeProject.fullDescription}</p>
                
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
                
                {/* Compact Permission Note in Modal */}
                {activeProject.permissionNote && (
                  <div className="modal-permission-note">
                    <InfoCircle size={16} />
                    <span>{activeProject.permissionNote}</span>
                  </div>
                )}
                
                <div className="modal-technologies">
                  <h4>Technologies Used:</h4>
                  <div className="tech-list">
                    {activeProject.technologies.map(tech => (
                      <span key={tech} className="tech-badge">{tech}</span>
                    ))}
                  </div>
                </div>

                {/* GitHub Link for Side Projects */}
                {activeTab === 'side' && activeProject.githubLink && (
                  <div className="modal-github-link">
                    <a 
                      href={activeProject.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="github-btn"
                    >
                      <Github size={20} />
                      <span>View Source Code on GitHub</span>
                      <ArrowRight size={16} className="arrow-icon" />
                    </a>
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