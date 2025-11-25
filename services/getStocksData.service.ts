import { StatusInvestNormalizedSchema } from "@/parsers/stocks/schema";
import { cacheLife, cacheTag } from "next/cache";
import { getComplementarData } from ".";
import { stocksParser } from "@/parsers/stocks/stocksParser";
import z from "zod";

export const getStocksData = async () => {
  "use cache";
  cacheTag("parsed-stock-data");
  cacheLife("days");

  const { csv, risk } = await getComplementarData();

  const result = StatusInvestNormalizedSchema.safeParse(csv);
  if (!result.success) {
    console.error(
      "Erro ao validar dados do CSV:",
      z.prettifyError(result.error),
    );
    throw new Error("Dados inválidos na origem do StatusInvest");
  }

  return stocksParser(result.data, risk);
};
