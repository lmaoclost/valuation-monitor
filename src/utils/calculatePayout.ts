import { StatusInvestData } from "@/app/components/table";
import { calculateDPA } from "./calculateDPA";
import { convertStringToFloat } from "./convertStringToFloat";

export const calculatePayout = (value: StatusInvestData) => {
  const dpa = calculateDPA(value);
  const lpa = value[' LPA'];
  const formattedLPA = convertStringToFloat(lpa);
  const payout = dpa / formattedLPA;

  return payout * 100;
}