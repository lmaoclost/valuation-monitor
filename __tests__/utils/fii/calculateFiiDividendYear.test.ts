import { describe, it, expect } from "vitest";
import { calculateFiiDividendYear } from "@/utils/calculateFiiDividendYear";

describe("calculateFiiDividendYear", () => {
  it("should grow dividend by growth rate", () => {
    const result = calculateFiiDividendYear(10, 0.05);
    expect(result).toBeCloseTo(10.5, 2);
  });

  it("should keep same dividend with zero growth", () => {
    const result = calculateFiiDividendYear(10, 0);
    expect(result).toBe(10);
  });

  it("should handle zero dividend", () => {
    const result = calculateFiiDividendYear(0, 0.05);
    expect(result).toBe(0);
  });

  it("should handle negative growth", () => {
    const result = calculateFiiDividendYear(10, -0.05);
    expect(result).toBeCloseTo(9.5, 2);
  });
});
