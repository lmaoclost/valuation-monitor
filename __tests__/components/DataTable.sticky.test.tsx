import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DataTable } from '@/components/DataTable/DataTable';
import { StocksFormattedDataType } from '@/@types/StocksFormattedDataType';
import { ColumnDef } from '@tanstack/react-table';

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: Record<string, any>) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Create mock columns for testing
const createMockColumns = (): ColumnDef<StocksFormattedDataType>[] => [
  {
    accessorKey: 'ticker',
    header: 'Ações',
    cell: ({ row }) => row.getValue('ticker'),
  },
  {
    accessorKey: 'companyname',
    header: 'Empresa',
    cell: ({ row }) => row.getValue('companyname'),
  },
  {
    accessorKey: 'preco',
    header: 'Preço',
    cell: ({ row }) => row.getValue('preco'),
  },
];

// Mock data with multiple rows to enable scrolling
const createMockStockData = (count: number = 50): StocksFormattedDataType[] => {
  return Array.from({ length: count }, (_, i) => ({
    ticker: `STOCK${i}`,
    companyname: `Company ${i}`,
    preco: `R$ ${(i * 10.5).toFixed(2)}`,
    dy: `${(i * 0.5).toFixed(1)}%`,
    pl: `${(i * 2.5).toFixed(1)}`,
    pvp: `${(i * 0.25).toFixed(2)}`,
    id: `${i}`,
  } as any));
};

const mockComplementarData = {
  risk: '8.0%',
  ipca: '4.5%',
  erp: '7.5%',
};

describe('DataTable Sticky Header with Virtualization', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render table header', async () => {
    const columns = createMockColumns();
    const handlePreset = vi.fn();
    const stockData = createMockStockData(20);

    render(
      <DataTable
        columns={columns}
        data={stockData}
        complementarData={mockComplementarData}
        onApplyPreset={handlePreset}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Ações')).toBeInTheDocument();
    });
    expect(screen.getByText('Empresa')).toBeInTheDocument();
    expect(screen.getByText('Preço')).toBeInTheDocument();
  });

  it('should have sticky positioning classes on table header', async () => {
    const columns = createMockColumns();
    const handlePreset = vi.fn();
    const stockData = createMockStockData(20);

    const { container } = render(
      <DataTable
        columns={columns}
        data={stockData}
        complementarData={mockComplementarData}
        onApplyPreset={handlePreset}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Ações')).toBeInTheDocument();
    });

    // Get the thead element
    const thead = container.querySelector('thead[data-slot="table-header"]');
    expect(thead).toBeInTheDocument();

    // Check if sticky positioning classes are present
    const classes = thead?.className || '';
    expect(classes).toContain('sticky');
    expect(classes).toContain('top-0');
  });

  it('should have z-index on sticky header for layering', async () => {
    const columns = createMockColumns();
    const handlePreset = vi.fn();
    const stockData = createMockStockData(20);

    const { container } = render(
      <DataTable
        columns={columns}
        data={stockData}
        complementarData={mockComplementarData}
        onApplyPreset={handlePreset}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Ações')).toBeInTheDocument();
    });

    const thead = container.querySelector('thead[data-slot="table-header"]');
    const classes = thead?.className || '';

    // Check if z-index class is present
    expect(classes).toContain('z-10');
  });

  it('should have background color on header rows for opaque appearance', async () => {
    const columns = createMockColumns();
    const handlePreset = vi.fn();
    const stockData = createMockStockData(20);

    const { container } = render(
      <DataTable
        columns={columns}
        data={stockData}
        complementarData={mockComplementarData}
        onApplyPreset={handlePreset}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Ações')).toBeInTheDocument();
    });

    const thead = container.querySelector('thead[data-slot="table-header"]');
    const headerRow = thead?.querySelector('tr');
    const classes = headerRow?.className || '';

    // Background class should be present
    expect(classes).toContain('bg-background');
  });

  it('should have background color on individual header cells', async () => {
    const columns = createMockColumns();
    const handlePreset = vi.fn();
    const stockData = createMockStockData(20);

    const { container } = render(
      <DataTable
        columns={columns}
        data={stockData}
        complementarData={mockComplementarData}
        onApplyPreset={handlePreset}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Ações')).toBeInTheDocument();
    });

    // Get all th elements
    const thElements = container.querySelectorAll('th[data-slot="table-head"]');
    expect(thElements.length).toBeGreaterThan(0);

    // Each header cell should have background color class
    thElements.forEach((th) => {
      const classes = th.className || '';
      expect(classes).toContain('bg-background');
    });
  });

  it('should maintain sticky header visibility with large dataset', async () => {
    const columns = createMockColumns();
    const handlePreset = vi.fn();
    const stockData = createMockStockData(100);

    const { container } = render(
      <DataTable
        columns={columns}
        data={stockData}
        complementarData={mockComplementarData}
        onApplyPreset={handlePreset}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Ações')).toBeInTheDocument();
    });

    // Verify header is still present and sticky
    const thead = container.querySelector('thead[data-slot="table-header"]');
    expect(thead).toBeInTheDocument();

    const classes = thead?.className || '';
    expect(classes).toContain('sticky');
    expect(classes).toContain('top-0');
    expect(classes).toContain('z-10');
  });

  it('should render header row with correct structure for virtualization', async () => {
    const columns = createMockColumns();
    const handlePreset = vi.fn();
    const stockData = createMockStockData(20);

    const { container } = render(
      <DataTable
        columns={columns}
        data={stockData}
        complementarData={mockComplementarData}
        onApplyPreset={handlePreset}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Ações')).toBeInTheDocument();
    });

    // Verify the header structure
    const thead = container.querySelector('thead[data-slot="table-header"]');
    expect(thead).toBeInTheDocument();

    const headerRow = thead?.querySelector('tr');
    expect(headerRow).toBeInTheDocument();

    const headerCells = headerRow?.querySelectorAll('th[data-slot="table-head"]');
    expect(headerCells?.length).toBe(columns.length);
  });
});
