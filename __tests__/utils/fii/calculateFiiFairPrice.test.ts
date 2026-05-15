import { describe, it, expect } from "vitest";
import { calculateFiiFairPrice } from "@/utils/calculateFiiFairPrice";

describe("calculateFiiFairPrice", () => {
  it("should sum present values and desinvestment PV", () => {
    const result = calculateFiiFairPrice([10, 20, 30], 40);
    expect(result).toBe(100);
  });

  it("should handle empty present values", () => {
    const result = calculateFiiFairPrice([], 50);
    expect(result).toBe(50);
  });

  it("should handle single present value", () => {
    const result = calculateFiiFairPrice([25], 75);
    expect(result).toBe(100);
  });

  it("should handle zero values", () => {
    const result = calculateFiiFairPrice([0, 0], 0);
    expect(result).toBe(0);
  });
});
