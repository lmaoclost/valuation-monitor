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

  it("uses per-locale headings and endpoint descriptions, never mixed", () => {
    const spec = buildOpenApiSpec();
    const { unmount } = render(
      <DocsContent spec={spec} baseUrl="https://api.example.com" />,
    );

    expect(screen.getByText("Autenticação")).toBeInTheDocument();
    expect(screen.getByText("Sintaxe")).toBeInTheDocument();
    expect(
      screen.getByText(/Tabela completa de ações BR/),
    ).toBeInTheDocument();
    expect(screen.queryByText(/Autenticação \/ Auth/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Sintaxe \/ Syntax/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Full BR stocks table/)).not.toBeInTheDocument();
    unmount();

    vi.mocked(useLocale).mockReturnValue("en");
    render(<DocsContent spec={spec} baseUrl="https://api.example.com" />);
    expect(screen.getByText("Auth")).toBeInTheDocument();
    expect(screen.getByText("Syntax")).toBeInTheDocument();
    expect(screen.getByText(/Full BR stocks table/)).toBeInTheDocument();
    expect(
      screen.queryByText(/Tabela completa de ações BR/),
    ).not.toBeInTheDocument();
    vi.mocked(useLocale).mockReturnValue("pt-BR");
  });
});
