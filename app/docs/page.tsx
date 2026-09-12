import type { Metadata } from "next";
import { buildOpenApiSpec } from "@/lib/openapi";
import { DEFAULT_BASE_URL, DocsContent } from "./docs-content";

export const metadata: Metadata = {
  title: "API Docs - Valuation Monitor",
  description: "Filterable valuation API: endpoints, columns and operators.",
};

export default function DocsPage() {
  const baseUrl = (
    process.env.NEXT_PUBLIC_API_URL || DEFAULT_BASE_URL
  ).replace(/\/$/, "");
  return <DocsContent spec={buildOpenApiSpec()} baseUrl={baseUrl} />;
}
