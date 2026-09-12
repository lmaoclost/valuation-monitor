import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { buildOpenApiSpec } from "@/lib/openapi";
import { DocsContent } from "@/app/docs/docs-content";

describe("DocsContent", () => {
  it("renders every documented endpoint with an example", () => {
    const spec = buildOpenApiSpec();
    render(<DocsContent spec={spec} />);

    for (const path of Object.keys(spec.paths)) {
      expect(screen.getByText(`GET ${path}`)).toBeInTheDocument();
    }
    expect(screen.getAllByText(/x-app-secret/).length).toBeGreaterThan(0);
    expect(screen.getByText(/\/api\/openapi/)).toBeInTheDocument();
  });
});
