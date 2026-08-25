import React from 'react';
import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiBootstrap,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiSocketdotio,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiPostman,
  SiGithub
} from 'react-icons/si';
import { Braces, Cloud } from 'react-bootstrap-icons';
import EqualizerBars from './EqualizerBars';

const Skills = () => {
  const skillGroups = [
    {
      category: 'Frontend',
      skills: [
        { name: 'React', level: 90, icon: SiReact },
        { name: 'Next.js', level: 90, icon: SiNextdotjs },
        { name: 'JavaScript', level: 85, icon: SiJavascript },
        { name: 'Bootstrap', level: 80, icon: SiBootstrap },
        { name: 'Tailwind CSS', level: 80, icon: SiTailwindcss }
      ]
    },
    {
      category: 'Backend',
      skills: [
        { name: 'Node.js', level: 85, icon: SiNodedotjs },
        { name: 'Express', level: 80, icon: SiExpress },
        { name: 'Python', level: 70, icon: SiPython },
        { name: 'RestAPI', level: 85, icon: Braces },
        { name: 'WebSockets / Socket.IO', level: 85, icon: SiSocketdotio }
      ]
    },
    {
      category: 'Database',
      skills: [
        { name: 'PostgreSQL', level: 80, icon: SiPostgresql },
        { name: 'MySQL', level: 75, icon: SiMysql },
        { name: 'MongoDB', level: 75, icon: SiMongodb }
      ]
    },
    {
      category: 'Tools & Platforms',
      skills: [
        { name: 'Postman', level: 80, icon: SiPostman },
        { name: 'Git & GitHub', level: 80, icon: SiGithub },
        { name: 'AWS', level: 60, icon: Cloud }
      ]
    }
  ];

  return (
    <section id="skills" className="section section-dark">
      <div className="container-custom">
        <h2 className="section-title">Skills & Technologies<EqualizerBars className="title-equalizer" /></h2>

        <div className="skills-console">
          {skillGroups.map((group, groupIndex) => (
            <div key={group.category} className="skill-group" style={{ animationDelay: `${groupIndex * 0.1}s` }}>
              <h3 className="skill-group-title">{group.category}</h3>
              <div className="skills-console-grid">
                {group.skills.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <div key={skill.name} className="skill-channel" style={{ animationDelay: `${index * 0.08}s` }}>
                      <Icon className="skill-icon" size={20} />
                      <div className="skill-fader-track">
                        <div className="skill-fader-fill" style={{ height: `${skill.level}%` }}></div>
                        <div className="skill-fader-handle" style={{ bottom: `${skill.level}%` }}></div>
                      </div>
                      <span className="skill-channel-name">{skill.name}</span>
                      <span className="skill-channel-value">{skill.level}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
