"use client";

"use client";

import { useRef, memo } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Table as ShadcnTable, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { flexRender, ColumnDef, RowData, type Row, type Table, type HeaderGroup, type Cell } from "@tanstack/react-table";
import { DataTableHeader } from "./TableHeader";
import type { AppTableFeatures } from "./tableFeatures";

const ROW_HEIGHT = 45;
const CONTAINER_HEIGHT = '80vh';
const OVERSCAN_COUNT = 10;

interface VirtualizedTableBodyProps<TData extends RowData> {
  table: Table<AppTableFeatures, TData>;
  rows: Row<AppTableFeatures, TData>[];
  columns: readonly ColumnDef<AppTableFeatures, TData>[];
  headerGroups: HeaderGroup<AppTableFeatures, TData>[];
}

function VirtualizedTableBodyInner<TData extends RowData>({
  table,
  rows,
  columns,
  headerGroups,
}: VirtualizedTableBodyProps<TData>) {
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: OVERSCAN_COUNT,
  });

  const virtualRows = virtualizer.getVirtualItems();
  const totalSize = virtualizer.getTotalSize();
  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0;

  return (
    <div
      ref={tableContainerRef}
      style={{
        height: CONTAINER_HEIGHT,
        overflow: "auto",
      }}
      className="relative"
    >
      <ShadcnTable className="min-w-300 w-full caption-bottom text-sm border-collapse">
        <DataTableHeader headerGroups={headerGroups} sticky={true} />
        <TableBody>
          {paddingTop > 0 && (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                style={{ height: `${paddingTop}px` }}
              />
            </TableRow>
          )}
          {virtualRows.map((virtualRow) => {
            const row = rows[virtualRow.index];
            return (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="cursor-pointer"
                style={{ height: `${ROW_HEIGHT}px` }}
              >
                {row.getVisibleCells().map((cell: Cell<AppTableFeatures, TData>) => (
                  <TableCell key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext(),
                    )}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
          {paddingBottom > 0 && (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                style={{ height: `${paddingBottom}px` }}
              />
            </TableRow>
          )}
        </TableBody>
      </ShadcnTable>
    </div>
  );
};

export const VirtualizedTableBody = memo(VirtualizedTableBodyInner) as typeof VirtualizedTableBodyInner;
