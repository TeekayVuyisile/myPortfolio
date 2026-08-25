import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MusicNote } from 'react-bootstrap-icons';
import EqualizerBars from './EqualizerBars';

const RESPONSIBILITIES_PREVIEW_COUNT = 3;

const Experience = () => {
  const [expandedProjects, setExpandedProjects] = useState({});

  const toggleProject = (key) => {
    setExpandedProjects(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const calculateDuration = (startDateStr, endDateStr = null) => {
    const startDate = new Date(startDateStr);
    const endDate = endDateStr ? new Date(endDateStr) : new Date();
    
    const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                  (endDate.getMonth() - startDate.getMonth());
    
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years === 0) {
      return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    } else if (remainingMonths === 0) {
      return `${years} year${years !== 1 ? 's' : ''}`;
    } else {
      return `${years} year${years !== 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    }
  };

  const experiences = [
     {
      id: 2,
      title: "Junior Full Stack Web Developer",
      company: "Department of Economic Development & Tourism",
      period: "May 2026 – Present",
      duration: calculateDuration('2026-04-01', '2026-08-31'),
      projects: [
        {
          name: "DEDAT (Dept. of Economic Development & Tourism) Internal LMS Project",
          responsibilities: [
            "Maintain and support the internal Learning Management System built during the internship, resolving bugs and handling ongoing feature requests",
            "Monitor system performance and reliability, troubleshooting issues raised by internal users",
            "Ship updates across the React frontend and Node.js/PostgreSQL backend while preserving existing functionality",
            "Coordinate with stakeholders to prioritize fixes and small enhancements based on usage feedback"
          ]
        },
        {
          name: "Programme Delivery Dashboard",
          responsibilities: [
            "Sole developer of a real-time, collaborative dashboard replacing manual Excel-based tracking with a live single source of truth for portfolio, task, KPI, and risk management across departments",
            "Designed the PostgreSQL schema and built a Node.js/Express REST API with a layered routes → controllers → models architecture (no ORM), including transactional multi-location inserts",
            "Implemented a real-time layer with Socket.IO so task edits, comments, and status changes propagate instantly to every connected client",
            "Built the React (Vite) frontend, including a dual-view spreadsheet/Kanban project tracker and interactive Leaflet/Mapbox-based multi-site location tracking",
            "Developed an intelligent Excel import pipeline that auto-detects header rows, lets users map columns to the schema, and validates data before commit",
            "Built a Financial Year/KPI subsystem for government-style quarterly reporting, including output indicators, quarter-tagged progress updates, and automatic snapshotting via scheduled jobs",
            "Integrated AI-assisted report generation (Google Gemini with Groq fallback) to produce Word/Excel reports combining logged data with narrative analysis, with transparent disclosure of when AI was used",
            "Implemented JWT authentication with email OTP verification and an immutable audit log for governance and accountability"
          ]
        }
      ],
      technologies: ["HTML", "CSS", "Bootstrap", "React", "Node.js", "Express", "PostgreSQL", "Socket.IO", "Vite", "REST API", "JWT", "Google Gemini AI", "Leaflet", "Mapbox", "Git"]
    },
    {
      id: 1,
      title: "Full Stack Web Developer Intern",
      company: "Awrise Internship (Hosted by Dept. of Economic Development & Tourism)",
      period: "Mar 2025 – Mar 2026",
      duration: calculateDuration('2025-03-01', '2026-03-01'),
      projects: [
        {
          name: "DEDAT (Dept. of Economic Development & Tourism) Internal LMS Project",
          responsibilities: [
            "Developed a full-featured Learning Management System (LMS) to improve internal training and e-learning processes",
            "Built responsive interfaces using HTML, CSS, Bootstrap, and React",
            "Implemented RESTful APIs with Node.js and managed data using PostgreSQL",
            "Collaborated with stakeholders to gather requirements, troubleshoot issues, and deliver scalable technical solutions",
            "Applied best practices in version control, testing, and deployment to ensure system reliability"
          ]
        },
        {
          name: "Educational Intervention Management System (Awrise Initiative)",
          responsibilities: [
            "Led end-to-end development of a platform for managing learner assessments & materials, attendance tracking with digital signoffs, and performance analytics dashboards",
            "Collaborated with team members on requirements gathering and solution design, while independently developing the full system",
            "Built responsive interfaces using React and Bootstrap",
            "Developed backend services with Node.js (REST API) and PostgreSQL"
          ]
        }
      ],
      technologies: ["HTML", "CSS", "Bootstrap", "React", "Node.js", "Express", "PostgreSQL", "REST API", "Git"]
    },
   
  ];

  return (
    <section id="experience" className="section section-dark">
      <div className="container-custom">
        <h2 className="section-title">Work Experience<EqualizerBars className="title-equalizer" /></h2>
        
        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="experience-item" style={{animationDelay: `${index * 0.2}s`}}>
              <div className="experience-header">
                <div className="experience-title">
                  <h3>{exp.title}</h3>
                  <span className="company-name">{exp.company}</span>
                </div>
                <div className="experience-period">
                  <span className="exp-period">{exp.period}</span>
                  <span className="exp-duration">{exp.duration}</span>
                </div>
              </div>
              
              <div className="experience-content">
                {exp.projects.map((project, idx) => {
                  const key = `${exp.id}-${idx}`;
                  const isExpanded = !!expandedProjects[key];
                  const hasMore = project.responsibilities.length > RESPONSIBILITIES_PREVIEW_COUNT;
                  const previewResponsibilities = project.responsibilities.slice(0, RESPONSIBILITIES_PREVIEW_COUNT);
                  const extraResponsibilities = project.responsibilities.slice(RESPONSIBILITIES_PREVIEW_COUNT);

                  return (
                    <div key={idx} className="project-section" style={{marginBottom: '1.5rem'}}>
                      <h4>{project.name}</h4>
                      <ul className="responsibilities-list">
                        {previewResponsibilities.map((responsibility, ridx) => (
                          <li key={ridx}>
                            <MusicNote className="resp-note-icon" size={12} />
                            {responsibility}
                          </li>
                        ))}
                      </ul>
                      {hasMore && (
                        <div className={`extra-responsibilities ${isExpanded ? 'expanded' : ''}`}>
                          <ul className="responsibilities-list">
                            {extraResponsibilities.map((responsibility, ridx) => (
                              <li key={ridx} style={{ animationDelay: `${ridx * 0.07}s` }}>
                                <MusicNote className="resp-note-icon" size={12} />
                                {responsibility}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {hasMore && (
                        <button
                          type="button"
                          className="read-more-btn"
                          onClick={() => toggleProject(key)}
                          aria-expanded={isExpanded}
                        >
                          {isExpanded ? (
                            <>Show less <ChevronUp size={14} /></>
                          ) : (
                            <>Read more ({project.responsibilities.length - RESPONSIBILITIES_PREVIEW_COUNT} more) <ChevronDown size={14} /></>
                          )}
                        </button>
                      )}
                    </div>
                  );
                })}
                
                <div className="experience-technologies">
                  <h4>Technologies Used:</h4>
                  <div className="project-technologies">
                    {exp.technologies.map(tech => (
                      <span key={tech} className="tech-tag mx-1">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="timeline-connector">
                <div className="timeline-dot"><MusicNote size={10} /></div>
                {index < experiences.length - 1 && <div className="timeline-line"></div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;