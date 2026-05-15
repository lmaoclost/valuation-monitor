import { NextResponse } from "next/server";
import { getFiiListData } from "@/services";

export async function GET() {
  try {
    const data = await getFiiListData("agronegócio");
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error processing FII Fiagro Data:", error);
    return NextResponse.json(
      { error: "Error processing FII Fiagro Data" },
      { status: 500 },
    );
  }
}
