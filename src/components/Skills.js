import React from 'react';

const Skills = () => {
  const skills = [
    { name: 'React', level: 90, category: 'Frontend' },
    { name: 'JavaScript', level: 85, category: 'Frontend' },
    { name: 'Bootstrap', level: 80, category: 'Frontend' },
    { name: 'Node.js', level: 85, category: 'Backend' },
    { name: 'Express', level: 80, category: 'Backend' },
    { name: 'PostgreSQL', level: 75, category: 'Database' }
  ];

  const skillCategories = {
    'Frontend': ['React', 'JavaScript', 'Bootstrap'],
    'Backend': ['Node.js', 'Express'],
    'Database': ['PostgreSQL']
  };

  return (
    <section id="skills" className="section section-dark">
      <div className="container-custom">
        <h2 className="section-title">Skills & Technologies</h2>
        
        <div className="skills-container">
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div key={skill.name} className="skill-card" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="skill-header">
                  <h4 className="skill-name">{skill.name}</h4>
                  <span className="skill-percentage">{skill.level}%</span>
                </div>
                <div className="skill-progress">
                  <div 
                    className="skill-progress-bar" 
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <span className="skill-category">{skill.category}</span>
              </div>
            ))}
          </div>
          
          <div className="skills-categories">
            <h3 className="categories-title">Technology Stack</h3>
            <div className="categories-grid">
              {Object.entries(skillCategories).map(([category, techs]) => (
                <div key={category} className="category-card">
                  <h4 className="category-name">{category}</h4>
                  <div className="category-techs">
                    {techs.map(tech => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;