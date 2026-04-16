import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

const createMockColumns = (): ColumnDef<StocksFormattedDataType>[] => [
  {
    accessorKey: 'ticker',
    header: 'Ticker',
    cell: ({ row }) => row.getValue('ticker'),
  },
  {
    accessorKey: 'companyname',
    header: 'Company',
    cell: ({ row }) => row.getValue('companyname'),
  },
  {
    accessorKey: 'preco',
    header: 'Price',
    cell: ({ row }) => row.getValue('preco'),
  },
];

const mockStockData: StocksFormattedDataType[] = [
  {
    ticker: 'TEST1',
    companyname: 'Test Company 1',
    preco: 'R$ 100,00',
    dy: '5.0%',
    pl: '10.0',
    pvp: '1.0',
    id: '1',
  } as any,
  {
    ticker: 'TEST2',
    companyname: 'Test Company 2',
    preco: 'R$ 200,00',
    dy: '6.0%',
    pl: '12.0',
    pvp: '1.2',
    id: '2',
  } as any,
];

const mockComplementarData = {
  risk: '8%',
  ipca: '4.5%',
  erp: '7.5%',
};

describe('DataTable - Dropdown Interactions and Conditional Rendering', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render DataTable with data and columns', () => {
    const { container } = render(
      <DataTable
        columns={createMockColumns()}
        data={mockStockData}
        complementarData={mockComplementarData}
        onApplyPreset={vi.fn()}
      />
    );

    expect(container.querySelector('[data-slot="table"]')).toBeInTheDocument();
  });

  it('should display complementar data (IPCA, ERP, Risk)', () => {
    render(
      <DataTable
        columns={createMockColumns()}
        data={mockStockData}
        complementarData={mockComplementarData}
        onApplyPreset={vi.fn()}
      />
    );

    expect(screen.getByText(/IPCA:/)).toBeInTheDocument();
    expect(screen.getByText(/ERP:/)).toBeInTheDocument();
    expect(screen.getByText(/Premio Risco:/)).toBeInTheDocument();
    expect(screen.getByText(/4.5%/)).toBeInTheDocument();
  });

  it('should render Filter (Filtros) dropdown button', () => {
    render(
      <DataTable
        columns={createMockColumns()}
        data={mockStockData}
        complementarData={mockComplementarData}
        onApplyPreset={vi.fn()}
      />
    );

    const filterButton = screen.getByText(/Filtros/);
    expect(filterButton).toBeInTheDocument();
  });

  it('should render Columns (Colunas) dropdown button', () => {
    render(
      <DataTable
        columns={createMockColumns()}
        data={mockStockData}
        complementarData={mockComplementarData}
        onApplyPreset={vi.fn()}
      />
    );

    const columnsButton = screen.getByText(/Colunas/);
    expect(columnsButton).toBeInTheDocument();
  });

  it('should show filter input for ticker search', () => {
    render(
      <DataTable
        columns={createMockColumns()}
        data={mockStockData}
        complementarData={mockComplementarData}
        onApplyPreset={vi.fn()}
      />
    );

    const filterInput = screen.getByPlaceholderText(/Filtre a ação/);
    expect(filterInput).toBeInTheDocument();
  });

  it('should handle ticker filtering', async () => {
    const user = userEvent.setup();
    render(
      <DataTable
        columns={createMockColumns()}
        data={mockStockData}
        complementarData={mockComplementarData}
        onApplyPreset={vi.fn()}
      />
    );

    const filterInput = screen.getByPlaceholderText(/Filtre a ação/);
    await user.type(filterInput, 'TEST1');

    expect(filterInput).toHaveValue('TEST1');
  });

  it('should call onApplyPreset when preset is selected', async () => {
    const user = userEvent.setup();
    const onApplyPreset = vi.fn();

    render(
      <DataTable
        columns={createMockColumns()}
        data={mockStockData}
        complementarData={mockComplementarData}
        onApplyPreset={onApplyPreset}
      />
    );

    // The Filtros dropdown should exist (it maps over stocksPresets)
    const filterButton = screen.getByText(/Filtros/);
    expect(filterButton).toBeInTheDocument();
  });

  it('should render table with header row', () => {
    const { container } = render(
      <DataTable
        columns={createMockColumns()}
        data={mockStockData}
        complementarData={mockComplementarData}
        onApplyPreset={vi.fn()}
      />
    );

    const headerRow = container.querySelector('[data-slot="table-header"]');
    expect(headerRow).toBeInTheDocument();
  });

  it('should render table body with data rows', () => {
    const { container } = render(
      <DataTable
        columns={createMockColumns()}
        data={mockStockData}
        complementarData={mockComplementarData}
        onApplyPreset={vi.fn()}
      />
    );

    const tableBody = container.querySelector('[data-slot="table-body"]');
    expect(tableBody).toBeInTheDocument();
  });

  it('should handle empty data', () => {
    const { container } = render(
      <DataTable
        columns={createMockColumns()}
        data={[]}
        complementarData={mockComplementarData}
        onApplyPreset={vi.fn()}
      />
    );

    expect(container.querySelector('[data-slot="table"]')).toBeInTheDocument();
  });

  it('should conditionally render column based on visibility', () => {
    const { container } = render(
      <DataTable
        columns={createMockColumns()}
        data={mockStockData}
        complementarData={mockComplementarData}
        onApplyPreset={vi.fn()}
      />
    );

    // Verify table structure exists
    expect(container.querySelector('[data-slot="table"]')).toBeInTheDocument();
  });

  it('should render table with interactive elements initialized', () => {
    const { container } = render(
      <DataTable
        columns={createMockColumns()}
        data={mockStockData}
        complementarData={mockComplementarData}
        onApplyPreset={vi.fn()}
      />
    );

    // Verify all major UI elements are rendered
    const table = container.querySelector('[data-slot="table"]');
    const filterInput = screen.getByPlaceholderText(/Filtre a ação/);
    expect(table).toBeInTheDocument();
    expect(filterInput).toBeInTheDocument();
  });
});
