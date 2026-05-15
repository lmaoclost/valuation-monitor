import { cacheTag, cacheLife } from "next/cache";
import { getTesouroIPCA2035, getIPCAData } from ".";

export const getFiiComplementarData = async () => {
  "use cache";
  cacheTag("parsed-fii-complementar-data");
  cacheLife("days");

  const [tesouro, ipca] = await Promise.all([
    getTesouroIPCA2035(),
    getIPCAData(),
  ]);

  return { tesouro, ipca };
};
