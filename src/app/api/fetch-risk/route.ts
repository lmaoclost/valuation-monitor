// src/pages/api/getRisk.ts
import { NextResponse } from "next/server";
import { getRisk } from "@/utils/getRisk";

export async function GET() {
  try {
    const risk = await getRisk();
    return NextResponse.json({ risk });
  } catch (error) {
    console.error("Erro ao obter risco:", error);
    return NextResponse.json({ error: "Erro ao obter risco" }, { status: 500 });
  }
}
