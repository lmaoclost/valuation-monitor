import { StatusInvestNormalizedDataType } from "@/@types/StatusInvestNormalizedDataType";

export const getVPA = (value: StatusInvestNormalizedDataType) => {
  const vpa = value[" VPA"];

  return vpa;
};
