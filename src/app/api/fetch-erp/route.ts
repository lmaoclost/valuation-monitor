import { NextResponse } from "next/server";
import { fetchERPData } from "@/services/erpService";

export async function GET() {
  try {
    const erpValue = await fetchERPData();
    return NextResponse.json({ erp: erpValue });
  } catch (error) {
    console.error("Erro ao buscar ERP:", error);
    return NextResponse.json({ error: "Erro ao buscar ERP" }, { status: 500 });
  }
}
