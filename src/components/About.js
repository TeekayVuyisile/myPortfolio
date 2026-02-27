import React from "react";

const About = () => {
  return (
    <section id="about" className="section section-light">
      <div className="container-custom">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p className="about-description">
              I’m a Full-Stack Web Developer with a Diploma in ICT and hands-on
              experience in building responsive, user-friendly web applications.
              Skilled in front-end and back-end development, database
              management, and cloud technologies. Known for problem-solving,
              teamwork, and delivering impactful solutions. I follow Agile
              methodologies, focus on clean code principles, and prioritize
              user-centered design in all my projects. Passionate about
              learning, I thrive on building impactful applications that
              seamlessly blend functionality, creativity, and innovation.
            </p>

            
          </div>

          <div className="about-stats">
            <div className="stat-card">
              <h3 className="stat-number">5+</h3>
              <p className="stat-label">Projects Completed</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-number">2</h3>
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
