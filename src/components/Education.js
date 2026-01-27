import React from 'react';

const Education = () => {
  const education = [
    {
      id: 1,
      degree: "Diploma in Information & Communication Technology",
      institution: "Sol Plaatje University",
      period: "2022 - 2024",
      description: "Comprehensive program covering software development fundamentals, agile methodologies, and practical programming skills.",
      achievements: [
        "Software Development Life Cycle (SDLC)",
        "Agile & Scrum Methodologies",
        "Object-Oriented Programming",
        "Database Design & Management",
        "Web Development Fundamentals",
        "System Analysis & Design",
        "Javascript, PHP, Python, Java, My SQL Workbench "
      ],
      type: "formal"
    },
    {
      id: 2,
      degree: "The Complete Full-Stack Web Development Bootcamp",
      institution: "Udemy",
      period: "2025",
      description: "Intensive practical training in modern full-stack development technologies and real-world project implementation.",
      achievements: [
        "Advanced React & JavaScript",
        "Node.js & Express Framework",
        "RESTful API Development",
        "Database Integration",
        "Authentication & Authorization",
        "Deployment & DevOps Basics"
      ],
      type: "certification"
    },
    {
      id: 3,
      degree: "CloudSec AWS Bootcamp",
      institution: "Cloud Security Training",
      period: "2025",
      description: "Specialized training in AWS cloud computing with focus on security and scalable infrastructure.",
      achievements: [
        "AWS Core Services (EC2, S3, RDS)",
        "Cloud Security Fundamentals",
        "Infrastructure as Code",
        "Cloud Deployment Strategies",
        "Monitoring & Logging",
        "Cost Optimization"
      ],
      type: "certification"
    }
  ];

  const getEducationIcon = (type) => {
    switch(type) {
      case 'formal': return '🎓';
      case 'certification': return '📜';
      default: return '📚';
    }
  };

  return (
    <section id="education" className="section section-light">
      <div className="container-custom">
        <h2 className="section-title">Education & Certifications</h2>
        
        <div className="education-grid">
          {education.map((edu, index) => (
            <div key={edu.id} className="education-card" style={{animationDelay: `${index * 0.15}s`}}>
              <div className="education-icon">
                {getEducationIcon(edu.type)}
              </div>
              
              <div className="education-content">
                <div className="education-header">
                  <h3 className="degree">{edu.degree}</h3>
                  <span className="institution">{edu.institution}</span>
                  <span className="period">{edu.period}</span>
                </div>
                
                <p className="education-description">{edu.description}</p>
                
                <div className="education-achievements">
                  <h4>Key Learnings:</h4>
                  <div className="achievements-grid">
                    {edu.achievements.map((achievement, idx) => (
                      <span key={idx} className="achievement-tag">
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="education-badge">
                {edu.type === 'formal' ? 'Diploma' : 'Certificate'}
              </div>
            </div>
          ))}
        </div>
        
        <div className="education-summary">
          <div className="summary-card">
            <h3>Educational Journey</h3>
            <p>
              My education combines formal academic training with specialized practical bootcamps, 
              providing me with both theoretical foundations and hands-on development experience. 
              This balanced approach enables me to understand software engineering principles while 
              effectively applying them to real-world projects.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;