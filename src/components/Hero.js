import React, { useState, useEffect } from 'react';
import { Github, Linkedin } from 'react-bootstrap-icons';

const Hero = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const titles = [
    'Full Stack Software Developer',
  ];

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % titles.length;
      const fullText = titles[i];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 100 : 200);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, titles]);

  return (
    <section id="home" className="hero-section">
      <div className="container-custom py-3">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Hi, I'm <span className="text-gradient">Teekay Vuyisile Manale</span>
            </h1>
            <h2 className="hero-subtitle">
              <span className="typing-text">{text}</span>
              <span className="typing-cursor">|</span>
            </h2>
            <p className="hero-description">
              I create digital solutions that blend innovative technology with 
              user-centered design. Passionate about building scalable applications 
              and transforming ideas into reality through code.
            </p>
            <div className="hero-buttons">
              <a href="#projects" className="btn btn-primary">View My Work</a>
              <div className="social-button-group">
                <a href="#contact" className="btn btn-secondary">Get In Touch</a>
                <div className="social-icons sm">
                  <a 
                    href="https://github.com/TeekayVuyisile" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-icon"
                    title="GitHub"
                  >
                    <Github size={20} />
                  </a>
                  <a 
                    href="https://linkedin.com/in/teekay-manale" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-icon"
                    title="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <div className="profile-image-container static-profile">
              <img 
                src="/images/profile.jpeg" 
                alt="Teekay Vuyisile Manale"
                className="profile-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x400/0066ff/ffffff?text=TVM';
                }}
              />
              <div className="image-glow-static"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;