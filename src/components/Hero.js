import React, { Suspense, lazy } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, ArrowRight } from 'react-bootstrap-icons';
import { useTheme } from '../context/ThemeContext';
import { usePlayback } from '../context/PlaybackContext';

// three.js is only downloaded once the rest of the page has loaded
const Turntable3D = lazy(() => import('./Turntable3D'));

const hasWebGL = () => {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
};

// Flat spinning record used while the 3D scene loads, or if WebGL is unavailable
const RecordFallback = () => (
  <div className="record-fallback" aria-hidden="true">
    <div className="record-fallback-disc ambient">
      <img src="/assets/profile.jpeg" alt="" />
    </div>
  </div>
);

class SceneBoundary extends React.Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? <RecordFallback /> : this.props.children;
  }
}

const FLOATING_CHIPS = [
  { label: 'React', className: 'chip-a' },
  { label: 'Node.js', className: 'chip-b' },
  { label: 'PostgreSQL', className: 'chip-c' },
];

const NAME_LINES = [
  { text: 'Teekay' },
  { accent: 'Vuyisile', text: 'Manale' },
];

const Hero = () => {
  const { isDarkMode } = useTheme();
  const { isPlaying } = usePlayback();
  const [webgl] = React.useState(hasWebGL);

  const { scrollY } = useScroll();
  const stageY = useTransform(scrollY, [0, 700], [0, 140]);
  const stageScale = useTransform(scrollY, [0, 700], [1, 0.85]);
  const copyY = useTransform(scrollY, [0, 700], [0, -60]);
  const fade = useTransform(scrollY, [0, 550], [1, 0]);

  return (
    <section id="home" className="hero-section">
      <div className="hero-sky" aria-hidden="true">
        <div className="hero-stars stars-sm ambient"></div>
        <div className="hero-stars stars-md ambient"></div>
        <div className="hero-stars stars-lg ambient"></div>
        <svg className="hero-dome" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMin slice">
          <path d="M600 -40 L80 820 M600 -40 L340 820 M600 -40 L600 820 M600 -40 L860 820 M600 -40 L1120 820" />
          <path d="M-40 260 Q600 120 1240 260 M-40 520 Q600 380 1240 520" />
        </svg>
        <div className="hero-moon"></div>
      </div>

      <div className="container-custom hero-layout">
        <motion.div className="hero-copy" style={{ y: copyY, opacity: fade }}>
          <motion.p
            className="hero-eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="eyebrow-dot" aria-hidden="true"></span>
            Full Stack Software Developer
          </motion.p>

          <h1 className="hero-name" aria-label="Teekay Vuyisile Manale">
            {NAME_LINES.map((line, i) => (
              <span className="hero-name-line" key={line.text} aria-hidden="true">
                <motion.span
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.2 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
                >
                  {line.accent && <em className="hero-name-accent">{line.accent} </em>}
                  {line.text}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="hero-lede"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
          >
            I create digital solutions that blend innovative technology with
            user-centered design — building scalable applications and turning
            ideas into products people use every day.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            <a href="#projects" className="hero-cta hero-cta-primary">
              View My Work <ArrowRight size={16} />
            </a>
            <a href="#contact" className="hero-cta hero-cta-ghost">Get In Touch</a>
            <div className="hero-socials">
              <a
                href="https://github.com/TeekayVuyisile"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://linkedin.com/in/teekay-manale"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-stage"
          style={{ y: stageY, scale: stageScale, opacity: fade }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero-stage-glow" aria-hidden="true"></div>
          {webgl ? (
            <SceneBoundary>
              <Suspense fallback={<RecordFallback />}>
                <Turntable3D isPlaying={isPlaying} isDarkMode={isDarkMode} />
              </Suspense>
            </SceneBoundary>
          ) : (
            <RecordFallback />
          )}
          {FLOATING_CHIPS.map(chip => (
            <span key={chip.label} className={`hero-chip ${chip.className} ambient`} aria-hidden="true">
              {chip.label}
            </span>
          ))}
        </motion.div>
      </div>

      <a href="#about" className="hero-scroll" aria-label="Scroll to About section">
        <span className="hero-scroll-line ambient"></span>
        Scroll
      </a>
    </section>
  );
};

export default Hero;
