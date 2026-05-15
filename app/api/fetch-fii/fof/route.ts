import { NextResponse } from "next/server";
import { getFiiListData } from "@/services";

export async function GET() {
  try {
    const data = await getFiiListData("fundo de fundos");
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error processing FII FoF Data:", error);
    return NextResponse.json(
      { error: "Error processing FII FoF Data" },
      { status: 500 },
    );
  }
}
