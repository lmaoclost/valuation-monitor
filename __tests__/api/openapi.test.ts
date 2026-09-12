import { describe, it, expect } from "vitest";
import { buildOpenApiSpec } from "@/lib/openapi";
import {
  STOCK_COLUMN_TYPES,
  FII_TIJOLO_COLUMN_TYPES,
  FII_PAPEL_COLUMN_TYPES,
  FII_LIST_COLUMN_TYPES,
} from "@/lib/api-filter";

const FILTER_PATHS = [
  "/api/fetch-stocks",
  "/api/fetch-usa-stocks",
  "/api/fetch-usa-reit",
  "/api/fetch-fii/tijolo",
  "/api/fetch-fii/papel",
  "/api/fetch-fii/fiagro",
  "/api/fetch-fii/fi-infra",
  "/api/fetch-fii/fof",
  "/api/fetch-fii",
] as const;

describe("buildOpenApiSpec", () => {
  it("documents every filterable endpoint", () => {
    const spec = buildOpenApiSpec();
    for (const p of FILTER_PATHS) {
      expect(spec.paths[p]?.get, `missing GET ${p}`).toBeDefined();
    }
  });

  it("exposes filter parameters matching the column allowlists", () => {
    const spec = buildOpenApiSpec();
    const byPath: Record<string, typeof STOCK_COLUMN_TYPES> = {
      "/api/fetch-stocks": STOCK_COLUMN_TYPES,
      "/api/fetch-fii/tijolo": FII_TIJOLO_COLUMN_TYPES,
      "/api/fetch-fii/papel": FII_PAPEL_COLUMN_TYPES,
      "/api/fetch-fii/fiagro": FII_LIST_COLUMN_TYPES,
    };
    for (const [path, types] of Object.entries(byPath)) {
      const params = spec.paths[path].get.parameters.map(
        (p: { name: string }) => p.name,
      );
      for (const [col, kind] of Object.entries(types)) {
        expect(params, `${path} missing ${col}`).toContain(col);
        const opParam = kind === "number" ? `${col}.gte` : `${col}.contains`;
        expect(params, `${path} missing ${opParam}`).toContain(opParam);
      }
      expect(params).toContain("sort");
      expect(params).toContain("limit");
    }
  });

  it("declares the x-app-secret security scheme and 400 responses", () => {
    const spec = buildOpenApiSpec();
    expect(
      spec.components.securitySchemes.appSecret.name,
    ).toBe("x-app-secret");
    for (const p of FILTER_PATHS) {
      expect(spec.paths[p].get.responses["400"]).toBeDefined();
      expect(spec.paths[p].get.security).toBeDefined();
    }
  });
});
