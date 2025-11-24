import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const allowedOrigin = process.env.NEXT_PUBLIC_API_URL;
const privateSecret = process.env.PRIVATE_API_SECRET;

export function proxy(request: NextRequest) {
  const origin = request.headers.get("origin");
  const secret = request.headers.get("x-app-secret");

  if (request.nextUrl.pathname.startsWith("/api")) {
    if (!origin) {
      if (secret !== privateSecret) {
        return new NextResponse("Unauthorized - Missing or invalid secret", {
          status: 401,
        });
      }
      return NextResponse.next();
    }

    if (origin !== allowedOrigin) {
      return new NextResponse("Forbidden - Invalid Origin", { status: 403 });
    }

    if (secret !== privateSecret) {
      return new NextResponse("Unauthorized - Missing or invalid secret", {
        status: 401,
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
