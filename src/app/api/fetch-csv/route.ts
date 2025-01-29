import { NextResponse } from "next/server";
import { fetchCSVData } from "@/services/csvService";

export async function GET() {
  try {
    const data = await fetchCSVData();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error processing CSV:", error);
    return NextResponse.json(
      { error: "Error processing CSV" },
      { status: 500 }
    );
  }
}
