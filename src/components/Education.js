import React from 'react';
import EqualizerBars from './EqualizerBars';

const Education = () => {
  const education = [
    {
      id: 1,
      degree: "Diploma in Information & Communication Technology",
      institution: "Sol Plaatje University",
      period: "2022 - 2024",
      description: "A tertiary qualification in Information & Communication Technology covering software development fundamentals, agile methodologies, and practical programming skills. It built a strong academic foundation in system analysis, database design, and full-stack development practices.",
      achievements: [
        "Software Development Life Cycle (SDLC)",
        "Agile & Scrum Methodologies",
        "Object-Oriented Programming",
        "Database Design & Management",
        "Web Development Fundamentals",
        "System Analysis & Design",
        "Android Studio Development",
        "HTML, CSS, JavaScript",
        "PHP",
        "Python",
        "Java",
        "MySQL Workbench, MongoDB, PostgreSQL",
      ],
      type: "formal"
    },
    {
      id: 2,
      degree: "The Complete Full-Stack Web Development Bootcamp",
      institution: "Udemy",
      period: "2025",
      description: "Intensive practical training in modern full-stack development technologies and real-world project implementation. The bootcamp emphasized hands-on coding, deployment workflows, and building production-ready applications from scratch.",
      achievements: [
        "Advanced React & JavaScript",
        "Node.js & Express Framework",
        "RESTful API Development",
        "Web3 & Blockchain Integration",
        "DApps Development",
        "Database Integration",
        "Authentication & Authorization",
        "Deployment & DevOps Basics"
      ],
      type: "certification"
    },
    {
      id: 3,
      degree: "System Design Masterclass(2026) | From FAANGInsiders",
      institution: "Udemy",
      period: "2026",
      description: "In-depth study of large-scale system design principles used in high-traffic production systems and FAANG-style technical interviews. The course focused on designing for scale, reliability, and performance under real-world constraints.",
      achievements: [
        "Scalability & Load Balancing",
        "Caching Strategies (CDN, Redis)",
        "Database Sharding & Replication",
        "Microservices Architecture",
        "Distributed Systems & CAP Theorem",
        "Message Queues & Event-Driven Design"
      ],
      type: "certification"
    },
    {
      id: 4,
      degree: "CloudSec AWS Bootcamp",
      institution: "CloudSec Network",
      period: "2025",
      description: "Specialized training in AWS cloud computing with a focus on security and scalable infrastructure. The program covered deploying, securing, and monitoring cloud-native applications using industry best practices.",
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
        <h2 className="section-title">Education & Certifications<EqualizerBars className="title-equalizer" /></h2>
        
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