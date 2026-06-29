import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PrivacyPage from "@/app/privacidade/page";

describe("Privacy Page", () => {
  it("should render LGPD privacy policy heading", () => {
    render(<PrivacyPage />);

    const headings = screen.getAllByText(/política de privacidade/i);
    expect(headings.length).toBeGreaterThan(0);
  });

  it("should mention no personal data collection", () => {
    render(<PrivacyPage />);

    const matches = screen.getAllByText(/não coleta.*dados pessoais/i);
    expect(matches.length).toBeGreaterThan(0);
  });

  it("should mention Vercel Analytics disclosure", () => {
    render(<PrivacyPage />);

    const matches = screen.getAllByText(/Vercel Web Analytics/i);
    expect(matches.length).toBeGreaterThan(0);
  });

  it("should render language toggle", () => {
    render(<PrivacyPage />);

    expect(screen.getByText("EN")).toBeDefined();
  });
});
