import { StatusInvestNormalizedDataType } from "@/@types/StatusInvestNormalizedDataType";

export const getTicker = (value: StatusInvestNormalizedDataType) => {
  const ticker = value["TICKER"];

  return ticker;
};
