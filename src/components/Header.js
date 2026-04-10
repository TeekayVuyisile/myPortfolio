import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  List, 
  X, 
  House, 
  Person,  
  Folder,
  Lightbulb, 
  Briefcase,
  Mortarboard, 
  Envelope,
  Github,
  Linkedin,
  
} from 'react-bootstrap-icons';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <nav className={`custom-navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-brand">
            <a href="#home">Teekay Manale</a>
          </div>
          
          <div className="nav-right">
            <div className="nav-links">
              <a href="#home" className="nav-link">Home</a>
              <a href="#about" className="nav-link">About</a>
              <a href="#experience" className="nav-link">Experience</a>
              <a href="#projects" className="nav-link">Projects</a>
               <a href="#skills" className="nav-link">Skills</a>
              <a href="#education" className="nav-link">Education</a>
              <a href="#contact" className="nav-link">Contact</a>
            </div>
            
            <button 
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <div className="theme-toggle-track">
                <div className="theme-toggle-thumb">
                  {isDarkMode ? '🌙' : '☀️'}
                </div>
              </div>
            </button>

            {/* Burger Menu Button - Mobile Only */}
            <button 
              className={`burger-menu ${mobileMenuOpen ? 'open' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <List size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`mobile-sidebar ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-sidebar-header">
          <div className="mobile-sidebar-brand">
            <a href="#home" onClick={handleLinkClick}>Teekay Manale</a>
          </div>
          {/*Sidebar header */}
          <div className="mobile-sidebar-social">
            <a href="https://github.com/TeekayVuyisile" target="_blank" rel="noopener noreferrer" className="mobile-social-icon">
              <Github size={18} />
            </a>
            <a href="https://linkedin.com/in/teekay-manale" target="_blank" rel="noopener noreferrer" className="mobile-social-icon">
              <Linkedin size={18} />
            </a>
            
          </div>
        </div>
        <div className="mobile-sidebar-nav">
          <a href="#home" className="mobile-nav-link" onClick={handleLinkClick}>
            <House size={20} className="nav-icon" />
            Home
          </a>
          <a href="#about" className="mobile-nav-link" onClick={handleLinkClick}>
            <Person size={20} className="nav-icon" />
            About
          </a>
          <a href="#experience" className="mobile-nav-link" onClick={handleLinkClick}>
            <Briefcase size={20} className="nav-icon" />
            Experience
          </a>
          <a href="#projects" className="mobile-nav-link" onClick={handleLinkClick}>
            <Folder size={20} className="nav-icon" />
            Projects
          </a>
           <a href="#skills" className="mobile-nav-link" onClick={handleLinkClick}>
            <Lightbulb size={20} className="nav-icon" />
            Skills
          </a>
          <a href="#education" className="mobile-nav-link" onClick={handleLinkClick}>
            <Mortarboard size={20} className="nav-icon" />
            Education
          </a>
          <a href="#contact" className="mobile-nav-link" onClick={handleLinkClick}>
            <Envelope size={20} className="nav-icon" />
            Contact
          </a>
        </div>
      </div>

      {/* Overlay */}
      <div 
        className={`mobile-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />
    </>
  );
};

export default Header;