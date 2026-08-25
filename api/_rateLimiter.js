// Best-effort, in-memory rate limiting per client IP.
// This resets whenever the serverless instance cold-starts, so it is not a strict
// distributed limiter -- it exists to blunt casual scripted abuse of the Groq API key,
// not to guarantee an exact quota. For hard guarantees, move this to a shared store
// (Upstash Redis, Vercel KV, etc).

const WINDOW_MS = 60 * 1000;
const MAX_PER_WINDOW = 8;
const DAY_MS = 24 * 60 * 60 * 1000;
const MAX_PER_DAY = 60;

const buckets = new Map();

const checkRateLimit = (ip) => {
  const now = Date.now();
  let bucket = buckets.get(ip);

  if (!bucket) {
    bucket = { windowStart: now, count: 0, dayStart: now, dayCount: 0 };
    buckets.set(ip, bucket);
  }

  if (now - bucket.windowStart > WINDOW_MS) {
    bucket.windowStart = now;
    bucket.count = 0;
  }

  if (now - bucket.dayStart > DAY_MS) {
    bucket.dayStart = now;
    bucket.dayCount = 0;
  }

  if (bucket.count >= MAX_PER_WINDOW) {
    return { allowed: false, retryAfterSeconds: Math.ceil((bucket.windowStart + WINDOW_MS - now) / 1000) };
  }

  if (bucket.dayCount >= MAX_PER_DAY) {
    return { allowed: false, retryAfterSeconds: Math.ceil((bucket.dayStart + DAY_MS - now) / 1000) };
  }

  bucket.count += 1;
  bucket.dayCount += 1;
  return { allowed: true };
};

// Bound memory on long-lived processes (e.g. the local dev server) by sweeping stale entries.
const cleanupTimer = setInterval(() => {
  const now = Date.now();
  for (const [ip, bucket] of buckets) {
    if (now - bucket.dayStart > DAY_MS && now - bucket.windowStart > WINDOW_MS) {
      buckets.delete(ip);
    }
  }
}, DAY_MS);
cleanupTimer.unref?.();

module.exports = { checkRateLimit };
