import { StatusInvestNormalizedDataType } from "@/@types/StatusInvestNormalizedDataType";

export const getPL = (value: StatusInvestNormalizedDataType) => {
  const pl = value["P/L"] / 100;

  return pl;
};
