import { describe, it, expect } from "vitest";
import { calculateFiiDesinvestment } from "@/utils/calculateFiiDesinvestment";

describe("calculateFiiDesinvestment", () => {
  it("should divide dividend by discount rate", () => {
    const result = calculateFiiDesinvestment(10, 0.1);
    expect(result).toBe(100);
  });

  it("should return infinity for zero discount rate", () => {
    const result = calculateFiiDesinvestment(10, 0);
    expect(result).toBe(Infinity);
  });
});
