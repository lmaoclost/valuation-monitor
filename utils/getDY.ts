import { StatusInvestDataType } from "@/components/DataTable/StatusInvestData.types";
import { convertStringToFloat } from "./convertStringToFloat";

export const getDY = (value: StatusInvestDataType) => {
  const dy = value["DY"];
  const convertedDY = convertStringToFloat(dy);

  return convertedDY;
};
