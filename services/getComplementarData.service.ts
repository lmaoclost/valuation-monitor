import { getCSVData, getERPData, getIPCAData, getRiskData } from ".";
import { cacheLife, cacheTag } from "next/cache";

export const getComplementarData = async () => {
  "use cache";
  cacheTag("parsed-complementar-data");
  cacheLife("days");
  const [csv, erp, ipca] = await Promise.all([
    getCSVData(),
    getERPData(),
    getIPCAData(),
  ]);

  const risk = getRiskData(ipca, erp);
  return { csv, erp, ipca, risk };
};
