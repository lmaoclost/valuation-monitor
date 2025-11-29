import { StocksFormattedDataType } from "@/@types/StocksFormattedDataType";
import { SortingFn } from "@tanstack/react-table";

export const sortNullsLast: SortingFn<StocksFormattedDataType> = (
  rowA,
  rowB,
  columnId,
) => {
  const a = rowA.getValue<string>(columnId);
  const b = rowB.getValue<string>(columnId);

  const aIsEmpty = a === "" || a == null;
  const bIsEmpty = b === "" || b == null;

  if (aIsEmpty && !bIsEmpty) return 1;
  if (!aIsEmpty && bIsEmpty) return -1;
  if (aIsEmpty && bIsEmpty) return 0;

  return a > b ? 1 : -1;
};
