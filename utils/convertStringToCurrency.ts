import { convertStringToFloat } from "./convertStringToFloat";

export const convertStringToCurrency = (value: string) => {
  const formattedPrice = convertStringToFloat(value);
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(formattedPrice);
}