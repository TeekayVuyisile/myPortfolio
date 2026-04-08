import React from 'react';

const Experience = () => {
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
      id: 1,
      title: "Full Stack Web Developer",
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
    }
  ];

  return (
    <section id="experience" className="section section-dark">
      <div className="container-custom">
        <h2 className="section-title">Work Experience</h2>
        
        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="experience-item" style={{animationDelay: `${index * 0.2}s`}}>
              <div className="experience-header">
                <div className="experience-title">
                  <h3>{exp.title}</h3>
                  <span className="company-name">{exp.company}</span>
                </div>
                <div className="experience-period">
                  <span className="period">{exp.period}</span>
                  <span className="duration">({exp.duration})</span>
                </div>
              </div>
              
              <div className="experience-content">
                {exp.projects.map((project, idx) => (
                  <div key={idx} className="project-section" style={{marginBottom: '1.5rem'}}>
                    <h4>{project.name}</h4>
                    <ul className="responsibilities-list">
                      {project.responsibilities.map((responsibility, ridx) => (
                        <li key={ridx}>{responsibility}</li>
                      ))}
                    </ul>
                  </div>
                ))}
                
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
                <div className="timeline-dot"></div>
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