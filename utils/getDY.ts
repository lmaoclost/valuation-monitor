import { StatusInvestNormalizedDataType } from "@/@types/StatusInvestNormalizedDataType";

export const getDY = (value: StatusInvestNormalizedDataType) => {
  const dy = value["DY"] / 100;

  return dy;
};
