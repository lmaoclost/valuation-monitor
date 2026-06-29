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

    expect(screen.getByText(/Vercel Analytics/i)).toBeDefined();
    expect(screen.getByRole("button", { name: /aceitar/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /recusar/i })).toBeDefined();
  });

  it("should render the banner in English when locale is en", () => {
    vi.mocked(useLocale).mockReturnValue("en");
    render(<LgpdBanner />);

    expect(screen.getByText(/Vercel Analytics/i)).toBeDefined();
    expect(screen.getByRole("button", { name: /accept/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /reject/i })).toBeDefined();
  });

  it("should store 'accepted' and hide banner on accept", () => {
    render(<LgpdBanner />);

    fireEvent.click(screen.getByRole("button", { name: /aceitar/i }));

    expect(localStorage.getItem("lgpd-consent")).toBe("accepted");
    expect(screen.queryByText(/Vercel Analytics/i)).toBeNull();
  });

  it("should store 'rejected' and hide banner on reject", () => {
    render(<LgpdBanner />);

    fireEvent.click(screen.getByRole("button", { name: /recusar/i }));

    expect(localStorage.getItem("lgpd-consent")).toBe("rejected");
    expect(screen.queryByText(/Vercel Analytics/i)).toBeNull();
  });

  it("should not render if already accepted", () => {
    localStorage.setItem("lgpd-consent", "accepted");

    render(<LgpdBanner />);

    expect(screen.queryByText(/Vercel Analytics/i)).toBeNull();
  });

  it("should not render if already rejected", () => {
    localStorage.setItem("lgpd-consent", "rejected");

    render(<LgpdBanner />);

    expect(screen.queryByText(/Vercel Analytics/i)).toBeNull();
  });
});
