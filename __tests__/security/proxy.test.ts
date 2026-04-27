import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

let proxy: typeof import("@/proxy").proxy;

describe("Security - Proxy/Middleware", () => {
  const allowedOrigin = "http://localhost";
  const validSecret = "test-secret";

  beforeEach(async () => {
    vi.stubEnv("NEXT_PUBLIC_API_URL", allowedOrigin);
    vi.stubEnv("PRIVATE_API_SECRET", validSecret);
    proxy = (await import("@/proxy")).proxy;
  });

  describe("Requests without origin header (server-side)", () => {
    it("should reject request without secret", async () => {
      const request = new NextRequest("http://localhost/api/test", {
        headers: { "x-app-secret": "" },
      });
      const response = proxy(request);

      expect(response?.status).toBe(401);
    });

    it("should allow request with valid secret", async () => {
      const request = new NextRequest("http://localhost/api/test", {
        headers: { "x-app-secret": validSecret },
      });
      const response = proxy(request);

      expect(response?.status).toBe(200);
    });

    it("should reject request with invalid secret", async () => {
      const request = new NextRequest("http://localhost/api/test", {
        headers: { "x-app-secret": "wrong-secret" },
      });
      const response = proxy(request);

      expect(response?.status).toBe(401);
    });
  });

  describe("Requests with origin header (browser)", () => {
    it("should reject request with invalid origin", async () => {
      const request = new NextRequest("http://localhost/api/test", {
        headers: { origin: "http://evil.com" },
      });
      const response = proxy(request);

      expect(response?.status).toBe(403);
    });

    it("should reject request with valid origin but no secret", async () => {
      const request = new NextRequest("http://localhost/api/test", {
        headers: { origin: allowedOrigin },
      });
      const response = proxy(request);

      expect(response?.status).toBe(401);
    });

    it("should reject request with valid origin but invalid secret", async () => {
      const request = new NextRequest("http://localhost/api/test", {
        headers: { origin: allowedOrigin, "x-app-secret": "wrong" },
      });
      const response = proxy(request);

      expect(response?.status).toBe(401);
    });

    it("should allow request with valid origin and valid secret", async () => {
      const request = new NextRequest("http://localhost/api/test", {
        headers: { origin: allowedOrigin, "x-app-secret": validSecret },
      });
      const response = proxy(request);

      expect(response?.status).toBe(200);
    });
  });

  describe("Error messages", () => {
    it('should return "Unauthorized" for missing secret', async () => {
      const request = new NextRequest("http://localhost/api/test", {
        headers: { origin: allowedOrigin },
      });
      const response = proxy(request);
      const text = await response?.text();

      expect(text).toContain("Unauthorized");
    });

    it('should return "Forbidden" for invalid origin', async () => {
      const request = new NextRequest("http://localhost/api/test", {
        headers: { origin: "http://evil.com" },
      });
      const response = proxy(request);
      const text = await response?.text();

      expect(text).toContain("Forbidden");
    });
  });
});
