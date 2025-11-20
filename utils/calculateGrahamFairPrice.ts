import { StatusInvestNormalizedDataType } from "@/@types/StatusInvestNormalizedDataType";

export const calculateGrahamFairPrice = (
  value: StatusInvestNormalizedDataType,
) => {
  const lpa = value[" LPA"];
  const vpa = value[" VPA"];
  const fairPrice = Math.sqrt(22.5 * lpa * vpa);

  return fairPrice;
};
