import { StatusInvestData } from "@/app/components/table";
import { convertStringToFloat } from "./convertStringToFloat";

export const getDY = (value: StatusInvestData) => {
  const dy = value["DY"];
  const convertedDY = convertStringToFloat(dy);
  return convertedDY || 0;
}