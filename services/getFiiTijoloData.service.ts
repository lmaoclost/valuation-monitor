import { cacheTag, cacheLife } from "next/cache";
import { StatusInvestFiiSchema, FundamentusFiiSchema } from "@/parsers/fii";
import { tijoloParser } from "@/parsers/fii";
import { getFiiCSVData, getFundamentusFiiData, getFiiComplementarData } from ".";
import { z } from "zod";

export const getFiiTijoloData = async () => {
  "use cache";
  cacheTag("fii-tijolo-data");
  cacheLife("days");

  const [csvData, fundamentusData, { tesouro, ipca }] = await Promise.all([
    getFiiCSVData(),
    getFundamentusFiiData(),
    getFiiComplementarData(),
  ]);

  const csvResult = StatusInvestFiiSchema.safeParse(csvData);
  if (!csvResult.success) {
    console.error("FII Tijolo CSV validation error:", z.prettifyError(csvResult.error));
    throw new Error("Invalid FII CSV data from StatusInvest");
  }

  const fundamentusResult = FundamentusFiiSchema.safeParse(fundamentusData);
  if (!fundamentusResult.success) {
    console.error(
      "Fundamentus validation error:",
      z.prettifyError(fundamentusResult.error),
    );
    throw new Error("Invalid Fundamentus FII data");
  }

  const growthRate = ipca / 100;

  return tijoloParser(csvResult.data, fundamentusResult.data, tesouro, growthRate);
};
