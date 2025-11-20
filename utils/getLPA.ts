import { StatusInvestNormalizedDataType } from "@/@types/StatusInvestNormalizedDataType";

export const getLPA = (value: StatusInvestNormalizedDataType) => {
  const lpa = value[" LPA"];

  return lpa;
};
