import { NextResponse } from "next/server";
import { getComplementarData } from "@/services";
import { formatPercentage } from "@/utils";

export async function GET() {
  try {
    const complementarData = await getComplementarData();

    const formattedComplementarData = {
      erp: formatPercentage(complementarData.erp / 100),
      ipca: formatPercentage(complementarData.ipca / 100),
      risk: formatPercentage(complementarData.risk),
    };

    return NextResponse.json(formattedComplementarData);
  } catch (error) {
    console.error("Error processing Data:", error);
    return NextResponse.json(
      { error: "Error processing Data" },
      { status: 500 },
    );
  }
}
