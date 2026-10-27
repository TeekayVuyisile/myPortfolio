import React, { useEffect, useRef, useState } from 'react';
import { SkipStartFill, SkipEndFill, PlayFill, PauseFill } from 'react-bootstrap-icons';
import { usePlayback } from '../context/PlaybackContext';
import EqualizerBars from './EqualizerBars';
import { elementTop, scrollToY } from '../utils/scrollTo';

// Must follow the order sections are rendered in App.js
const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'references', label: 'References' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

const pad = (n) => String(n).padStart(2, '0');

const sectionTop = (id) => elementTop(document.getElementById(id));

const NowPlayingBar = () => {
  const { isPlaying, togglePlaying } = usePlayback();
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [markers, setMarkers] = useState([]);
  const frame = useRef(null);

  useEffect(() => {
    const update = () => {
      frame.current = null;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      const probe = y + window.innerHeight * 0.35;

      let index = 0;
      SECTIONS.forEach((section, i) => {
        if (sectionTop(section.id) <= probe) index = i;
      });
      // The last section may be too short to reach the probe line
      if (scrollable > 0 && y >= scrollable - 4) index = SECTIONS.length - 1;

      setActiveIndex(index);
      setProgress(scrollable > 0 ? y / scrollable : 0);
      setVisible(y > window.innerHeight * 0.45);
      setMarkers(SECTIONS.slice(1).map(s => (scrollable > 0 ? Math.min(sectionTop(s.id) / scrollable, 1) : 0)));
    };

    const onScroll = () => {
      if (frame.current === null) frame.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  const goTo = (index) => {
    const target = SECTIONS[Math.max(0, Math.min(SECTIONS.length - 1, index))];
    scrollToY(sectionTop(target.id));
  };

  // Like a media player: "previous" first returns to the start of the current section
  const handlePrevious = () => {
    const current = SECTIONS[activeIndex];
    const intoSection = window.scrollY - sectionTop(current.id);
    goTo(intoSection > 120 ? activeIndex : activeIndex - 1);
  };

  const handleSeek = (e) => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: (Number(e.target.value) / 1000) * scrollable, behavior: 'instant' });
  };

  const active = SECTIONS[activeIndex];

  return (
    <div className={`now-playing ${visible ? 'is-visible' : ''}`} aria-hidden={!visible}>
      <div className="np-progress">
        <div className="np-progress-fill" style={{ transform: `scaleX(${progress})` }}></div>
        {markers.map((pos, i) => (
          <span key={SECTIONS[i + 1].id} className="np-marker" style={{ left: `${pos * 100}%` }}></span>
        ))}
        <input
          type="range"
          min="0"
          max="1000"
          value={Math.round(progress * 1000)}
          onChange={handleSeek}
          aria-label="Page scroll position"
          tabIndex={visible ? 0 : -1}
        />
      </div>

      <div className="np-body">
        <div className="np-disc ambient" aria-hidden="true">
          <img src="/assets/profile.jpeg" alt="" />
        </div>

        <div className="np-meta">
          <span className="np-title">
            {active.label}
            <EqualizerBars className="np-eq" count={4} />
          </span>
          <span className="np-sub">Teekay Manale · {pad(activeIndex + 1)} / {pad(SECTIONS.length)}</span>
        </div>

        <div className="np-controls">
          <button
            type="button"
            className="np-btn"
            onClick={handlePrevious}
            aria-label="Previous section"
            tabIndex={visible ? 0 : -1}
          >
            <SkipStartFill size={16} />
          </button>
          <button
            type="button"
            className="np-btn np-btn-main"
            onClick={togglePlaying}
            aria-label={isPlaying ? 'Pause background animations' : 'Play background animations'}
            aria-pressed={isPlaying}
            tabIndex={visible ? 0 : -1}
          >
            {isPlaying ? <PauseFill size={18} /> : <PlayFill size={18} />}
          </button>
          <button
            type="button"
            className="np-btn"
            onClick={() => goTo(activeIndex + 1)}
            disabled={activeIndex === SECTIONS.length - 1}
            aria-label="Next section"
            tabIndex={visible ? 0 : -1}
          >
            <SkipEndFill size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NowPlayingBar;
