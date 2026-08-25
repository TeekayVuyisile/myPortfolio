import React, { useEffect, useRef, useState } from "react";
import EqualizerBars from "./EqualizerBars";

const stats = [
  { id: 1, value: 5, suffix: "+", label: "Projects Completed" },
  { id: 2, value: 3, suffix: "", label: "Client Systems" },
  { id: 3, value: 6, suffix: "+", label: "Technologies" },
  { id: 4, value: 100, suffix: "%", label: "Client Satisfaction" },
];

const useCountUp = (target, shouldStart, duration = 1500) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    let start = null;
    let frameId;

    const step = (timestamp) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setValue(target);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [shouldStart, target, duration]);

  return value;
};

const StatCard = ({ stat, shouldStart }) => {
  const value = useCountUp(stat.value, shouldStart);
  return (
    <div className="stat-card">
      <h3 className="stat-number">{value}{stat.suffix}</h3>
      <p className="stat-label">{stat.label}</p>
    </div>
  );
};

const About = () => {
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const node = statsRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="section section-light">
      <div className="container-custom">
        <h2 className="section-title">About Me<EqualizerBars className="title-equalizer" /></h2>
        <div className="about-content">
          <div className="about-text">
            <p className="about-description">
              I’m a Full-Stack Web Developer with a Diploma in ICT and hands-on
              experience in building responsive, user-friendly web applications.
              Skilled in front-end and back-end development, database
              management, and cloud technologies. I follow Agile
              methodologies, focus on clean code principles, and prioritize
              user-centered design in all my projects.
            </p>
          </div>

          <div className="about-stats" ref={statsRef}>
            {stats.map((stat) => (
              <StatCard key={stat.id} stat={stat} shouldStart={statsVisible} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
