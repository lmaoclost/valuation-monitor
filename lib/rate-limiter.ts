export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

export interface RateLimiter {
  check: (ip: string) => { allowed: boolean; retryAfter?: number };
}

export function createRateLimiter(config: RateLimitConfig): RateLimiter {
  const { windowMs, maxRequests } = config;
  const store = new Map<string, RateLimitEntry>();

  // Clean up expired entries
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store.entries()) {
      if (now > entry.resetTime) {
        store.delete(key);
      }
    }
  }, windowMs);

  return {
    check(ip: string) {
      const now = Date.now();
      const key = `rate-limit:${ip}`;
      const entry = store.get(key);

      if (!entry || now > entry.resetTime) {
        store.set(key, { count: 1, resetTime: now + windowMs });
        return { allowed: true };
      }

      if (entry.count >= maxRequests) {
        const retryAfter = Math.ceil((entry.resetTime - now) / 1000);
        return { allowed: false, retryAfter };
      }

      entry.count++;
      return { allowed: true };
    },
  };
}