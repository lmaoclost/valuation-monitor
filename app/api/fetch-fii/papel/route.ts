import { NextResponse } from "next/server";
import { getFiiPapelData } from "@/services";

export async function GET() {
  try {
    const data = await getFiiPapelData();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error processing FII Papel Data:", error);
    return NextResponse.json(
      { error: "Error processing FII Papel Data" },
      { status: 500 },
    );
  }
}
