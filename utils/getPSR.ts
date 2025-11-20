import { StatusInvestNormalizedDataType } from "@/@types/StatusInvestNormalizedDataType";

export const getPSR = (value: StatusInvestNormalizedDataType) => {
  const psr = value["PSR"];

  return psr;
};
