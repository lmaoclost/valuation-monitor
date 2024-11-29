import { StatusInvestData } from "@/app/components/table";
import { convertStringToFloat } from "./convertStringToFloat";

export const calculateCagrProfit = (value: StatusInvestData) => {
  const lucroCagr = value["CAGR LUCROS 5 ANOS"];
  const formattedCagr = convertStringToFloat(lucroCagr) || 0;

  return formattedCagr;
}