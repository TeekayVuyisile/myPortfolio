import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="hero-section mt-4">
      <div className="container-custom">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Hi, I'm <span className="text-gradient">Teekay Vuyisile Manale</span>
            </h1>
            <h2 className="hero-subtitle">Full Stack Developer</h2>
            <p className="hero-description">
              I create digital solutions that blend innovative technology with 
              user-centered design. Passionate about building scalable applications 
              and transforming ideas into reality through code.
            </p>
            <div className="hero-buttons">
              <a href="#projects" className="btn btn-primary">View My Work</a>
              <a href="#contact" className="btn btn-secondary mx-2">Get In Touch</a>
            </div>
          </div>
          <div className="hero-image">
            <div className="profile-image-container">
              <img 
                src="/images/profile.jpeg" 
                alt="Teekay Vuyisile Manale"
                className="profile-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x400/0066ff/ffffff?text=TVM';
                }}
              />
              <div className="image-glow"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;