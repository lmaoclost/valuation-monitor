import { NextResponse } from "next/server";
import { getERPData } from "@/services";

export async function GET() {
  try {
    const erpData = await getERPData();

    return NextResponse.json(erpData);
  } catch (error) {
    console.error("Error processing Data:", error);
    return NextResponse.json(
      { error: "Error processing Data" },
      { status: 500 },
    );
  }
}
