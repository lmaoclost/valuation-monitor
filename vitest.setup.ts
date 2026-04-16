import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock fetch globally for all tests
global.fetch = vi.fn();

// Mock Next.js router
vi.mock('next/router', () => ({
  useRouter: () => ({
    push: vi.fn(),
    pathname: '/',
    query: {},
    asPath: '/',
  }),
}));

// Mock Next.js navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock VirtualizedTableBody to render all rows for testing
// The real implementation uses @tanstack/react-virtual which doesn't measure properly in test environment
vi.mock('@/components/DataTable/VirtualizedTableBody', async () => {
  const React = await import('react');
  const { flexRender } = await import('@tanstack/react-table');
  const { Table, TableBody, TableCell, TableRow } = await import('@/components/ui/table');
  const { DataTableHeader } = await import('@/components/DataTable/TableHeader');

  return {
    VirtualizedTableBody: ({
      table,
      rows,
      columns,
      headerGroups,
    }: any) => {
      return React.createElement(
        'div',
        { style: { overflow: 'auto' } },
        React.createElement(
          Table,
          { className: 'min-w-[1200px]' },
          React.createElement(DataTableHeader, { headerGroups, sticky: true }),
          React.createElement(
            TableBody,
            {},
            rows.map((row: any) => {
              const rowProps: any = {
                key: row.id,
                className: 'cursor-pointer',
              };
              if (row.getIsSelected()) {
                rowProps['data-state'] = 'selected';
              }
              return React.createElement(
                TableRow,
                rowProps,
                row.getVisibleCells().map((cell: any) =>
                  React.createElement(
                    TableCell,
                    { key: cell.id },
                    flexRender(cell.column.columnDef.cell, cell.getContext())
                  )
                )
              );
            })
          )
        )
      );
    },
  };
});
