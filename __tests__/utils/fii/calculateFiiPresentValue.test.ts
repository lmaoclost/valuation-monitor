import { describe, it, expect } from "vitest";
import { calculateFiiPresentValue } from "@/utils/calculateFiiPresentValue";

describe("calculateFiiPresentValue", () => {
  it("should discount a future value to present", () => {
    const result = calculateFiiPresentValue(100, 0.1, 1);
    expect(result).toBeCloseTo(90.909, 2);
  });

  it("should discount more for later years", () => {
    const year1 = calculateFiiPresentValue(100, 0.1, 1);
    const year5 = calculateFiiPresentValue(100, 0.1, 5);
    expect(year5).toBeLessThan(year1);
  });

  it("should return same value for zero discount rate", () => {
    const result = calculateFiiPresentValue(100, 0, 5);
    expect(result).toBe(100);
  });
});
