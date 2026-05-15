import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LgpdBanner } from "@/components/lgpd-banner";

describe("LgpdBanner", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should render the banner on first visit", () => {
    render(<LgpdBanner />);

    expect(screen.getByText(/dados pessoais/i)).toBeDefined();
    expect(screen.getByRole("button", { name: /entendido/i })).toBeDefined();
  });

  it("should not render after user clicks 'Entendido'", () => {
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
