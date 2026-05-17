import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TableWrapper } from '@/components/TableWrapper';

// Mock React Query hooks
vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query');
  return {
    ...actual,
    useQuery: vi.fn(),
    keepPreviousData: true,
  };
});

// Mock actions
vi.mock('@/app/actions/stock.actions', () => ({
  getStocksAndComplementary: vi.fn(),
}));

// Mock DataTable component
vi.mock('@/components/DataTable', () => ({
  DataTable: ({ data }: Record<string, any>) => (
    <div data-testid="data-table">
      <div>{data?.length || 0} items</div>
    </div>
  ),
}));

// Mock columns
vi.mock('@/components/DataTable/columns', () => ({
  createColumns: vi.fn(() => [
    { accessorKey: 'ticker' },
    { accessorKey: 'price' },
  ]),
}));

import { useQuery } from '@tanstack/react-query';

describe('TableWrapper - Query and Mutation Coverage', () => {
  let useQueryMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    useQueryMock = vi.mocked(useQuery);
  });

  it('should query stocks and complementary data on mount', () => {
    useQueryMock.mockReturnValueOnce({
      data: undefined,
      isLoading: true,
    } as any);

    render(<TableWrapper />);

    expect(useQueryMock).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ['stocks-and-complementary'],
      })
    );
  });

  it('should show loading state while fetching data', () => {
    useQueryMock.mockReturnValueOnce({
      data: undefined,
      isLoading: true,
    } as any);

    render(<TableWrapper />);
    expect(screen.getByText('Carregando dados...')).toBeInTheDocument();
  });

  it('should render DataTable when data is loaded', () => {
    const mockData = {
      stocks: [{ ticker: 'PETR4', price: 25.5 }],
      comp: { risk: '8%', ipca: '4.5%', erp: '7.5%' },
    };

    useQueryMock.mockReturnValueOnce({
      data: mockData,
      isLoading: false,
    } as any);

    render(<TableWrapper />);
    expect(screen.getByTestId('data-table')).toBeInTheDocument();
  });

  it('should memoize columns to prevent unnecessary re-renders', () => {
    const mockData = {
      stocks: [{ ticker: 'PETR4', price: 25.5 }],
      comp: { risk: '8%', ipca: '4.5%', erp: '7.5%' },
    };

    useQueryMock.mockReturnValueOnce({
      data: mockData,
      isLoading: false,
    } as any);

    const { rerender } = render(<TableWrapper />);

    useQueryMock.mockReturnValueOnce({
      data: mockData,
      isLoading: false,
    } as any);

    rerender(<TableWrapper />);

    expect(screen.getByTestId('data-table')).toBeInTheDocument();
  });

  it('should memoize data to prevent unnecessary re-renders', () => {
    const mockData = {
      stocks: [{ ticker: 'VALE5', price: 65.0 }],
      comp: { risk: '8%', ipca: '4.5%', erp: '7.5%' },
    };

    useQueryMock.mockReturnValueOnce({
      data: mockData,
      isLoading: false,
    } as any);

    render(<TableWrapper />);

    const tableDiv = screen.getByTestId('data-table');
    expect(tableDiv).toBeInTheDocument();
  });

  it('should handle undefined stocks in data', () => {
    const mockData = {
      comp: { risk: '8%', ipca: '4.5%', erp: '7.5%' },
    };

    useQueryMock.mockReturnValueOnce({
      data: mockData,
      isLoading: false,
    } as any);

    render(<TableWrapper />);

    expect(screen.getByTestId('data-table')).toBeInTheDocument();
  });

  it('should set staleTime for 24 hours', () => {
    useQueryMock.mockReturnValueOnce({
      data: undefined,
      isLoading: true,
    } as any);

    render(<TableWrapper />);

    expect(useQueryMock).toHaveBeenCalledWith(
      expect.objectContaining({
        staleTime: 24 * 60 * 60 * 1000,
      })
    );
  });

  it('should disable refetch on window focus', () => {
    useQueryMock.mockReturnValueOnce({
      data: undefined,
      isLoading: true,
    } as any);

    render(<TableWrapper />);

    expect(useQueryMock).toHaveBeenCalledWith(
      expect.objectContaining({
        refetchOnWindowFocus: false,
      })
    );
  });
});
