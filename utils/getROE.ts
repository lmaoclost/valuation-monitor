import { StatusInvestNormalizedDataType } from "@/@types/StatusInvestNormalizedDataType";

export const getROE = (value: StatusInvestNormalizedDataType) => {
  const roe = value["ROE"];

  return roe;
};
