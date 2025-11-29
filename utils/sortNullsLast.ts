import { StocksFormattedDataType } from "@/@types/StocksFormattedDataType";
import { SortingFn } from "@tanstack/react-table";

function parsePossibleNumber(raw?: unknown): number | null {
  if (raw == null) return null;
  const s = String(raw).trim();
  if (s === "") return null;

  const clean = s
    .replace("%", "")
    .replace("R$", "")
    .replace(/\s/g, "")
    .replace(/\./g, "")
    .replace(",", ".")
    .trim();

  const n = Number(clean);
  return Number.isFinite(n) ? n : null;
}

export const sortNullsLast: SortingFn<StocksFormattedDataType> = (
  rowA,
  rowB,
  columnId,
) => {
  const rawA = rowA.getValue<string>(columnId);
  const rawB = rowB.getValue<string>(columnId);

  const aEmpty = rawA === "" || rawA == null;
  const bEmpty = rawB === "" || rawB == null;

  if (aEmpty && !bEmpty) return 1;
  if (!aEmpty && bEmpty) return -1;
  if (aEmpty && bEmpty) return 0;

  const numA = parsePossibleNumber(rawA);
  const numB = parsePossibleNumber(rawB);

  if (numA !== null && numB !== null) return numA - numB;

  return String(rawA).localeCompare(String(rawB), "pt-BR", {
    sensitivity: "base",
    numeric: true,
  });
};
