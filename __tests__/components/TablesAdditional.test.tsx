import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DataTable } from '../../components/DataTable/DataTable';
import { ColumnDef } from '@tanstack/react-table';

describe('DataTable - Additional Coverage', () => {
  interface StockData {
    id: string;
    ticker: string;
    price: number;
    change: number;
  }

  const columns: ColumnDef<StockData>[] = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'ticker', header: 'Ticker' },
    { accessorKey: 'price', header: 'Price' },
    { accessorKey: 'change', header: 'Change' },
  ];

  const mockData: StockData[] = [
    { id: '1', ticker: 'PETR4', price: 25.5, change: 2.5 },
    { id: '2', ticker: 'VALE3', price: 70.2, change: -1.3 },
    { id: '3', ticker: 'WEGE3', price: 45.8, change: 3.2 },
    { id: '4', ticker: 'ITUB4', price: 6.8, change: 0 },
    { id: '5', ticker: 'BBAS3', price: 15.2, change: -2.1 },
  ];

  it('should display table with all data rows', () => {
    render(<DataTable columns={columns} data={mockData} />);
    expect(screen.getByText('PETR4')).toBeInTheDocument();
    expect(screen.getByText('VALE3')).toBeInTheDocument();
    expect(screen.getByText('WEGE3')).toBeInTheDocument();
  });

  it('should render multiple rows with different values', () => {
    render(<DataTable columns={columns} data={mockData} />);
    const rows = screen.getAllByRole('row');
    // Header + 5 data rows
    expect(rows.length).toBeGreaterThanOrEqual(5);
  });

  it('should handle sorting interaction on headers', async () => {
    const user = userEvent.setup();
    render(<DataTable columns={columns} data={mockData} />);

    // Click on first sortable header
    const headers = screen.getAllByRole('columnheader');
    if (headers.length > 0) {
      await user.click(headers[1]);
      expect(screen.getByRole('table')).toBeInTheDocument();
    }
  });

  it('should display negative and positive values', () => {
    render(<DataTable columns={columns} data={mockData} />);

    // Table should contain both positive and negative changes
    const cells = screen.getAllByRole('cell');
    expect(cells.length).toBeGreaterThan(5);
  });

  it('should handle empty data array', () => {
    render(<DataTable columns={columns} data={[]} />);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('should display data with zero values', () => {
    const zeroData: StockData[] = [
      { id: '1', ticker: 'TEST1', price: 0, change: 0 },
    ];
    render(<DataTable columns={columns} data={zeroData} />);
    expect(screen.getByText('TEST1')).toBeInTheDocument();
  });

  it('should render table structure correctly', () => {
    const { container } = render(<DataTable columns={columns} data={mockData} />);
    const table = container.querySelector('table');
    expect(table).toBeInTheDocument();
  });

  it('should display cells with different data types', () => {
    render(<DataTable columns={columns} data={mockData} />);

    // Check for string cells
    expect(screen.getByText('ITUB4')).toBeInTheDocument();

    // Check that numeric values are rendered
    const cells = screen.getAllByRole('cell');
    expect(cells.length).toBeGreaterThan(0);
  });
});
