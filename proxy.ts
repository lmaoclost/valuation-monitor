import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createRateLimiter } from "@/lib/rate-limiter";
import { createAuthValidator } from "@/lib/auth-validator";

const rateLimiter = createRateLimiter({
  windowMs: 60000,
  maxRequests: 100,
});

const authValidator = createAuthValidator({
  allowedOrigin: process.env.NEXT_PUBLIC_API_URL ?? "",
  privateSecret: process.env.PRIVATE_API_SECRET ?? "",
});

export function proxy(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/api")) {
    return;
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const rateLimitResult = rateLimiter.check(ip);

  if (!rateLimitResult.allowed) {
    return new Response("Too Many Requests", {
      status: 429,
      headers: { "Retry-After": String(rateLimitResult.retryAfter) },
    });
  }

  const authError = authValidator.validate(request);
  if (authError) {
    return authError;
  }

  return NextResponse.next();
}
