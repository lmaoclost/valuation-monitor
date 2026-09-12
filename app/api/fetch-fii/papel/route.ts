import { NextResponse, connection } from "next/server";
import type { NextRequest } from "next/server";
import { getFiiPapelData } from "@/services";
import {
  ApiFilterError,
  FII_PAPEL_COLUMN_TYPES,
  applyTableFilter,
} from "@/lib/api-filter";

export async function GET(request?: NextRequest) {
  try {
    await connection();
    const data = await getFiiPapelData();
    const searchParams =
      request?.nextUrl.searchParams ?? new URLSearchParams();
    return NextResponse.json(
      applyTableFilter(data, searchParams, FII_PAPEL_COLUMN_TYPES),
    );
  } catch (error) {
    if (error instanceof ApiFilterError) {
      return NextResponse.json(
        {
          error: error.message,
          allowedColumns: error.allowedColumns,
        },
        { status: 400 },
      );
    }
    console.error("Error processing FII Papel Data:", error);
    return NextResponse.json(
      { error: "Error processing FII Papel Data" },
      { status: 500 },
    );
  }
}
