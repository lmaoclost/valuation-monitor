import { StatusInvestFiiSchema } from "./tijoloSchema";
import { FundamentusFiiSchema } from "./fundamentusSchema";
import { tijoloDomain } from "./tijoloDomain";
import { tijoloFormatter } from "./tijoloFormatter";
import { calculateFiiBoxplotOutliers } from "@/utils/calculateFiiBoxplotOutliers";
import { brazilianFIIManager } from "@/constants/brazilianFIIManager";
import type { FiiTijoloFormattedDataType } from "@/@types/FiiTijoloFormattedDataType";
import type { FiiTijoloCalculatedDataType } from "@/@types/FiiTijoloCalculatedDataType";
import { z } from "zod";

const RISK_PREMIUM_BY_SEGMENT: Record<string, number> = {
  "Lajes Comerciais": 0.04,
  "Shopping/Varejo": 0.03,
  Logisticos: 0.04,
  Agronegócio: 0.05,
};

const getBasePremium = (
  ticker: string,
  fundamentusSegment: string | undefined,
): number => {
  const category = brazilianFIIManager[ticker]?.category;

  if (category && RISK_PREMIUM_BY_SEGMENT[category] !== undefined)
    return RISK_PREMIUM_BY_SEGMENT[category];
  if (
    fundamentusSegment &&
    RISK_PREMIUM_BY_SEGMENT[fundamentusSegment] !== undefined
  )
    return RISK_PREMIUM_BY_SEGMENT[fundamentusSegment];
  return 0.06;
};

export const tijoloParser = (
  statusInvestData: z.infer<typeof StatusInvestFiiSchema>,
  fundamentusData: z.infer<typeof FundamentusFiiSchema>,
  tesouroRate: number,
  growthRate: number,
): FiiTijoloFormattedDataType[] => {
  const fundamentusMap = new Map(
    fundamentusData.map((row) => [row.Papel, row]),
  );

  const tijoloData = statusInvestData.filter(
    (row) => brazilianFIIManager[row.TICKER]?.type === "tijolo",
  );

  const initialFunds: FiiTijoloCalculatedDataType[] = [];

  for (const row of tijoloData) {
    const basePremium = getBasePremium(
      row.TICKER,
      fundamentusMap.get(row.TICKER)?.["Segmento"],
    );
    initialFunds.push(
      tijoloDomain(
        row,
        fundamentusMap.get(row.TICKER) ?? null,
        tesouroRate,
        basePremium,
        growthRate,
      ),
    );
  }

  const adjustedPremiums = calculateFiiBoxplotOutliers(
    initialFunds,
    (ticker) => brazilianFIIManager[ticker]?.isTopManager ?? false,
    tesouroRate,
    (ticker) =>
      getBasePremium(ticker, fundamentusMap.get(ticker)?.["Segmento"]),
  );

  const result: FiiTijoloFormattedDataType[] = [];

  for (const row of tijoloData) {
    const premium =
      adjustedPremiums.get(row.TICKER) ??
      getBasePremium(row.TICKER, fundamentusMap.get(row.TICKER)?.["Segmento"]);
    const calculated = tijoloDomain(
      row,
      fundamentusMap.get(row.TICKER) ?? null,
      tesouroRate,
      premium,
      growthRate,
    );
    result.push(tijoloFormatter(calculated));
  }

  return result;
};
