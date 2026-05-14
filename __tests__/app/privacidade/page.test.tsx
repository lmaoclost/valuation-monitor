import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PrivacyPage from "@/app/privacidade/page";

describe("Privacy Page", () => {
  it("should render LGPD privacy policy heading", () => {
    render(<PrivacyPage />);

    expect(screen.getByText(/política de privacidade/i)).toBeDefined();
  });

  it("should mention no personal data collection", () => {
    render(<PrivacyPage />);

    expect(screen.getByText(/não coleta.*dados pessoais/i)).toBeDefined();
  });

  it("should mention no cookies", () => {
    render(<PrivacyPage />);

    expect(screen.getAllByText(/cookies/i).length).toBeGreaterThan(0);
  });
});
