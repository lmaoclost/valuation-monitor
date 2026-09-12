import type { Metadata } from "next";
import { buildOpenApiSpec } from "@/lib/openapi";
import { DocsContent } from "./docs-content";

export const metadata: Metadata = {
  title: "API Docs - Valuation Monitor",
  description: "Filterable valuation API: endpoints, columns and operators.",
};

export default function DocsPage() {
  return <DocsContent spec={buildOpenApiSpec()} />;
}
