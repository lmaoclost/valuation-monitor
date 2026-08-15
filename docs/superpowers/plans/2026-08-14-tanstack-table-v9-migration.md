# TanStack Table v8 → v9 Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate `@tanstack/react-table` 8.21.3 → 9.1.2 across the codebase (PR #27).

**Architecture:** v9 replaces `useReactTable` + row-model factories with `useTable` + a `tableFeatures()` feature registry. Core row model is automatic; `sortingFn`/`sortingFns` renamed `sortFn`/`sortFns`; `VisibilityState` renamed `ColumnVisibilityState`; all core types (`Table`, `Row`, `Column`, `ColumnDef`, `Cell`, `Header`, `HeaderGroup`) gain a mandatory `TFeatures` first generic. A shared `tableFeatures.ts` module exports the feature registry + `AppTableFeatures` type so components and column files reference one source of truth.

**Tech Stack:** Next.js 16 (App Router, TS strict), Vitest (jsdom), TanStack Table v9.1.2, @tanstack/react-virtual (unchanged).

## Global Constraints

- All imports keep coming from `@tanstack/react-table` (re-exports table-core).
- v8-style controlled state (`state` + `onSortingChange` etc.) stays — supported in v9.
- Custom `globalFilterFn` function stays as a table option (supported in v9).
- `flexRender` function still exported in v9 — keep existing usages unchanged.
- No string sort-fn keys used in column defs (all `sortNullsLast` function refs) — no `sortFns` registry required.
- Tests must be watched RED (after dep bump) then GREEN (after migration).
- Full verification: `npm run lint`, `npm run test:run`, `npm run build`.

---

### Task 1: Bump dependency (RED baseline — done)

**Files:**
- Modify: `package.json`, `package-lock.json`

- [x] **Step 1: Install** — `npm install @tanstack/react-table@9.1.2` (already done in worktree)
- [x] **Step 2: Verify RED** — `npm run test:run` → 33 failures in DataTable suites, root cause `TypeError: getCoreRowModel is not a function` at `DataTable.tsx:56`

---

### Task 2: Create shared features module

**Files:**
- Create: `components/DataTable/tableFeatures.ts`

**Interfaces:**
- Produces: `export const features` (TableFeatures instance), `export type AppTableFeatures = typeof features`

- [ ] **Step 1: Write the module**

```ts
import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createFilteredRowModel,
  createSortedRowModel,
  globalFilteringFeature,
  rowSelectionFeature,
  rowSortingFeature,
  tableFeatures,
} from "@tanstack/react-table";

export const features = tableFeatures({
  rowSortingFeature,
  columnFilteringFeature,
  globalFilteringFeature,
  columnVisibilityFeature,
  rowSelectionFeature,
  sortedRowModel: createSortedRowModel(),
  filteredRowModel: createFilteredRowModel(),
});

export type AppTableFeatures = typeof features;
```

- [ ] **Step 2: Commit** — `git add components/DataTable/tableFeatures.ts && git commit -m "chore: add shared tableFeatures module for TanStack v9"`

---

### Task 3: Migrate DataTable.tsx to useTable

**Files:**
- Modify: `components/DataTable/DataTable.tsx`

**Interfaces:**
- Consumes: `features`, `AppTableFeatures` from `./tableFeatures`
- Produces: `DataTable` with props `columns: ColumnDef<AppTableFeatures, TData, TValue>[]`, `initialColumnVisibility?: ColumnVisibilityState`

- [ ] **Step 1: Update imports**

Replace:
```ts
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
```
with:
```ts
import {
  ColumnDef,
  ColumnVisibilityState,
  SortingState,
  useTable,
} from "@tanstack/react-table";
import { AppTableFeatures, features } from "./tableFeatures";
```

- [ ] **Step 2: Update prop types**

`columns: ColumnDef<TData, TValue>[]` → `columns: ColumnDef<AppTableFeatures, TData, TValue>[]`
`initialColumnVisibility?: VisibilityState` → `initialColumnVisibility?: ColumnVisibilityState`
`useState<VisibilityState>` → `useState<ColumnVisibilityState>` (two spots: defaultVisibility + state)

- [ ] **Step 3: Replace table construction**

```ts
const table = useTable({
  features,
  data,
  columns,
  onSortingChange: setSorting,
  onColumnVisibilityChange: setColumnVisibility,
  onRowSelectionChange: setRowSelection,
  state: {
    sorting,
    globalFilter,
    columnVisibility,
    rowSelection,
  },
  onGlobalFilterChange: setGlobalFilter,
  globalFilterFn: (row, columnId, filterValue) => {
    const rowData = row.original as { ticker?: string; companyname?: string };
    const tickerValue = rowData.ticker?.toString() ?? "";
    const nameValue = rowData.companyname?.toString() ?? "";
    const searchLower = filterValue.toLowerCase();
    return (
      tickerValue.toLowerCase().includes(searchLower) ||
      nameValue.toLowerCase().includes(searchLower)
    );
  },
  enableMultiSort: false,
});
```
(`getCoreRowModel`, `getSortedRowModel`, `getFilteredRowModel` options deleted; `table.getFilteredRowModel()` at line 82 stays.)

- [ ] **Step 4: Run targeted tests — still RED** (expected: `getFilteredRowModel is not a function` or type errors surface at build; runtime failure may move)

- [ ] **Step 5: Commit** — `git commit -am "refactor: migrate DataTable to TanStack Table v9 useTable"`

---

### Task 4: Migrate sortNullsLast typing

**Files:**
- Modify: `utils/sortNullsLast.ts`

**Interfaces:**
- Produces: `sortNullsLast: SortFn<any, any>` (same call signature as v8 `SortingFn`)

- [ ] **Step 1: Rename type**

```ts
import { SortFn } from "@tanstack/react-table";

export const sortNullsLast: SortFn<any, any> = (
  rowA,
  rowB,
  columnId,
) => {
```

- [ ] **Step 2: Commit** — `git commit -am "refactor: SortingFn to SortFn in sortNullsLast"`

---

### Task 5: Migrate generic type re-exports

**Files:**
- Modify: `@types/TanStackTableTypes.d.ts`

**Interfaces:**
- Produces: same exported names; `Generic*` variants now `*<any, any, any>`; `VisibilityState` → `ColumnVisibilityState` in type list

- [ ] **Step 1: Update import list and generic aliases**

```ts
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

export type GenericTanStackTable = Table<any, any>;
export type GenericTanStackRow = Row<any, any>;
export type GenericTanStackColumn = Column<any, any>;
export type GenericTanStackColumnDef = ColumnDef<any, any>;
export type GenericTanStackHeaderGroup = HeaderGroup<any, any>;
export type GenericTanStackCell = Cell<any, any>;
export type GenericTanStackHeader = Header<any, any>;
```

- [ ] **Step 2: Commit** — `git commit -am "refactor: update TanStack type re-exports for v9 generics"`

---

### Task 6: Rename sortingFn → sortFn in column files

**Files:**
- Modify: `components/DataTable/columns.tsx`, `papelColumns.tsx`, `tijoloColumns.tsx`, `usaColumns.tsx`, `usaReitColumns.tsx`, `fiiListColumns.tsx`
- Modify: `components/DataTable/columns.tsx` ColumnDef generic (check each file's `ColumnDef<TData>` → `ColumnDef<AppTableFeatures, TData, ...>`)

- [ ] **Step 1: Bulk rename**

```bash
sed -i 's/sortingFn:/sortFn:/g' components/DataTable/columns.tsx components/DataTable/papelColumns.tsx components/DataTable/tijoloColumns.tsx components/DataTable/usaColumns.tsx components/DataTable/usaReitColumns.tsx components/DataTable/fiiListColumns.tsx
```

- [ ] **Step 2: Fix ColumnDef generics per file**

Each file imports `ColumnDef` — add `import { AppTableFeatures } from "./tableFeatures"` (or `import type`) and change `ColumnDef<TData>` → `ColumnDef<AppTableFeatures, TData, ...>` matching the file's existing generic arity.

- [ ] **Step 3: Commit** — `git commit -am "refactor: rename sortingFn to sortFn for TanStack v9"`

---

### Task 7: Update column visibility constants

**Files:**
- Modify: `constants/brStocksColumnVisibility.ts`, `constants/fiiPapelColumnVisibility.ts`, `constants/fiiTijoloColumnVisibility.ts`, `constants/usaReitsColumnVisibility.ts`

- [ ] **Step 1: Rename type import**

`import { VisibilityState } from "@tanstack/react-table"` → `import { ColumnVisibilityState } from "@tanstack/react-table"` and `: VisibilityState` → `: ColumnVisibilityState` in each file.

- [ ] **Step 2: Commit** — `git commit -am "refactor: VisibilityState to ColumnVisibilityState for v9"`

---

### Task 8: Fix test files + vitest.setup

**Files:**
- Modify: `__tests__/components/DataTable.test.tsx`, `DataTable.sticky.test.tsx`, `DataTableDropdowns.test.tsx`, `TablesAdditional.test.tsx`, `vitest.setup.ts`

- [ ] **Step 1: Update ColumnDef generics in tests**

`ColumnDef<StocksFormattedDataType>` → `ColumnDef<any, any, any>` in each test file (mock columns; no features context needed).

- [ ] **Step 2: Verify vitest.setup.ts flexRender import still valid** — v9 exports `flexRender` function; no change expected.

- [ ] **Step 3: Run full suite — verify GREEN** — `npm run test:run` → all 789 tests pass

- [ ] **Step 4: Commit** — `git commit -am "test: fix ColumnDef generics for TanStack v9"`

---

### Task 9: Full verification

- [ ] **Step 1: Lint** — `npm run lint` — no errors
- [ ] **Step 2: Build** — `npm run build` — typecheck passes (Next.js build runs TS)
- [ ] **Step 3: Commit any stragglers** — `git status` clean
- [ ] **Step 4: Merge to dev** — `git checkout dev && git merge feat/tanstack-v9`, push, close PR #27 (`gh pr close 27 --comment "merged via feat/tanstack-v9"`), delete worktree branch.

---

## Self-Review

1. **Spec coverage:** All v9 breaking changes covered — useTable/features (Task 3), sortFn rename (Task 6), SortFn type (Task 4), ColumnVisibilityState (Tasks 3/5/7), TFeatures generics (Tasks 3/5/6/8). jsdom/actions PRs not in scope of this plan.
2. **Placeholder scan:** No TBDs; all steps concrete with exact code.
3. **Type consistency:** `AppTableFeatures` referenced consistently (Tasks 3/6); `features` consumed only in DataTable.tsx; generic aliases use `any` for TFeatures in shared d.ts to keep component props decoupled.