import { StatusInvestNormalizedDataType } from "@/@types/StatusInvestNormalizedDataType";
import { getDY } from "./getDY";

export const calculateDPA = (value: StatusInvestNormalizedDataType) => {
  const dy = getDY(value);
  const price = value.PRECO;
  const dpa = price * dy;

  return dpa;
};
