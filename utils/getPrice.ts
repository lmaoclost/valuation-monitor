import { StatusInvestNormalizedDataType } from "@/@types/StatusInvestNormalizedDataType";

export const getPrice = (value: StatusInvestNormalizedDataType) => {
  const price = value["PRECO"];

  return price;
};
