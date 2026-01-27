import React from 'react';

const References = () => {
  const references = [
    {
      id: 1,
      name: "DEDAT Management",
      position: "Project Stakeholders",
      organization: "Department of Economics Development and Tourism",
      project: "DEDAT Learner Portal Management System",
      testimony: "Teekay demonstrated exceptional skill in developing our learner management system. His attention to detail and understanding of our requirements resulted in a solution that significantly improved our operational efficiency.",
      contact: "Available upon request"
    },
    {
      id: 2,
      name: "Edulens Project Team",
      position: "Educational Technology Partners",
      organization: "Edulens LMS Project",
      project: "Edulens LMS For Grade R-3",
      testimony: "The Learning Management System developed by Teekay has been instrumental in enhancing our early childhood education programs. His ability to create user-friendly interfaces for young learners was particularly impressive.",
      contact: "Available upon request"
    },
    {
      id: 3,
      name: "Awrise Implementation Team",
      position: "Educational Intervention Specialists",
      organization: "Awrise Program",
      project: "Awrise Intervention Management System",
      testimony: "Teekay's technical expertise and problem-solving skills were crucial in developing our intervention tracking system. He consistently delivered high-quality work and was responsive to our evolving needs throughout the project.",
      contact: "Available upon request"
    }
  ];

  return (
    <section id="references" className="section section-dark">
      <div className="container-custom">
        <h2 className="section-title">Client References</h2>
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
              
              <div className="reference-project">
                <strong>Project:</strong> {ref.project}
              </div>
              
              <div className="reference-testimony">
                <div className="quote-icon">"</div>
                <p>{ref.testimony}</p>
              </div>
              
              <div className="reference-contact">
                <strong>Contact:</strong> {ref.contact}
              </div>
            </div>
          ))}
        </div>
        
        <div className="references-note">
          <p>
            <strong>Note:</strong> Additional references and detailed contact information 
            available upon request. I'm happy to connect you with previous clients for 
            more detailed discussions about my work and capabilities.
          </p>
        </div>
      </div>
    </section>
  );
};

export default References;