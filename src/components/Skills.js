import React, { useRef, useState } from 'react';
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiBootstrap,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiFastapi,
  SiSocketdotio,
  SiWebrtc,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiGithubactions,
  SiGithub,
  SiVitest
} from 'react-icons/si';
import { Braces, Cloud, Stars } from 'react-bootstrap-icons';
import EqualizerBars from './EqualizerBars';

const clampLevel = (value) => Math.min(100, Math.max(0, Math.round(value)));

// Mixing-desk fader: drag it anywhere, and it springs back to the real level on release
const SkillFader = ({ skill, delay }) => {
  const track = useRef(null);
  const [dragLevel, setDragLevel] = useState(null);
  const Icon = skill.icon;
  const isDragging = dragLevel !== null;
  const level = isDragging ? dragLevel : skill.level;

  const levelAt = (clientY) => {
    const rect = track.current.getBoundingClientRect();
    return clampLevel(((rect.bottom - clientY) / rect.height) * 100);
  };

  const handlePointerDown = (e) => {
    if (e.button !== 0) return;
    // Touch only grabs the knob, so swiping across the track still scrolls the page
    if (e.pointerType !== 'mouse' && !e.target.closest('.skill-fader-handle')) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragLevel(levelAt(e.clientY));
  };

  const handlePointerMove = (e) => {
    if (isDragging) setDragLevel(levelAt(e.clientY));
  };

  const release = () => setDragLevel(null);

  return (
    <div
      className={`skill-channel ${isDragging ? 'is-dragging' : ''}`}
      style={{ animationDelay: `${delay}s`, '--level': `${level}%` }}
    >
      <Icon className="skill-icon" size={20} />
      <div
        ref={track}
        className="skill-fader-track"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={release}
        onPointerCancel={release}
        onLostPointerCapture={release}
        aria-hidden="true"
      >
        <div className="skill-fader-fill"></div>
        <div className="skill-fader-handle"></div>
      </div>
      <span className="skill-channel-name">{skill.name}</span>
      <span className="skill-channel-value">{level}%</span>
    </div>
  );
};

const Skills = () => {
  const skillGroups = [
    {
      category: 'Frontend',
      skills: [
        { name: 'React', level: 90, icon: SiReact },
        { name: 'TypeScript', level: 80, icon: SiTypescript },
        { name: 'JavaScript', level: 90, icon: SiJavascript },
        { name: 'Tailwind CSS', level: 85, icon: SiTailwindcss },
        { name: 'Bootstrap', level: 80, icon: SiBootstrap }
      ]
    },
    {
      category: 'Backend',
      skills: [
        { name: 'Node.js', level: 85, icon: SiNodedotjs },
        { name: 'Express', level: 85, icon: SiExpress },
        { name: 'Python', level: 75, icon: SiPython },
        { name: 'FastAPI', level: 75, icon: SiFastapi },
        { name: 'REST APIs', level: 85, icon: Braces },
        { name: 'LLM Integration', level: 80, icon: Stars }
      ]
    },
    {
      category: 'Real-Time & Data',
      skills: [
        { name: 'Socket.IO', level: 85, icon: SiSocketdotio },
        { name: 'WebRTC', level: 70, icon: SiWebrtc },
        { name: 'PostgreSQL', level: 85, icon: SiPostgresql },
        { name: 'MongoDB', level: 70, icon: SiMongodb },
        { name: 'Redis', level: 70, icon: SiRedis }
      ]
    },
    {
      category: 'DevOps & Testing',
      skills: [
        { name: 'Docker', level: 75, icon: SiDocker },
        { name: 'CI/CD (GitHub Actions)', level: 80, icon: SiGithubactions },
        { name: 'Git & GitHub', level: 85, icon: SiGithub },
        { name: 'Automated Testing', level: 75, icon: SiVitest },
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
                {group.skills.map((skill, index) => (
                  <SkillFader key={skill.name} skill={skill} delay={index * 0.08} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
