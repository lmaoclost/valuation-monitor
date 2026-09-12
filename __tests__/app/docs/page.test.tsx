import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { buildOpenApiSpec } from "@/lib/openapi";
import { DocsContent } from "@/app/docs/docs-content";

describe("DocsContent", () => {
  it("renders every documented endpoint with an example", () => {
    const spec = buildOpenApiSpec();
    render(<DocsContent spec={spec} baseUrl="https://api.example.com" />);

    for (const path of Object.keys(spec.paths)) {
      expect(screen.getByText(`GET ${path}`)).toBeInTheDocument();
    }
    expect(screen.getAllByText(/x-app-secret/).length).toBeGreaterThan(0);
    expect(screen.getByText(/\/api\/openapi/)).toBeInTheDocument();
  });

  it("builds curl examples from the given base URL", () => {
    const spec = buildOpenApiSpec();
    render(<DocsContent spec={spec} baseUrl="https://api.example.com" />);

    expect(
      screen.getAllByText(/https:\/\/api\.example\.com\/api\/fetch-/).length,
    ).toBeGreaterThan(0);
  });
});
