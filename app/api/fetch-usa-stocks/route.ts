import { NextResponse } from "next/server";
import { getUSAStocksData } from "@/services";

export async function GET() {
  try {
    const parsedData = await getUSAStocksData();

    return NextResponse.json(parsedData);
  } catch (error) {
    console.error("Error processing USA Data:", error instanceof Error ? error.message : String(error));
    return NextResponse.json(
      { error: "Error processing USA Data" },
      { status: 500 },
    );
  }
}