import { StatusInvestNormalizedDataType } from "@/@types/StatusInvestNormalizedDataType";

export const calculateCagrProfit = (value: StatusInvestNormalizedDataType) => {
  const lucroCagr = value["CAGR LUCROS 5 ANOS"];

  return lucroCagr;
};
