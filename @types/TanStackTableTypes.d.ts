import type {
  Table,
  Row,
  Column,
  ColumnDef,
  HeaderGroup,
  Cell,
  Header,
  VisibilityState,
  SortingState,
  ColumnFiltersState,
  RowSelectionState,
} from "@tanstack/react-table";

/**
 * Re-export core TanStack React Table types for convenient access
 * throughout the application
 */

export type TanStackTable<TData> = Table<TData>;
export type TanStackRow<TData> = Row<TData>;
export type TanStackColumn<TData> = Column<TData>;
export type TanStackColumnDef<TData, TValue = unknown> = ColumnDef<TData, TValue>;
export type TanStackHeaderGroup<TData> = HeaderGroup<TData>;
export type TanStackCell<TData> = Cell<TData>;
export type TanStackHeader<TData> = Header<TData>;
export type TanStackVisibilityState = VisibilityState;
export type TanStackSortingState = SortingState;
export type TanStackColumnFiltersState = ColumnFiltersState;
export type TanStackRowSelectionState = RowSelectionState;

/**
 * Generic convenience types for cases where data type is not yet specified
 * (commonly used in component props before specific data type is known)
 */

export type GenericTanStackTable = Table<any>;
export type GenericTanStackRow = Row<any>;
export type GenericTanStackColumn = Column<any>;
export type GenericTanStackColumnDef = ColumnDef<any>;
export type GenericTanStackHeaderGroup = HeaderGroup<any>;
export type GenericTanStackCell = Cell<any>;
export type GenericTanStackHeader = Header<any>;
