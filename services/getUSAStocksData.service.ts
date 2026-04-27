import { StatusInvestNormalizedSchema } from "@/parsers/stocks/schema";
import { cacheLife, cacheTag } from "next/cache";
import { getUSACSVData } from ".";
import { usaStocksParser } from "@/parsers/stocks/usaStocksParser";
import { USA_CONFIG } from "@/lib/marketConfig";
import z from "zod";

export const getUSAStocksData = async () => {
  "use cache";
  cacheTag("parsed-usa-stock-data");
  cacheLife("days");

  const csv = await getUSACSVData();
  const risk = USA_CONFIG.riskPremium;

  const result = StatusInvestNormalizedSchema.safeParse(csv);
  if (!result.success) {
    console.error(
      "Erro ao validar dados do CSV:",
      z.prettifyError(result.error),
    );
    throw new Error("Dados inválidos na origem do StatusInvest");
  }

  return usaStocksParser(result.data, risk);
};