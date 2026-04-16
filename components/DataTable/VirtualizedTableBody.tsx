import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";
import { DataTableHeader } from "./TableHeader";

const ROW_HEIGHT = 45;
const CONTAINER_HEIGHT = '80vh'; // Fixed height in pixels for consistent virtualization
const OVERSCAN_COUNT = 10;

interface VirtualizedTableBodyProps {
  table: any;
  rows: any[];
  columns: any[];
  headerGroups: any[];
}

export function VirtualizedTableBody({
  table,
  rows,
  columns,
  headerGroups,
}: VirtualizedTableBodyProps) {
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
      className="overflow-x-auto"
    >
      <Table className="min-w-[1200px]">
        <DataTableHeader headerGroups={headerGroups} sticky />
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
                {row.getVisibleCells().map((cell: any) => (
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
      </Table>
    </div>
  );
}
