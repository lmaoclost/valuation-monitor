import { NextResponse } from "next/server";
import { getIPCAData } from "@/services";

export async function GET() {
  try {
    const ipcaData = await getIPCAData();

    return NextResponse.json(ipcaData);
  } catch (error) {
    console.error("Error processing Data:", error);
    return NextResponse.json(
      { error: "Error processing Data" },
      { status: 500 },
    );
  }
}
