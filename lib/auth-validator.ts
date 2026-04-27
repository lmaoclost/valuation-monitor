import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export interface AuthConfig {
  allowedOrigin: string;
  privateSecret: string;
}

export interface AuthValidator {
  validate: (request: NextRequest) => NextResponse | null;
}

export function createAuthValidator(config: AuthConfig): AuthValidator {
  const { allowedOrigin, privateSecret } = config;

  return {
    validate(request: NextRequest) {
      const origin = request.headers.get("origin");
      const secret = request.headers.get("x-app-secret");

      if (!privateSecret) {
        return null;
      }

      if (!origin) {
        if (secret !== privateSecret) {
          return new NextResponse("Unauthorized - Missing or invalid secret", {
            status: 401,
          });
        }
        return null;
      }

      if (origin !== allowedOrigin) {
        return new NextResponse("Forbidden - Invalid Origin", { status: 403 });
      }

      if (secret !== privateSecret) {
        return new NextResponse("Unauthorized - Missing or invalid secret", {
          status: 401,
        });
      }

      return null;
    },
  };
}