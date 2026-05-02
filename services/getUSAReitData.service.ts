import { StatusInvestNormalizedSchema } from "@/parsers/stocks/schema";
import { cacheLife, cacheTag } from "next/cache";
import { getUSAReitCSVData } from ".";
import { usaReitParser } from "@/parsers/stocks/usaReitParser";
import { USA_REIT_CONFIG } from "@/lib/marketConfig";
import z from "zod";

export const getUSAReitData = async () => {
  "use cache";
  cacheTag("parsed-usa-reit-data");
  cacheLife("days");

  const csv = await getUSAReitCSVData();
  const risk = USA_REIT_CONFIG.riskPremium;

  const result = StatusInvestNormalizedSchema.safeParse(csv);
  if (!result.success) {
    console.error(
      "Erro ao validar dados do CSV REIT:",
      z.prettifyError(result.error),
    );
    throw new Error("Dados inválidos na origem do StatusInvest");
  }

  return usaReitParser(result.data, risk);
};