import type { Metadata } from "next";
import { buildOpenApiSpec } from "@/lib/openapi";
import { DocsContent } from "./docs-content";

// Kept in this server module (not docs-content.tsx): values imported
// from a "use client" module are client-reference stubs at prerender
// time, so the fallback must live on the server side.
const DEFAULT_BASE_URL = "https://valuation-monitor.vercel.app";

export const metadata: Metadata = {
  title: "API Docs - Valuation Monitor",
  description: "Filterable valuation API: endpoints, columns and operators.",
};

export default function DocsPage() {
  const raw = process.env.NEXT_PUBLIC_API_URL;
  const baseUrl = (
    typeof raw === "string" && raw.length > 0 ? raw : DEFAULT_BASE_URL
  ).replace(/\/$/, "");
  return <DocsContent spec={buildOpenApiSpec()} baseUrl={baseUrl} />;
}
