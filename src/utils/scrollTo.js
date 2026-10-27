// Time-based smooth scroll: long jumps still land in under a second, unlike native
// smooth scrolling which slows down over large distances.
export const elementTop = (el) => (el ? el.getBoundingClientRect().top + window.scrollY : 0);

export const scrollToY = (y, duration = 800) => {
  const to = Math.max(0, Math.min(y, document.documentElement.scrollHeight - window.innerHeight));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    window.scrollTo({ top: to, behavior: 'instant' });
    return;
  }
  const from = window.scrollY;
  const start = performance.now();
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const step = (now) => {
    const t = Math.min((now - start) / duration, 1);
    window.scrollTo({ top: from + (to - from) * ease(t), behavior: 'instant' });
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

export const scrollToElement = (el, offset = 0) => scrollToY(elementTop(el) - offset);
