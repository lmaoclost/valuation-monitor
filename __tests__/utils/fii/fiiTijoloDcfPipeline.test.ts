import { describe, it, expect } from "vitest";
import { calculateFiiDiscountRate } from "@/utils/calculateFiiDiscountRate";
import { calculateFiiDividendYear } from "@/utils/calculateFiiDividendYear";
import { calculateFiiPresentValue } from "@/utils/calculateFiiPresentValue";
import { calculateFiiDesinvestment } from "@/utils/calculateFiiDesinvestment";
import { calculateFiiFairPrice } from "@/utils/calculateFiiFairPrice";
import { calculateFiiCeelingPrice } from "@/utils/calculateFiiCeelingPrice";
import { calculateFiiExpectativaCrescimento } from "@/utils/calculateFiiExpectativaCrescimento";

describe("Fii Tijolo DCF Full Pipeline", () => {
  const tesouroRate = 0.0747;
  const riskPremium = 0.04;
  const growthRate = 0.0439;
  const price = 79.06;
  const dy = 0.0999;

  it("should calculate discount rate", () => {
    const discountRate = calculateFiiDiscountRate(tesouroRate, riskPremium);
    expect(discountRate).toBeCloseTo(0.1147, 4);
  });

  it("should project 10 years of dividends", () => {
    const discountRate = calculateFiiDiscountRate(tesouroRate, riskPremium);
    const dividendo1 = price * dy;
    const dividends: number[] = [dividendo1];

    for (let y = 2; y <= 10; y++) {
      dividends.push(calculateFiiDividendYear(dividends[y - 2], growthRate));
    }

    expect(dividends).toHaveLength(10);
    expect(dividends[0]).toBeCloseTo(7.898, 2);
    expect(dividends[9]).toBeGreaterThan(dividends[0]);

    const presentValues = dividends.map((div, i) =>
      calculateFiiPresentValue(div, discountRate, i + 1),
    );

    expect(presentValues).toHaveLength(10);
    expect(presentValues[0]).toBeGreaterThan(presentValues[9]);

    const desinvestment = calculateFiiDesinvestment(presentValues[9], discountRate);
    const pvDesinvestment = calculateFiiPresentValue(desinvestment, discountRate, 10);
    const fairPrice = calculateFiiFairPrice(presentValues, pvDesinvestment);
    const ceelingPrice = calculateFiiCeelingPrice(fairPrice);
    const expectativa = calculateFiiExpectativaCrescimento(price, fairPrice);

    expect(fairPrice).toBeGreaterThan(0);
    expect(ceelingPrice).toBeGreaterThan(0);
    expect(typeof expectativa).toBe("number");
  });
});
