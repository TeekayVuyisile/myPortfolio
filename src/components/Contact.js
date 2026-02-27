import React, { useState } from 'react';
import { 
  Envelope, 
  Telephone, 
  GeoAlt, 
  Linkedin, 
  CheckCircle, 
  ExclamationCircle,
  Send 
} from 'react-bootstrap-icons';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setSubmitStatus('error');
      setErrorMessage('Please fill in all fields');
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus('error');
      setErrorMessage('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
      setErrorMessage('Network error. Please check if the server is running or try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Envelope,
      title: 'Email',
      value: 'Vuyisilemanalet24@gmail.com',
      link: 'mailto:Vuyisilemanalet24@gmail.com'
    },
    {
      icon: Telephone,
      title: 'Phone',
      value: '073 881 4600',
      link: 'tel:0738814600'
    },
    {
      icon: GeoAlt,
      title: 'Location',
      value: 'South Africa',
      link: null
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      value: 'linkedin.com/in/teekay-manale',
      link: 'https://linkedin.com/in/teekay-manale'
    }
  ];

  return (
    <section id="contact" className="section section-light">
      <div className="container-custom">
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-subtitle">
          Ready to start your next project? Let's talk about how I can help bring your ideas to life.
        </p>
        
        <div className="contact-content">
          <div className="contact-info">
            <h3>Contact Information</h3>
            <p>
              I'm always interested in new opportunities and challenges. 
              Whether you have a project in mind or just want to connect, 
              feel free to reach out!
            </p>
            
            <div className="contact-details">
              {contactInfo.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="contact-item">
                    <div className="contact-icon">
                      <IconComponent size={24} />
                    </div>
                    <div className="contact-text">
                      <h4>{item.title}</h4>
                      {item.link ? (
                        <a href={item.link} target="_blank" rel="noopener noreferrer">
                          {item.value}
                        </a>
                      ) : (
                        <span>{item.value}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="availability">
              <div className="availability-status">
                <div className="status-indicator"></div>
                <span style={{color: "var(--text-primary)"}}>Available for new projects</span>
              </div>
              <p>Response time: Usually within 24 hours</p>
            </div>
          </div>
          
          <div className="contact-form-container pt-5">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                    disabled={isSubmitting}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What is this regarding?"
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Tell me about your project or inquiry..."
                  disabled={isSubmitting}
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
              
              {submitStatus === 'success' && (
                <div className="alert alert-success">
                  <CheckCircle size={20} />
                  <span>Message sent successfully! I'll get back to you soon.</span>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="alert alert-error">
                  <ExclamationCircle size={20} />
                  <span>{errorMessage || 'There was an error sending your message. Please try again.'}</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;