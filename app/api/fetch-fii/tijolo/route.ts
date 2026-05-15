import { NextResponse } from "next/server";
import { getFiiTijoloData } from "@/services";

export async function GET() {
  try {
    const data = await getFiiTijoloData();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error processing FII Tijolo Data:", error);
    return NextResponse.json(
      { error: "Error processing FII Tijolo Data" },
      { status: 500 },
    );
  }
}
