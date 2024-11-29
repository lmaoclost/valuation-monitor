import { convertStringToFloat } from './convertStringToFloat';
import { getDY } from './getDY';
import { StatusInvestData } from "@/app/components/table";

export const calculateDPA = (value: StatusInvestData) => {
  const price = convertStringToFloat(value.PRECO)
  const dy = getDY(value);
  const dpa = price * dy / 100;

  return dpa;
}