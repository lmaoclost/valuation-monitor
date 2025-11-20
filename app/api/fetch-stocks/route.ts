import { NextResponse } from "next/server";
import { getStocksData } from "@/services/getStocksData.service";

export async function GET() {
  try {
    const parsedData = await getStocksData();

    return NextResponse.json(parsedData);
  } catch (error) {
    console.error("Error processing Data:", error);
    return NextResponse.json(
      { error: "Error processing Data" },
      { status: 500 },
    );
  }
}
