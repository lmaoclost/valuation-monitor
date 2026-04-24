import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TableControls } from '@/components/DataTable/TableControls';

vi.mock('lucide-react', () => ({
  ChevronDown: () => <span data-testid="chevron">▼</span>,
}));

const createMockTable = (overrides = {}) => ({
  getColumn: vi.fn((columnId: string) => ({
    getFilterValue: vi.fn(() => ''),
    setFilterValue: vi.fn(),
  })),
  getAllColumns: vi.fn(() => []),
  getColumnIds: vi.fn(() => []),
  getHeaderGroups: vi.fn(() => []),
  getRowModel: vi.fn(() => ({ rows: [] })),
  getFilteredRowModel: vi.fn(() => ({ rows: [] })),
  getSortedRowModel: vi.fn(() => ({ rows: [] })),
  getPrePaginationRowModel: vi.fn(() => ({ rows: [] })),
  getPaginationRowModel: vi.fn(() => ({ rows: [] })),
  getSelectedRowModel: vi.fn(() => ({ rows: [] })),
  getExpandedRowModel: vi.fn(() => ({ rows: [] })),
  getState: vi.fn(() => ({})),
  setState: vi.fn(),
  options: {},
  ref: vi.fn(),
  autoReload: vi.fn(),
  ...overrides,
});

describe('TableControls', () => {
  it('renders filter input', () => {
    const mockTable = createMockTable();
    
    render(
      <TableControls
        table={mockTable as any}
        onApplyPreset={vi.fn()}
      />
    );
    
    expect(screen.getByPlaceholderText('Filtre a ação')).toBeInTheDocument();
  });

  it('renders Filter button when onApplyPreset provided', () => {
    const mockTable = createMockTable();
    
    render(
      <TableControls
        table={mockTable as any}
        onApplyPreset={vi.fn()}
      />
    );
    
    expect(screen.getByText('Filtros')).toBeInTheDocument();
  });

  it('renders complementary data when provided', () => {
    const mockTable = createMockTable();
    
    render(
      <TableControls
        table={mockTable as any}
        complementarData={{ risk: '4%', ipca: '4.5%', erp: '10%' }}
        onApplyPreset={vi.fn()}
      />
    );
    
    expect(screen.getByText(/IPCA:/)).toBeInTheDocument();
    expect(screen.getByText(/ERP:/)).toBeInTheDocument();
    expect(screen.getByText(/Premio Risco:/)).toBeInTheDocument();
  });

  it('does not render complementary data when not provided', () => {
    const mockTable = createMockTable();
    
    render(
      <TableControls
        table={mockTable as any}
        onApplyPreset={vi.fn()}
      />
    );
    
    expect(screen.queryByText(/IPCA:/)).not.toBeInTheDocument();
  });

  it('renders without Filter button when onApplyPreset not provided', () => {
    const mockTable = createMockTable();
    
    render(
      <TableControls
        table={mockTable as any}
      />
    );
    
    expect(screen.queryByText('Filtros')).not.toBeInTheDocument();
  });

  it('has styled container', () => {
    const mockTable = createMockTable();
    
    const { container } = render(
      <TableControls
        table={mockTable as any}
        onApplyPreset={vi.fn()}
      />
    );
    
    expect(container.firstChild).toHaveClass('flex flex-col gap-4');
  });

  it('handles input change', () => {
    const mockTable = createMockTable({
      getColumn: vi.fn((columnId: string) => ({
        getFilterValue: vi.fn(() => ''),
        setFilterValue: vi.fn(),
      })),
    });
    
    render(
      <TableControls
        table={mockTable as any}
        onApplyPreset={vi.fn()}
      />
    );
    
    const input = screen.getByPlaceholderText('Filtre a ação');
    fireEvent.change(input, { target: { value: 'PETR' } });
    
    expect(mockTable.getColumn).toHaveBeenCalledWith('ticker');
  });
});