import React from 'react';
import { Telephone } from 'react-bootstrap-icons';
import EqualizerBars from './EqualizerBars';

const References = () => {
  const references = [
    {
      id: 1,
      name: "Mr Vernan Van Nel",
      position: "Assistant Director (Supervisor)",
      organization: "Department of Economics Development and Tourism",
      projects: ["DEDAT Learner Portal Management System", "Programme Delivery Dashboard"],
      testimony: "Teekay demonstrated exceptional skill in developing both our learner management system and our programme delivery dashboard. His attention to detail and understanding of our requirements resulted in solutions that significantly improved our operational efficiency.",
      contact: "073 739 5614"
    },

    {
      id: 2,
      name: "Miss Florence Kalipa",
      position: "Programme Director",
      organization: "Awrise",
      projects: ["Awrise Intervention Management System"],
      testimony: "Teekay's technical expertise and problem-solving skills were crucial in developing our intervention tracking system. He consistently delivered high-quality work and was responsive to our evolving needs throughout the project.",
      contact: "083 498 7344"
    }
  ];

  return (
    <section id="references" className="section section-dark">
      <div className="container-custom">
        <h2 className="section-title">Client References<EqualizerBars className="title-equalizer" /></h2>
        <p className="section-subtitle">
          Feedback from clients and projects I've worked on
        </p>
        
        <div className="references-grid">
          {references.map((ref, index) => (
            <div key={ref.id} className="reference-card" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="reference-header">
                <div className="reference-avatar">
                  {ref.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="reference-info">
                  <h3 className="reference-name">{ref.name}</h3>
                  <p className="reference-position">{ref.position}</p>
                  <p className="reference-organization">{ref.organization}</p>
                </div>
              </div>
              
              <div className="reference-projects">
                {ref.projects.map((project, pIdx) => (
                  <span key={pIdx} className="reference-project-tag">{project}</span>
                ))}
              </div>

              <div className="reference-testimony">
                <div className="quote-icon">"</div>
                <p>{ref.testimony}</p>
              </div>

              <div className="reference-contact">
                <Telephone size={13} />
                {ref.contact}
              </div>
            </div>
          ))}
        </div>
        
        
      </div>
    </section>
  );
};

export default References;