import { describe, it, expect } from "vitest";
import { calculateFiiDiscountRate } from "@/utils/calculateFiiDiscountRate";

describe("calculateFiiDiscountRate", () => {
  it("should sum tesouro rate and risk premium", () => {
    const result = calculateFiiDiscountRate(0.0747, 0.04);
    expect(result).toBeCloseTo(0.1147, 4);
  });

  it("should handle zero risk premium", () => {
    const result = calculateFiiDiscountRate(0.0747, 0);
    expect(result).toBe(0.0747);
  });

  it("should handle zero tesouro rate", () => {
    const result = calculateFiiDiscountRate(0, 0.04);
    expect(result).toBe(0.04);
  });

  it("should handle both zero", () => {
    const result = calculateFiiDiscountRate(0, 0);
    expect(result).toBe(0);
  });
});
