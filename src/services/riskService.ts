import { getRisk } from "@/utils/getRisk";

export async function fetchRiskData() {
  return await getRisk();
}
