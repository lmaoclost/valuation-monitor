import { NextResponse } from "next/server";
import { getFiiTijoloData, getFiiPapelData } from "@/services";

export async function GET() {
  try {
    const [tijolo, papel] = await Promise.all([
      getFiiTijoloData(),
      getFiiPapelData(),
    ]);
    return NextResponse.json({ tijolo, papel });
  } catch (error) {
    console.error("Error processing FII Data:", error);
    return NextResponse.json(
      { error: "Error processing FII Data" },
      { status: 500 },
    );
  }
}
