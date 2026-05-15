import { NextResponse } from "next/server";
import { getFiiListData } from "@/services";

export async function GET() {
  try {
    const data = await getFiiListData("recebíveis de infraestrutura");
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error processing FII FI-Infra Data:", error);
    return NextResponse.json(
      { error: "Error processing FII FI-Infra Data" },
      { status: 500 },
    );
  }
}
