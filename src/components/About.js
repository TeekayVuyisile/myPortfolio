import React from 'react';

const About = () => {
  return (
    <section id="about" className="section section-light">
      <div className="container-custom">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p className="about-description">
              I'm a passionate Full Stack Developer with a strong foundation in both 
              theoretical knowledge and practical application. My journey in software 
              development combines formal education with hands-on experience, allowing 
              me to create robust, scalable solutions that solve real-world problems.
            </p>
            
            <div className="about-highlights">
              <div className="highlight-item">
                <div className="highlight-icon">💼</div>
                <div className="highlight-content">
                  <h4>Professional Experience</h4>
                  <p>Currently working as a Full Stack Developer at the Department of Economics Development and Tourism, building enterprise-level applications.</p>
                </div>
              </div>
              
              <div className="highlight-item">
                <div className="highlight-icon">🎓</div>
                <div className="highlight-content">
                  <h4>Educational Background</h4>
                  <p>Diploma in ICT from Sol Plaatje University, complemented by specialized bootcamps and continuous learning.</p>
                </div>
              </div>
              
              <div className="highlight-item">
                <div className="highlight-icon">🚀</div>
                <div className="highlight-content">
                  <h4>Development Approach</h4>
                  <p>I follow Agile methodologies, focus on clean code principles, and prioritize user-centered design in all my projects.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="about-stats">
            <div className="stat-card">
              <h3 className="stat-number">5+</h3>
              <p className="stat-label">Projects Completed</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-number">3</h3>
              <p className="stat-label">Client Systems</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-number">6+</h3>
              <p className="stat-label">Technologies</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-number">100%</h3>
              <p className="stat-label">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;