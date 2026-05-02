import { NextResponse } from "next/server";
import { getUSAReitData } from "@/services";

export async function GET() {
  try {
    const parsedData = await getUSAReitData();
    return NextResponse.json(parsedData);
  } catch (error) {
    console.error("Error processing USA REIT Data:", error);
    return NextResponse.json(
      { error: "Error processing USA REIT Data" },
      { status: 500 },
    );
  }
}