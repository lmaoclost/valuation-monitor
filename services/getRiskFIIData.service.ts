import { getFiiComplementarData } from "./getFiiComplementarData.service";
import { formatPercentage } from "@/utils";

export const getRiskFIIData = async () => {
  const { tesouro, ipca } = await getFiiComplementarData();
  return {
    ipca: formatPercentage(ipca / 100),
    tesouro: formatPercentage(tesouro),
  };
};
