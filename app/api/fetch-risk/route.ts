import { NextResponse } from "next/server";
import { getERPData, getIPCAData, getRiskData } from "@/services";

export async function GET() {
  try {
    const erpData = await getERPData();
    const ipcaData = await getIPCAData();
    const riskData = getRiskData(ipcaData, erpData);

    return NextResponse.json(riskData);
  } catch (error) {
    console.error("Error processing Data:", error);
    return NextResponse.json(
      { error: "Error processing Data" },
      { status: 500 },
    );
  }
}
