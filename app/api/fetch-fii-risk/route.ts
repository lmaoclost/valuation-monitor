import { NextResponse } from "next/server";
import { getRiskFIIData } from "@/services/getRiskFIIData.service";

export async function GET() {
  try {
    const riskData = await getRiskFIIData();
    return NextResponse.json(riskData);
  } catch (error) {
    console.error("Error processing FII risk data:", error);
    return NextResponse.json(
      { error: "Error processing FII risk data" },
      { status: 500 },
    );
  }
}
