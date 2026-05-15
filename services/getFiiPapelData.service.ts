import { cacheTag, cacheLife } from "next/cache";
import { StatusInvestFiiSchema } from "@/parsers/fii";
import { papelParser } from "@/parsers/fii";
import { getFiiCSVData } from ".";
import { z } from "zod";

export const getFiiPapelData = async () => {
  "use cache";
  cacheTag("fii-papel-data");
  cacheLife("days");

  const csvData = await getFiiCSVData();

  const csvResult = StatusInvestFiiSchema.safeParse(csvData);
  if (!csvResult.success) {
    console.error("FII Papel CSV validation error:", z.prettifyError(csvResult.error));
    throw new Error("Invalid FII CSV data from StatusInvest");
  }

  return papelParser(csvResult.data);
};
