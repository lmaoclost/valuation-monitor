import type { FiiTijoloCalculatedDataType } from "@/@types/FiiTijoloCalculatedDataType";

function percentile(sorted: number[], p: number): number {
  const index = (p / 100) * (sorted.length - 1);
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  if (lower === upper) return sorted[lower];
  return sorted[lower] + (index - lower) * (sorted[upper] - sorted[lower]);
}

function recalculateExpectativa(
  fund: FiiTijoloCalculatedDataType,
  discountRate: number,
): number {
  const dividendo1 = fund.price * fund.dy;
  const pvs: number[] = [];
  let prevDividend = dividendo1;
  for (let y = 1; y <= 10; y++) {
    if (y > 1) prevDividend = prevDividend * (1 + fund.growthRate);
    pvs.push(prevDividend / Math.pow(1 + discountRate, y));
  }
  const desinvestment = pvs[9] / discountRate;
  const pvDesinvestment = desinvestment / Math.pow(1 + discountRate, 10);
  const fairPrice = pvs.reduce((a, b) => a + b, 0) + pvDesinvestment;
  return (fairPrice - fund.price) / fund.price;
}

export const calculateFiiBoxplotOutliers = (
  funds: FiiTijoloCalculatedDataType[],
  isTopManager: (ticker: string) => boolean,
  tesouroRate: number,
  getBasePremium: (ticker: string) => number,
): Map<string, number> => {
  const segmentExpectativas: Record<string, number[]> = {};

  for (const fund of funds) {
    if (!isTopManager(fund.ticker)) continue;
    if (!segmentExpectativas[fund.ativos])
      segmentExpectativas[fund.ativos] = [];
    segmentExpectativas[fund.ativos].push(fund.expectativaCrescimento);
  }

  const adjustedPremiums = new Map<string, number>();

  for (const fund of funds) {
    const topManagerValues = segmentExpectativas[fund.ativos];
    if (!topManagerValues || topManagerValues.length < 4) {
      continue;
    }

    topManagerValues.sort((a, b) => a - b);
    const q1 = percentile(topManagerValues, 25);
    const q3 = percentile(topManagerValues, 75);
    const iqr = q3 - q1;
    const upperBound = q3 + 1.5 * iqr;

    let premium = getBasePremium(fund.ticker);

    if (fund.expectativaCrescimento > upperBound) {
      let found = false;
      while (!found && premium < 0.2) {
        premium += 0.01;
        const adjustedDiscount = tesouroRate + premium;
        const testVal = recalculateExpectativa(fund, adjustedDiscount);
        if (testVal <= upperBound) found = true;
      }
    }

    adjustedPremiums.set(fund.ticker, premium);
  }

  return adjustedPremiums;
};
