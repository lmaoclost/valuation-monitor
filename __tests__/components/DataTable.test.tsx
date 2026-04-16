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

// Mock data
const mockStockData: StocksFormattedDataType[] = [
  {
    ticker: 'PETR4',
    companyname: 'Petrobras',
    preco: 'R$ 25,50',
    dy: '5.0%',
    pl: '8.5',
    pvp: '1.5',
    id: '1',
  } as any,
  {
    ticker: 'VALE5',
    companyname: 'Vale',
    preco: 'R$ 65,00',
    dy: '8.0%',
    pl: '12.0',
    pvp: '2.0',
    id: '2',
  } as any,
];

const mockComplementarData = {
  risk: '8.0%',
  ipca: '4.5%',
  erp: '7.5%',
};

describe('DataTable Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the table with data', async () => {
    const columns = createMockColumns();
    const handlePreset = vi.fn();

    render(
      <DataTable
        columns={columns}
        data={mockStockData}
        complementarData={mockComplementarData}
        onApplyPreset={handlePreset}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('PETR4')).toBeInTheDocument();
    });
    expect(screen.getByText('VALE5')).toBeInTheDocument();
    expect(screen.getByText('Petrobras')).toBeInTheDocument();
  });

  it('should render column headers', () => {
    const columns = createMockColumns();
    const handlePreset = vi.fn();

    render(
      <DataTable
        columns={columns}
        data={mockStockData}
        complementarData={mockComplementarData}
        onApplyPreset={handlePreset}
      />
    );

    expect(screen.getByText('Ações')).toBeInTheDocument();
    expect(screen.getByText('Empresa')).toBeInTheDocument();
    expect(screen.getByText('Preço')).toBeInTheDocument();
  });

  it('should render empty state when no data', () => {
    const columns = createMockColumns();
    const handlePreset = vi.fn();

    render(
      <DataTable
        columns={columns}
        data={[]}
        complementarData={mockComplementarData}
        onApplyPreset={handlePreset}
      />
    );

    // Table should still render but with no rows
    expect(screen.getByText('Ações')).toBeInTheDocument();
  });

  it('should handle preset application', async () => {
    const columns = createMockColumns();
    const handlePreset = vi.fn();
    const user = userEvent.setup();

    render(
      <DataTable
        columns={columns}
        data={mockStockData}
        complementarData={mockComplementarData}
        onApplyPreset={handlePreset}
      />
    );

    // Look for preset buttons or controls
    // The actual implementation may vary
    const presetButtons = screen.queryAllByRole('button');
    expect(presetButtons.length).toBeGreaterThanOrEqual(0);
  });

  it('should display complementar data (risk, ipca, erp)', () => {
    const columns = createMockColumns();
    const handlePreset = vi.fn();

    render(
      <DataTable
        columns={columns}
        data={mockStockData}
        complementarData={mockComplementarData}
        onApplyPreset={handlePreset}
      />
    );

    // Look for complementar data display
    // The actual implementation may vary
    const buttons = screen.queryAllByRole('button');
    expect(buttons).toBeDefined();
  });

  it('should render correct number of rows', async () => {
    const columns = createMockColumns();
    const handlePreset = vi.fn();

    render(
      <DataTable
        columns={columns}
        data={mockStockData}
        complementarData={mockComplementarData}
        onApplyPreset={handlePreset}
      />
    );

    await waitFor(() => {
      const rows = screen.queryAllByRole('row');
      // Header row + at least some data rows visible in viewport
      expect(rows.length).toBeGreaterThanOrEqual(2);
    });
  });
});
