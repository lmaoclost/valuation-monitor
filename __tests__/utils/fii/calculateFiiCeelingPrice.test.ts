import { describe, it, expect } from "vitest";
import { calculateFiiCeelingPrice } from "@/utils/calculateFiiCeelingPrice";

describe("calculateFiiCeelingPrice", () => {
  it("should divide fair price by 1.1", () => {
    const result = calculateFiiCeelingPrice(110);
    expect(result).toBeCloseTo(100, 2);
  });

  it("should return zero for zero fair price", () => {
    const result = calculateFiiCeelingPrice(0);
    expect(result).toBe(0);
  });

  it("should handle negative fair price", () => {
    const result = calculateFiiCeelingPrice(-100);
    expect(result).toBeCloseTo(-90.91, 1);
  });
});
