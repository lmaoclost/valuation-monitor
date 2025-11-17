import { StatusInvestDataType } from "@/components/DataTable/StatusInvestData.types";
import { convertStringToFloat } from "./convertStringToFloat";

export const getROE = (value: StatusInvestDataType) => {
  const roe = value["ROE"];
  const convertedROE = convertStringToFloat(roe);

  return convertedROE;
};
