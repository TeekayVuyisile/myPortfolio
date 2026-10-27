import React, { createContext, useContext, useState, useCallback } from 'react';

// Drives the site-wide "ambient" motion (turntable spin, starfield, equalizers).
// Visual only — no audio. Starts paused for visitors who prefer reduced motion.
const PlaybackContext = createContext();

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const usePlayback = () => {
  const context = useContext(PlaybackContext);
  if (!context) {
    throw new Error('usePlayback must be used within a PlaybackProvider');
  }
  return context;
};

export const PlaybackProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(() => !prefersReducedMotion());

  const togglePlaying = useCallback(() => setIsPlaying(prev => !prev), []);

  return (
    <PlaybackContext.Provider value={{ isPlaying, togglePlaying }}>
      <div className={isPlaying ? 'motion-playing' : 'motion-paused'}>
        {children}
      </div>
    </PlaybackContext.Provider>
  );
};
