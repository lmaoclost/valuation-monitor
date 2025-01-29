import { NextResponse } from "next/server";
import { fetchIPCAData } from "@/services/ipcaService";

export async function GET() {
  try {
    const ipcaValue = await fetchIPCAData();
    return NextResponse.json({ ipca: ipcaValue });
  } catch (error) {
    console.error("Erro ao buscar IPCA:", error);
    return NextResponse.json({ error: "Erro ao buscar IPCA" }, { status: 500 });
  }
}
