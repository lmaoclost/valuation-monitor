import type {
  Table,
  Row,
  Column,
  ColumnDef,
  HeaderGroup,
  Cell,
  Header,
  ColumnVisibilityState,
  SortingState,
  ColumnFiltersState,
  RowSelectionState,
} from "@tanstack/react-table";

/**
 * Re-export core TanStack React Table types for convenient access
 * throughout the application
 */

export type TanStackTable<TData> = Table<any, TData>;
export type TanStackRow<TData> = Row<any, TData>;
export type TanStackColumn<TData> = Column<any, TData>;
export type TanStackColumnDef<TData, TValue = unknown> = ColumnDef<any, TData, TValue>;
export type TanStackHeaderGroup<TData> = HeaderGroup<any, TData>;
export type TanStackCell<TData> = Cell<any, TData>;
export type TanStackHeader<TData> = Header<any, TData>;
export type TanStackVisibilityState = ColumnVisibilityState;
export type TanStackSortingState = SortingState;
export type TanStackColumnFiltersState = ColumnFiltersState;
export type TanStackRowSelectionState = RowSelectionState;

/**
 * Generic convenience types for cases where data type is not yet specified
 * (commonly used in component props before specific data type is known)
 */

export type GenericTanStackTable = Table<any, any>;
export type GenericTanStackRow = Row<any, any>;
export type GenericTanStackColumn = Column<any, any>;
export type GenericTanStackColumnDef = ColumnDef<any, any>;
export type GenericTanStackHeaderGroup = HeaderGroup<any, any>;
export type GenericTanStackCell = Cell<any, any>;
export type GenericTanStackHeader = Header<any, any>;
