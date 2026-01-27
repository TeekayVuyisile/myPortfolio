import React from 'react';

const Experience = () => {
  const calculateDuration = () => {
    const startDate = new Date('2025-05-01');
    const currentDate = new Date();
    
    const months = (currentDate.getFullYear() - startDate.getFullYear()) * 12 + 
                  (currentDate.getMonth() - startDate.getMonth());
    
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
      title: "Full Stack Developer",
      company: "Department of Economics Development and Tourism",
      period: "May 2025 - Present",
      duration: calculateDuration(),
      responsibilities: [
        "Developing and maintaining enterprise-level web applications",
        "Implementing responsive UI designs using React and Bootstrap",
        "Building RESTful APIs with Node.js and Express",
        "Database design and management with PostgreSQL",
        "Collaborating with cross-functional teams using Agile methodologies",
        "Deploying and maintaining applications in production environments"
      ],
      technologies: ["EJS", "Node.js", "PostgreSQL", "Express", "Bootstrap", "JavaScript"]
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
                <h4>Key Responsibilities:</h4>
                <ul className="responsibilities-list">
                  {exp.responsibilities.map((responsibility, idx) => (
                    <li key={idx}>{responsibility}</li>
                  ))}
                </ul>
                
                <div className="experience-technologies">
                  <h4>Technologies Used:</h4>
                  <div className="tech-tags ">
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