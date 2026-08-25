import React from 'react';

const EqualizerBars = ({ className = '', count = 5 }) => (
  <span className={`equalizer-bars ${className}`.trim()} aria-hidden="true">
    {Array.from({ length: count }).map((_, i) => (
      <span key={i}></span>
    ))}
  </span>
);

export default EqualizerBars;
