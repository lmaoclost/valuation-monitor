import { revalidateDay } from "@/constants";
import { getCSVData, getERPData, getIPCAData, getRiskData } from ".";
import { unstable_cache } from "next/cache";

export const getComplementarData = unstable_cache(
  async () => {
    const [csv, erp, ipca] = await Promise.all([
      getCSVData(),
      getERPData(),
      getIPCAData(),
    ]);

    const risk = getRiskData(ipca, erp);
    return { csv, erp, ipca, risk };
  },
  ["parsed-complementar-data"],
  { revalidate: revalidateDay },
);
