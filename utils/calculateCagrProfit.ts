import { StatusInvestDataType } from "@/components/DataTable/StatusInvestData.types";
import { convertStringToFloat } from "./convertStringToFloat";

export const calculateCagrProfit = (value: StatusInvestDataType) => {
  const lucroCagr = value["CAGR LUCROS 5 ANOS"];
  const formattedCagr = convertStringToFloat(lucroCagr) || 0;

  return formattedCagr;
};
