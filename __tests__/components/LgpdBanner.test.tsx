import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LgpdBanner } from "@/components/lgpd-banner";
import { useLocale } from "next-intl";

describe("LgpdBanner", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.mocked(useLocale).mockReturnValue("pt-BR");
  });

  it("should render the banner on first visit (pt-BR)", () => {
    render(<LgpdBanner />);

    expect(screen.getByText(/dados pessoais/i)).toBeDefined();
    expect(screen.getByRole("button", { name: /entendido/i })).toBeDefined();
  });

  it("should render the banner in English when locale is en", () => {
    vi.mocked(useLocale).mockReturnValue("en");
    render(<LgpdBanner />);

    expect(screen.getByText(/personal data/i)).toBeDefined();
    expect(screen.getByRole("button", { name: /got it/i })).toBeDefined();
  });

  it("should not render after user clicks 'Got it' in English", () => {
    vi.mocked(useLocale).mockReturnValue("en");
    render(<LgpdBanner />);

    fireEvent.click(screen.getByRole("button", { name: /got it/i }));

    expect(screen.queryByText(/privacy/i)).toBeNull();
  });

  it("should not render after user clicks 'Entendido' in pt-BR", () => {
    render(<LgpdBanner />);

    fireEvent.click(screen.getByRole("button", { name: /entendido/i }));

    expect(screen.queryByText(/privacidade/i)).toBeNull();
  });

  it("should not render if already dismissed", () => {
    localStorage.setItem("lgpd-consent", "true");

    render(<LgpdBanner />);

    expect(screen.queryByText(/privacidade/i)).toBeNull();
  });
});
