import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { useLocale } from "next-intl";
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

  it("renders language toggle and translated subtitle like the privacidade page", () => {
    const spec = buildOpenApiSpec();
    render(<DocsContent spec={spec} baseUrl="https://api.example.com" />);

    expect(
      screen.getByText("Tabelas de valuation filtráveis por coluna."),
    ).toBeInTheDocument();
    expect(screen.getByText("EN")).toBeInTheDocument();
  });

  it("translates chrome strings to English when locale is en", () => {
    vi.mocked(useLocale).mockReturnValue("en");
    const spec = buildOpenApiSpec();
    render(<DocsContent spec={spec} baseUrl="https://api.example.com" />);

    expect(screen.getByText("Filterable valuation tables.")).toBeInTheDocument();
    expect(screen.getByText("PT")).toBeInTheDocument();
    vi.mocked(useLocale).mockReturnValue("pt-BR");
  });
});
