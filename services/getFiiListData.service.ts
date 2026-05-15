import { cacheTag, cacheLife } from "next/cache";
import { StatusInvestFiiSchema } from "@/parsers/fii";
import { fiiListParser } from "@/parsers/fii";
import { getFiiCSVData } from ".";
import { z } from "zod";

export const getFiiListData = async (type: string) => {
  "use cache";
  cacheTag(`fii-${type}-data`);
  cacheLife("days");

  const csvData = await getFiiCSVData();

  const csvResult = StatusInvestFiiSchema.safeParse(csvData);
  if (!csvResult.success) {
    console.error(`FII ${type} CSV validation error:`, z.prettifyError(csvResult.error));
    throw new Error("Invalid FII CSV data from StatusInvest");
  }

  return fiiListParser(csvResult.data, type);
};
