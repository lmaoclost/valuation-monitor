import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createRateLimiter } from "@/lib/rate-limiter";

describe("Rate Limiter - LGPD Compliance", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("IP anonymization", () => {
    it("should not store raw IP in the store map", () => {
      const limiter = createRateLimiter({ windowMs: 60000, maxRequests: 5 });
      const store = limiter.getStore();

      limiter.check("192.168.1.1");

      for (const key of store.keys()) {
        expect(key).not.toContain("192.168.1.1");
        expect(key).not.toContain("rate-limit:");
      }
    });

    it("should produce consistent hash for same IP within same day", () => {
      const limiter = createRateLimiter({ windowMs: 60000, maxRequests: 5 });
      const store = limiter.getStore();

      limiter.check("192.168.1.1");
      const key1 = Array.from(store.keys())[0];

      limiter.check("192.168.1.1");
      expect(store.size).toBe(1);
    });

    it("should produce different hashes for different IPs", () => {
      const limiterA = createRateLimiter({ windowMs: 60000, maxRequests: 5 });
      const storeA = limiterA.getStore();

      limiterA.check("192.168.1.1");
      limiterA.check("10.0.0.1");

      const keys = Array.from(storeA.keys());
      expect(keys).toHaveLength(2);
      expect(keys[0]).not.toBe(keys[1]);
    });

    it("should produce different hashes for same IP on different days", () => {
      const date1 = new Date("2025-01-01");
      vi.setSystemTime(date1);

      const limiter = createRateLimiter({ windowMs: 60000, maxRequests: 5 });
      const store = limiter.getStore();

      limiter.check("192.168.1.1");
      const keyDay1 = Array.from(store.keys())[0];

      vi.setSystemTime(new Date("2025-01-02"));

      limiter.check("192.168.1.1");
      const keyDay2 = Array.from(store.keys())[1];

      expect(keyDay1).not.toBe(keyDay2);
    });

    it("should handle 'unknown' IP gracefully", () => {
      const limiter = createRateLimiter({ windowMs: 60000, maxRequests: 5 });
      const store = limiter.getStore();

      limiter.check("unknown");
      limiter.check("unknown");

      const keys = Array.from(store.keys());
      expect(keys).toHaveLength(1);
    });
  });

  describe("Rate limiting behavior preserved", () => {
    it("should allow requests within limit", () => {
      const limiter = createRateLimiter({ windowMs: 60000, maxRequests: 3 });

      expect(limiter.check("1.2.3.4").allowed).toBe(true);
      expect(limiter.check("1.2.3.4").allowed).toBe(true);
      expect(limiter.check("1.2.3.4").allowed).toBe(true);
    });

    it("should block requests over limit", () => {
      const limiter = createRateLimiter({ windowMs: 60000, maxRequests: 2 });

      limiter.check("1.2.3.4");
      limiter.check("1.2.3.4");
      const result = limiter.check("1.2.3.4");

      expect(result.allowed).toBe(false);
      expect(result.retryAfter).toBeDefined();
    });

    it("should reset after window expires", () => {
      const limiter = createRateLimiter({ windowMs: 60000, maxRequests: 1 });

      limiter.check("1.2.3.4");
      expect(limiter.check("1.2.3.4").allowed).toBe(false);

      vi.advanceTimersByTime(60001);

      expect(limiter.check("1.2.3.4").allowed).toBe(true);
    });

    it("should track different IPs independently", () => {
      const limiter = createRateLimiter({ windowMs: 60000, maxRequests: 1 });

      expect(limiter.check("1.2.3.4").allowed).toBe(true);
      expect(limiter.check("5.6.7.8").allowed).toBe(true);
      expect(limiter.check("1.2.3.4").allowed).toBe(false);
      expect(limiter.check("5.6.7.8").allowed).toBe(false);
    });
  });
});
