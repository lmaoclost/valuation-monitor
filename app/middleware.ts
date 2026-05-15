import { NextRequest } from "next/server";
import { proxy } from "@/proxy";
import createIntlMiddleware from "next-intl/middleware";

const intlMiddleware = createIntlMiddleware({
  locales: ["pt-BR", "en"],
  defaultLocale: "pt-BR",
  localePrefix: "never",
});

export default function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/")) {
    return proxy(request);
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
};
