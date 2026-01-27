import React, { useState } from 'react';

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);
  const [activeTab, setActiveTab] = useState('formal');

  const formalProjects = [
    {
      id: 1,
      title: "DEDAT Learner Portal Management System",
      description: "A comprehensive management system for tracking and managing learners, built with modern web technologies to handle large-scale data efficiently.",
      technologies: ["EJS", "Bootstrap", "Node.js", "Express", "PostgreSQL"],
      image: "/images/1.jpg"
    },
    {
      id: 2,
      title: "Edulens LMS For Grade R-3",
      description: "Learning Management System specifically designed for early childhood education, featuring interactive content and progress tracking.",
      technologies: ["React", "Bootstrap", "Node.js",  "Express", "PostgreSQL"],
      image: "/images/3.jpg"
    },
    {
      id: 3,
      title: "Awrise Intervention Management System",
      description: "System for managing educational interventions and tracking student progress with detailed analytics and reporting features.",
      technologies: ["React","Bootstrap", "Node.js",  "Express", "PostgreSQL", "Rest API"],
      image: "/images/2.png"
    }
  ];

  const sideProjects = [
    {
      id: 4,
      title: "Events Management System",
      description: "A full-stack application for creating, managing, and tracking events with user registration and notification systems.",
      technologies: ["EJS","Bootstrap", "Node.js", "Express", "PostgreSQL"],
      image: "/images/events-system.jpg"
    },
    {
      id: 5,
      title: "To Do List",
      description: "A responsive task management application with drag-and-drop functionality and real-time updates.",
      technologies: ["React", "Bootstrap", "Node.js", "Express", "PostgreSQL"],
      image: "/images/todo-app.jpg"
    }
  ];

  const projects = activeTab === 'formal' ? formalProjects : sideProjects;

  const openModal = (project) => {
    setActiveProject(project);
  };

  const closeModal = () => {
    setActiveProject(null);
  };

  return (
    <section id="projects" className="section section-light">
      <div className="container-custom">
        <h2 className="section-title">My Projects</h2>
        
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
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className="project-card"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="project-image">
                <img 
                  src={project.image} 
                  alt={project.title}
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/400x250/111111/0066ff?text=${encodeURIComponent(project.title)}`;
                  }}
                />
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
                <p className="project-description">{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map(tech => (
                    <span key={tech} className="tech-badge">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Modal */}
        {activeProject && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal}>X</button>
              <div className="modal-image">
                <img 
                  src={activeProject.image} 
                  alt={activeProject.title}
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/800x500/111111/0066ff?text=${encodeURIComponent(activeProject.title)}`;
                  }}
                />
              </div>
              <div className="modal-details">
                <h3>{activeProject.title}</h3>
                <p>{activeProject.description}</p>
                <div className="modal-technologies">
                  <h4>Technologies Used:</h4>
                  <div className="tech-list">
                    {activeProject.technologies.map(tech => (
                      <span key={tech} className="tech-badge">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;